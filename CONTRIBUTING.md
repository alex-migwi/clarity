# Contributing to Clarity

Thank you for your interest in contributing to Clarity!

## Development Setup

1. Fork the repository
2. Clone your fork: `git clone https://github.com/YOUR_USERNAME/clarity.git`
3. Install dependencies: `pnpm install`
4. Create a branch: `git checkout -b feature/your-feature`
5. Make your changes
6. Test locally: `pnpm dev`
7. Commit and push
8. Open a Pull Request

## Keeping Your Fork in Sync

Use GitHub's **"Sync fork"** button to stay updated:

1. Go to your fork on GitHub
2. Click **"Sync fork"** → **"Update branch"**

That's it! GitHub handles everything automatically.

### Alternative: Command Line

```bash
# One-time setup
git remote add upstream https://github.com/alex-migwi/clarity.git

# Sync process
git fetch upstream
git checkout main
git merge upstream/main
git push origin main
```

## Development Workflow

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/my-feature`
3. Make your changes
4. Bump version if needed: `npm version patch`
5. Commit: `git commit -m "feat: add new feature"`
6. Push: `git push origin feature/my-feature`
7. Create a Pull Request

## Commit Convention

We use [Conventional Commits](https://www.conventionalcommits.org/):

```
feat: add new feature
fix: resolve bug in component
docs: update README
chore: update dependencies
refactor: restructure code
test: add unit tests
```

## Questions?

- Open an issue for bugs or feature requests
- Check existing issues before creating new ones
- Tag issues with appropriate labels

Thank you for contributing! 🎉
