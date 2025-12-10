# Clarity

A premium documentation platform for teams, built with Astro.

## ✨ Features

- 🔍 **Full-text search** with keyboard shortcuts (⌘K)
- 🔐 **OAuth authentication** (Google & GitHub)
- 📑 **Active table of contents** with scroll highlighting
- 🌓 **Dark/light theme** with system preference detection
- 💬 **Feedback widget** on every documentation page
- 🔗 **GitHub integration** for edit links and contributors
- 📊 **Mermaid diagram** support for visual documentation
- 🎯 **SEO optimized** with automatic sitemap generation
- 🎨 **Advanced components** (Callouts, Tabs, Code copying)
- 🗺️ **Breadcrumb navigation** for better UX
- ⚡ **Lightning-fast** static site generation

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- pnpm (\`npm install -g pnpm\`)

### Installation

```bash
# Clone repository
git clone https://github.com/alex-migwi/clarity.git
cd clarity

# Install dependencies
pnpm install

# Start development server
pnpm dev
```

Visit `http://localhost:4321`

### With Authentication

```bash
# Terminal 1 - Start backend
pnpm backend:dev

# Terminal 2 - Start frontend  
pnpm dev
```

## 📁 Project Structure

```text
clarity/
├── src/
│   ├── components/        # UI components (Header, Search, etc.)
│   ├── content/
│   │   └── docs/          # Your documentation (Markdown)
│   ├── layouts/           # Page layouts
│   ├── pages/             # Routes and pages
│   └── styles/            # Global styles
├── backend/               # Authentication server (OAuth)
├── public/                # Static assets
├── scripts/               # Build scripts
├── clarity.config.ts      # Main configuration
└── astro.config.mjs       # Astro configuration
```

## ⚙️ Configuration

Customize Clarity by editing \`clarity.config.ts\`:

```typescript
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
```

## 📝 Commands

| Command | Action |
|---------|--------|
| `pnpm install` | Install dependencies |
| `pnpm dev` | Start dev server at `localhost:4321` |
| `pnpm build` | Build production site to `./dist/` |
| `pnpm preview` | Preview production build locally |
| `pnpm backend:dev` | Start authentication backend |

## 📖 Writing Docs

Create markdown files in \`src/content/docs/\`:

```markdown
---
title: "Your Page Title"
description: "Page description for SEO"
order: 10
---

# Your Content

Write documentation using Markdown...
```

## 🚀 Deployment

1. **Build**: `pnpm build`
2. **Frontend**: Deploy `dist/` to Vercel, Netlify, or GitHub Pages
3. **Backend**: Deploy `backend/` to Railway, Heroku, or DigitalOcean

See the [Deployment Guide](./src/content/docs/deployment.md) for detailed instructions.

## 📚 Documentation

- [Getting Started](./src/content/docs/getting-started.md)
- [Configuration Guide](./src/content/docs/configuration.md)
- [Authentication Setup](./src/content/docs/authentication-setup.md)
- [Deployment Guide](./src/content/docs/deployment.md)

## 🤝 Contributing

Contributions are welcome! Please see:

- [CHANGELOG.md](./CHANGELOG.md) - Version history
- [ROADMAP.md](./ROADMAP.md) - Planned features

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## 📄 License

MIT License - feel free to use for personal or commercial projects.

## 💬 Support

- 📖 Check the [documentation](./src/content/docs/)
- 🐛 [Open an issue](https://github.com/alex-migwi/clarity/issues)
- 💭 [Start a discussion](https://github.com/alex-migwi/clarity/discussions)

---

Built with ❤️ for Developers using [Astro](https://astro.build)
