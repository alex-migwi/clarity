/**
 * Clarity Configuration
 * Customize your documentation site here
 */

export const clarityConfig = {
  // Site metadata
  site: {
    name: process.env.PUBLIC_SITE_NAME || "Clarity",
    description: process.env.PUBLIC_SITE_DESCRIPTION || "A premium documentation platform for teams",
    url: process.env.PUBLIC_SITE_URL || "https://alex-migwi.github.io/clarity-docs",
    logo: process.env.PUBLIC_SITE_URL ? `${process.env.PUBLIC_SITE_URL}/logo.svg` : "/clarity-docs/logo.svg",
  },

  // Navigation
  navigation: {
    showSearch: true,
    showThemeToggle: true,
    showLogin: false, // feature for future use
    loginUrl: "/login",
  },

  // GitHub integration
  github: {
    enabled: true,
    repo: process.env.PUBLIC_GITHUB_REPO || "alex-migwi/clarity",
    branch: process.env.PUBLIC_GITHUB_BRANCH || "main",
    docsPath: process.env.PUBLIC_GITHUB_DOCS_PATH || "src/content/docs",
    editLinkText: "Edit this page on GitHub",
  },

  // Features
  features: {
    showBreadcrumbs: true,
    showLastUpdated: true,
    showContributors: true,
    showTableOfContents: true,
    showPrevNext: true,
    copyCodeButton: true,
    feedback: true, // "Was this helpful?" feature
  },

  // Footer
  footer: {
    copyright: `© ${new Date().getFullYear()} ${process.env.PUBLIC_SITE_NAME || "Clarity"}. All rights reserved.`,
    links: [
      { text: "Documentation", href: process.env.PUBLIC_SITE_URL || "https://alex-migwi.github.io/clarity-docs" },
      { text: "GitHub", href: `https://github.com/${process.env.CLARITY_GITHUB_REPO || "alex-migwi/clarity"}` },
      { text: "Privacy Policy", href: "/privacy" },
      { text: "Terms of Service", href: "/terms" },
    ],
  },

  // Theme customization
  theme: {
    defaultMode: "system", // "light" | "dark" | "system"
    primaryColor: "zinc", // Tailwind color
  },

  // Protected routes configuration (v1.1+)
  protectedRoutes: {
    // Route patterns that require authentication
    // Patterns support wildcards: * (single segment) and ** (multiple segments)
    patterns: [
      {
        path: '/docs/internal/**',
        requiredRole: null, // null = any authenticated user
        description: 'Internal documentation'
      },
      {
        path: '/docs/team/**',
        requiredRole: null,
        description: 'Team documentation'
      },
      {
        path: '/admin/**',
        requiredRole: 'admin', // 'admin' or 'owner' only
        description: 'Admin panel and settings'
      },
    ],
    
    // Also respect frontmatter `protected: true` in content files
    enableFrontmatterProtection: true,
    
    // Redirect destinations
    loginRedirect: '/login',
    forbiddenRedirect: '/403',
  },

  // Homepage customization (optional overrides)
  // All sections use sensible Clarity defaults unless overridden
  homepage: {
    // Uncomment to customize hero section (otherwise uses defaults)
    // hero: {
    //   tagline: "Custom tagline here", // Optional: override default (uses site.description)
    //   buttons: [ // Optional: override default buttons
    //     { text: "Get Started", href: "/docs/introduction", style: "primary" },
    //     { text: "View on GitHub", href: "github", style: "secondary" }, // "github" = auto-link to repo
    //   ],
    // },
    features: {
      enabled: true, // Set to false to hide features section
      // title: "Why {siteName}?", // Optional: override title ({siteName} = replaced with site name)
      // subtitle: "Custom subtitle", // Optional: override subtitle
      // items: [ // Optional: provide custom features (otherwise uses Clarity defaults)
      //   {
      //     icon: "M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z", // SVG path
      //     title: "Custom Feature",
      //     description: "Feature description here",
      //   },
      // ],
    },
    cta: {
      enabled: true, // Set to false to hide CTA section
      // title: "Custom CTA title", // Optional: override title
      // description: "Custom description with {siteName}", // Optional: override description
      // buttons: [ // Optional: override buttons
      //   { text: "Read the Docs", href: "/docs/getting-started", style: "primary" },
      // ],
    },
  },
};

export type ClarityConfig = typeof clarityConfig;
