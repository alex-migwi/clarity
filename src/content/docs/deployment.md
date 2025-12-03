---
title: "Production Deployment"
description: "Complete guide to deploying Clarity to production with authentication"
order: 40
draft: false
lastUpdated: 2025-12-03
contributors: ["Clarity Team"]
---

# Production Deployment Guide

This guide walks you through deploying Clarity to production with full authentication support.

## Prerequisites

Before deploying, ensure you have:

- A production domain or hosting platform account
- Google Cloud Console account (for Google OAuth)
- GitHub account (for GitHub OAuth)
- Node.js hosting for the backend (Heroku, Railway, DigitalOcean, etc.)
- Static hosting for the frontend (Vercel, Netlify, GitHub Pages, etc.)

## Step 1: Environment Setup

### Create Frontend Environment File

Create a `.env` file in the project root:

```bash
PUBLIC_SITE_URL=https://your-domain.com
PUBLIC_GITHUB_REPO=your-username/your-repo
```

### Create Backend Environment File

Create a `backend/.env` file:

```bash
SESSION_SECRET=your-random-secret-min-32-characters-long
GOOGLE_CLIENT_ID=your-google-oauth-client-id
GOOGLE_CLIENT_SECRET=your-google-oauth-client-secret
GITHUB_CLIENT_ID=your-github-oauth-client-id
GITHUB_CLIENT_SECRET=your-github-oauth-client-secret
NODE_ENV=production
PORT=3000
FRONTEND_URL=https://your-domain.com
```

**Important**: These files are gitignored. Never commit them to version control.

## Step 2: Set Up OAuth Applications

### Google OAuth Setup

1. Visit [Google Cloud Console](https://console.cloud.google.com)
2. Create a new project or select an existing one
3. Navigate to **APIs & Services** → **Credentials**
4. Click **Create Credentials** → **OAuth 2.0 Client ID**
5. Configure the OAuth consent screen if prompted
6. Set Application type to **Web application**
7. Add authorized redirect URI:
   ```
   https://your-backend-domain.com/auth/google/callback
   ```
8. Copy the **Client ID** and **Client Secret** to your `backend/.env`

### GitHub OAuth Setup

1. Go to [GitHub Settings](https://github.com/settings/developers)
2. Navigate to **Developer settings** → **OAuth Apps**
3. Click **New OAuth App**
4. Fill in the details:
   - **Application name**: Your app name
   - **Homepage URL**: `https://your-domain.com`
   - **Authorization callback URL**: `https://your-backend-domain.com/auth/github/callback`
5. Click **Register application**
6. Copy the **Client ID**
7. Generate a **Client Secret** and copy it
8. Add both to your `backend/.env`

## Step 3: Install Dependencies

### Frontend Dependencies

```bash
pnpm install
```

### Backend Dependencies

```bash
cd backend
npm install
cd ..
```

## Step 4: Build the Frontend

Run the build command to generate the production site:

```bash
pnpm build
```

This will:
- Generate the search index from your documentation
- Build all pages with optimizations
- Create static files in the `dist/` folder

You should see output like:

```
✅ Search index generated with 6 documents!
12:58:43 [build] 9 page(s) built in 5.26s
12:58:43 [build] Complete!
```

## Step 5: Test Locally

Before deploying, test everything locally.

### Test Frontend Only

```bash
pnpm preview
```

Visit `http://localhost:4321` to preview the production build.

### Test with Authentication

Open two terminal windows:

**Terminal 1 - Backend:**
```bash
pnpm backend:dev
```

**Terminal 2 - Frontend:**
```bash
pnpm dev
```

Test the login flow:
1. Visit `http://localhost:4321/login`
2. Click on Google or GitHub login
3. Complete OAuth flow
4. Verify redirect to `/dashboard`

## Step 6: Deploy Backend

The backend must be deployed before the frontend since the frontend needs the backend URL.

### Option A: Deploy to Railway

1. Install Railway CLI:
   ```bash
   npm install -g @railway/cli
   ```

2. Login and initialize:
   ```bash
   railway login
   railway init
   ```

3. Set environment variables:
   ```bash
   railway variables set SESSION_SECRET="your-secret"
   railway variables set GOOGLE_CLIENT_ID="your-id"
   railway variables set GOOGLE_CLIENT_SECRET="your-secret"
   railway variables set GITHUB_CLIENT_ID="your-id"
   railway variables set GITHUB_CLIENT_SECRET="your-secret"
   railway variables set NODE_ENV="production"
   railway variables set FRONTEND_URL="https://your-domain.com"
   ```

4. Deploy:
   ```bash
   cd backend
   railway up
   ```

### Option B: Deploy to Heroku

1. Install Heroku CLI and login:
   ```bash
   heroku login
   ```

2. Create app and deploy:
   ```bash
   cd backend
   heroku create your-app-name
   git init
   git add .
   git commit -m "Initial backend"
   heroku git:remote -a your-app-name
   git push heroku main
   ```

3. Set environment variables:
   ```bash
   heroku config:set SESSION_SECRET="your-secret"
   heroku config:set GOOGLE_CLIENT_ID="your-id"
   heroku config:set GOOGLE_CLIENT_SECRET="your-secret"
   heroku config:set GITHUB_CLIENT_ID="your-id"
   heroku config:set GITHUB_CLIENT_SECRET="your-secret"
   heroku config:set NODE_ENV="production"
   heroku config:set FRONTEND_URL="https://your-domain.com"
   ```

### Option C: Deploy to DigitalOcean App Platform

1. Push your code to a Git repository
2. Go to [DigitalOcean App Platform](https://cloud.digitalocean.com/apps)
3. Click **Create App**
4. Connect your repository
5. Set the **Root Directory** to `backend`
6. Add environment variables in the settings
7. Deploy

## Step 7: Deploy Frontend

### Option A: Deploy to Vercel

1. Install Vercel CLI:
   ```bash
   npm install -g vercel
   ```

2. Deploy:
   ```bash
   vercel deploy --prod
   ```

3. Set environment variables in Vercel dashboard:
   - Go to your project settings
   - Add `PUBLIC_SITE_URL` and `PUBLIC_GITHUB_REPO`

### Option B: Deploy to Netlify

1. Install Netlify CLI:
   ```bash
   npm install -g netlify-cli
   ```

2. Deploy:
   ```bash
   netlify deploy --prod --dir=dist
   ```

3. Set environment variables:
   ```bash
   netlify env:set PUBLIC_SITE_URL "https://your-domain.com"
   netlify env:set PUBLIC_GITHUB_REPO "your-username/your-repo"
   ```

### Option C: Deploy to GitHub Pages

1. Update `astro.config.mjs`:
   ```javascript
   export default defineConfig({
     site: 'https://username.github.io',
     base: '/repo-name',
     // ... rest of config
   });
   ```

2. Build and deploy:
   ```bash
   pnpm build
   # Push dist/ folder to gh-pages branch
   ```

## Step 8: Update OAuth Redirect URIs

After deploying, update your OAuth applications with production URLs:

### Google OAuth
1. Go to Google Cloud Console → Credentials
2. Edit your OAuth 2.0 Client ID
3. Update redirect URI to: `https://your-backend-domain.com/auth/google/callback`

### GitHub OAuth
1. Go to GitHub OAuth Apps settings
2. Edit your application
3. Update callback URL to: `https://your-backend-domain.com/auth/github/callback`

## Step 9: Verify Deployment

Test all functionality in production:

- [ ] Visit your production domain
- [ ] Search works (press `⌘K` or `Ctrl+K`)
- [ ] Navigation and links work
- [ ] Dark/light theme toggle works
- [ ] Click "Login" and test Google OAuth
- [ ] Test GitHub OAuth
- [ ] Verify redirect to dashboard after login
- [ ] Check that "Edit on GitHub" links work (if enabled)
- [ ] Visit `/sitemap.xml` to verify sitemap generation
- [ ] Test on mobile devices

## Troubleshooting

### Authentication Fails

**Problem**: OAuth redirect doesn't work

**Solutions**:
- Verify redirect URIs exactly match in OAuth app settings
- Check that `FRONTEND_URL` in backend matches your actual domain
- Ensure backend is accessible at the configured URL
- Check browser console for CORS errors

### Search Not Working

**Problem**: Search doesn't return results

**Solutions**:
- Verify `search-index.json` exists in deployed site
- Check that the build process completed successfully
- Clear browser cache and try again
- Check browser console for JavaScript errors

### Build Fails

**Problem**: `pnpm build` command fails

**Solutions**:
- Check that all dependencies are installed: `pnpm install`
- Verify Node.js version (v18+ recommended)
- Check for syntax errors in markdown files
- Review build output for specific error messages

### Backend Not Starting

**Problem**: Backend server won't start

**Solutions**:
- Verify all environment variables are set in `backend/.env`
- Check that port 3000 (or configured port) is available
- Ensure all dependencies are installed: `cd backend && npm install`
- Check logs for specific error messages

## Environment Variables Reference

### Frontend Variables

| Variable | Required | Description | Example |
|----------|----------|-------------|---------|
| `PUBLIC_SITE_URL` | Yes | Production domain | `https://docs.example.com` |
| `PUBLIC_GITHUB_REPO` | No | GitHub repository | `username/repo` |

### Backend Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `SESSION_SECRET` | Yes | Random string (min 32 chars) |
| `GOOGLE_CLIENT_ID` | Yes | Google OAuth client ID |
| `GOOGLE_CLIENT_SECRET` | Yes | Google OAuth secret |
| `GITHUB_CLIENT_ID` | Yes | GitHub OAuth client ID |
| `GITHUB_CLIENT_SECRET` | Yes | GitHub OAuth secret |
| `NODE_ENV` | Yes | Set to `production` |
| `PORT` | No | Backend port (default: 3000) |
| `FRONTEND_URL` | Yes | Frontend URL for redirects |

## Deployment Checklist

Use this checklist to ensure everything is ready:

**Pre-Deployment**
- [ ] Created `.env` file with frontend variables
- [ ] Created `backend/.env` file with backend variables
- [ ] Set up Google OAuth application
- [ ] Set up GitHub OAuth application
- [ ] Installed all dependencies
- [ ] Tested build locally: `pnpm build`
- [ ] Tested authentication locally

**Deployment**
- [ ] Deployed backend to hosting platform
- [ ] Set all backend environment variables
- [ ] Updated OAuth redirect URIs with production URLs
- [ ] Built frontend: `pnpm build`
- [ ] Deployed frontend to hosting platform
- [ ] Set frontend environment variables

**Post-Deployment**
- [ ] Tested production URL loads
- [ ] Tested search functionality
- [ ] Tested Google login flow
- [ ] Tested GitHub login flow
- [ ] Verified dashboard access after login
- [ ] Checked responsive design on mobile
- [ ] Verified sitemap generation
- [ ] Set up custom domain (if needed)

## Next Steps

After successful deployment:

1. **Monitor Performance** - Set up monitoring tools like Google Analytics or Plausible
2. **Add Content** - Update documentation in `src/content/docs/`
3. **Custom Branding** - Replace logo and update colors
4. **SEO Optimization** - Update meta descriptions and add structured data
5. **Security** - Add rate limiting and review CORS settings
6. **CDN Setup** - Configure CDN for better global performance
7. **Backups** - Set up automated backups for your content

## Resources

- [Astro Documentation](https://docs.astro.build)
- [Google OAuth Documentation](https://developers.google.com/identity/protocols/oauth2)
- [GitHub OAuth Documentation](https://docs.github.com/en/developers/apps/building-oauth-apps)
- [Vercel Deployment Guide](https://vercel.com/docs)
- [Netlify Deployment Guide](https://docs.netlify.com)

---

**Need help?** Check the [Configuration Guide](/docs/configuration) or open an issue on GitHub.
