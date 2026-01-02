---
title: "Deploy to GitHub Pages"
description: "Deploy Clarity documentation to GitHub Pages for free hosting"
order: 51
---

# Deploy to GitHub Pages

Deploy your Clarity documentation to GitHub Pages for free, automated hosting.

## Prerequisites

- GitHub account
- Your Clarity repository pushed to GitHub
- Node.js 18+ and pnpm installed locally

## Step 1: Configure Environment Variables

### Local Configuration

Create or edit `.env` in your project root:

```env
# Site Configuration
PUBLIC_SITE_NAME=My Documentation
PUBLIC_SITE_DESCRIPTION=Documentation for my project
PUBLIC_SITE_URL=https://yourusername.github.io/repo-name
PUBLIC_BASE_PATH=/repo-name/

# GitHub Integration
CLARITY_GITHUB_REPO=yourusername/repo-name
CLARITY_GITHUB_BRANCH=main
CLARITY_DOCS_PATH=src/content/docs
```

**Important:** Replace:
- `yourusername` with your GitHub username
- `repo-name` with your repository name

### GitHub Repository Variables

1. Go to your repository on GitHub
2. Navigate to **Settings → Secrets and variables → Actions → Variables**
3. Click **New repository variable**
4. Add these variables:

| Name | Value | Example |
|------|-------|---------|
| `CLARITY_GITHUB_REPO` | `username/repo` | `alex-migwi/clarity` |
| `CLARITY_GITHUB_BRANCH` | `main` or `master` | `main` |
| `CLARITY_DOCS_PATH` | `src/content/docs` | `src/content/docs` |

## Step 2: Configure Astro for GitHub Pages

Edit `astro.config.mjs` to set the correct base path:

```javascript
import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://yourusername.github.io',
  base: '/repo-name',  // Must match your repository name
  // ... rest of config
});
```

## Step 3: Set Up GitHub Actions

The repository already includes a GitHub Actions workflow at `.github/workflows/docs-deploy.yml`. Verify it contains:

```yaml
name: Deploy Clarity Docs

on:
  push:
    branches: [main]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Setup Node
        uses: actions/setup-node@v4
        with:
          node-version: '20'

      - name: Install pnpm
        uses: pnpm/action-setup@v2
        with:
          version: 8

      - name: Install dependencies
        run: pnpm install

      - name: Build site
        env:
          CLARITY_GITHUB_REPO: ${{ vars.CLARITY_GITHUB_REPO }}
          CLARITY_GITHUB_BRANCH: ${{ vars.CLARITY_GITHUB_BRANCH }}
          CLARITY_DOCS_PATH: ${{ vars.CLARITY_DOCS_PATH }}
        run: pnpm build

      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: ./dist

  deploy:
    needs: build
    runs-on: ubuntu-latest
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

## Step 4: Enable GitHub Pages

1. Go to your repository **Settings**
2. Scroll to **Pages** section (left sidebar)
3. Under **Source**, select:
   - Source: **GitHub Actions**
4. Click **Save**

## Step 5: Deploy

Push your changes to trigger deployment:

```bash
git add .
git commit -m "Configure for GitHub Pages deployment"
git push origin main
```

GitHub Actions will automatically:
1. Build your site
2. Deploy to GitHub Pages
3. Make it available at `https://yourusername.github.io/repo-name`

## Step 6: Verify Deployment

1. Go to **Actions** tab in your repository
2. Watch the deployment workflow run
3. Once complete (green checkmark), visit your site:
   - `https://yourusername.github.io/repo-name`

## Troubleshooting

### 404 Page Not Found

**Cause:** Base path mismatch

**Solution:** Ensure these match:
- `astro.config.mjs`: `base: '/repo-name'`
- `.env`: `PUBLIC_BASE_PATH=/repo-name/`
- URL: `https://yourusername.github.io/repo-name`

### Build Fails

**Check:**
1. Repository variables are set correctly
2. Branch name matches (`main` or `master`)
3. No syntax errors in your markdown files

**View logs:**
- Go to Actions tab → Click failed workflow → View logs

### Assets Not Loading

**Cause:** Incorrect base path in asset references

**Solution:** All links must include the base path:
```astro
// Good
<img src={`${base}logo.svg`} />

// Bad
<img src="/logo.svg" />
```

### Search Not Working

**Cause:** Search index not generated

**Solution:** Ensure `pnpm build` runs successfully locally:
```bash
pnpm build
# Should create dist/search-index.json
```

## Custom Domain

To use a custom domain with GitHub Pages:

1. **Add CNAME file:**
   Create `public/CNAME` with your domain:
   ```
   docs.yourdomain.com
   ```

2. **Configure DNS:**
   Add these records at your domain provider:
   ```
   Type: CNAME
   Name: docs
   Value: yourusername.github.io
   ```

3. **Update configuration:**
   ```javascript
   // astro.config.mjs
   site: 'https://docs.yourdomain.com',
   base: '/',  // Root domain, no subdirectory
   ```

4. **Update .env:**
   ```env
   PUBLIC_SITE_URL=https://docs.yourdomain.com
   PUBLIC_BASE_PATH=/
   ```

5. **Enable in GitHub:**
   - Settings → Pages → Custom domain
   - Enter: `docs.yourdomain.com`
   - Wait for DNS check (can take 24-48 hours)
   - Enable **Enforce HTTPS**

## Updating Your Site

Every push to `main` automatically rebuilds and deploys:

```bash
# Make changes to your docs
git add .
git commit -m "Update documentation"
git push origin main

# GitHub Actions handles the rest!
```

## Next Steps

- [Configure Clarity](../reference/configuration) for your needs
- [Write documentation](../guides/writing-documentation) content
- Set up [authentication](../getting-started/authentication) (optional)
- Explore [components](../reference/components) for rich content

## Need Help?

- Check [GitHub Actions logs](https://github.com/yourusername/repo-name/actions)
- Review [GitHub Pages documentation](https://docs.github.com/en/pages)
- Open an issue in the Clarity repository
