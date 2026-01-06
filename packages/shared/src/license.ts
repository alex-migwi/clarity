// packages/shared/src/license.ts
// Shared license validation utilities

export type LicenseTier = 'free' | 'team' | 'enterprise';

export interface License {
  tier: LicenseTier;
  valid: boolean;
  expiresAt?: string;
}

/**
 * Parse license key to determine tier (mock implementation)
 */
export function parseLicenseKey(key: string): LicenseTier {
  if (key.startsWith('enterprise_')) return 'enterprise';
  if (key.startsWith('team_')) return 'team';
  return 'free';
}

/**
 * Check if license key is expired (mock implementation)
 */
export function isLicenseExpired(expiresAt?: string): boolean {
  if (!expiresAt) return false;
  return new Date(expiresAt) < new Date();
}

/**
 * Validate license against backend API
 * 
 * POST http://localhost:3000/api/license/validate
 */
export async function validateLicense(key: string): Promise<License> {
  try {
    // Use environment variable or default to localhost
    const backendUrl = process.env.CLARITY_BACKEND_URL || 'http://localhost:3000';
    
    const response = await fetch(`${backendUrl}/api/license/validate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ key }),
    });

    const data = await response.json();
    
    if (!data.valid) {
      return {
        valid: false,
        tier: 'free',
        expiresAt: undefined,
      };
    }

    return {
      valid: true,
      tier: data.tier as LicenseTier,
      expiresAt: data.expiresAt,
    };
  } catch (error) {
    console.error('License validation error:', error);
    // Fallback to free tier on error
    return {
      valid: false,
      tier: 'free',
    };
  }
}
