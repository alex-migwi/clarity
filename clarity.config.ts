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
      { text: "GitHub", href: `https://github.com/${process.env.PUBLIC_GITHUB_REPO || "alex-migwi/clarity"}` },
      { text: "Privacy Policy", href: "/privacy" },
      { text: "Terms of Service", href: "/terms" },
    ],
  },

  // Theme customization
  theme: {
    defaultMode: "system", // "light" | "dark" | "system"
    primaryColor: "zinc", // Tailwind color
  },
};

export type ClarityConfig = typeof clarityConfig;
