# @clarity/cli

Clarity CLI for metadata collection, affected test detection, and changelog generation.

## Installation

```bash
# From the monorepo root
cd packages/cli
pnpm install
pnpm link --global

# Now 'clarity' command is available
clarity --version
```

## Usage

### Collect Metadata

Collect and upload test results, coverage, and build metadata to Clarity backend.

```bash
clarity collect \
  --license $CLARITY_LICENSE_KEY \
  --url https://api.clarity.dev \
  --test-results ./coverage/test-results.json \
  --coverage ./coverage/coverage-final.json \
  --build-status success \
  --environment production \
  --bundle-size 1234567
```

**Options:**

- `-l, --license <key>` - License key (Team or Enterprise) [required]
- `-u, --url <url>` - Backend API URL (default: http://localhost:3000)
- `-c, --commit <sha>` - Commit SHA (auto-detected from git)
- `-b, --branch <name>` - Branch name (auto-detected from git)
- `-t, --test-results <path>` - Path to test results JSON file
- `--coverage <path>` - Path to coverage JSON file (Istanbul/c8 format)
- `-e, --environment <env>` - Environment (development, staging, production)
- `--bundle-size <bytes>` - Bundle size in bytes
- `--build-status <status>` - Build status (success, failed, pending)
- `--start-time <iso>` - Build start time (ISO 8601)
- `--end-time <iso>` - Build end time (ISO 8601)

**Environment Variables:**

```bash
export CLARITY_LICENSE_KEY="team_abc123..."
export CLARITY_API_URL="https://api.clarity.dev"
```

### CI/CD Integration

#### GitHub Actions

```yaml
- name: Run tests
  run: pnpm test --reporter=json --outputFile=test-results.json

- name: Generate coverage
  run: pnpm test:coverage

- name: Upload to Clarity
  run: |
    npx @clarity/cli collect \
      --license ${{ secrets.CLARITY_LICENSE_KEY }} \
      --url https://api.clarity.dev \
      --test-results test-results.json \
      --coverage coverage/coverage-final.json \
      --environment production \
      --build-status ${{ job.status }}
```

#### GitLab CI

```yaml
test:
  script:
    - pnpm test --reporter=json --outputFile=test-results.json
    - pnpm test:coverage
    - |
      npx @clarity/cli collect \
        --license $CLARITY_LICENSE_KEY \
        --url https://api.clarity.dev \
        --test-results test-results.json \
        --coverage coverage/coverage-final.json \
        --environment production
```

## Test Results Format

The CLI supports **Vitest** and **Jest** JSON reporter formats:

```json
{
  "testResults": [
    {
      "name": "src/auth.test.ts",
      "assertionResults": [
        {
          "title": "should authenticate user",
          "status": "passed",
          "duration": 120,
          "failureMessages": []
        }
      ]
    }
  ]
}
```

**Vitest Configuration:**

```typescript
// vitest.config.ts
export default {
  test: {
    reporters: ['default', 'json'],
    outputFile: 'test-results.json'
  }
}
```

**Jest Configuration:**

```json
{
  "reporters": ["default", ["jest-json-reporter", { "outputPath": "test-results.json" }]]
}
```

## Coverage Format

The CLI supports **Istanbul** and **c8** coverage formats (coverage-final.json):

```json
{
  "/path/to/file.ts": {
    "s": { "0": 1, "1": 0 },
    "b": { "0": [1, 0] },
    "f": { "0": 1 },
    "statementMap": {},
    "branchMap": {},
    "fnMap": {}
  }
}
```

**Vitest with c8:**

```typescript
// vitest.config.ts
export default {
  test: {
    coverage: {
      provider: 'c8',
      reporter: ['json']
    }
  }
}
```

**Jest with Istanbul:**

```json
{
  "collectCoverage": true,
  "coverageReporters": ["json"]
}
```

## Coming Soon

### Affected Test Detection

```bash
clarity test --base main --head HEAD
```

Runs only tests affected by changed files (7.5x faster CI).

### Changelog Generation

```bash
clarity changelog --from v1.0.0 --to HEAD --output CHANGELOG.md
```

Auto-generates changelog from conventional commits.

### Project Initialization

```bash
clarity init --license team_abc123
```

Creates `.clarityrc` configuration file.

## Development

```bash
# Install dependencies
pnpm install

# Run tests
pnpm test

# Watch mode
pnpm test:watch
```

## License

MIT
