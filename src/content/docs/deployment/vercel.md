---
title: "Deploy to Vercel"
description: "Deploy Clarity documentation to Vercel for instant deployments and preview URLs"
order: 52
---

# Deploy to Vercel

Deploy your Clarity documentation to Vercel for lightning-fast builds, instant previews, and a great developer experience.

## Why Vercel?

- ⚡ **Lightning fast** deployments (20-60 seconds)
- 🔍 **Preview URLs** for every pull request
- 🌍 **Edge network** for global performance
- 📊 **Built-in analytics** (paid)
- 🆓 **Free tier** for personal projects

## Prerequisites

- Vercel account ([sign up free](https://vercel.com/signup))
- Your Clarity repository on GitHub/GitLab/Bitbucket
- Git repository with committed changes

## Step 1: Prepare Your Project

### Configure Environment Variables Locally

Edit `.env` in your project root:

```env
# Site Configuration
PUBLIC_SITE_NAME=My Documentation
PUBLIC_SITE_DESCRIPTION=Documentation for my project
PUBLIC_SITE_URL=https://my-docs.vercel.app
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

Visit `http://localhost:4321` to verify everything works.

## Step 2: Connect to Vercel

### Option A: Using Vercel Dashboard (Recommended)

1. Go to [vercel.com/new](https://vercel.com/new)
2. Click **Import Project**
3. Select your Git provider (GitHub/GitLab/Bitbucket)
4. Choose your Clarity repository
5. Click **Import**

### Option B: Using Vercel CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Login
vercel login

# Deploy from your project directory
cd my-docs
vercel
```

## Step 3: Configure Build Settings

Vercel auto-detects Astro projects, but verify these settings:

### Build & Development Settings

```
Framework Preset: Astro
Build Command: pnpm build
Output Directory: dist
Install Command: pnpm install
```

### Root Directory

Leave as `.` (root) unless your Clarity is in a subdirectory.

## Step 4: Add Environment Variables

In your Vercel project settings:

1. Go to **Settings → Environment Variables**
2. Add these variables:

| Name | Value | Environment |
|------|-------|-------------|
| `CLARITY_GITHUB_REPO` | `username/repo` | All |
| `CLARITY_GITHUB_BRANCH` | `main` | All |
| `CLARITY_DOCS_PATH` | `src/content/docs` | All |

**Tip:** Select "Production, Preview, and Development" for each variable.

## Step 5: Deploy

Click **Deploy** and wait for the build to complete (usually under 1 minute).

Your site will be available at:
- `https://your-project.vercel.app`

## Step 6: Configure Custom Domain (Optional)

### Add Domain

1. Go to **Settings → Domains**
2. Click **Add**
3. Enter your domain: `docs.yourdomain.com`
4. Click **Add**

### Configure DNS

Vercel provides DNS instructions. Typically:

```
Type: CNAME
Name: docs
Value: cname.vercel-dns.com
```

Or for apex domain:

```
Type: A
Name: @
Value: 76.76.21.21
```

### Update Environment Variables

```env
PUBLIC_SITE_URL=https://docs.yourdomain.com
```

Redeploy for changes to take effect.

## Automatic Deployments

Vercel automatically deploys:

### Production Deployments
- Every push to your main/master branch
- Deploys to your production URL

### Preview Deployments
- Every pull request gets a unique preview URL
- Perfect for reviewing changes before merging

```bash
# Make changes
git add .
git commit -m "Update docs"
git push origin main

# Vercel automatically deploys!
```

## Preview URLs for Pull Requests

When someone opens a PR:

1. Vercel automatically builds and deploys a preview
2. A unique URL is commented on the PR
3. Team reviews changes at preview URL
4. Merge when ready → automatic production deployment

## Advanced Configuration

### Custom Build Configuration

Create `vercel.json` in your project root:

```json
{
  "buildCommand": "pnpm build",
  "devCommand": "pnpm dev",
  "installCommand": "pnpm install",
  "framework": "astro",
  "outputDirectory": "dist"
}
```

### Environment-Specific Variables

Use different values per environment:

```env
# Production only
PUBLIC_SITE_URL=https://docs.production.com

# Preview only
PUBLIC_SITE_URL=https://docs-preview.vercel.app
```

### Redirect Rules

Add redirects in `vercel.json`:

```json
{
  "redirects": [
    {
      "source": "/old-doc",
      "destination": "/new-doc",
      "permanent": true
    }
  ]
}
```

### Headers

Add custom headers:

```json
{
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "X-Frame-Options",
          "value": "SAMEORIGIN"
        }
      ]
    }
  ]
}
```

## Monitoring & Analytics

### Vercel Analytics (Paid)

Enable in project settings:
1. Go to **Analytics** tab
2. Click **Enable Analytics**
3. View real-time metrics

### Speed Insights

Enable in project settings:
1. Go to **Speed Insights** tab
2. Click **Enable**
3. Monitor Core Web Vitals

## Troubleshooting

### Build Fails

**Check build logs:**
1. Go to Deployments tab
2. Click failed deployment
3. View build logs

**Common issues:**
- Missing dependencies → Check `package.json`
- Environment variables → Verify they're set
- Syntax errors → Test locally first

### 404 on Assets

**Cause:** Base path configuration

**Solution:** For Vercel, use root path:
```env
PUBLIC_BASE_PATH=/
```

### Slow Builds

**Tips:**
- Use `pnpm` instead of `npm` (faster)
- Enable caching (automatic on Vercel)
- Optimize dependencies

### Preview Not Updating

**Solution:**
- Ensure PR is from same repository (not fork)
- Check Vercel integration permissions
- Rebuild deployment manually

## Best Practices

### 1. Use Preview Deployments
Review all changes in preview before merging to production.

### 2. Environment Variables
Never commit secrets. Use Vercel's environment variables.

### 3. Custom Domains
Use subdomains (`docs.domain.com`) instead of paths for cleaner URLs.

### 4. Monitoring
Enable analytics to track performance and usage.

### 5. Branch Protection
Require preview deployment success before merging PRs.

## Pricing

**Free Tier Includes:**
- Unlimited deployments
- 100 GB bandwidth/month
- Preview deployments
- Custom domains
- Automatic SSL

**Pro Tier ($20/month):**
- Team collaboration
- More bandwidth
- Analytics & Speed Insights
- Advanced features

[View pricing details →](https://vercel.com/pricing)

## Next Steps

- [Configure Clarity](../reference/configuration) for your team
- [Write documentation](../guides/writing-documentation) content  
- Set up [authentication](../getting-started/authentication) (optional)
- Explore [components](../reference/components) for rich content

## Resources

- [Vercel Documentation](https://vercel.com/docs)
- [Astro on Vercel](https://docs.astro.build/en/guides/deploy/vercel/)
- [Vercel CLI Reference](https://vercel.com/docs/cli)
