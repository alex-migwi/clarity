import { defineMiddleware } from 'astro:middleware';

const BACKEND_URL = 'http://localhost:3000'; // Hardcoded for dev, will be configurable later

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
 * Check if a path is protected based on configuration patterns
 * Note: In SSR mode, we can't use getCollection, so we rely on path patterns
 */
function isProtectedPath(pathname: string): boolean {
  // Remove base path and normalize
  const cleanPath = pathname.replace(/^\/+|\/+$/g, '').replace(/^clarity-docs\//, '');
  
  console.log('[Middleware] Checking path:', pathname, '→ cleaned:', cleanPath);
  
  // Check folder-level protection patterns
  const protectedPatterns = [
    /^docs\/guides\/team-docs$/,  // Specific protected page
    /^docs\/internal\/.*/,         // All internal docs
    /^docs\/team\/.*/,             // All team docs
  ];
  
  const isProtected = protectedPatterns.some(pattern => pattern.test(cleanPath));
  console.log('[Middleware] Is protected:', isProtected);
  
  return isProtected;
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
 * Astro Middleware for Route Protection
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
  
  // Check if current path is protected
  const isProtected = isProtectedPath(pathname);
  
  if (isProtected) {
    // Validate session
    const { isAuthenticated, user } = await validateSession(context.request);
    
    if (!isAuthenticated) {
      // Store intended URL for post-login redirect
      const intendedUrl = context.url.pathname + (context.url.search || '');
      const loginPath = `${base}login`.replace(/\/+/g, '/');
      const redirectUrl = `${loginPath}?redirect=${encodeURIComponent(intendedUrl)}`;
      
      console.log('[Middleware] Redirecting to:', redirectUrl);
      return context.redirect(redirectUrl, 302);
    }
    
    // Attach user to locals for use in pages
    context.locals.user = user;
  }
  
  // Allow request to proceed
  return next();
});
