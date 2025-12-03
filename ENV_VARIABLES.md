# Environment Variables Documentation

This document lists all environment variables used in Clarity for easy configuration across different deployment environments.

## Setup

1. Copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```

2. Update the values in `.env` to match your deployment

3. **Important**: Never commit `.env` to version control (it's in `.gitignore`)

## Variables

### Site Configuration

| Variable | Description | Example | Used In |
|----------|-------------|---------|---------|
| `PUBLIC_SITE_NAME` | Your documentation site name | `Clarity` | Page titles, headers, meta tags |
| `PUBLIC_SITE_DESCRIPTION` | Site description for SEO | `A premium documentation platform` | Meta tags, homepage |
| `PUBLIC_SITE_URL` | Full URL where site is deployed | `https://alex-migwi.github.io/clarity-docs` | Canonical URLs, footer links, sitemap |
| `PUBLIC_BASE_PATH` | Base path for deployment (with trailing slash) | `/clarity-docs/` | Astro base config, all internal links |

### Backend Configuration

| Variable | Description | Example | Used In |
|----------|-------------|---------|---------|
| `PUBLIC_BACKEND_URL` | Backend server URL for authentication | `http://localhost:3000` | Login page, dashboard |

### GitHub Integration

| Variable | Description | Example | Used In |
|----------|-------------|---------|---------|
| `PUBLIC_GITHUB_REPO` | GitHub repository (owner/repo) | `alex-migwi/clarity` | Edit links, footer GitHub link |
| `PUBLIC_GITHUB_BRANCH` | Default branch for edit links | `main` | Edit this page links |
| `PUBLIC_GITHUB_DOCS_PATH` | Path to docs folder in repo | `src/content/docs` | Edit this page links |

## Files Using Environment Variables

### Configuration Files
- `clarity.config.ts` - Main site configuration
- `astro.config.mjs` - Astro build configuration

### Components
- `src/components/Header.astro` - Site name and logo
- `src/components/Footer.astro` - Footer links and copyright

### Pages
- `src/pages/index.astro` - Landing page
- `src/pages/login.astro` - Login page (backend URL)
- `src/pages/dashboard.astro` - Dashboard (backend URL)
- `src/layouts/DocLayout.astro` - Documentation layout

## Deployment-Specific Configurations

### Production (GitHub Pages)
```env
PUBLIC_SITE_NAME=Clarity
PUBLIC_SITE_DESCRIPTION=A premium documentation platform for teams
PUBLIC_SITE_URL=https://alex-migwi.github.io/clarity-docs
PUBLIC_BASE_PATH=/clarity-docs/
PUBLIC_BACKEND_URL=https://your-backend.com
PUBLIC_GITHUB_REPO=alex-migwi/clarity
PUBLIC_GITHUB_BRANCH=main
PUBLIC_GITHUB_DOCS_PATH=src/content/docs
```

### Local Development
```env
PUBLIC_SITE_NAME=Clarity
PUBLIC_SITE_DESCRIPTION=A premium documentation platform for teams
PUBLIC_SITE_URL=http://localhost:4321
PUBLIC_BASE_PATH=/
PUBLIC_BACKEND_URL=http://localhost:3000
PUBLIC_GITHUB_REPO=alex-migwi/clarity
PUBLIC_GITHUB_BRANCH=main
PUBLIC_GITHUB_DOCS_PATH=src/content/docs
```

### Custom Domain
```env
PUBLIC_SITE_NAME=Your Docs
PUBLIC_SITE_DESCRIPTION=Your description
PUBLIC_SITE_URL=https://docs.yourcompany.com
PUBLIC_BASE_PATH=/
PUBLIC_BACKEND_URL=https://api.yourcompany.com
PUBLIC_GITHUB_REPO=yourorg/yourrepo
PUBLIC_GITHUB_BRANCH=main
PUBLIC_GITHUB_DOCS_PATH=docs
```

## Benefits

✅ **No code changes needed** between environments  
✅ **Easy forking** - just update .env file  
✅ **Secure** - .env is gitignored, only .env.example is committed  
✅ **Maintainable** - one place to update all configuration  
✅ **CI/CD friendly** - set env vars in GitHub Actions/Vercel/Netlify
