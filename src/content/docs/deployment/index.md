---
title: "Deployment Overview"
description: "Choose the best deployment platform for your Clarity documentation"
order: 50
---

# Deployment Overview

Clarity can be deployed to multiple platforms. Choose the one that best fits your needs.

## Deployment Options

### GitHub Pages (Free)
**Best for:** Open source projects, personal documentation

✅ Free hosting  
✅ Automatic deployment with GitHub Actions  
✅ Custom domains supported  
✅ Built-in SSL certificates  

**Limitations:**
- Public repositories only (unless you have GitHub Pro)
- Builds can be slower
- Limited to static sites

[Deploy to GitHub Pages →](./github-pages)

### Vercel (Recommended)
**Best for:** Professional projects, teams, production sites

✅ Instant deployments (seconds)  
✅ Automatic preview URLs for PRs  
✅ Built-in analytics and monitoring  
✅ Edge network (fast worldwide)  
✅ Free for personal projects  

**Limitations:**
- Paid plans needed for teams
- Build minutes limited on free plan

[Deploy to Vercel →](./vercel)

### Netlify
**Best for:** JAMstack projects, continuous deployment

✅ Instant deployments  
✅ Branch previews  
✅ Built-in forms and functions  
✅ Free SSL  
✅ Free for personal projects  

**Limitations:**
- Build minutes limited on free plan
- Bandwidth limits on free tier

[Deploy to Netlify →]

### Render
**Best for:** Node.js apps, SSR, full-stack applications

✅ Native Node.js support  
✅ Free tier available  
✅ PostgreSQL included  
✅ Auto-deploy from Git  

**Requirements:**
- GitHub repository
- render.yaml configuration
- Environment variables

[Deploy to Render →](./render)

## Quick Comparison

| Feature | GitHub Pages | Vercel | Netlify | Render |
|---------|-------------|--------|---------|--------|
| **Cost** | Free | Free tier | Free tier | Variable |
| **Speed** | Medium | Very Fast | Very Fast | Variable |
| **Setup Time** | 10 min | 2 min | 2 min | 30+ min |
| **Auto Deploy** | ✅ | ✅ | ✅ | Manual |
| **Preview URLs** | ❌ | ✅ | ✅ | ❌ |
| **Custom Domain** | ✅ | ✅ | ✅ | ✅ |
| **SSL** | ✅ | ✅ | ✅ | Manual |
| **Analytics** | ❌ | ✅ Paid | ✅ Paid | Manual |

## Prerequisites

Before deploying to any platform, ensure you have:

1. **Clarity configured** locally and working
2. **Git repository** with your changes committed
3. **Environment variables** configured (see each platform guide)
4. **Build tested** locally with `pnpm build`

## Next Steps

Choose your deployment platform:

- [GitHub Pages Guide](./github-pages) - Free and simple
- [Vercel Guide](./vercel) - Fast and feature-rich
- [Netlify Guide](./netlify) - JAMstack optimized
- [Render Guide](./render) - Node.js and SSR support

Need help deciding? Start with **Vercel** for the best developer experience, or **GitHub Pages** if you want completely free hosting. For SSR and backend features, use **Render**.
