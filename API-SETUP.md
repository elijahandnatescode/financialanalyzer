# API Setup Guide

## Getting Your Anthropic API Key

TenKly uses Claude AI to analyze financial documents. To use the app, you need an Anthropic API key.

---

## Step-by-Step Guide

### 1. Create an Anthropic Account

1. Visit **https://console.anthropic.com**
2. Click "Sign Up" (or "Sign In" if you have an account)
3. Complete the registration process
4. Verify your email address

### 2. Get Your API Key

1. Log in to the Anthropic Console
2. Navigate to **"API Keys"** in the sidebar
3. Click **"Create Key"** or **"New API Key"**
4. Give your key a descriptive name (e.g., "TenKly Financial Analyzer")
5. Click **"Create"**
6. **Copy the API key immediately** (you won't be able to see it again)

### 3. Add API Key to TenKly

1. Open the TenKly app (financial-analyzer.html)
2. Click the **Settings icon (⚙️)** in the top-right corner
3. Paste your API key in the text field
4. Click **"Save API Key"**
5. You'll see a green confirmation message

---

## Security & Privacy

### Your API Key is Safe

- ✅ Stored **locally** in your browser (localStorage)
- ✅ **Never** sent to any server except Anthropic's API
- ✅ **Not** included in any analytics or tracking
- ✅ Stays on **your device only**

### Best Practices

- 🔒 **Don't share** your API key with anyone
- 🔒 **Don't commit** it to version control (Git)
- 🔒 **Regenerate** the key if you suspect it's been compromised
- 🔒 **Use separate keys** for different projects

---

## API Usage & Costs

### How the App Uses the API

- **Document Analysis**: 1 API call per uploaded document
- **Chat Messages**: 1 API call per message sent
- **Typical Usage**: 2,500-4,000 tokens per analysis

### Pricing (as of 2025)

Anthropic charges based on tokens used:
- **Claude Sonnet**: ~$3 per million input tokens, ~$15 per million output tokens
- **Average cost per analysis**: $0.02-0.05
- **Free tier**: Anthropic offers credits for new users

**Estimate**: 100 document analyses ≈ $2-5

---

## Troubleshooting

### "API key not configured" Error

**Problem**: The app shows a warning that the API key is missing.

**Solution**:
1. Click the Settings icon (⚙️)
2. Enter your Anthropic API key
3. Click "Save API Key"

---

### "API request failed with status: 401" Error

**Problem**: Authentication failed.

**Solution**:
- Your API key is invalid or expired
- Go to Settings (⚙️) and enter a valid API key
- If needed, create a new key at console.anthropic.com

---

### "API request failed with status: 429" Error

**Problem**: Rate limit exceeded.

**Solution**:
- You've made too many requests in a short time
- Wait a few minutes and try again
- Check your API usage limits in the Anthropic Console

---

### "API request failed with status: 402" Error

**Problem**: Insufficient credits or payment required.

**Solution**:
- Your free credits are exhausted
- Add payment information in the Anthropic Console
- Or wait for credits to reset (for free tier)

---

## Testing Your Setup

### Quick Test

1. Open the app
2. Add your API key in Settings
3. Upload the sample file: **sample-financial-statement.txt**
4. You should see analysis results in 5-10 seconds

### Expected Result

- ✅ Company name: ACME Corporation
- ✅ Health score: 70-85
- ✅ Metrics displayed in cards
- ✅ Three insights about the company
- ✅ Investment recommendation

---

## FAQ

### Q: Do I need a credit card to sign up?

**A:** Anthropic offers free trial credits for new users. You don't need a credit card initially, but you will need one after the free credits run out.

### Q: How much does it cost to use TenKly?

**A:** TenKly itself is free and open-source. You only pay for the API usage (typically $0.02-0.05 per document analysis).

### Q: Can I use a different AI model?

**A:** The app is currently configured for Claude Sonnet 4. You could modify the code to use different models, but Claude is recommended for best results.

### Q: Is my financial data secure?

**A:** Yes! All file processing happens in your browser. Only the extracted text (not the original file) is sent to Anthropic's API for analysis. Anthropic doesn't store or train on your data.

### Q: What if I run out of API credits?

**A:** The app will show an error. You'll need to add credits or payment information in the Anthropic Console to continue using the analysis features.

### Q: Can multiple people share one API key?

**A:** Technically yes, but it's not recommended for security reasons. Each user should use their own API key.

---

## Alternative: Running Without API Key

If you don't want to use the Anthropic API, you could:

1. **Manual Analysis**: Upload files and view extracted text without AI analysis
2. **Local AI**: Modify the code to use local AI models (requires technical setup)
3. **Backend Server**: Set up a backend server that handles API calls server-side

Note: These options require code modifications and are not included in the default app.

---

## Support

If you're still having trouble:

1. Check the browser console (F12) for error messages
2. Verify your API key is correct at console.anthropic.com
3. Try the sample file first to rule out document issues
4. Create an issue on the GitHub repository (if available)

---

## Resources

- **Anthropic Console**: https://console.anthropic.com
- **API Documentation**: https://docs.anthropic.com
- **Pricing**: https://www.anthropic.com/pricing
- **Support**: https://support.anthropic.com

---

**You're all set!** Once your API key is configured, you can start analyzing financial documents immediately. 🚀
