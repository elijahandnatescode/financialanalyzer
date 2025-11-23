// Vercel Serverless Function - Chat API Proxy for Anthropic
// This handles CORS and keeps API keys secure on the server

module.exports = async function handler(req, res) {
    // Enable CORS
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    // Handle preflight requests
    if (req.method === 'OPTIONS') {
        res.status(200).end();
        return;
    }

    // Only allow POST requests
    if (req.method !== 'POST') {
        res.status(405).json({ error: 'Method not allowed' });
        return;
    }

    try {
        const { messages, apiKey } = req.body;

        // Validate inputs
        if (!messages || !Array.isArray(messages)) {
            res.status(400).json({ error: 'Messages array is required' });
            return;
        }

        if (!apiKey) {
            res.status(400).json({ error: 'API key is required. Please add your Anthropic API key in Settings.' });
            return;
        }

        console.log('Making chat API request to Anthropic...');

        // Call Anthropic API from server (no CORS issues)
        const response = await fetch('https://api.anthropic.com/v1/messages', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-api-key': apiKey,
                'anthropic-version': '2023-06-01'
            },
            body: JSON.stringify({
                model: 'claude-sonnet-4-20250514',
                max_tokens: 1500,
                messages: messages
            })
        });

        console.log('Anthropic API response status:', response.status);

        if (!response.ok) {
            const errorText = await response.text();
            let errorData;
            try {
                errorData = JSON.parse(errorText);
            } catch {
                errorData = { message: errorText };
            }

            console.error('Anthropic API error:', response.status, errorData);

            // Provide user-friendly error messages
            let userMessage = `API error: ${response.status}`;
            if (response.status === 401) {
                userMessage = 'Invalid API key. Please check your Anthropic API key in Settings.';
            } else if (response.status === 429) {
                userMessage = 'Rate limit exceeded. Please wait a moment and try again.';
            } else if (response.status === 402) {
                userMessage = 'Insufficient credits. Please add credits to your Anthropic account.';
            }

            res.status(response.status).json({
                error: userMessage,
                details: errorData
            });
            return;
        }

        const data = await response.json();
        console.log('Chat response successful');
        res.status(200).json(data);

    } catch (error) {
        console.error('Error in chat function:', error);
        res.status(500).json({
            error: 'Server error: ' + error.message,
            message: error.message
        });
    }
};
