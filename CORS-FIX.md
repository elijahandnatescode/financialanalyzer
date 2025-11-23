# Fixing the CORS Error

## Problem

You're getting a "Failed to fetch" error because browsers block direct API calls to Anthropic due to CORS (Cross-Origin Resource Sharing) security policies.

---

## Solution 1: Deploy to Vercel (Recommended - Takes 2 minutes)

The app includes serverless functions that act as a proxy. Deploy to Vercel to use them:

### Steps:

1. **Push to GitHub** (already done ✓)

2. **Deploy to Vercel:**
   ```bash
   npm install -g vercel
   cd /path/to/financialanalyzer
   vercel
   ```

3. **That's it!** The app will work perfectly on Vercel because the serverless functions in `/api` handle the CORS issue.

### What Happens:
- App calls `/api/analyze` instead of Anthropic directly
- Vercel serverless function (`api/analyze.js`) makes the API call server-side
- No CORS issues because the request comes from the server

---

## Solution 2: Use Browser Extension (Local Testing)

If you want to test locally before deploying:

### Option A: CORS Unblock Extension

1. Install a CORS extension for your browser:
   - **Chrome**: [CORS Unblock](https://chrome.google.com/webstore/detail/cors-unblock)
   - **Firefox**: [CORS Everywhere](https://addons.mozilla.org/en-US/firefox/addon/cors-everywhere/)

2. Enable the extension

3. Open `financial-analyzer.html`

4. Upload a document

⚠️ **Warning**: Only use this for local testing. Never keep CORS extensions enabled for regular browsing (security risk).

### Option B: Run a Local Proxy

```bash
# Install a simple CORS proxy
npm install -g local-cors-proxy

# Run it
lcp --proxyUrl https://api.anthropic.com

# Then update financial-analyzer.html line 382 to:
# const response = await fetch("http://localhost:8010/proxy/v1/messages", {
```

---

## Solution 3: Quick Vercel Deployment Guide

### Step-by-Step:

1. **Install Vercel CLI:**
   ```bash
   npm install -g vercel
   ```

2. **Navigate to your project:**
   ```bash
   cd financialanalyzer
   ```

3. **Deploy:**
   ```bash
   vercel
   ```

4. **Follow prompts:**
   - Login to Vercel (creates account if needed)
   - Set up project (press Enter to accept defaults)
   - Deploy (press Enter)

5. **Get your URL:**
   - Vercel will give you a URL like: `https://financialanalyzer-abc123.vercel.app`
   - Open it and use the app!

### Production Deployment:

```bash
vercel --prod
```

This gives you a permanent URL.

---

## How the Fix Works

### Before (Direct Call - CORS Error):
```
Browser → Anthropic API ❌ (CORS blocked)
```

### After (Via Proxy - Works):
```
Browser → Vercel Function → Anthropic API ✓
```

The serverless function `/api/analyze.js` runs on the server (not in browser), so no CORS restrictions apply.

---

## Files Created for CORS Fix

- ✅ `/api/analyze.js` - Proxy for document analysis
- ✅ `/api/chat.js` - Proxy for chat messages
- ✅ Updated HTML will use these endpoints when deployed

---

## Testing After Deployment

1. Open your Vercel URL
2. Click Settings (⚙️) and add your API key
3. Upload the sample file: `sample-financial-statement.txt`
4. Should work perfectly!

---

## Costs

- **Vercel Hosting**: FREE (Hobby plan)
- **Anthropic API**: $0.02-$0.05 per analysis (you pay directly to Anthropic)

---

## Alternative: GitHub Pages Won't Work

GitHub Pages serves static files only and can't run serverless functions. You need:
- Vercel (recommended)
- Netlify (also works with serverless functions)
- Your own server with backend

---

## Need Help?

1. Check Vercel deployment logs
2. Open browser console (F12) for errors
3. Verify API key is correct at console.anthropic.com

---

## Quick Command Reference

```bash
# Deploy to Vercel
vercel

# Deploy to production
vercel --prod

# View logs
vercel logs

# Remove deployment
vercel remove
```

---

**Bottom Line**: The CORS error is expected when opening the HTML file directly. Deploy to Vercel (2 minutes) and it will work perfectly!
