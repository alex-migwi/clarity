# Manual Testing Guide - Protected Documentation (v1.1)

**Date**: December 9, 2025  
**Feature**: Protected Documentation Middleware  
**Estimated Time**: 15-20 minutes

## Prerequisites Checklist

Before starting tests, ensure:

- [ ] Backend server running: `cd backend && npm start`
  - Should see: "Backend server running on http://localhost:3000"
- [ ] Frontend server running: `cd . && pnpm dev`
  - Should see: "astro v5.x.x started in Xms"
  - Local: http://localhost:4321/clarity-docs/
- [ ] OAuth credentials configured in `backend/.env`
- [ ] Browser with incognito/private mode available

---

## Test Suite

### ✅ Test 1: Public Page Access (Baseline)

**Objective**: Verify public pages work without authentication

**Steps**:
1. Open browser in **incognito/private mode**
2. Navigate to: `http://localhost:4321/clarity-docs/docs/introduction`
3. Observe page behavior

**Expected Result**:
- ✅ Page loads immediately
- ✅ No redirect occurs
- ✅ Content is visible
- ✅ No authentication required

**Actual Result**: ________________

**Status**: [ ] PASS [ ] FAIL

---

### ✅ Test 2: Protected Page Redirect (Unauthenticated)

**Objective**: Verify protected pages redirect to login when not authenticated

**Steps**:
1. In same incognito session (still unauthenticated)
2. Navigate to: `http://localhost:4321/clarity-docs/docs/guides/team-docs`
3. Observe URL change

**Expected Result**:
- ✅ Browser redirects to `/clarity-docs/login`
- ✅ URL contains `?redirect=/clarity-docs/docs/guides/team-docs`
- ✅ Login page displays with OAuth buttons
- ✅ Original content NOT visible

**Actual Result**: ________________

**URL After Redirect**: ________________

**Status**: [ ] PASS [ ] FAIL

---

### ✅ Test 3: Folder-Level Protection

**Objective**: Verify folder patterns protect all nested pages

**Steps**:
1. In same incognito session
2. Navigate to: `http://localhost:4321/clarity-docs/docs/internal/index`
3. Then try: `http://localhost:4321/clarity-docs/docs/internal/security`

**Expected Result**:
- ✅ Both pages redirect to login
- ✅ Each has correct `?redirect` parameter
- ✅ Pattern `/docs/internal/*` is protected

**Actual Result**: ________________

**Status**: [ ] PASS [ ] FAIL

---

### ✅ Test 4: OAuth Login Flow

**Objective**: Complete authentication and verify redirect back

**Steps**:
1. From login page (with redirect parameter from Test 2)
2. Click "Login with Google" or "Login with GitHub"
3. Complete OAuth authorization
4. Observe final destination

**Expected Result**:
- ✅ OAuth consent screen appears
- ✅ After authorizing, redirects to backend
- ✅ Backend redirects back to **original protected page**
- ✅ Protected content now visible
- ✅ URL is: `http://localhost:4321/clarity-docs/docs/guides/team-docs`

**Actual Result**: ________________

**Final URL**: ________________

**Status**: [ ] PASS [ ] FAIL

---

### ✅ Test 5: Authenticated Direct Access

**Objective**: Verify authenticated users can directly access protected pages

**Steps**:
1. With active session from Test 4
2. Navigate directly to: `http://localhost:4321/clarity-docs/docs/internal/security`
3. Observe behavior

**Expected Result**:
- ✅ Page loads immediately
- ✅ NO redirect to login
- ✅ Content visible
- ✅ No authentication challenge

**Actual Result**: ________________

**Status**: [ ] PASS [ ] FAIL

---

### ✅ Test 6: Session Persistence

**Objective**: Verify session persists across page refreshes

**Steps**:
1. While viewing protected page from Test 5
2. Refresh page (F5 or Cmd+R)
3. Navigate to another protected page
4. Close and reopen browser tab (keeping session)

**Expected Result**:
- ✅ Refresh: Page reloads without redirect
- ✅ Navigation: New protected page loads directly
- ✅ Reopen tab: Session still valid (within 24h)

**Actual Result**: ________________

**Status**: [ ] PASS [ ] FAIL

---

### ✅ Test 7: Mixed Public/Protected Navigation

**Objective**: Verify seamless navigation between public and protected content

**Steps**:
1. With active session
2. Navigate: Introduction (public) → Team Docs (protected) → Getting Started (public) → Internal Security (protected)
3. Use sidebar navigation

**Expected Result**:
- ✅ All pages load without unexpected redirects
- ✅ Protected pages accessible
- ✅ Public pages accessible
- ✅ Sidebar highlights current page

**Actual Result**: ________________

**Status**: [ ] PASS [ ] FAIL

---

### ✅ Test 8: Logout and Re-Protection

**Objective**: Verify logout invalidates session

**Steps**:
1. While authenticated, navigate to: `http://localhost:3000/auth/logout`
2. Then try accessing: `http://localhost:4321/clarity-docs/docs/guides/team-docs`

**Expected Result**:
- ✅ Logout redirects to login page
- ✅ Subsequent protected page access triggers auth
- ✅ Session is cleared

**Actual Result**: ________________

**Status**: [ ] PASS [ ] FAIL

---

## Test Results Summary

**Total Tests**: 8  
**Passed**: _____  
**Failed**: _____  
**Pass Rate**: _____%

### Critical Issues Found

1. ________________________________________________
2. ________________________________________________
3. ________________________________________________

### Non-Critical Issues

1. ________________________________________________
2. ________________________________________________

---

## Performance Observations

- **Redirect Speed**: _____ ms (should be < 100ms)
- **Session Check Latency**: _____ ms (first check, should be < 200ms)
- **Cached Session Check**: _____ ms (should be < 10ms)
- **Page Load Impact**: [ ] Negligible [ ] Noticeable [ ] Significant

---

## Browser Compatibility

Test in multiple browsers:

- [ ] Chrome/Edge (Chromium)
- [ ] Firefox
- [ ] Safari (if on Mac)

---

## Sign-Off

**Tested By**: ________________  
**Date**: ________________  
**Environment**: [ ] Local Dev [ ] Staging [ ] Production  
**Approved**: [ ] YES [ ] NO (see issues above)

---

## Next Steps After All Tests Pass

1. [ ] Update `.roadmap/v1.1-team-plan-mvp.md` - mark all subtasks complete
2. [ ] Commit changes: `git add . && git commit -m "feat: implement protected documentation middleware (v1.1)"`
3. [ ] Push branch: `git push origin feature/v1.1-protected-docs`
4. [ ] Begin Week 2-3: User Management Dashboard implementation

---

## Troubleshooting

### Issue: "Cannot connect to backend"
**Solution**: Ensure backend is running on port 3000. Check `backend/.env` exists.

### Issue: "CORS error in console"
**Solution**: Verify CORS settings in `backend/server.js` allow `http://localhost:4321`.

### Issue: "Infinite redirect loop"
**Solution**: Check base path in `astro.config.mjs` matches actual deployment.

### Issue: "404 on protected pages"
**Solution**: Restart dev server to rebuild Content Collections with new schema.

### Issue: "Session not persisting"
**Solution**: Check browser allows cookies. Verify `credentials: 'include'` in middleware.
