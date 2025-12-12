# Clarity AI Development Guide

## Project Overview

Clarity is an **Astro-based documentation platform** with OAuth authentication, built as an Open Core product. The codebase follows a hybrid static/server architecture where docs are statically generated but authentication flows through an Express backend.

**Tech Stack**: Astro 5, Tailwind CSS 4, Express.js (OAuth backend), Content Collections (Markdown docs)

## Architecture Patterns

### 1. Configuration-Driven Design

Everything is controlled by `clarity.config.ts` - the single source of truth for site metadata, features, navigation, and theme. Use environment variables for deployment-specific values:

```typescript
site: {
  name: process.env.PUBLIC_SITE_NAME || "Clarity",
  url: process.env.PUBLIC_SITE_URL || "https://alex-migwi.github.io/clarity-docs",
}
```

**Pattern**: Always respect `clarityConfig.features.*` toggles when adding UI elements. Check feature flags before rendering components.

### 2. Dual-Environment Development

Two processes run in development:
- **Frontend** (`pnpm dev`): Astro dev server on port 4321
- **Backend** (`pnpm backend:dev`): Express OAuth server on port 3000

Authentication features require both running. Static docs work with frontend only.

### 3. Base Path Handling

The site supports deployment in subdirectories via `base` config in `astro.config.mjs`. Always use:
- `import.meta.env.BASE_URL` in Astro components
- Normalize paths: `href.replace(/\/+/g, '/')` to avoid double slashes
- Example: `${base}docs/${slug}`.replace(/\/+/g, '/')

### 4. Content Collections Schema

Docs live in `src/content/docs/` with frontmatter validated by `src/content/config.ts`:

```yaml
---
title: "Page Title"           # Required
description: "SEO description" # Required
order: 10                      # Optional: Controls prev/next ordering
draft: false                   # Optional: Hidden in production builds
protected: false               # Optional: v1.1+ Requires authentication
lastUpdated: "2025-12-09"      # Optional: YYYY-MM-DD format
contributors: ["username"]     # Optional: For GitHub integration
---
```

**Ordering**: Pages use `order` field (lower = earlier). Falls back to 999 for unordered pages.

**Route Protection** (v1.1+): Pages with `protected: true` require authentication via `src/middleware/index.ts`.

### 5. Component Architecture

**Reusable Components** (`src/components/`):
- `Callout.astro`: Info boxes with types: `info | warning | danger | success | tip`
- `Tabs.astro` + `TabPanel.astro`: Tabbed content (use together)
- `CopyCode.astro`: Client-side copy button for code blocks (auto-injected)
- `Mermaid.astro`: Diagram rendering (auto-processed in markdown)

**Layout Pattern**: `DocLayout.astro` orchestrates all doc page features (sidebar, TOC, breadcrumbs, edit links). Pass `frontmatter` and `headings` props.

### 6. Theming System

Clarity uses **CSS custom properties** (HSL format) for theming, not direct Tailwind colors:

```css
/* Use semantic tokens */
bg-background text-foreground
bg-primary text-primary-foreground
border-border text-muted-foreground
```

Theme toggle stores preference in localStorage and syncs with `<html class="dark">`. Never hardcode light/dark colors.

### 7. Search Implementation

Search is **build-time indexed** (not runtime):
1. `scripts/generate-search-index.mjs` runs in `prebuild` hook
2. Outputs `public/search-index.json` with title/slug/content excerpts
3. `Search.astro` loads index client-side for instant fuzzy search
4. Keyboard shortcut: Cmd/Ctrl+K triggers modal

**Adding searchable content**: Just create markdown in `src/content/docs/` - prebuild hook auto-indexes it.

### 8. Homepage Defaults Pattern

Homepage uses a **merge-with-defaults** system via `src/lib/homepage-defaults.ts`:
- User config in `clarityConfig.homepage` is shallow-merged with defaults
- Allows partial overrides (e.g., just change hero buttons, keep default features)
- Use `{siteName}` placeholder in strings for dynamic site name replacement

### 9. Protected Routes Middleware (v1.1+)

Authentication middleware in `src/middleware/index.ts`:
- **Session validation**: Checks `/auth/user` endpoint on backend (cached 5 minutes)
- **Route protection**: Respects `protected: true` frontmatter flag
- **Folder patterns**: Matches `/docs/internal/*` and `/docs/team/*` paths
- **Redirect flow**: Stores intended URL → redirects to login → returns after auth
- **User context**: Attaches authenticated user to `context.locals.user`

**Pattern**: When adding protected features, check `context.locals.user` for authentication state.

## Development Workflows

### Adding a New Doc Page

1. Create markdown file in `src/content/docs/` (or nested subfolder)
2. Add required frontmatter (title, description)
3. Optionally add `order` for sequencing
4. Build runs `generate-search-index.mjs` automatically
5. Page appears in sidebar (auto-generated from file structure)

### Adding a Custom Component

1. Create in `src/components/` (use `.astro` for static, add `<script>` for interactive)
2. Import in `DocLayout.astro` if needed globally
3. Use semantic color classes (`bg-background`, `text-foreground`)
4. Support dark mode via `dark:` variants

### Working with Authentication

Backend in `backend/server.js` handles:
- Google OAuth (`passport-google-oauth20`)
- GitHub OAuth (`passport-github`)
- Session management (`express-session`)

**Environment variables** (`.env` in `backend/`):
```
GOOGLE_CLIENT_ID=...
GOOGLE_CLIENT_SECRET=...
GITHUB_CLIENT_ID=...
GITHUB_CLIENT_SECRET=...
SESSION_SECRET=...
FRONTEND_URL=http://localhost:4321
```

Auth flow: `/auth/google` → callback → redirect to `/dashboard`

### Deployment Configuration

The project supports GitHub Pages, Netlify, Vercel:
- **Site URL**: `PUBLIC_SITE_URL` env var (critical for base path)
- **Base Path**: `PUBLIC_BASE_PATH` for subdirectory deployments
- **Build**: `pnpm build` (runs prebuild search indexing automatically)
- **Preview**: `pnpm preview` tests production build locally

Check `src/content/docs/deployment/` for provider-specific guides.

## Critical Conventions

1. **Never bypass `clarityConfig`**: All site settings must flow through `clarity.config.ts`
2. **Respect feature flags**: Check `clarityConfig.features.*` before rendering optional UI
3. **Use base paths**: Always include `BASE_URL` in absolute paths
4. **Frontmatter validation**: Content Collections enforce schema - match `src/content/config.ts`
5. **Theme-aware styling**: Use CSS variables, not hardcoded colors
6. **Search indexing**: Runs at build time, not runtime - modify `generate-search-index.mjs` for custom indexing logic

## Roadmap Context

Currently on **v1.0** (free/open source). v1.1 will add:
- Protected documentation (route-based access control)
- User management dashboard
- Analytics tracking
- Stripe integration for Team Plan ($39/month)

When adding features, consider which tier they belong to (Free vs Team vs Enterprise) per `ROADMAP.md`.

## Common Tasks Reference

- **Add search result**: Content auto-indexed from `src/content/docs/` markdown
- **Customize homepage**: Edit `clarityConfig.homepage` in `clarity.config.ts`
- **Change theme colors**: Modify CSS variables in `src/styles/global.css` (HSL format)
- **Add navigation link**: Edit `src/components/Header.astro` (respects `clarityConfig.navigation`)
- **Edit GitHub integration**: Configure `clarityConfig.github.*` for edit links
- **Modify sidebar**: Auto-generated from folder structure in `src/content/docs/`
