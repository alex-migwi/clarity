---
title: "Writing Documentation with Frontmatter"
description: "A step-by-step tutorial for creating documentation pages in Clarity using frontmatter metadata"
order: 20
---

# Writing Documentation with Frontmatter

In this tutorial, you'll learn how to create documentation pages for Clarity by understanding and using frontmatter. By the end, you'll be able to write complete documentation with proper metadata, navigation, and formatting.

## What You'll Learn

- What frontmatter is and why it's important
- How to add required and optional metadata fields
- How to organize pages in the sidebar
- How to use Clarity components in your docs
- Common mistakes and how to avoid them

## Prerequisites

- Basic knowledge of Markdown
- A text editor
- Clarity project set up locally

## What is Frontmatter?

Frontmatter is metadata enclosed between `---` delimiters at the top of a file. It tells Clarity how to display and organize your documentation page.

Every documentation file in `src/content/docs/` must include frontmatter. Think of it as the "settings" for your page.

## Step 1: Create Your File with Basic Frontmatter

Let's start by creating a new documentation file with the minimum required frontmatter.

### Action: Create the File

1. Navigate to `src/content/docs/` in your project
2. Create a new file, for example: `my-first-doc.md`
3. Add the basic frontmatter structure:

```markdown
---
title: "Your Page Title"
description: "A brief description of the page content"
---

# Your content starts here
```

### Understanding Required Fields

#### `title` Field
- **What it does**: Sets the main heading displayed in the browser tab and page header
- **How to write it**:
  - Keep it concise (3-8 words)
  - Use title case (capitalize main words)
  - Make it descriptive and specific
- **Example**: `"Getting Started with Authentication"`

#### `description` Field
- **What it does**: Provides a summary for SEO and search results
- **How to write it**:
  - Keep it between 120-160 characters
  - Include relevant keywords
  - Write in complete sentences
  - Don't duplicate the title exactly
- **Example**: `"Learn how to install and configure Clarity authentication for your project with step-by-step instructions"`

### ✅ Checkpoint

Your file should now look like this:

```markdown
---
title: "Getting Started with Authentication"
description: "Learn how to install and configure Clarity authentication for your project with step-by-step instructions"
---

Your documentation content will go here...
```

## Step 2: Add Optional Fields (Enhance Your Page)

Now let's enhance your page with optional fields that control navigation and display.

### Action: Control Sidebar Appearance

Add a `sidebar` field to control how your page appears in the navigation:

```yaml
---
title: "Getting Started with Authentication"
description: "Learn how to install and configure Clarity authentication for your project"
sidebar:
  order: 3
  badge:
    text: "New"
    variant: "success"
---
```

**What this does**:
- `order: 3` - Places this page third in the sidebar (lower numbers = higher position)
- `badge` - Shows a "New" badge next to the page title
- Badge variants: `success` (green), `info` (blue), `warning` (yellow), `danger` (red)

### Action: Customize Navigation Links

Control the previous/next links at the bottom of your page:

```yaml
prev: false              # Hides the previous link
next: "configuration"    # Links to the configuration page
```

**When to use this**:
- Hide `prev` on the first page of a series
- Hide `next` on the last page
- Custom link paths to create specific navigation flows

### Action: Mark as Draft (Optional)

While working on a page, mark it as draft to hide it from production:

```yaml
draft: true
```

**Note**: Draft pages are visible in development but hidden in production builds.

### Action: Add Last Updated Date

Show when the page was last modified:

```yaml
lastUpdated: "2025-12-04"
```

**Format**: Always use `YYYY-MM-DD` string format (in quotes)

## Step 3: Put It All Together

Here's a complete example with all fields combined:

```markdown
---
title: "Installation Guide"
description: "Step-by-step instructions for installing Clarity in your development environment"
sidebar:
  order: 2
  badge:
    text: "Updated"
    variant: "info"
prev: "introduction"
next: "configuration"
lastUpdated: "2025-12-04"
---

# Installation Guide

Your documentation content goes here...
```

### Try It Yourself

1. Copy this example
2. Paste it into your file
3. Change the `title` and `description` to match your content
4. Adjust the `order` number based on where it should appear
5. Update `prev` and `next` to point to actual pages in your docs

## Step 4: Validate Your Frontmatter

Before moving forward, let's make sure your frontmatter is correct.

### Action: Run the Dev Server

```bash
pnpm dev
```

The build process will validate your frontmatter against the schema defined in `src/content/config.ts`.

### Troubleshooting Common Errors

If you see errors, here's how to fix them:

#### Error 1: Missing Required Fields
```
Error: "title" is required
```
**Solution**: Add the missing `title` field in your frontmatter

```yaml
---
title: "Your Page Title"  # ← Add this
description: "Your description"
---
```

#### Error 2: Invalid Type
```
Error: Expected string, received number
```
**Solution**: Wrap the value in quotes

```yaml
---
title: "123"  # ← Correct (string)
title: 123    # ← Wrong (number)
---
```

#### Error 3: Malformed YAML
```
Error: Invalid YAML frontmatter
```
**Solution**: Check for:
- Proper indentation (use 2 spaces, not tabs)
- Closing quotes on strings
- Matching opening and closing `---`

### ✅ Checkpoint

If the dev server starts without errors, your frontmatter is valid!

## Step 5: Write Your Content

Now that your frontmatter is set up, let's add the actual documentation content.

### Action: Add Markdown Content

After the closing `---`, write your content using standard Markdown:

```markdown
---
title: "Installation Guide"
description: "How to install Clarity"
---

## Installation

Install Clarity using your preferred package manager:

```bash
npm install clarity-docs
```

### Prerequisites

Before installing, make sure you have:

- Node.js 18 or higher
- npm or pnpm

## Next Steps

After installation, see the [Configuration Guide](../reference/configuration) to get started.
```

**Important**: 
- Use `##` for main sections (H1 is auto-generated from your `title`)
- Use triple backticks with language identifiers for code blocks
- Link to other docs using relative paths

### Action: Add Clarity Components

Enhance your docs with built-in components:

```astro
---
title: "Component Example"
description: "How to use Clarity components in your docs"
---

import { Callout } from '@components/Callout.astro';
import { Tabs, TabPanel } from '@components/Tabs.astro';

## Using Components

<Callout type="info">
This is an informational callout that stands out from regular text.
</Callout>

<Callout type="warning">
Use warning callouts for important notices.
</Callout>

### Code Examples

<Tabs>
  <TabPanel label="JavaScript">
    ```js
    console.log('Hello World');
    ```
  </TabPanel>
  <TabPanel label="TypeScript">
    ```ts
    console.log('Hello World');
    ```
  </TabPanel>
</Tabs>
```

**Available Components**:
- `<Callout>` - Highlight important information (types: `info`, `warning`, `danger`, `success`)
- `<Tabs>` / `<TabPanel>` - Organize code examples by language or framework

## Step 6: Test and Refine

Before publishing, follow these best practices:

### Action: Preview Your Changes

1. Run the dev server:
   ```bash
   pnpm dev
   ```

2. Navigate to your page in the browser

3. Check:
   - ✅ Page title appears correctly
   - ✅ Description is accurate
   - ✅ Sidebar position is correct
   - ✅ Badge displays (if added)
   - ✅ Previous/next links work
   - ✅ Content is readable and formatted properly

### Best Practices Checklist

- [ ] **Be Consistent** - Follow the same frontmatter structure across all docs
- [ ] **Update Descriptions** - Keep descriptions accurate when content changes
- [ ] **Use Order** - Set sidebar order to control navigation sequence
- [ ] **Test Links** - Ensure prev/next links point to existing pages
- [ ] **SEO Matters** - Write descriptive titles and descriptions for search engines
- [ ] **Check Mobile** - Preview on different screen sizes
- [ ] **Validate** - Ensure no build errors appear

## Next Steps

Now that you've created your first documentation page:

1. **Create more pages** - Build out your documentation
2. **Review existing docs** - Check `src/content/docs/` for examples
3. **Explore the schema** - See `src/content/config.ts` for all available options
4. **Share with others** - Your documentation is ready to help users!

## Quick Reference

### Minimal Example
```yaml
---
title: "Page Title"
description: "Page description for SEO"
---
```

### Full Example
```yaml
---
title: "Page Title"
description: "Page description for SEO"
sidebar:
  order: 1
  badge:
    text: "New"
    variant: "success"
prev: "previous-page"
next: "next-page"
draft: false
lastUpdated: "2025-12-04"
---
```

## Getting Help

If you encounter issues:

- **Build errors**: Read the error message carefully - it usually tells you exactly what's wrong
- **Examples**: Review existing docs in `src/content/docs/`
- **Schema**: Check `src/content/config.ts` for the complete schema definition
- **Dev server**: Always test locally before pushing changes

Happy documenting! 🎉
