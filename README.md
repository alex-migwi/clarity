# Clarity

A premium documentation platform for teams, built with Astro.

## âœ¨ Features

- í´ **Full-text search** with keyboard shortcuts (âŒ˜K)
- í´ **OAuth authentication** (Google & GitHub)
- í³ **Active table of contents** with scroll highlighting
- í¾¨ **Dark/light theme** with system preference detection
- í²¬ **Feedback widget** on every documentation page
- í´— **GitHub integration** for edit links and contributors
- í³Š **Mermaid diagram** support for visual documentation
- í¾¯ **SEO optimized** with automatic sitemap generation
- í·© **Advanced components** (Callouts, Tabs, Code copying)
- í·ºï¸ **Breadcrumb navigation** for better UX
- âš¡ **Lightning-fast** static site generation

## íº€ Quick Start

### Prerequisites

- Node.js 18+
- pnpm (\`npm install -g pnpm\`)

### Installation

\`\`\`bash
# Clone repository
git clone https://github.com/alex-migwi/clarity.git
cd clarity

# Install dependencies
pnpm install

# Start development server
pnpm dev
\`\`\`

Visit \`http://localhost:4321\`

### With Authentication

\`\`\`bash
# Terminal 1 - Start backend
pnpm backend:dev

# Terminal 2 - Start frontend  
pnpm dev
\`\`\`

## í³ Project Structure

\`\`\`text
clarity/
â”œâ”€â”€ src/
â”‚   â”œâ”€â”€ components/        # UI components (Header, Search, etc.)
â”‚   â”œâ”€â”€ content/
â”‚   â”‚   â””â”€â”€ docs/          # Your documentation (Markdown)
â”‚   â”œâ”€â”€ layouts/           # Page layouts
â”‚   â”œâ”€â”€ pages/             # Routes and pages
â”‚   â””â”€â”€ styles/            # Global styles
â”œâ”€â”€ backend/               # Authentication server (OAuth)
â”œâ”€â”€ public/                # Static assets
â”œâ”€â”€ scripts/               # Build scripts
â”œâ”€â”€ clarity.config.ts      # Main configuration
â””â”€â”€ astro.config.mjs       # Astro configuration
\`\`\`

## âš™ï¸ Configuration

Customize Clarity by editing \`clarity.config.ts\`:

\`\`\`typescript
export const clarityConfig = {
  site: {
    name: "Your Docs",
    description: "Your documentation platform",
    url: "https://your-domain.com",
  },
  github: {
    enabled: true,
    repo: "username/repo",
  },
  features: {
    showBreadcrumbs: true,
    showPrevNext: true,
    copyCodeButton: true,
  },
};
\`\`\`

## í· Commands

| Command | Action |
|---------|--------|
| \`pnpm install\` | Install dependencies |
| \`pnpm dev\` | Start dev server at \`localhost:4321\` |
| \`pnpm build\` | Build production site to \`./dist/\` |
| \`pnpm preview\` | Preview production build locally |
| \`pnpm backend:dev\` | Start authentication backend |

## í³ Writing Docs

Create markdown files in \`src/content/docs/\`:

\`\`\`markdown
---
title: "Your Page Title"
description: "Page description for SEO"
order: 10
---

# Your Content

Write documentation using Markdown...
\`\`\`

## íº¢ Deployment

1. **Build**: \`pnpm build\`
2. **Frontend**: Deploy \`dist/\` to Vercel, Netlify, or GitHub Pages
3. **Backend**: Deploy \`backend/\` to Railway, Heroku, or DigitalOcean

See the [Deployment Guide](./src/content/docs/deployment.md) for detailed instructions.

## í³š Documentation

- [Getting Started](./src/content/docs/getting-started.md)
- [Configuration Guide](./src/content/docs/configuration.md)
- [Authentication Setup](./src/content/docs/authentication-setup.md)
- [Deployment Guide](./src/content/docs/deployment.md)

## í´ Contributing

Contributions are welcome! Please see:

- [CHANGELOG.md](./CHANGELOG.md) - Version history
- [ROADMAP.md](./ROADMAP.md) - Planned features

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## í³„ License

MIT License - feel free to use for personal or commercial projects.

## í¶˜ Support

- í³– Check the [documentation](./src/content/docs/)
- í°› [Open an issue](https://github.com/alex-migwi/clarity/issues)
- í²¬ [Start a discussion](https://github.com/alex-migwi/clarity/discussions)

---

Built with â¤ï¸ using [Astro](https://astro.build)
