# Deployment Guide

This guide will help you deploy TenKly to various hosting platforms.

---

## Option 1: Vercel (Recommended)

Vercel offers free hosting with automatic HTTPS and global CDN.

### Deploy with Vercel

1. **Install Vercel CLI** (optional)
   ```bash
   npm install -g vercel
   ```

2. **Deploy from command line**
   ```bash
   cd financialanalyzer
   vercel
   ```

3. **Or use Vercel Dashboard**
   - Visit [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your Git repository
   - Click "Deploy"

### Custom Domain (Optional)

1. Go to your project settings in Vercel
2. Navigate to "Domains"
3. Add your custom domain
4. Update your DNS records as instructed

---

## Option 2: Netlify

Netlify provides free hosting with form handling and serverless functions.

### Deploy with Netlify

1. **Using Netlify CLI**
   ```bash
   npm install -g netlify-cli
   cd financialanalyzer
   netlify deploy
   ```

2. **Using Netlify Dashboard**
   - Visit [netlify.com](https://netlify.com)
   - Click "Add new site"
   - Import from Git
   - Deploy

### Build Settings

- **Build command**: Leave empty (static site)
- **Publish directory**: `.` (root)

---

## Option 3: GitHub Pages

Free hosting directly from your GitHub repository.

### Setup GitHub Pages

1. **Enable GitHub Pages**
   - Go to repository Settings
   - Navigate to "Pages"
   - Select branch (usually `main`)
   - Save

2. **Access your site**
   - URL: `https://yourusername.github.io/financialanalyzer`

### Custom Domain

1. Add a `CNAME` file with your domain
2. Configure DNS at your domain provider
3. Enable HTTPS in GitHub Pages settings

---

## Option 4: Self-Hosted

Host on your own server or VPS.

### Requirements

- Web server (Apache, Nginx, etc.)
- HTTPS certificate (Let's Encrypt recommended)

### Setup with Nginx

1. **Copy files to web server**
   ```bash
   scp -r financialanalyzer/* user@server:/var/www/html/tenkly/
   ```

2. **Configure Nginx**
   ```nginx
   server {
       listen 80;
       server_name yourdomain.com;

       root /var/www/html/tenkly;
       index index.html;

       location / {
           try_files $uri $uri/ /index.html;
       }
   }
   ```

3. **Enable HTTPS with Let's Encrypt**
   ```bash
   sudo certbot --nginx -d yourdomain.com
   ```

---

## Post-Deployment Checklist

After deploying, verify:

- ✅ Landing page (index.html) loads correctly
- ✅ Financial analyzer app loads at /financial-analyzer.html
- ✅ Settings modal opens and API key can be saved
- ✅ File upload works (test with sample file)
- ✅ All JavaScript libraries load from CDN
- ✅ HTTPS is enabled
- ✅ No console errors in browser dev tools

---

## Environment Variables

TenKly doesn't require server-side environment variables since users provide their own API keys through the UI.

However, if you want to provide a demo with a pre-configured API key:

1. **NOT RECOMMENDED**: Hardcoding API keys is insecure
2. **Better approach**: Use a backend proxy for API calls
3. **Best approach**: Let users provide their own keys (current implementation)

---

## Security Best Practices

### For Public Deployment

1. **Enable HTTPS** - Always use HTTPS in production
2. **Security Headers** - Use the headers in vercel.json:
   - X-Content-Type-Options: nosniff
   - X-Frame-Options: DENY
   - X-XSS-Protection: 1; mode=block

3. **Content Security Policy (Optional)**
   ```json
   {
     "key": "Content-Security-Policy",
     "value": "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://cdnjs.cloudflare.com https://cdn.tailwindcss.com; style-src 'self' 'unsafe-inline' https://cdn.tailwindcss.com; connect-src 'self' https://api.anthropic.com"
   }
   ```

### User Privacy

- ✅ API keys stored in localStorage (client-side only)
- ✅ Files processed in browser (not uploaded to your server)
- ✅ Only extracted text sent to Anthropic API
- ✅ No analytics or tracking by default

---

## Custom Branding

To customize the app for your brand:

1. **Update Landing Page**
   - Edit `index.html`
   - Change "TenKly" to your brand name
   - Update colors in the style section

2. **Update App Title**
   - Edit `financial-analyzer.html`
   - Change title and header text

3. **Add Logo**
   - Replace the gradient text with an image
   - Add your logo file to the repository

4. **Update Footer**
   - Modify copyright text
   - Add your company information

---

## Monitoring & Analytics

### Add Analytics (Optional)

To track usage, add analytics code to both HTML files:

**Google Analytics**
```html
<script async src="https://www.googletagmanager.com/gtag/js?id=YOUR_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'YOUR_ID');
</script>
```

**Plausible Analytics** (Privacy-friendly)
```html
<script defer data-domain="yourdomain.com" src="https://plausible.io/js/script.js"></script>
```

---

## Troubleshooting Deployment

### Issue: Files not loading

**Solution**: Check that all files are uploaded and paths are correct

### Issue: JavaScript errors

**Solution**: Verify CDN links are accessible and not blocked

### Issue: API calls failing

**Solution**: Ensure CORS headers allow requests to api.anthropic.com

### Issue: Mixed content errors

**Solution**: Use HTTPS for all resources, or use protocol-relative URLs

---

## Scaling Considerations

TenKly is a static frontend app, so scaling is handled by your hosting provider.

### For High Traffic

1. **Use a CDN** (Vercel, Netlify, Cloudflare)
2. **Enable caching** for static assets
3. **Monitor API usage** to prevent rate limits

### Backend Integration (Optional)

For enterprise use, consider:
- API key management server
- Usage tracking and billing
- Team collaboration features
- Document storage

---

## Cost Estimate

### Hosting Costs

- **Vercel Free**: $0/month (includes HTTPS, CDN)
- **Netlify Free**: $0/month (100GB bandwidth)
- **GitHub Pages**: $0/month (unlimited for public repos)

### API Costs

- Users provide their own Anthropic API keys
- Typical cost: $0.02-0.05 per document analysis
- Users responsible for their own API usage

---

## Support & Maintenance

### Keep Dependencies Updated

CDN libraries are automatically updated. To use specific versions:

```html
<!-- Instead of /latest/, use specific versions -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/react/18.2.0/..."></script>
```

### Monitor for Issues

1. Check error logs in hosting provider dashboard
2. Monitor user feedback
3. Test regularly with different file types
4. Keep an eye on Anthropic API changes

---

## Next Steps

After deployment:

1. **Share the URL** with your users
2. **Create documentation** specific to your deployment
3. **Set up monitoring** to track uptime
4. **Gather feedback** and iterate

---

**Your app is now live!** 🚀

For questions or issues, check the main README.md or create an issue in the repository.
