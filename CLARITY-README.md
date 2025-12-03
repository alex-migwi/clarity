# Clarity - Premium Documentation Platform for Teams

Clarity is a modern, feature-rich documentation platform built with Astro, designed for teams who need professional, customizable documentation sites.

## ✨ Features

### 🔍 **Advanced Search**
- Full-text search across all documentation
- Keyboard shortcuts (⌘K / Ctrl+K)
- Real-time search results
- Modal-based interface

### 🎨 **Premium UI/UX**
- Clean, modern design with Tailwind CSS
- Dark mode with system preference support
- Responsive layout for all devices
- Collapsible sidebar navigation
- Smooth transitions and animations

### 📝 **Content Management**
- Markdown-based content with frontmatter
- Code syntax highlighting
- Mermaid diagram support
- Table of Contents auto-generation
- Copy-to-clipboard for code blocks

### 🧭 **Navigation**
- Breadcrumb navigation
- Previous/Next page links
- Sidebar with nested navigation
- Smooth scroll to sections

### 🤝 **Team Collaboration**
- GitHub integration for "Edit this page" links
- Last updated timestamps
- Contributors display
- Draft mode for work-in-progress docs

### ⚙️ **Easy Customization**
- Single configuration file (`clarity.config.ts`)
- White-labeling support
- Toggle features on/off
- Customizable footer and navigation
- Theme customization

## 🚀 Quick Start

### Installation

```bash
pnpm install
```

### Development

```bash
pnpm dev
```

Visit `http://localhost:4321`

### Build

```bash
pnpm build
```

### Preview Production Build

```bash
pnpm preview
```

## 📁 Project Structure

```text
clarity/
├── clarity.config.ts          # Main configuration file
├── src/
│   ├── components/
│   │   ├── Breadcrumbs.astro  # Breadcrumb navigation
│   │   ├── CopyCode.astro     # Code copy buttons
│   │   ├── DocMeta.astro      # Last updated & contributors
│   │   ├── EditLink.astro     # GitHub edit links
│   │   ├── Footer.astro       # Site footer
│   │   ├── Header.astro       # Site header
│   │   ├── PrevNext.astro     # Page navigation
│   │   ├── Search.astro       # Search modal
│   │   ├── Sidebar.astro      # Sidebar navigation
│   │   ├── TableOfContents.astro
│   │   └── ThemeToggle.astro
│   ├── content/
│   │   ├── config.ts          # Content collections schema
│   │   └── docs/              # Your documentation files
│   ├── layouts/
│   │   └── DocLayout.astro    # Main documentation layout
│   ├── pages/
│   │   └── docs/
│   │       └── [...slug].astro
│   └── styles/
│       └── global.css         # Global styles
├── astro.config.mjs
└── package.json
```

## ⚙️ Configuration

Edit `clarity.config.ts` to customize your documentation site:

```typescript
export const clarityConfig = {
  // Site metadata
  site: {
    name: "Clarity",
    description: "A premium documentation platform for teams",
    url: "https://clarity.example.com",
    logo: "/logo.svg",
  },

  // GitHub integration
  github: {
    enabled: true,
    repo: "username/repo",
    branch: "main",
    docsPath: "src/content/docs",
    editLinkText: "Edit this page on GitHub",
  },

  // Toggle features
  features: {
    showBreadcrumbs: true,
    showLastUpdated: true,
    showContributors: true,
    showTableOfContents: true,
    showPrevNext: true,
    copyCodeButton: true,
  },

  // Customize footer
  footer: {
    copyright: "© 2025 Clarity. All rights reserved.",
    links: [
      { text: "Documentation", href: "/docs/introduction" },
      { text: "GitHub", href: "https://github.com" },
    ],
  },
};
```

## 📝 Writing Documentation

Create markdown files in `src/content/docs/`:

```markdown
---
title: "Your Page Title"
description: "A brief description"
order: 10
draft: false
lastUpdated: 2025-12-03
contributors: ["John Doe", "Jane Smith"]
---

# Your Content

Write your documentation using markdown...

## Code Examples

\`\`\`javascript
function hello() {
  console.log("Hello, Clarity!");
}
\`\`\`

## Mermaid Diagrams

\`\`\`mermaid
graph TD
    A[Start] --> B{Decision}
    B -->|Yes| C[Success]
    B -->|No| D[End]
\`\`\`
```

### Frontmatter Options

- `title` (required): Page title
- `description` (required): Page description for meta tags
- `order` (optional): Sorting order for prev/next navigation
- `draft` (optional): Hide from production build
- `lastUpdated` (optional): Last modification date
- `contributors` (optional): Array of contributor names
- `image` (optional): Featured image path

## 🎨 Customization

### White-Labeling

1. Update `clarity.config.ts` with your branding
2. Replace logo in `public/logo.svg`
3. Customize colors in `src/styles/global.css`
4. Update footer links and copyright

### Theme Colors

Modify CSS variables in `src/styles/global.css`:

```css
:root {
  --primary: 240 5.9% 10%;
  --background: 0 0% 100%;
  /* ... more colors */
}
```

### Adding Custom Components

Create new components in `src/components/` and import them in your layouts or pages.

## 🔧 Advanced Features

### Search Index Generation

Search uses a pre-generated index. The build process automatically creates it via:

```bash
pnpm prebuild  # Runs generate-search-index.mjs
```

### GitHub Integration

To enable "Edit this page" links:

1. Set `github.enabled: true` in config
2. Update `github.repo` with your repository
3. Set `github.branch` (usually "main")
4. Set `github.docsPath` to your docs folder path

### Keyboard Shortcuts

- `⌘K` / `Ctrl+K`: Open search
- `Escape`: Close modals

## 🚢 Deployment

### Vercel

```bash
vercel deploy
```

### Netlify

```bash
netlify deploy --prod
```

### GitHub Pages

Update `astro.config.mjs`:

```javascript
export default defineConfig({
  site: 'https://username.github.io',
  base: '/repo-name',
});
```

## 📚 Tech Stack

- **Framework**: [Astro](https://astro.build) 5.13+
- **Styling**: [Tailwind CSS](https://tailwindcss.com) 4.1+
- **Content**: Astro Content Collections
- **Diagrams**: [Mermaid](https://mermaid.js.org) via rehype-mermaid
- **Icons**: SVG inline icons

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## 📄 License

MIT License - feel free to use for personal or commercial projects.

## 💡 Tips

- Keep your content organized with subfolders in `src/content/docs/`
- Use the `order` field to control prev/next navigation
- Draft mode is perfect for work-in-progress docs
- Test your site with `pnpm preview` before deploying
- Use Mermaid for flowcharts, sequence diagrams, and more

## 🆘 Support

- Check existing documentation in `/docs`
- Open an issue on GitHub
- Read the [Astro documentation](https://docs.astro.build)

---

Built with ❤️ using Astro
