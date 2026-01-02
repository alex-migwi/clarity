---
title: "Using Components"
description: "Learn how to use advanced Clarity components like Callouts, Tabs, and more"
order: 31
---

# Using Advanced Components

Clarity includes powerful components to make your documentation more engaging and interactive.

## Callouts

Use callouts to highlight important information:

### Info Callout
:::note
This is an informational callout. Great for general notes and tips.
:::

### Warning Callout
:::warning
This is a warning callout. Use it to alert users about potential issues.
:::

### Danger Callout
:::danger
This is a danger callout. Use for critical warnings that need immediate attention.
:::

### Success Callout
:::tip
This is a success/tip callout. Perfect for pro tips and best practices!
:::

## Code Blocks with Copy

All code blocks automatically get a copy button on hover:

\`\`\`bash
# Clone the repository
git clone https://github.com/alex-migwi/clarity.git
cd clarity

# Install dependencies
pnpm install

# Start development server
pnpm dev
\`\`\`

### Multiple Language Examples

**JavaScript:**
\`\`\`javascript
function greet(name) {
  console.log(\`Hello, \${name}!\`);
}

greet('World');
\`\`\`

**TypeScript:**
\`\`\`typescript
function greet(name: string): void {
  console.log(\`Hello, \${name}!\`);
}

greet('World');
\`\`\`

**Python:**
\`\`\`python
def greet(name):
    print(f"Hello, {name}!")

greet("World")
\`\`\`

## Mermaid Diagrams

Create flowcharts and diagrams using Mermaid:

\`\`\`mermaid
graph TD
    A[Start] --> B{Need Components?}
    B -->|Yes| C[Use Callouts]
    B -->|Yes| D[Use Mermaid]
    C --> E[Better Docs]
    D --> E
    B -->|No| F[Continue Writing]
    E --> G[Happy Users]
    F --> G
\`\`\`

## Advanced Mermaid Examples

### Sequence Diagram

\`\`\`mermaid
sequenceDiagram
    participant User
    participant Clarity
    participant GitHub
    
    User->>Clarity: Write Documentation
    Clarity->>User: Preview Changes
    User->>GitHub: Commit & Push
    GitHub->>Clarity: Trigger Deploy
    Clarity->>User: Live Documentation
\`\`\`

### Class Diagram

\`\`\`mermaid
classDiagram
    class Documentation {
        +String title
        +String content
        +render()
        +save()
    }
    class Component {
        +String type
        +render()
    }
    Documentation --> Component
\`\`\`

## Tables

Create tables for structured data:

| Feature | Description | Status |
|---------|-------------|--------|
| Callouts | Highlight important info | ✅ Available |
| Code Blocks | Syntax highlighting | ✅ Available |
| Mermaid | Diagrams and charts | ✅ Available |
| Tables | Structured data | ✅ Available |
| Dark Mode | Theme support | ✅ Available |

## Best Practices

:::tip
**Component Guidelines:**

1. Use callouts sparingly for important information
2. Keep code examples concise and focused
3. Use Mermaid for complex workflows
4. Test all code examples before publishing
5. Provide context for each component
:::

## Next Steps

- Explore the [Configuration Guide](./configuration)
- Check out [Quick Start](../getting-started/quick-start)  
- Learn about [Getting Started](../getting-started/installation)
- Deploy with the [Deployment Guide](../deployment/index)
