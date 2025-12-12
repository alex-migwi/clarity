# Protected Documentation Testing Guide

**Feature**: v1.1 Protected Documentation  
**Date**: December 9, 2025  
**Status**: Ready for Testing

## Prerequisites

1. ✅ Backend server running on `http://localhost:3000`
2. ✅ Frontend server running on `http://localhost:4321`
3. OAuth credentials configured in `backend/.env`:
   - `GOOGLE_CLIENT_ID`
   - `GOOGLE_CLIENT_SECRET`
   - `GITHUB_CLIENT_ID`
   - `GITHUB_CLIENT_SECRET`

## Test Protected Pages Created

1. `/docs/guides/team-docs` - Individual protected page
2. `/docs/internal/index` - Folder-level protection
3. `/docs/internal/security` - Nested protected page

## Manual Testing Checklist

### Test 1: Unauthenticated Access to Protected Page

**Steps:**
1. Open browser in incognito/private mode
2. Navigate to `http://localhost:4321/clarity-docs/docs/guides/team-docs`

**Expected:**
- ✅ Should redirect to `/login?redirect=/clarity-docs/docs/guides/team-docs`
- ✅ Login page should display
- ✅ Redirect parameter preserved in URL

**Status:** [ ] Pass [ ] Fail

---

### Test 2: Public Page Access (Unauthenticated)

**Steps:**
1. In same incognito session
2. Navigate to `http://localhost:4321/clarity-docs/docs/introduction`

**Expected:**
- ✅ Page loads without redirect
- ✅ No authentication required
- ✅ Content displays normally

**Status:** [ ] Pass [ ] Fail

---

### Test 3: Login and Redirect Flow

**Steps:**
1. From login page (with redirect parameter)
2. Click "Login with Google" or "Login with GitHub"
3. Complete OAuth flow

**Expected:**
- ✅ OAuth consent screen appears
- ✅ After authorization, redirects back to intended page
- ✅ Protected content now visible
- ✅ Session persists (check by refreshing page)

**Status:** [ ] Pass [ ] Fail

---

### Test 4: Authenticated Direct Access

**Steps:**
1. With active session (from Test 3)
2. Navigate directly to `http://localhost:4321/clarity-docs/docs/internal/security`

**Expected:**
- ✅ Page loads immediately
- ✅ No redirect to login
- ✅ Content visible

**Status:** [ ] Pass [ ] Fail

---

### Test 5: Folder-Level Protection

**Steps:**
1. Access all pages in `/docs/internal/` folder

**Expected:**
- ✅ `/docs/internal/index` requires auth
- ✅ `/docs/internal/security` requires auth
- ✅ All internal pages protected

**Status:** [ ] Pass [ ] Fail

---

### Test 6: Session Expiry (Advanced)

**Steps:**
1. While authenticated, clear backend session cookie
2. Try accessing protected page

**Expected:**
- ✅ Redirects to login
- ✅ Session validation fails gracefully
- ✅ No errors in console

**Status:** [ ] Pass [ ] Fail

---

### Test 7: Mixed Public/Protected Navigation

**Steps:**
1. Navigate between protected and public pages
2. Test sidebar navigation

**Expected:**
- ✅ Can freely navigate public pages
- ✅ Protected pages trigger auth check
- ✅ No unnecessary redirects

**Status:** [ ] Pass [ ] Fail

---

## Known Issues

- [ ] None yet

## Browser Compatibility

Test in:
- [ ] Chrome/Edge
- [ ] Firefox
- [ ] Safari

## Performance Notes

- Session cache: 5 minutes
- Backend response time: ~50ms
- Middleware overhead: Minimal

## Next Steps

After tests pass:
1. Mark tasks complete in `.roadmap/v1.1-team-plan-mvp.md`
2. Add protected content examples to documentation
3. Update README with authentication instructions
4. Create demo video showing protected pages flow

## Troubleshooting

### Issue: "Not authenticated" even after login

**Fix:** Check CORS settings in backend - ensure `credentials: true`

### Issue: Infinite redirect loop

**Fix:** Check base path configuration in `astro.config.mjs`

### Issue: 404 on protected pages

**Fix:** Ensure Content Collections rebuilt - restart dev server

---

## Automated Tests (Future)

For CI/CD pipeline:
1. Playwright tests for redirect flow
2. Unit tests for middleware logic
3. Integration tests for session validation
