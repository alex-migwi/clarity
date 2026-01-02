---
title: "Configuration Guide"
description: "Learn how to customize Clarity for your team using the configuration file"
order: 30
---

# Configuration Guide

Clarity is designed to be easily customizable through a single configuration file: `clarity.config.ts`. This guide will walk you through all available options.

## Configuration File Location

The configuration file is located at the root of your project:

```
clarity.config.ts
```

## Site Configuration

### Basic Settings

```typescript
site: {
  name: "Clarity",
  description: "A premium documentation platform for teams",
  url: "https://clarity.example.com",
  logo: "/logo.svg",
}
```

- **name**: Your site/product name (appears in header and page titles)
- **description**: Default meta description for SEO
- **url**: Your site's URL (used for canonical URLs and sitemap)
- **logo**: Path to your logo file in the `public` folder

## Navigation Configuration

```typescript
navigation: {
  showSearch: true,
  showThemeToggle: true,
  showLogin: true,
  loginUrl: "/login",
}
```

- **showSearch**: Enable/disable the search button in header
- **showThemeToggle**: Show/hide the dark mode toggle
- **showLogin**: Show/hide the login link
- **loginUrl**: URL for the login page

## GitHub Integration

Enable GitHub features to allow contributors to edit documentation directly:

```typescript
github: {
  enabled: true,
  repo: "username/repo",
  branch: "main",
  docsPath: "src/content/docs",
  editLinkText: "Edit this page on GitHub",
}
```

- **enabled**: Turn GitHub integration on/off
- **repo**: Your GitHub repository in format `owner/repo`
- **branch**: The branch to link to (usually `main` or `master`)
- **docsPath**: Path to documentation files in your repo
- **editLinkText**: Customize the edit link text

### Example: Real Repository Setup

```typescript
github: {
  enabled: true,
  repo: "facebook/react",
  branch: "main",
  docsPath: "docs",
  editLinkText: "Edit this page on GitHub",
}
```

## Feature Toggles

Control which features are displayed:

```typescript
features: {
  showBreadcrumbs: true,
  showLastUpdated: true,
  showContributors: true,
  showTableOfContents: true,
  showPrevNext: true,
  copyCodeButton: true,
  feedback: false,
}
```

- **showBreadcrumbs**: Show breadcrumb navigation at top of page
- **showLastUpdated**: Display last updated date from frontmatter
- **showContributors**: Show contributors list from frontmatter
- **showTableOfContents**: Show the right sidebar TOC
- **showPrevNext**: Show previous/next page navigation
- **copyCodeButton**: Add copy button to code blocks
- **feedback**: "Was this helpful?" feature (coming soon)

## Footer Configuration

Customize your site footer:

```typescript
footer: {
  copyright: `© ${new Date().getFullYear()} Clarity. All rights reserved.`,
  links: [
    { text: "Documentation", href: "/docs/introduction" },
    { text: "GitHub", href: "https://github.com" },
    { text: "Privacy Policy", href: "/privacy" },
    { text: "Terms of Service", href: "/terms" },
  ],
}
```

- **copyright**: Copyright text (supports dynamic year)
- **links**: Array of footer links with `text` and `href`

## Theme Configuration

```typescript
theme: {
  defaultMode: "system",
  primaryColor: "zinc",
}
```

- **defaultMode**: Default theme mode (`"light"`, `"dark"`, or `"system"`)
- **primaryColor**: Tailwind color palette name

## Real-World Examples

### Example 1: Company Internal Docs

```typescript
export const clarityConfig = {
  site: {
    name: "Acme Corp Docs",
    description: "Internal documentation for Acme Corporation",
    url: "https://docs.acme.com",
    logo: "/acme-logo.svg",
  },
  navigation: {
    showSearch: true,
    showThemeToggle: true,
    showLogin: true,
    loginUrl: "/sso/login",
  },
  github: {
    enabled: true,
    repo: "acme-corp/documentation",
    branch: "main",
    docsPath: "src/content/docs",
    editLinkText: "Suggest edits",
  },
  features: {
    showBreadcrumbs: true,
    showLastUpdated: true,
    showContributors: true,
    showTableOfContents: true,
    showPrevNext: true,
    copyCodeButton: true,
    feedback: true,
  },
  footer: {
    copyright: "© 2025 Acme Corporation. Confidential.",
    links: [
      { text: "Internal Portal", href: "https://portal.acme.com" },
      { text: "Support", href: "https://support.acme.com" },
      { text: "IT Helpdesk", href: "tel:+1234567890" },
    ],
  },
};
```

### Example 2: Open Source Project

```typescript
export const clarityConfig = {
  site: {
    name: "MyLib",
    description: "Documentation for MyLib - The best library ever",
    url: "https://mylib.dev",
    logo: "/logo.svg",
  },
  navigation: {
    showSearch: true,
    showThemeToggle: true,
    showLogin: false, // No login for public docs
    loginUrl: "/login",
  },
  github: {
    enabled: true,
    repo: "myusername/mylib",
    branch: "main",
    docsPath: "docs",
    editLinkText: "Edit on GitHub",
  },
  features: {
    showBreadcrumbs: true,
    showLastUpdated: false, // Auto-generated from git
    showContributors: true,
    showTableOfContents: true,
    showPrevNext: true,
    copyCodeButton: true,
    feedback: false,
  },
  footer: {
    copyright: "© 2025 MyLib Contributors. MIT License.",
    links: [
      { text: "GitHub", href: "https://github.com/myusername/mylib" },
      { text: "Discord", href: "https://discord.gg/mylib" },
      { text: "Sponsor", href: "https://github.com/sponsors/myusername" },
    ],
  },
};
```

### Example 3: Minimal Setup

```typescript
export const clarityConfig = {
  site: {
    name: "Docs",
    description: "Simple documentation",
    url: "https://example.com",
    logo: "/logo.svg",
  },
  navigation: {
    showSearch: true,
    showThemeToggle: true,
    showLogin: false,
    loginUrl: "/login",
  },
  github: {
    enabled: false, // Disable GitHub features
    repo: "",
    branch: "main",
    docsPath: "src/content/docs",
    editLinkText: "Edit this page",
  },
  features: {
    showBreadcrumbs: false,
    showLastUpdated: false,
    showContributors: false,
    showTableOfContents: true,
    showPrevNext: true,
    copyCodeButton: true,
    feedback: false,
  },
  footer: {
    copyright: "© 2025 All rights reserved.",
    links: [],
  },
};
```

## TypeScript Support

The configuration file is fully typed. Your editor will provide autocomplete and type checking:

```typescript
import type { ClarityConfig } from './clarity.config';

// Custom config with type safety
const myConfig: ClarityConfig = {
  // ... your configuration
};
```

## Tips

1. **Start Simple**: Begin with the default configuration and enable features as needed
2. **Git Commit Config**: Always commit your configuration changes
3. **Environment Variables**: For sensitive data, use environment variables instead of hardcoding
4. **Test Changes**: Run `pnpm dev` to see configuration changes immediately
5. **White-Label**: This single file is perfect for white-labeling the platform

## Next Steps

- [Writing Documentation](../guides/writing-documentation)
- [Deployment Guide](../deployment/index)
- [Customizing Styles](../introduction)
