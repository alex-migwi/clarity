---
title: Customizing the Homepage
description: Learn how to customize your Clarity documentation homepage with your own branding, content, and call-to-action buttons
order: 22
lastUpdated: "2025-12-04"
---

# Customizing the Homepage

Clarity's homepage is fully customizable through the `clarity.config.ts` file. You can override specific sections, hide elements you don't need, or keep the beautiful defaults. This guide shows you everything you can customize.

## Understanding the Configuration Pattern

Clarity follows the **"convention over configuration"** pattern. This means:

- ✅ Everything works perfectly with sensible defaults out of the box
- ✅ You only configure what you want to change
- ✅ Empty config objects use Clarity's default content
- ✅ You can hide entire sections with a simple flag

## Homepage Structure

The homepage consists of three main sections:

1. **Hero Section** - Large banner with title, tagline, and primary action buttons
2. **Features Section** - Grid of feature cards highlighting your documentation's benefits
3. **CTA Section** - Call-to-action area encouraging users to get started

Each section can be enabled/disabled and customized independently.

## Configuration Location

All homepage customization happens in `clarity.config.ts`:

```typescript
export const clarityConfig = {
  // ... other config ...
  
  homepage: {
    hero: {
      // Hero section overrides
    },
    features: {
      // Features section overrides
    },
    cta: {
      // CTA section overrides
    },
  },
};
```

## Using Placeholders

Clarity supports dynamic placeholders in text that are automatically replaced with your site configuration:

- `{siteName}` - Replaced with your site name from `site.name`
- `{siteDescription}` - Replaced with your site description from `site.description`
- `{siteUrl}` - Replaced with your site URL from `site.url`

**Example:**
```typescript
{
  title: "Welcome to {siteName}",
  description: "Learn more about {siteName} and how it works"
}
```

If your site name is "Acme Docs", these become:
- "Welcome to Acme Docs"
- "Learn more about Acme Docs and how it works"

## Customizing the Hero Section

The hero section is the first thing visitors see. Here's how to customize it:

### Default Behavior

By default, the hero displays:
- Your site logo (from `public/logo.svg`)
- Site name as the main title
- Site description as the tagline
- Two buttons: "Get Started" and "View on GitHub"

### Basic Customization

Override just the tagline:

```typescript
homepage: {
  hero: {
    tagline: "Documentation that developers actually want to use",
  },
}
```

### Custom Buttons

Replace the default buttons with your own:

```typescript
homepage: {
  hero: {
    tagline: "Your custom tagline here",
    buttons: [
      { 
        text: "Start Tutorial", 
        href: "/docs/tutorial", 
        style: "primary" 
      },
      { 
        text: "View Examples", 
        href: "/docs/examples", 
        style: "secondary" 
      },
    ],
  },
}
```

**Button Styles:**
- `"primary"` - Solid background, prominent call-to-action
- `"secondary"` - Muted background, secondary action

**Special Button Hrefs:**
- `"github"` - Automatically links to your GitHub repository (from `github.repo` config)
- `/docs/path` - Internal links (automatically get base path added)
- `https://example.com` - External links (used as-is)

### Multiple Buttons Example

You can add as many buttons as needed:

```typescript
homepage: {
  hero: {
    buttons: [
      { text: "Quick Start", href: "/docs/quick-start", style: "primary" },
      { text: "Live Demo", href: "https://demo.example.com", style: "secondary" },
      { text: "GitHub", href: "github", style: "secondary" },
    ],
  },
}
```

### Using Placeholders in Hero

```typescript
homepage: {
  hero: {
    tagline: "The fastest way to build {siteName} integrations",
  },
}
```

## Customizing the Features Section

The features section highlights key benefits of your documentation.

### Default Features

Clarity includes 6 default features:
1. Full-Text Search
2. Highly Customizable
3. Dark Mode
4. Markdown Based
5. Lightning Fast
6. SEO Optimized

### Hiding the Features Section

If you don't want to show features:

```typescript
homepage: {
  features: {
    enabled: false,
  },
}
```

### Customizing Title and Subtitle

Keep the default features but change the heading:

```typescript
homepage: {
  features: {
    enabled: true,
    title: "Why Choose {siteName}?",
    subtitle: "Everything you need to create amazing documentation for your team",
  },
}
```

### Providing Custom Features

Replace the default features with your own:

```typescript
homepage: {
  features: {
    enabled: true,
    title: "Key Features",
    subtitle: "Built for modern development teams",
    items: [
      {
        icon: "M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z",
        title: "Instant Search",
        description: "Find what you need in milliseconds with our powerful search engine",
      },
      {
        icon: "M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4",
        title: "Flexible Configuration",
        description: "Customize every aspect to match your brand and workflow",
      },
      {
        icon: "M13 10V3L4 14h7v7l9-11h-7z",
        title: "Blazing Fast",
        description: "Static site generation ensures optimal performance",
      },
      // Add more features as needed
    ],
  },
}
```

### Feature Icon SVG Paths

The `icon` property accepts SVG path data (the `d` attribute). You can get these from:

**Heroicons (Recommended):** https://heroicons.com
1. Choose an icon
2. Select "outline" style
3. Copy the SVG
4. Extract the `d` attribute value from the `<path>` tag

**Example:**
```svg
<svg>
  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
</svg>
```

Use: `"M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"`

### Mixing Defaults with Custom Features

You **cannot** mix defaults with custom features. When you provide `items`, all default features are replaced. If you want to keep some defaults, you must include them in your custom array.

## Customizing the CTA Section

The Call-To-Action section encourages visitors to take the next step.

### Default CTA

By default shows:
- Title: "Ready to get started?"
- Description with site name placeholder
- Two buttons: "Read the Docs" and "Quick Start"

### Hiding the CTA Section

```typescript
homepage: {
  cta: {
    enabled: false,
  },
}
```

### Customizing CTA Text

```typescript
homepage: {
  cta: {
    enabled: true,
    title: "Start Building Today",
    description: "Join thousands of developers using {siteName}",
  },
}
```

### Custom CTA Buttons

```typescript
homepage: {
  cta: {
    enabled: true,
    title: "Ready to dive in?",
    description: "Get started with {siteName} in under 5 minutes",
    buttons: [
      { text: "Get Started Free", href: "/docs/getting-started", style: "primary" },
      { text: "Book a Demo", href: "https://calendly.com/example", style: "secondary" },
      { text: "Contact Sales", href: "/contact", style: "secondary" },
    ],
  },
}
```

## Complete Configuration Examples

### Example 1: Minimal Customization

Keep all defaults, just change the tagline:

```typescript
homepage: {
  hero: {
    tagline: "Documentation made simple for your entire team",
  },
  features: {
    enabled: true,
  },
  cta: {
    enabled: true,
  },
}
```

### Example 2: Custom Branding

Customize text and buttons to match your brand:

```typescript
homepage: {
  hero: {
    tagline: "Build, deploy, and scale your API documentation",
    buttons: [
      { text: "Start Free Trial", href: "/docs/getting-started", style: "primary" },
      { text: "View Pricing", href: "/pricing", style: "secondary" },
    ],
  },
  features: {
    enabled: true,
    title: "Why developers love {siteName}",
    subtitle: "Everything you need to document your API",
  },
  cta: {
    enabled: true,
    title: "Ready to improve your docs?",
    description: "Join over 10,000 teams using {siteName} for their documentation",
    buttons: [
      { text: "Start Your Free Trial", href: "/signup", style: "primary" },
    ],
  },
}
```

### Example 3: Open Source Project

Perfect for open source documentation:

```typescript
homepage: {
  hero: {
    tagline: "Open source documentation platform built with Astro",
    buttons: [
      { text: "Get Started", href: "/docs/introduction", style: "primary" },
      { text: "GitHub", href: "github", style: "secondary" },
      { text: "Join Discord", href: "https://discord.gg/example", style: "secondary" },
    ],
  },
  features: {
    enabled: true,
  },
  cta: {
    enabled: true,
    title: "Contribute to {siteName}",
    description: "Help us make documentation better for everyone",
    buttons: [
      { text: "View Issues", href: "https://github.com/example/repo/issues", style: "primary" },
      { text: "Read Contributing Guide", href: "/docs/contributing", style: "secondary" },
    ],
  },
}
```

### Example 4: Enterprise Product

Focused on business value:

```typescript
homepage: {
  hero: {
    tagline: "Enterprise documentation platform trusted by Fortune 500 companies",
    buttons: [
      { text: "Request Demo", href: "/demo", style: "primary" },
      { text: "View Case Studies", href: "/case-studies", style: "secondary" },
    ],
  },
  features: {
    enabled: true,
    title: "Enterprise-Grade Features",
    subtitle: "Built for security, scalability, and collaboration",
    items: [
      {
        icon: "M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z",
        title: "SOC 2 Compliant",
        description: "Enterprise-grade security and compliance",
      },
      {
        icon: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z",
        title: "Team Collaboration",
        description: "Built-in review workflows and version control",
      },
      {
        icon: "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z",
        title: "Advanced Analytics",
        description: "Track user engagement and content performance",
      },
    ],
  },
  cta: {
    enabled: true,
    title: "Ready to transform your documentation?",
    description: "Schedule a demo with our solutions team",
    buttons: [
      { text: "Book a Demo", href: "/contact-sales", style: "primary" },
      { text: "View Pricing", href: "/pricing", style: "secondary" },
    ],
  },
}
```

### Example 5: Minimal Landing Page

Just hero and CTA, no features:

```typescript
homepage: {
  hero: {
    tagline: "The simplest way to create beautiful documentation",
    buttons: [
      { text: "Get Started", href: "/docs/introduction", style: "primary" },
    ],
  },
  features: {
    enabled: false,
  },
  cta: {
    enabled: true,
    title: "Start documenting in minutes",
    description: "No credit card required. Free for open source.",
    buttons: [
      { text: "Create Your Docs", href: "/docs/getting-started", style: "primary" },
    ],
  },
}
```

## Tips and Best Practices

### Keep It Simple
- Don't overwhelm visitors with too many buttons (2-3 is ideal)
- Use clear, action-oriented button text ("Get Started" not "Click Here")
- Keep taglines concise and benefit-focused

### Maintain Consistency
- Use placeholders (`{siteName}`) to ensure consistency with your config
- Match button styles: primary for main action, secondary for alternatives
- Keep tone consistent across hero, features, and CTA

### Test Your Changes
After making changes:

1. **Build locally:** `pnpm run build`
2. **Preview:** `pnpm preview`
3. **Check responsiveness** on mobile devices
4. **Verify all links** work correctly

### Common Mistakes to Avoid

❌ **Don't** forget to set `enabled: true` when customizing sections
```typescript
// Wrong - section won't show
features: {
  title: "Custom title",
}

// Correct
features: {
  enabled: true,
  title: "Custom title",
}
```

❌ **Don't** provide empty items arrays
```typescript
// Wrong - no features will show
features: {
  enabled: true,
  items: [],
}

// Correct - omit items to use defaults
features: {
  enabled: true,
}
```

❌ **Don't** forget base paths in internal links
```typescript
// No need to include base path manually
{ href: "/docs/start" } // ✅ Correct - automatically handled

{ href: "/clarity-docs/docs/start" } // ❌ Wrong - don't include base
```

## Troubleshooting

### Changes Not Showing

1. **Restart dev server:** Changes to `clarity.config.ts` require restart
   ```bash
   # Stop server (Ctrl+C)
   pnpm dev
   ```

2. **Clear build cache:**
   ```bash
   rm -rf dist .astro
   pnpm run build
   ```

3. **Check syntax:** Ensure valid TypeScript syntax in config file

### Buttons Not Linking Correctly

- **Internal links:** Must start with `/` (e.g., `/docs/start`)
- **External links:** Must include `https://` (e.g., `https://example.com`)
- **GitHub:** Use special value `"github"` (not the URL)

### Icons Not Showing

- Ensure you're using SVG path data, not full SVG markup
- Path must be a string, not an object
- Use outline-style icons (like Heroicons outline) for consistency

## Next Steps

Now that you know how to customize the homepage:

- Learn how to [customize the theme and colors](../reference/configuration#theme-customization)
- Explore [all configuration options](../reference/configuration)
- Read about [writing great documentation](./writing-documentation)

## Need Help?

- Check the [configuration reference](../reference/configuration) for all available options
- Visit our [GitHub discussions](https://github.com/alex-migwi/clarity/discussions) to ask questions
- Report issues on [GitHub](https://github.com/alex-migwi/clarity/issues)
