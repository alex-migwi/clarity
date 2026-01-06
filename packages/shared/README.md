# @clarity/shared

**Shared Utilities** (Private)

Common utilities used by `@clarity/team` and `@clarity/enterprise` packages.

## Purpose

This package contains utilities that are:
- ✅ Used by BOTH team and enterprise packages
- ✅ Too sensitive to be in public core package
- ❌ NOT used by core (core must remain standalone)

## What Goes Here

### License Management
```typescript
// Validate license keys against backend API
export async function validateLicense(key: string): Promise<LicenseInfo>
export function getLicenseTier(key: string): 'free' | 'team' | 'enterprise'
```

### API Client
```typescript
// Shared HTTP client for platform API (api.clarity.dev)
export class ClarityAPIClient {
  constructor(apiKey: string)
  async get(path: string): Promise<Response>
  async post(path: string, data: any): Promise<Response>
}
```

### Encryption Utilities
```typescript
// For HIPAA-compliant data handling
export function encryptPHI(data: string, key: string): string
export function decryptPHI(encrypted: string, key: string): string
export function hashForAudit(data: any): string
```

### Error Handling
```typescript
// Consistent error responses for paid features
export class LicenseRequiredError extends Error
export class FeatureNotAvailableError extends Error
```

## Architecture

**Import Pattern:**
```typescript
// ✅ Team and Enterprise can import shared
import { validateLicense } from '@clarity/shared';

// ❌ Core CANNOT import shared
// ❌ Shared should NOT import from team/enterprise
```

**Dependency Flow:**
```
core (public) ← team (private) ← enterprise (private)
                  ↑                    ↑
                  └─── shared (private) ─┘
```

## Package Structure (To Be Implemented)

```
packages/shared/
├── README.md (this file)
├── src/
│   ├── license/
│   │   ├── validate.ts
│   │   └── tier.ts
│   ├── api/
│   │   └── client.ts
│   ├── crypto/
│   │   ├── encrypt.ts
│   │   └── hash.ts
│   └── errors/
│       └── custom-errors.ts
└── package.json
```

## Status

🚧 **Placeholder** - To be implemented alongside team/enterprise packages

## License

Proprietary - Not included in public GitHub repository
