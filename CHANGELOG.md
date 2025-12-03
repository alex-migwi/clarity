# Changelog

All notable changes to Clarity will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added
- Initial release preparation
- Comprehensive documentation tutorials

## [1.0.0] - 2025-12-03

### Added
- **Authentication System**
  - Google OAuth 2.0 integration
  - GitHub OAuth integration
  - Express.js backend with Passport.js
  - Session management with express-session
  - Protected dashboard route
  - Login/logout functionality

- **Search Functionality**
  - Full-text search across all documentation
  - Keyboard shortcuts (⌘K / Ctrl+K)
  - Real-time search results
  - Search result highlighting
  - Keyboard navigation (arrow keys, Enter)
  - Modal overlay with backdrop blur

- **Documentation Components**
  - Breadcrumb navigation
  - Copy code button for code blocks
  - Edit on GitHub links
  - Document metadata (last updated, contributors)
  - Previous/Next page navigation
  - Feedback widget
  - Callout components (note, warning, danger)
  - Tabs and TabPanel for multi-option content
  - Active table of contents with scroll spy

- **Theme & UI**
  - Dark/light mode with system preference detection
  - Responsive design with mobile-first approach
  - Collapsible sidebar for mobile
  - Premium Tailwind CSS styling with Zinc palette
  - Inter font family for optimal readability
  - Smooth scrolling and transitions
  - Custom scrollbar styling

- **Configuration System**
  - Centralized `clarity.config.ts` configuration
  - Environment variable support
  - Feature toggles for all major components
  - Customizable branding (site name, logo, colors)
  - GitHub integration settings
  - Navigation customization

- **SEO & Performance**
  - Automatic sitemap generation
  - SEO-optimized meta tags (Open Graph, Twitter Cards)
  - Canonical URLs
  - Robots.txt configuration
  - Static site generation for optimal performance
  - Build-time search index generation

- **Developer Experience**
  - Hot reload during development
  - TypeScript support throughout
  - Content Collections for type-safe markdown
  - Automated build process
  - Environment variable templates
  - Comprehensive documentation

- **Deployment**
  - GitHub Actions workflow for automated deployment
  - Support for multiple hosting platforms:
    - Vercel, Netlify, GitHub Pages (frontend)
    - Railway, Heroku, DigitalOcean (backend)
  - Environment configuration guides
  - Production-ready build process

### Changed
- Migrated from AstroDocs to Clarity branding
- Updated project structure for better organization
- Improved search index generation (now Node.js-based)
- Enhanced component architecture

### Fixed
- Build process errors with ESM modules
- Sitemap generation for Astro 5 API routes
- Search modal z-index stacking issues
- Login page layout and scrolling
- OAuth redirect URL configuration
- Search index generation during build

### Documentation
- Getting Started guide
- Configuration guide
- Quick Start for teams
- Writing Documentation guide
- Using Components guide
- Authentication Setup guide (OAuth configuration)
- Deployment guide (comprehensive production deployment)

## Strategy for Maintaining This Changelog

### When to Update

Update the changelog:
- **Immediately** when merging features to main branch
- **Before** creating a release/tag
- **After** fixing bugs that affect users

### Categories

Use these standard categories:
- **Added**: New features
- **Changed**: Changes to existing functionality
- **Deprecated**: Soon-to-be removed features
- **Removed**: Removed features
- **Fixed**: Bug fixes
- **Security**: Security vulnerabilities

### Version Numbering (Semantic Versioning)

- **MAJOR** (1.0.0 → 2.0.0): Breaking changes
- **MINOR** (1.0.0 → 1.1.0): New features (backward compatible)
- **PATCH** (1.0.0 → 1.0.1): Bug fixes (backward compatible)

### Workflow

1. Keep an `[Unreleased]` section at the top
2. Add changes as they're merged
3. When ready to release:
   - Rename `[Unreleased]` to `[X.Y.Z] - YYYY-MM-DD`
   - Create new `[Unreleased]` section
   - Create git tag: `git tag -a vX.Y.Z -m "Version X.Y.Z"`
   - Update package.json version
4. Push: `git push origin main --tags`

### Example Entry Format

```markdown
### Added
- Brief description of feature (#123)
- Another feature with link to PR (#124)

### Fixed
- Bug fix description (#125)
```

### Automation Ideas

Consider automating with:
- **Conventional Commits**: Use commit messages to auto-generate entries
- **Release Please**: GitHub Action that manages releases
- **Changesets**: Tool for managing versions and changelogs

### References

- [Keep a Changelog](https://keepachangelog.com/)
- [Semantic Versioning](https://semver.org/)
- [Conventional Commits](https://www.conventionalcommits.org/)

---

[Unreleased]: https://github.com/alex-migwi/clarity/compare/v1.0.0...HEAD
[1.0.0]: https://github.com/alex-migwi/clarity/releases/tag/v1.0.0
