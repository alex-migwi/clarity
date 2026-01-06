// packages/shared/src/errors.ts
// Custom error classes for Clarity platform

export class LicenseRequiredError extends Error {
  constructor(feature: string, requiredTier: string) {
    super(`${feature} requires ${requiredTier} Plan license`);
    this.name = 'LicenseRequiredError';
  }
}

export class FeatureNotAvailableError extends Error {
  constructor(feature: string) {
    super(`${feature} is not available in your plan`);
    this.name = 'FeatureNotAvailableError';
  }
}

export class APIError extends Error {
  constructor(
    message: string,
    public statusCode?: number,
    public response?: any
  ) {
    super(message);
    this.name = 'APIError';
  }
}
