/**
 * Clarity Configuration
 * Customize your documentation site here
 */

export const clarityConfig = {
  // Site metadata
  site: {
    name: "Clarity",
    description: "A premium documentation platform for teams",
    url: process.env.PUBLIC_SITE_URL || "https://alex-migwi.github.io/clarity-docs",
    logo: "/logo.svg", // Path to your logo
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
    repo: process.env.PUBLIC_GITHUB_REPO || "alex-migwi/clarity", // GitHub repository
    branch: "main",
    docsPath: "src/content/docs", // Path to docs in your repo
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
    copyright: `© ${new Date().getFullYear()} Clarity. All rights reserved.`,
    links: [
      { text: "Documentation", href: "https://alex-migwi.github.io/clarity-docs" },
      { text: "GitHub", href: "https://github.com" },
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
