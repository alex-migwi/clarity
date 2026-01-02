---
title: Getting Started
description: Learn how to set up and use Clarity.
order: 10
draft: false
image: ""
---

# Getting Started with Clarity

This guide will help you set up Clarity locally and start creating documentation.

## Prerequisites

Before you begin, ensure you have:

- **Node.js 18+** installed on your system
- **pnpm** package manager (`npm install -g pnpm`)
- A code editor (VS Code recommended)
- Git for version control

## Installation

### 1. Clone the Repository

```bash
git clone https://github.com/alex-migwi/clarity.git
cd clarity
```

### 2. Install Dependencies

Install both frontend and backend dependencies:

```bash
# Frontend dependencies
pnpm install

# Backend dependencies (for authentication)
cd backend
npm install
cd ..
```

### 3. Configure Environment Variables

Create environment files from the examples:

```bash
# Frontend environment
cp .env.example .env

# Backend environment
cp backend/.env.example backend/.env
```

Edit `.env` with your site information:

```bash
PUBLIC_SITE_URL=http://localhost:4321
CLARITY_GITHUB_REPO=your-username/your-repo
```

For now, you can skip the OAuth configuration in `backend/.env` if you're just exploring.

## Running Locally

### Development Mode

Start the development server:

```bash
pnpm dev
```

Your site will be available at `http://localhost:4321`

### With Authentication

If you want to test authentication features:

```bash
# Terminal 1 - Start backend
pnpm backend:dev

# Terminal 2 - Start frontend
pnpm dev
```

## Project Structure

```
clarity/
├── src/
│   ├── components/     # Reusable UI components
│   ├── content/
│   │   └── docs/       # Your documentation files (Markdown)
│   ├── layouts/        # Page layouts
│   ├── pages/          # Route pages
│   └── styles/         # Global styles
├── backend/            # Authentication server
├── public/             # Static assets
├── scripts/            # Build scripts
└── clarity.config.ts   # Main configuration file
```

## Creating Your First Doc

Add a new markdown file in `src/content/docs/`:

```markdown
---
title: My First Document
description: This is my first Clarity document
order: 100
draft: false
---

# My First Document

Welcome to my documentation!

## Getting Started

Your content here...
```

The file will automatically appear in the sidebar.

## Building for Production

Create an optimized production build:

```bash
pnpm build
```

The built site will be in the `dist/` folder.

## Next Steps

- **Customize**: Edit `clarity.config.ts` to brand Clarity for your team
- **Add Content**: Create markdown files in `src/content/docs/`
- **Learn Features**: Check out [Using Components](../reference/components)
- **Deploy**: Follow the [Deployment Guide](../deployment/index)
- **Authentication**: Set up [OAuth Authentication](./authentication)

## Getting Help

If you run into issues:

- Check the [Configuration Guide](../reference/configuration)
- Review the [Deployment Guide](../deployment/index)
- Open an issue on GitHub
- Check existing documentation
