/**
 * Default homepage content for Clarity
 * These defaults are used unless overridden in clarity.config.ts
 */

export interface HomepageButton {
  text: string;
  href: string;
  style: "primary" | "secondary";
}

export interface HomepageFeature {
  icon: string; // SVG path
  title: string;
  description: string;
}

export interface HomepageHero {
  tagline?: string;
  buttons?: HomepageButton[];
}

export interface HomepageFeatures {
  enabled: boolean;
  title?: string;
  subtitle?: string;
  items?: HomepageFeature[];
}

export interface HomepageCTA {
  enabled: boolean;
  title?: string;
  description?: string;
  buttons?: HomepageButton[];
}

export interface HomepageConfig {
  hero?: Partial<HomepageHero>;
  features?: Partial<HomepageFeatures>;
  cta?: Partial<HomepageCTA>;
}

export const defaultHomepage = {
  hero: {
    tagline: undefined, // Uses site.description by default
    buttons: [
      {
        text: "Get Started",
        href: "/docs/introduction",
        style: "primary" as const,
      },
      {
        text: "View on GitHub",
        href: "github", // Special value that links to github.repo
        style: "secondary" as const,
      },
    ],
  },
  features: {
    enabled: true,
    title: "Why {siteName}?",
    subtitle: "Everything you need to create beautiful, searchable, and maintainable documentation",
    items: [
      {
        icon: "M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z",
        title: "Full-Text Search",
        description: "Instant search with keyboard shortcuts (⌘K) across all your documentation.",
      },
      {
        icon: "M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4",
        title: "Highly Customizable",
        description: "Single config file controls everything from branding to features.",
      },
      {
        icon: "M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01",
        title: "Dark Mode",
        description: "Beautiful dark theme with system preference detection.",
      },
      {
        icon: "M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4",
        title: "Markdown Based",
        description: "Write docs in Markdown with code syntax highlighting and Mermaid diagrams.",
      },
      {
        icon: "M13 10V3L4 14h7v7l9-11h-7z",
        title: "Lightning Fast",
        description: "Static site generation with Astro for optimal performance.",
      },
      {
        icon: "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z",
        title: "SEO Optimized",
        description: "Automatic sitemap generation and SEO-friendly meta tags.",
      },
    ],
  },
  cta: {
    enabled: true,
    title: "Ready to get started?",
    description: "Create beautiful documentation in minutes with {siteName}",
    buttons: [
      {
        text: "Read the Docs",
        href: "/docs/getting-started/installation",
        style: "primary" as const,
      },
      {
        text: "Quick Start",
        href: "/docs/getting-started/quick-start",
        style: "secondary" as const,
      },
    ],
  },
};

/**
 * Replace placeholders like {siteName} with actual values
 */
export function replacePlaceholders(text: string, siteName: string): string {
  return text.replace(/\{siteName\}/g, siteName);
}

/**
 * Merge user config with defaults
 */
export function mergeHomepageConfig(
  userConfig: HomepageConfig | undefined,
  siteName: string
) {
  const merged = {
    hero: {
      ...defaultHomepage.hero,
      ...(userConfig?.hero || {}),
    },
    features: {
      ...defaultHomepage.features,
      ...(userConfig?.features || {}),
      // Ensure items array is merged correctly (user can override completely or use defaults)
      items: userConfig?.features?.items || defaultHomepage.features.items,
    },
    cta: {
      ...defaultHomepage.cta,
      ...(userConfig?.cta || {}),
      // Ensure buttons array is merged correctly
      buttons: userConfig?.cta?.buttons || defaultHomepage.cta.buttons,
    },
  };

  // Replace placeholders in strings
  if (merged.features.title) {
    merged.features.title = replacePlaceholders(merged.features.title, siteName);
  }
  if (merged.features.subtitle) {
    merged.features.subtitle = replacePlaceholders(merged.features.subtitle, siteName);
  }
  if (merged.cta.description) {
    merged.cta.description = replacePlaceholders(merged.cta.description, siteName);
  }

  return merged;
}
