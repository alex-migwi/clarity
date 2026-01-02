---
title: "Deploy to Netlify"
description: "Deploy Clarity documentation to Netlify for instant deployments and branch previews"
order: 53
---

# Deploy to Netlify

Deploy your Clarity documentation to Netlify for fast deployments, branch previews, and excellent JAMstack support.

## Why Netlify?

- ⚡ **Instant deployments** (30-90 seconds)
- 🔀 **Branch previews** for every branch
- 🆓 **Generous free tier**
- 🔧 **Built-in forms** and serverless functions
- 🌍 **Global CDN**

## Prerequisites

- Netlify account ([sign up free](https://app.netlify.com/signup))
- Your Clarity repository on GitHub/GitLab/Bitbucket
- Git repository with committed changes

## Step 1: Prepare Your Project

### Configure Environment Variables

Edit `.env` in your project root:

```env
# Site Configuration
PUBLIC_SITE_NAME=My Documentation
PUBLIC_SITE_DESCRIPTION=Documentation for my project
PUBLIC_SITE_URL=https://my-docs.netlify.app
PUBLIC_BASE_PATH=/

# GitHub Integration (optional)
CLARITY_GITHUB_REPO=yourusername/repo-name
CLARITY_GITHUB_BRANCH=main
CLARITY_DOCS_PATH=src/content/docs
```

### Test Build Locally

```bash
pnpm build
pnpm preview
```

## Step 2: Create netlify.toml

Create `netlify.toml` in your project root:

```toml
[build]
  command = "pnpm build"
  publish = "dist"

[build.environment]
  NODE_VERSION = "20"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

Commit this file:

```bash
git add netlify.toml
git commit -m "Add Netlify configuration"
git push
```

## Step 3: Connect to Netlify

### Option A: Using Netlify Dashboard (Recommended)

1. Go to [app.netlify.com](https://app.netlify.com)
2. Click **Add new site → Import an existing project**
3. Choose your Git provider (GitHub/GitLab/Bitbucket)
4. Select your Clarity repository
5. Configure build settings (see below)
6. Click **Deploy site**

### Option B: Using Netlify CLI

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Login
netlify login

# Initialize and deploy
cd my-docs
netlify init

# Follow prompts to connect repository
```

## Step 4: Configure Build Settings

Netlify should auto-detect settings, but verify:

```
Build command: pnpm build
Publish directory: dist
Functions directory: (leave empty)
```

## Step 5: Add Environment Variables

In your Netlify site settings:

1. Go to **Site settings → Environment variables**
2. Click **Add a variable**
3. Add these variables:

| Key | Value |
|-----|-------|
| `CLARITY_GITHUB_REPO` | `username/repo` |
| `CLARITY_GITHUB_BRANCH` | `main` |
| `CLARITY_DOCS_PATH` | `src/content/docs` |

Click **Save**.

## Step 6: Deploy

Your first deploy starts automatically. Once complete:

Your site is available at: `https://random-name-123.netlify.app`

### Customize Site Name

1. Go to **Site settings → General → Site details**
2. Click **Change site name**
3. Enter: `my-docs` (becomes `my-docs.netlify.app`)

## Automatic Deployments

Netlify automatically deploys:

### Production Deployments
- Every push to your main branch
- Deploys to your production URL

### Branch Previews
- Every branch gets its own preview URL
- Perfect for testing features

```bash
# Create feature branch
git checkout -b new-feature

# Make changes and push
git add .
git commit -m "Add new feature"
git push origin new-feature

# Netlify creates preview URL automatically!
```

## Custom Domain Setup

### Add Domain

1. Go to **Domain settings → Add custom domain**
2. Enter your domain: `docs.yourdomain.com`
3. Click **Verify**

### Configure DNS

**Option A: Use Netlify DNS (Recommended)**

1. Transfer nameservers to Netlify
2. Netlify handles all DNS records automatically

**Option B: External DNS**

Add CNAME record at your DNS provider:

```
Type: CNAME
Name: docs
Value: your-site.netlify.app
```

For apex domain:

```
Type: A
Name: @
Value: 75.2.60.5

Type: CNAME  
Name: www
Value: your-site.netlify.app
```

### Enable HTTPS

1. Go to **Domain settings → HTTPS**
2. Click **Verify DNS configuration**
3. Click **Provision certificate**
4. Wait for SSL to activate (can take up to 24 hours)

### Update Configuration

```env
PUBLIC_SITE_URL=https://docs.yourdomain.com
```

Redeploy for changes to take effect.

## Deploy Contexts

Netlify supports different contexts:

### Production

```toml
[context.production.environment]
  PUBLIC_SITE_URL = "https://docs.yourdomain.com"
```

### Branch Deploys

```toml
[context.branch-deploy.environment]
  PUBLIC_SITE_URL = "https://preview.netlify.app"
```

### Deploy Previews

```toml
[context.deploy-preview.environment]
  PUBLIC_SITE_URL = "https://deploy-preview.netlify.app"
```

## Advanced Configuration

### Redirect Rules

Add to `netlify.toml`:

```toml
[[redirects]]
  from = "/old-path"
  to = "/new-path"
  status = 301

[[redirects]]
  from = "/docs/*"
  to = "/documentation/:splat"
  status = 302
```

### Headers

```toml
[[headers]]
  for = "/*"
  [headers.values]
    X-Frame-Options = "SAMEORIGIN"
    X-XSS-Protection = "1; mode=block"
    X-Content-Type-Options = "nosniff"
```

### Build Plugins

Add plugins for optimization:

```toml
[[plugins]]
  package = "@netlify/plugin-lighthouse"
```

### Post-Processing

```toml
[build.processing]
  skip_processing = false

[build.processing.css]
  bundle = true
  minify = true

[build.processing.js]
  bundle = true
  minify = true

[build.processing.html]
  pretty_urls = true
```

## Branch Previews

Enable branch previews for all branches:

1. Go to **Site settings → Build & deploy → Branches**
2. Set branch deploys to **All**
3. Every push to any branch creates a preview

**Access previews:**
- `https://branch-name--site-name.netlify.app`

## Deploy Previews for Pull Requests

When someone opens a PR:

1. Netlify builds and deploys a preview
2. Status check added to PR with preview link
3. Preview updates with each push
4. Merge → automatic production deployment

## Monitoring & Analytics

### Netlify Analytics (Paid)

Enable server-side analytics:

1. Go to **Analytics** tab
2. Click **Enable analytics** ($9/month)
3. View pageviews, bandwidth, and more

**Benefits:**
- No client-side scripts
- 100% accurate (server-side)
- No impact on performance

## Troubleshooting

### Build Fails

**Check deploy logs:**
1. Go to **Deploys** tab
2. Click failed deploy
3. View deploy log

**Common issues:**
- Missing `package.json` scripts
- Wrong Node version → Set in `netlify.toml`
- Environment variables missing

### Assets Not Loading

**Cause:** Base path or redirect issues

**Solution:** Ensure `netlify.toml` includes:

```toml
[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

### Slow Builds

**Optimize:**
- Enable build cache
- Use `pnpm` instead of `npm`
- Reduce dependencies

**Check build time:**
```toml
[build]
  command = "pnpm build"
  publish = "dist"

[build.environment]
  NODE_VERSION = "20"
  NPM_FLAGS = "--prefer-offline"
```

### Custom Domain Not Working

**Solutions:**
1. Wait 24-48 hours for DNS propagation
2. Verify DNS records with `dig` or `nslookup`
3. Clear browser cache
4. Check Netlify DNS checker

## Best Practices

### 1. Use Branch Deploys
Test features in isolated environments before merging.

### 2. Deploy Previews
Enable for all PRs to review changes safely.

### 3. Environment Variables
Store secrets in Netlify, never in code.

### 4. Optimize Builds
Use caching and minimize dependencies.

### 5. Monitor Performance
Use Netlify Analytics or Google Analytics.

## Pricing

**Free Tier Includes:**
- 100 GB bandwidth/month
- 300 build minutes/month
- Unlimited sites
- Custom domains
- Automatic SSL
- Deploy previews

**Pro Tier ($19/month):**
- 400 GB bandwidth
- 25,000 build minutes
- Team collaboration
- Analytics
- Priority support

[View pricing details →](https://www.netlify.com/pricing/)

## Next Steps

- [Configure Clarity](../reference/configuration) for your team
- [Write documentation](../guides/writing-documentation) content
- Set up [authentication](../getting-started/authentication) (optional)
- Explore [components](../reference/components) for rich content

## Resources

- [Netlify Documentation](https://docs.netlify.com/)
- [Astro on Netlify](https://docs.astro.build/en/guides/deploy/netlify/)
- [Netlify CLI Docs](https://cli.netlify.com/)
- [Build Configuration](https://docs.netlify.com/configure-builds/file-based-configuration/)
