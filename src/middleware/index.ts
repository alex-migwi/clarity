import { defineMiddleware } from 'astro:middleware';
import { getProtectedRoutes, hasPermission, type UserRole, type RouteProtection } from '../lib/route-protection';

const BACKEND_URL = import.meta.env.PUBLIC_BACKEND_URL || 'http://localhost:3000';

/**
 * Session cache to avoid redundant backend calls
 * Cache for 5 minutes per session
 */
interface SessionCache {
  isAuthenticated: boolean;
  user: any | null;
  timestamp: number;
}

const sessionCache = new Map<string, SessionCache>();
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

/**
 * Load protected routes from config
 */
const protectedRoutes: RouteProtection[] = getProtectedRoutes();

/**
 * Check if a path is protected and get requirements
 */
function getRouteProtection(pathname: string): RouteProtection | null {
  // Remove base path and normalize
  const base = import.meta.env.BASE_URL || '/';
  let cleanPath = pathname;
  
  // Remove base path if present
  if (base !== '/' && pathname.startsWith(base)) {
    cleanPath = pathname.substring(base.length);
  }
  
  // Ensure leading slash
  if (!cleanPath.startsWith('/')) {
    cleanPath = '/' + cleanPath;
  }
  
  console.log('[Middleware] Checking path:', pathname, '→ cleaned:', cleanPath);
  
  for (const route of protectedRoutes) {
    if (route.pattern.test(cleanPath)) {
      console.log('[Middleware] Matched protected route:', route.pattern);
      return route;
    }
  }
  
  return null;
}

/**
 * Validate session with backend
 */
async function validateSession(request: Request): Promise<{ isAuthenticated: boolean; user: any | null }> {
  try {
    // Extract session cookie
    const cookies = request.headers.get('cookie');
    
    if (!cookies) {
      return { isAuthenticated: false, user: null };
    }
    
    // Check cache first
    const cachedSession = sessionCache.get(cookies);
    if (cachedSession && Date.now() - cachedSession.timestamp < CACHE_DURATION) {
      return { isAuthenticated: cachedSession.isAuthenticated, user: cachedSession.user };
    }
    
    // Validate with backend
    const response = await fetch(`${BACKEND_URL}/auth/user`, {
      headers: {
        'Cookie': cookies,
      },
      credentials: 'include',
    });
    
    if (response.ok) {
      const user = await response.json();
      
      // Cache the result
      sessionCache.set(cookies, {
        isAuthenticated: true,
        user,
        timestamp: Date.now(),
      });
      
      return { isAuthenticated: true, user };
    } else {
      // Cache negative result too
      sessionCache.set(cookies, {
        isAuthenticated: false,
        user: null,
        timestamp: Date.now(),
      });
      
      return { isAuthenticated: false, user: null };
    }
  } catch (error) {
    console.error('Session validation error:', error);
    return { isAuthenticated: false, user: null };
  }
}

/**
 * Astro Middleware for Route Protection with RBAC
 */
export const onRequest = defineMiddleware(async (context, next) => {
  const { pathname } = context.url;
  const base = import.meta.env.BASE_URL || '/';
  
  // Skip middleware for static assets and API routes
  if (
    pathname.startsWith('/_astro/') ||
    pathname.startsWith('/assets/') ||
    pathname.match(/\.(jpg|jpeg|png|gif|svg|ico|css|js|json|xml|txt)$/) ||
    pathname.startsWith('/api/')
  ) {
    return next();
  }
  
  // Check if current path requires protection
  const routeProtection = getRouteProtection(pathname);
  
  if (routeProtection) {
    // Validate session
    const { isAuthenticated, user } = await validateSession(context.request);
    
    if (!isAuthenticated) {
      // Not authenticated - redirect to login
      const intendedUrl = context.url.pathname + (context.url.search || '');
      const loginPath = `${base}login`.replace(/\/+/g, '/');
      const redirectUrl = `${loginPath}?redirect=${encodeURIComponent(intendedUrl)}`;
      
      console.log('[Middleware] Not authenticated, redirecting to:', redirectUrl);
      return context.redirect(redirectUrl, 302);
    }
    
    // Check role permissions
    const userRole = user.role as UserRole || 'viewer';
    const hasAccess = hasPermission(userRole, routeProtection.requiredRole);
    
    console.log('[Middleware] Role check:', {
      path: pathname,
      userRole,
      requiredRole: routeProtection.requiredRole,
      hasAccess,
      isOwner: user.isOwner,
      userEmail: user.email
    });
    
    if (!hasAccess) {
      // Insufficient permissions
      console.error('[Middleware] ACCESS DENIED. User role:', userRole, 'Required:', routeProtection.requiredRole);
      
      const redirectPath = routeProtection.redirectTo 
        ? `${base}${routeProtection.redirectTo}`.replace(/\/+/g, '/')
        : `${base}403`.replace(/\/+/g, '/'); // Forbidden page
      
      return context.redirect(redirectPath, 403);
    }
    
    // Attach user to locals for use in pages
    context.locals.user = user;
    console.log('[Middleware] Access granted. User:', user.email, 'Role:', userRole);
  }
  
  // Allow request to proceed
  return next();
});
