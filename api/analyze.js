// Vercel Serverless Function - API Proxy for Anthropic
// This handles CORS and keeps API keys secure on the server

export default async function handler(req, res) {
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
        const { prompt, apiKey } = req.body;

        // Validate inputs
        if (!prompt) {
            res.status(400).json({ error: 'Prompt is required' });
            return;
        }

        if (!apiKey) {
            res.status(400).json({ error: 'API key is required' });
            return;
        }

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
                max_tokens: 2500,
                messages: [
                    { role: 'user', content: prompt }
                ]
            })
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            res.status(response.status).json({
                error: `Anthropic API error: ${response.status}`,
                details: errorData
            });
            return;
        }

        const data = await response.json();
        res.status(200).json(data);

    } catch (error) {
        console.error('Error in analyze function:', error);
        res.status(500).json({
            error: 'Internal server error',
            message: error.message
        });
    }
}
