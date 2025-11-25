# Deployment Guide

This guide covers deploying the Mortgage Calculator to Azure Static Web Apps and other platforms.

## Table of Contents

1. [Local Development](#local-development)
2. [Building for Production](#building-for-production)
3. [Azure Static Web Apps](#azure-static-web-apps)
4. [Alternative Platforms](#alternative-platforms)
5. [Performance Optimization](#performance-optimization)
6. [Monitoring and Troubleshooting](#monitoring-and-troubleshooting)

## Local Development

### Prerequisites

- Node.js 16.x or higher
- npm 7.x or higher

### Setup

```bash
# Clone repository
git clone https://github.com/your-org/my-mortgage-calculator.git
cd my-mortgage-calculator

# Install dependencies
npm install

# Start development server
npm run dev
```

The app opens at `http://localhost:5173`

### Development Tips

- Changes auto-reload (Hot Module Replacement)
- Browser DevTools work as expected
- Open browser console to run test suite

```javascript
// In browser console
import { runTests } from './src/utils/tests.js'
runTests()  // See test results
```

## Building for Production

### Local Production Build

```bash
# Create optimized production build
npm run build

# Output folder: dist/
# Size: ~50KB gzipped (including React)

# View build stats
ls -lh dist/
```

### Preview Production Build

```bash
# Start local server with production build
npm run preview

# Opens at http://localhost:4173
```

### Build Optimization

Current optimizations:
- ✅ Code splitting by route
- ✅ CSS minification
- ✅ JavaScript minification
- ✅ Tree shaking (unused code removed)
- ✅ Source maps for debugging

No additional configuration needed for Vite.

## Azure Static Web Apps

### Prerequisites

- Azure account (free tier available)
- GitHub repository
- Azure CLI (optional)

### Step 1: Create Azure Static Web App

#### Method A: Azure Portal

1. Go to [Azure Portal](https://portal.azure.com)
2. Search "Static Web Apps"
3. Click "Create"
4. Fill in details:
   - **Resource group**: Create new or select existing
   - **Name**: `my-mortgage-calculator`
   - **Region**: Select closest to users
   - **Source**: GitHub
5. Click "Sign in with GitHub"
6. Select repository and branch
7. Configure build:
   - **Build presets**: Vite
   - **App location**: `/`
   - **Build output location**: `dist`
8. Click "Review + Create"
9. Click "Create"

#### Method B: Azure CLI

```bash
# Install Azure CLI
brew install azure-cli  # macOS
# or download from https://aka.ms/azurecli

# Login
az login

# Create resource group
az group create --name mygroup --location eastus

# Create static web app
az staticwebapp create \
  --name my-mortgage-calculator \
  --resource-group mygroup \
  --source https://github.com/your-org/repo \
  --branch main \
  --login-with-github
```

### Step 2: Configure GitHub Secrets

GitHub Actions workflow needs Azure credentials:

1. Go to repository Settings
2. Navigate to Secrets and variables → Actions
3. Create `AZURE_STATIC_WEB_APPS_API_TOKEN`
   - Value provided by Azure after creation
   - Check Azure portal under "Manage deployment token"

### Step 3: Deploy

```bash
# Push to main branch triggers deployment
git add .
git commit -m "deploy: initial deployment to Azure"
git push origin main

# Check deployment status:
# 1. Go to GitHub Actions tab
# 2. Monitor "Build and Deploy to Azure" workflow
# 3. Check Azure portal for app status
```

### Step 4: Access Your App

After successful deployment:

```
https://your-app-name.azurestaticapps.net
```

URL format: `https://{staticwebappname}.azurestaticapps.net`

### Configure Custom Domain

1. In Azure portal, find Static Web App
2. Go to "Custom domains"
3. Click "Add"
4. Enter domain (e.g., `calculator.yourdomain.com`)
5. Add DNS record (CNAME)
6. Azure validates and enables HTTPS

### Environment Variables

For production environment variables:

```bash
# In Azure portal
# Static Web App → Configuration → Application settings

# Add variables:
VITE_API_URL=https://api.example.com
VITE_ENVIRONMENT=production
```

Access in code:
```javascript
const apiUrl = import.meta.env.VITE_API_URL
```

## Alternative Platforms

### Vercel

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel

# Production
vercel --prod
```

**vercel.json** config:
```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist"
}
```

### Netlify

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Deploy
netlify deploy --prod --dir=dist

# Or connect GitHub repository via netlify.com
```

**netlify.toml** config:
```toml
[build]
  command = "npm run build"
  publish = "dist"

[build.environment]
  NODE_VERSION = "18"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

### GitHub Pages

```bash
# Update vite.config.js
export default {
  base: '/my-mortgage-calculator/',
}

# Build
npm run build

# Deploy to gh-pages branch
npm install -g gh-pages
npx gh-pages -d dist

# Enable in GitHub Settings → Pages
```

## Performance Optimization

### Asset Optimization

```bash
# Current metrics
npm run build

# View output:
# vite v5.0.0 building for production...
# ✓ 1234 modules transformed.
# dist/index.html                0.45 kB
# dist/assets/index-abc123.js    45.20 kB
# dist/assets/index-def456.css   12.30 kB
```

### Caching Strategy

In `staticwebapp.config.json`:

```json
{
  "routes": [
    {
      "route": "/assets/*",
      "headers": {
        "cache-control": "public, max-age=31536000, immutable"
      }
    },
    {
      "route": "/*.css",
      "headers": {
        "cache-control": "public, max-age=31536000"
      }
    },
    {
      "route": "/*.js",
      "headers": {
        "cache-control": "public, max-age=31536000"
      }
    },
    {
      "route": "/index.html",
      "headers": {
        "cache-control": "public, max-age=86400"
      }
    }
  ]
}
```

### Core Web Vitals

Monitor performance:

```bash
# Run Lighthouse audit
# In Chrome DevTools: Lighthouse → Generate report

# Expected scores:
# Performance: > 90
# Accessibility: > 95
# Best Practices: > 90
# SEO: > 90
```

### CDN Configuration

Enable Azure CDN:

1. In Azure portal, Static Web App settings
2. "Manage" section
3. Enable Azure CDN
4. Configure cache settings

Provides:
- ✅ Global edge caching
- ✅ Automatic compression
- ✅ HTTPS everywhere
- ✅ ~60% faster load times

## Monitoring and Troubleshooting

### Application Insights

Add monitoring (optional):

```bash
# Azure portal → Static Web App
# → Application Insights → Create new

# Install SDK
npm install @microsoft/applicationinsights-web
```

Track performance:
```javascript
import { ApplicationInsights } from '@microsoft/applicationinsights-web'

const appInsights = new ApplicationInsights({
  config: {
    connectionString: 'YOUR_CONNECTION_STRING',
  },
})
appInsights.loadAppInsights()
```

### Health Checks

Check deployment status:

```bash
# Azure CLI
az staticwebapp show --name my-mortgage-calculator

# Check build logs
az staticwebapp show --name my-mortgage-calculator \
  --query 'properties.deploymentStatus'
```

### Common Issues

#### Issue: 404 Not Found

**Cause**: SPA routing not configured

**Solution**: Verify `staticwebapp.config.json`:
```json
{
  "navigationFallback": {
    "rewrite": "/index.html"
  }
}
```

#### Issue: Slow Build

**Cause**: Large dependencies or network issues

**Solution**:
```bash
# Clear cache and rebuild
rm -rf node_modules dist
npm ci
npm run build
```

#### Issue: Build Fails in Azure

**Check logs**:
1. Azure portal → Static Web App
2. "Build history" → Select failed build
3. View build log details

Common causes:
- Node.js version mismatch
- Missing environment variables
- Dependency conflicts

**Fix**:
```bash
# Update GitHub Actions workflow
# Specify Node version explicitly
```

#### Issue: High Load Time

**Solutions**:
1. Enable Azure CDN
2. Check Application Insights metrics
3. Optimize images and assets
4. Review Core Web Vitals

```bash
npm run build
# Check dist/ folder size
du -sh dist/
```

### Monitoring Dashboard

Create Azure dashboard:

1. Go to Azure portal
2. Create Dashboard
3. Add tiles for:
   - Static Web App availability
   - Application Insights metrics
   - CDN performance
   - Build history

## Rollback

If deployment has issues:

### Rollback to Previous Version

```bash
# Option 1: Revert Git commit
git revert <commit-hash>
git push origin main

# Option 2: Redeploy from stable version
git checkout <stable-tag>
git push origin main --force  # Use with caution!
```

### Azure Portal Rollback

1. Go to Static Web App
2. "Deployments" tab
3. Select previous successful deployment
4. Click "Reactivate"

## Performance Checklist

Before deploying to production:

- [ ] `npm run build` runs successfully
- [ ] No console errors or warnings
- [ ] Bundle size < 100KB gzipped
- [ ] All tests pass: `npm test`
- [ ] Lighthouse score > 90
- [ ] Accessibility audit passes
- [ ] Mobile responsive verified
- [ ] Cross-browser tested (Chrome, Firefox, Safari)
- [ ] Git history is clean
- [ ] Environment variables configured
- [ ] Custom domain verified (if applicable)

## Maintenance

### Regular Updates

```bash
# Check for updates
npm outdated

# Update packages safely
npm update

# Update major versions
npm install package@latest
```

### Security

```bash
# Check for vulnerabilities
npm audit

# Fix vulnerabilities
npm audit fix

# View detailed report
npm audit --audit-level=moderate
```

---

For more help, see:
- [README.md](README.md) - Project overview
- [GIT_WORKFLOW.md](GIT_WORKFLOW.md) - Git guidelines
- [CONTRIBUTING.md](CONTRIBUTING.md) - Contribution guide
- [Azure Documentation](https://docs.microsoft.com/azure)
