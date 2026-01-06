/**
 * Route Protection Configuration Loader
 * Converts glob patterns from clarity.config.ts to RegExp for middleware
 */

import { clarityConfig } from '@/config';

export type UserRole = 'owner' | 'admin' | 'editor' | 'viewer';

export interface RouteProtection {
  pattern: RegExp;
  requiredRole?: UserRole | null;
  redirectTo?: string;
}

/**
 * Convert glob pattern to RegExp
 * Supports: * (single segment), ** (multiple segments)
 */
function globToRegex(pattern: string): RegExp {
  // Escape special regex characters except * and /
  let regexPattern = pattern
    .replace(/[.+?^${}()|[\]\\]/g, '\\$&')
    .replace(/\*\*/g, '___DOUBLE_STAR___')
    .replace(/\*/g, '[^/]*')
    .replace(/___DOUBLE_STAR___/g, '.*');
  
  // Anchor pattern to start and end
  regexPattern = `^${regexPattern}$`;
  
  return new RegExp(regexPattern);
}

/**
 * Load protected routes from clarity.config.ts
 * Returns array of RouteProtection objects for middleware
 */
export function getProtectedRoutes(): RouteProtection[] {
  const config = clarityConfig.protectedRoutes;
  
  if (!config || !config.patterns) {
    return [];
  }
  
  return config.patterns.map(p => ({
    pattern: globToRegex(p.path),
    requiredRole: p.requiredRole as UserRole | null,
    redirectTo: p.requiredRole ? config.forbiddenRedirect : config.loginRedirect
  }));
}

/**
 * Check if a role has sufficient permissions
 * Role hierarchy: owner > admin > editor > viewer
 */
export function hasPermission(userRole: UserRole, requiredRole?: UserRole | null): boolean {
  if (!requiredRole) return true; // No specific role required, just authentication
  
  const roleHierarchy: Record<UserRole, number> = {
    'viewer': 1,
    'editor': 2,
    'admin': 3,
    'owner': 4
  };
  
  return roleHierarchy[userRole] >= roleHierarchy[requiredRole];
}
