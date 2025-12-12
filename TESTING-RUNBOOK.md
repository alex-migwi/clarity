# Clarity Testing Runbook

**Version**: 1.0  
**Last Updated**: December 9, 2025  
**Purpose**: Comprehensive testing checklist for validating each roadmap milestone

---

## 📋 Table of Contents

1. [Testing Principles](#testing-principles)
2. [Pre-Release Checklist](#pre-release-checklist)
3. [v1.0 - Current State Testing](#v10---current-state-testing)
4. [v1.1 - Team Plan MVP + CLI Testing](#v11---team-plan-mvp--cli-testing)
5. [v1.2 - Community Growth Testing](#v12---community-growth-testing)
6. [v1.3 - Advanced Features Testing](#v13---advanced-features-testing)
7. [v2.0 - Enterprise Testing](#v20---enterprise-testing)
8. [Performance Benchmarks](#performance-benchmarks)
9. [Security Testing](#security-testing)
10. [Browser Compatibility](#browser-compatibility)

---

## Testing Principles

### Test Environments

- **Local**: Developer machine (http://localhost:4321)
- **Staging**: Preview deployment (Vercel/Netlify preview)
- **Production**: Live site (docs.clarity.com)

### Test Data

- **Users**: Create test accounts for Google/GitHub OAuth
- **Content**: Use sample docs from multiple categories
- **Teams**: Create test organizations with 5-15 members

### Testing Levels

- ✅ **P0 (Blocker)**: Must pass before release
- ⚠️ **P1 (High)**: Should pass, can fix in hotfix
- ℹ️ **P2 (Medium)**: Nice to have, can defer to next release

---

## Pre-Release Checklist

### Code Quality
- [ ] All tests passing (`pnpm test`)
- [ ] No TypeScript errors (`pnpm type-check`)
- [ ] No ESLint warnings (`pnpm lint`)
- [ ] Code reviewed by at least one person
- [ ] Changelog updated with new features/fixes

### Documentation
- [ ] README.md updated
- [ ] User-facing docs updated
- [ ] API documentation updated (if applicable)
- [ ] Migration guide created (if breaking changes)

### Infrastructure
- [ ] Environment variables documented
- [ ] Deployment scripts tested
- [ ] Backup procedures verified
- [ ] Rollback plan documented

### Communication
- [ ] Release notes drafted
- [ ] Customer communication prepared
- [ ] Support team briefed on new features
- [ ] Known issues documented

---

## v1.0 - Current State Testing

**Status**: ✅ Released December 2025

### Core Features Testing

#### 1. Authentication (P0)
- [ ] **Google OAuth Login**
  - [ ] Click "Login with Google" redirects to Google
  - [ ] Authorize app and redirect back to dashboard
  - [ ] User info displayed correctly (name, email, avatar)
  - [ ] Session persists across page refreshes
  - [ ] Logout clears session and redirects to login

- [ ] **GitHub OAuth Login**
  - [ ] Click "Login with GitHub" redirects to GitHub
  - [ ] Authorize app and redirect back to dashboard
  - [ ] User info displayed correctly
  - [ ] Session persists across page refreshes
  - [ ] Logout clears session

- [ ] **Session Management**
  - [ ] Session expires after 24 hours
  - [ ] Expired session redirects to login
  - [ ] Multiple tabs share session state
  - [ ] Secure cookies set in production

#### 2. Search Functionality (P0)
- [ ] **Search Modal**
  - [ ] ⌘K (Mac) / Ctrl+K (Windows) opens search
  - [ ] Escape key closes search
  - [ ] Click outside closes search
  - [ ] Search input auto-focuses on open

- [ ] **Search Results**
  - [ ] Results appear as user types (< 300ms)
  - [ ] Results show page title and excerpt
  - [ ] Matching text is highlighted
  - [ ] Empty state shows "No results found"
  - [ ] Results limited to 10 items

- [ ] **Navigation**
  - [ ] Arrow keys navigate results
  - [ ] Enter key opens selected result
  - [ ] Click on result opens page
  - [ ] Search closes after selection

#### 3. Documentation Pages (P0)
- [ ] **Page Rendering**
  - [ ] Markdown renders correctly
  - [ ] Code blocks have syntax highlighting
  - [ ] Headings generate TOC entries
  - [ ] Images load and display
  - [ ] Links are clickable

- [ ] **Navigation Components**
  - [ ] Breadcrumbs show correct path
  - [ ] Sidebar highlights current page
  - [ ] TOC highlights current section on scroll
  - [ ] Prev/Next buttons work correctly
  - [ ] Edit on GitHub link points to correct file

- [ ] **Interactive Features**
  - [ ] Copy code button copies to clipboard
  - [ ] Copy shows "Copied!" confirmation
  - [ ] Feedback widget displays
  - [ ] Theme toggle switches light/dark mode

#### 4. Theme System (P0)
- [ ] **Theme Toggle**
  - [ ] Toggle switches between light/dark
  - [ ] Preference saved to localStorage
  - [ ] Theme persists across page loads
  - [ ] System preference detected on first visit
  - [ ] Smooth transition animation

- [ ] **Theme Consistency**
  - [ ] All pages respect theme setting
  - [ ] No flash of unstyled content
  - [ ] Code blocks use appropriate theme
  - [ ] Colors meet WCAG contrast ratios

#### 5. Components (P1)
- [ ] **Callouts**
  - [ ] Info callout renders with blue styling
  - [ ] Warning callout renders with yellow styling
  - [ ] Danger callout renders with red styling
  - [ ] Success callout renders with green styling
  - [ ] Tip callout renders correctly

- [ ] **Tabs**
  - [ ] Tab buttons render correctly
  - [ ] Click switches active tab
  - [ ] Default tab shows on load
  - [ ] Content switches without page reload

- [ ] **Mermaid Diagrams**
  - [ ] Diagrams render correctly
  - [ ] Theme-aware (light/dark mode)
  - [ ] Syntax errors show error message
  - [ ] Complex diagrams don't break layout

#### 6. Mobile Responsiveness (P0)
- [ ] **Layout**
  - [ ] Hamburger menu appears on mobile
  - [ ] Sidebar toggles on menu click
  - [ ] Content readable on small screens
  - [ ] Touch targets are 44px minimum

- [ ] **Navigation**
  - [ ] Mobile menu overlay works
  - [ ] Sidebar closes after selection
  - [ ] TOC accessible on mobile
  - [ ] Search works on mobile

#### 7. SEO (P1)
- [ ] **Meta Tags**
  - [ ] Page titles are unique and descriptive
  - [ ] Meta descriptions present
  - [ ] Open Graph tags set correctly
  - [ ] Twitter Card tags set correctly

- [ ] **Sitemap**
  - [ ] sitemap.xml generates correctly
  - [ ] All pages included in sitemap
  - [ ] lastmod dates are correct
  - [ ] robots.txt allows crawling

#### 8. Performance (P0)
- [ ] **Load Times**
  - [ ] Homepage loads < 2 seconds
  - [ ] Doc pages load < 2 seconds
  - [ ] Search index loads < 500ms
  - [ ] Images are optimized

- [ ] **Build**
  - [ ] `pnpm build` completes successfully
  - [ ] No warnings in build output
  - [ ] Search index generates
  - [ ] Static files output to dist/

---

## v1.1 - Team Plan MVP + CLI Testing

**Target**: Q1 2026 (January - March)

### Team Plan Features Testing

#### 1. Protected Documentation (P0)

**Setup:**
- Create test docs with `protected: true` in frontmatter
- Create test user accounts (authenticated and unauthenticated)

**Tests:**
- [ ] **Route Protection**
  - [ ] Protected pages redirect to login when not authenticated
  - [ ] Authenticated users can access protected pages
  - [ ] Public pages accessible without authentication
  - [ ] Redirect back to intended page after login

- [ ] **Middleware**
  - [ ] Astro middleware intercepts protected routes
  - [ ] Session validation works correctly
  - [ ] Expired sessions redirect to login
  - [ ] Error messages are user-friendly

- [ ] **Configuration**
  - [ ] `protected: true` in frontmatter works
  - [ ] Folder-level protection works (e.g., `/docs/internal/*`)
  - [ ] Nested protected pages inherit protection
  - [ ] Mixed public/protected pages work together

#### 2. User Management Dashboard (P0)

**Tests:**
- [ ] **Admin Panel**
  - [ ] Dashboard accessible at `/admin` or `/team`
  - [ ] Only admins can access dashboard
  - [ ] User list displays all team members
  - [ ] User info shows name, email, role, status

- [ ] **Add Users**
  - [ ] "Invite User" button opens form
  - [ ] Email validation works
  - [ ] Role selection (Admin, Editor, Viewer) works
  - [ ] Invitation email sent successfully
  - [ ] Pending invitations show in list
  - [ ] User limit enforced (5 users in MVP)

- [ ] **Remove Users**
  - [ ] "Remove" button prompts confirmation
  - [ ] User removed from database
  - [ ] User session invalidated immediately
  - [ ] Cannot remove last admin
  - [ ] Removed user cannot access protected docs

- [ ] **Edit Users**
  - [ ] Role can be changed
  - [ ] Email cannot be changed (unique identifier)
  - [ ] Changes reflect immediately
  - [ ] Audit log records changes

#### 3. Basic Analytics Dashboard (P0)

**Setup:**
- Generate test analytics data (page views, searches)
- Create multiple pages with varying traffic

**Tests:**
- [ ] **Page View Tracking**
  - [ ] Page views tracked on each visit
  - [ ] Views recorded with timestamp
  - [ ] User ID associated with view (if authenticated)
  - [ ] Anonymous views tracked separately

- [ ] **Analytics Dashboard**
  - [ ] Dashboard shows total page views
  - [ ] Popular pages list (top 10)
  - [ ] Search analytics (top searches)
  - [ ] Date range filter works (7 days, 30 days, all time)

- [ ] **Reports**
  - [ ] Weekly summary shows metrics
  - [ ] Monthly report generated correctly
  - [ ] Export to CSV works
  - [ ] Data is accurate (matches raw data)

- [ ] **Performance**
  - [ ] Dashboard loads < 2 seconds
  - [ ] Large datasets don't crash UI
  - [ ] Charts render correctly
  - [ ] Real-time updates work (if implemented)

#### 4. Stripe Integration (P0)

**Setup:**
- Use Stripe test mode
- Create test customer accounts
- Test credit cards (4242 4242 4242 4242)

**Tests:**
- [ ] **Subscription Checkout**
  - [ ] "Upgrade to Team Plan" button redirects to Stripe
  - [ ] Checkout form displays correctly
  - [ ] Test payment succeeds
  - [ ] Redirects back to dashboard after payment
  - [ ] Subscription status updates in database

- [ ] **Customer Portal**
  - [ ] "Manage Billing" link opens portal
  - [ ] Can view invoices
  - [ ] Can update payment method
  - [ ] Can cancel subscription
  - [ ] Portal accessible only to admins

- [ ] **Webhook Handlers**
  - [ ] `customer.subscription.created` webhook works
  - [ ] `customer.subscription.updated` webhook works
  - [ ] `customer.subscription.deleted` webhook works
  - [ ] `invoice.payment_succeeded` webhook works
  - [ ] `invoice.payment_failed` webhook works

- [ ] **License Validation**
  - [ ] Active subscription unlocks Team features
  - [ ] Expired subscription locks Team features
  - [ ] Trial period works (14 days)
  - [ ] Grace period after failed payment (3 days)

- [ ] **Edge Cases**
  - [ ] Payment failure shows error message
  - [ ] Duplicate payments prevented
  - [ ] Refunds processed correctly
  - [ ] Subscription changes prorated

#### 5. Custom Branding (P1)

**Tests:**
- [ ] **Logo Upload**
  - [ ] Upload form accepts PNG, SVG, JPG
  - [ ] File size limit enforced (2MB)
  - [ ] Logo preview shows before save
  - [ ] Logo replaces default on all pages
  - [ ] Logo stored securely

- [ ] **Color Customization**
  - [ ] Color picker displays
  - [ ] Preview shows changes in real-time
  - [ ] CSS variables update correctly
  - [ ] Colors persist across sessions
  - [ ] Dark mode respects custom colors

- [ ] **Footer Customization**
  - [ ] Custom footer content saves
  - [ ] HTML/markdown supported
  - [ ] Links work correctly
  - [ ] "Powered by Clarity" can be removed (Team Plan)

### CLI Testing

#### 1. Project Scaffolding (P0)

**Tests:**
- [ ] **Installation**
  - [ ] `npm create clarity@latest` works
  - [ ] Package downloads and installs
  - [ ] CLI prompts display correctly
  - [ ] Works on Mac, Windows, Linux

- [ ] **Interactive Wizard**
  - [ ] Site name prompt accepts input
  - [ ] Description prompt accepts input
  - [ ] Template selection shows options (basic/team/enterprise)
  - [ ] Auth provider selection works (Google/GitHub/None)
  - [ ] Deployment target selection works (Vercel/Netlify/GitHub Pages)

- [ ] **Project Generation**
  - [ ] Project folder created
  - [ ] All files copied correctly
  - [ ] Dependencies installed automatically
  - [ ] Config files generated with user input
  - [ ] .env files created from templates

- [ ] **Templates**
  - [ ] Basic template includes core features
  - [ ] Team template includes auth + protected pages
  - [ ] Enterprise template includes all features
  - [ ] All templates build successfully

#### 2. CLI Commands (P0)

**Tests:**
- [ ] **`clarity dev`**
  - [ ] Starts development server
  - [ ] Opens browser automatically
  - [ ] Hot reload works on file changes
  - [ ] Error messages are helpful

- [ ] **`clarity build`**
  - [ ] Builds production site
  - [ ] Generates search index
  - [ ] Optimizes assets
  - [ ] Output to dist/ folder

- [ ] **`clarity preview`**
  - [ ] Serves production build
  - [ ] Accessible at http://localhost:4321
  - [ ] All features work in preview mode

#### 3. Error Handling (P1)

**Tests:**
- [ ] Invalid project name shows error
- [ ] Existing folder conflict handled gracefully
- [ ] Network errors during download handled
- [ ] Dependency installation failures reported
- [ ] Helpful error messages with solutions

### Performance Testing (P0)

**Benchmarks for v1.1:**
- [ ] Protected page check adds < 50ms latency
- [ ] Analytics tracking adds < 100ms to page load
- [ ] Dashboard loads < 3 seconds with 1000+ pages
- [ ] CLI scaffolding completes < 2 minutes
- [ ] Database queries < 200ms (95th percentile)

### Security Testing (P0)

**Tests:**
- [ ] **Authentication**
  - [ ] Session hijacking prevented (secure cookies)
  - [ ] CSRF tokens implemented
  - [ ] SQL injection attempts blocked
  - [ ] XSS attempts sanitized

- [ ] **Authorization**
  - [ ] Users cannot access other teams' data
  - [ ] Role-based access control enforced
  - [ ] API endpoints require authentication
  - [ ] Stripe webhook signatures verified

- [ ] **Data Protection**
  - [ ] Passwords never stored (OAuth only)
  - [ ] Sensitive data encrypted at rest
  - [ ] HTTPS enforced in production
  - [ ] API keys not exposed in client

---

## v1.2 - Community Growth Testing

**Target**: Q2 2026 (April - June)

### Component Library Testing (P1)

#### New Components
- [ ] **Video Embed**
  - [ ] YouTube videos embed correctly
  - [ ] Vimeo videos embed correctly
  - [ ] Responsive sizing works
  - [ ] Privacy mode options work

- [ ] **File Tree**
  - [ ] Directory structure renders correctly
  - [ ] Collapsible folders work
  - [ ] File icons display
  - [ ] Copy path works

- [ ] **Changelog**
  - [ ] Version entries display correctly
  - [ ] Date formatting consistent
  - [ ] Links work
  - [ ] Categories/tags work

### CLI Enhancements Testing (P0)

- [ ] **`clarity check`**
  - [ ] Validates clarity.config.ts
  - [ ] Checks for broken internal links
  - [ ] Checks for broken external links (with timeout)
  - [ ] Reports missing images
  - [ ] Exit code 0 on success, 1 on errors

- [ ] **`clarity search-index`**
  - [ ] Rebuilds search index
  - [ ] Progress indicator shows
  - [ ] Success message displays
  - [ ] Index file updated in public/

### Team Plan Enhancements Testing (P0)

- [ ] **Comments System**
  - [ ] Comment box appears on pages
  - [ ] Comments save to database
  - [ ] @mentions work and send notifications
  - [ ] Comment threads display correctly
  - [ ] Only team members can comment

- [ ] **User Capacity**
  - [ ] User limit increased to 10
  - [ ] Warning at 8 users
  - [ ] Error at 10 users (cannot add more)
  - [ ] Upgrade prompt shows

---

## v1.3 - Advanced Features Testing

**Target**: Q3 2026 (July - September)

### Migration Tools Testing (P0)

#### GitBook Migration
- [ ] **Setup**
  - [ ] `clarity migrate --from gitbook --url <url>` works
  - [ ] Authentication prompts if needed
  - [ ] Progress bar displays

- [ ] **Content Import**
  - [ ] Pages imported with correct structure
  - [ ] Images downloaded and linked correctly
  - [ ] Internal links converted
  - [ ] Frontmatter generated
  - [ ] GitBook components mapped to Clarity components

- [ ] **Validation**
  - [ ] No broken links after import
  - [ ] All images accessible
  - [ ] Navigation structure preserved
  - [ ] Summary report generated

#### Confluence Migration
- [ ] **Setup**
  - [ ] `clarity migrate --from confluence --space <space> --server <server>` works
  - [ ] API token authentication works
  - [ ] Space selection works

- [ ] **Content Import**
  - [ ] Pages imported with hierarchy
  - [ ] Attachments downloaded
  - [ ] Tables converted to markdown
  - [ ] Macros mapped to Clarity components
  - [ ] Users/authors mapped

#### ReadMe Migration
- [ ] **Setup**
  - [ ] `clarity migrate --from readme --api-key <key>` works
  - [ ] API authentication works
  - [ ] Project selection works

- [ ] **Content Import**
  - [ ] API docs imported
  - [ ] Code examples preserved
  - [ ] Custom blocks converted
  - [ ] Categories mapped to folders

### Advanced CLI Testing (P0)

- [ ] **`clarity deploy`**
  - [ ] Vercel deployment works
  - [ ] Netlify deployment works
  - [ ] GitHub Pages deployment works
  - [ ] Environment variables set correctly
  - [ ] Custom domain configuration works

- [ ] **`clarity analytics`**
  - [ ] Displays last 7 days stats
  - [ ] Page detail view works
  - [ ] Export to CSV works
  - [ ] Requires authentication

### VS Code Extension Testing (P1)

- [ ] Extension installs from marketplace
- [ ] Live preview works
- [ ] Markdown snippets work
- [ ] Link validation on save
- [ ] Auto-complete for components

---

## v2.0 - Enterprise Testing

**Target**: Q4 2026 (October - December)

### SSO/SAML Testing (P0)

- [ ] SAML configuration UI works
- [ ] Okta integration works
- [ ] Azure AD integration works
- [ ] Google Workspace integration works
- [ ] JIT (Just-In-Time) provisioning works
- [ ] Group/role mapping works

### Multi-Site Management Testing (P0)

- [ ] Create multiple sites from dashboard
- [ ] Switch between sites works
- [ ] Centralized user management works
- [ ] Cross-site search works
- [ ] Site cloning works

### API Testing (P0)

- [ ] REST API authentication works
- [ ] CRUD operations for content work
- [ ] Rate limiting enforced
- [ ] API documentation accurate
- [ ] GraphQL API works (if implemented)

---

## Performance Benchmarks

### Load Time Targets

| Page Type | Target | P0 Threshold |
|-----------|--------|--------------|
| Homepage | < 1.5s | < 2.5s |
| Doc Page | < 2.0s | < 3.0s |
| Search Modal | < 300ms | < 500ms |
| Dashboard | < 3.0s | < 5.0s |

### Build Time Targets

| Site Size | Target | P0 Threshold |
|-----------|--------|--------------|
| 50 pages | < 30s | < 60s |
| 100 pages | < 60s | < 120s |
| 500 pages | < 5 min | < 10 min |

### API Response Times

| Endpoint | Target | P0 Threshold |
|----------|--------|--------------|
| Auth check | < 50ms | < 100ms |
| Analytics query | < 200ms | < 500ms |
| Content API | < 100ms | < 300ms |

---

## Security Testing

### OWASP Top 10 Testing

- [ ] **A01:2021 – Broken Access Control**
  - [ ] Users cannot access other teams' data
  - [ ] Role escalation prevented
  - [ ] Direct object references protected

- [ ] **A02:2021 – Cryptographic Failures**
  - [ ] HTTPS enforced
  - [ ] Sensitive data encrypted
  - [ ] Strong encryption algorithms used

- [ ] **A03:2021 – Injection**
  - [ ] SQL injection prevented (parameterized queries)
  - [ ] XSS prevented (sanitized input)
  - [ ] Command injection prevented

- [ ] **A04:2021 – Insecure Design**
  - [ ] Rate limiting implemented
  - [ ] Security headers set
  - [ ] Secure defaults used

- [ ] **A05:2021 – Security Misconfiguration**
  - [ ] No default credentials
  - [ ] Error messages don't leak info
  - [ ] Unnecessary features disabled

- [ ] **A07:2021 – Identification and Authentication Failures**
  - [ ] Session timeout enforced
  - [ ] Secure password requirements (OAuth only)
  - [ ] MFA supported (Enterprise)

- [ ] **A08:2021 – Software and Data Integrity Failures**
  - [ ] Dependencies scanned for vulnerabilities
  - [ ] Webhook signatures verified
  - [ ] Code signing used

---

## Browser Compatibility

### Supported Browsers (Must Pass)

- [ ] **Chrome/Edge** (latest 2 versions)
  - [ ] All features work
  - [ ] No console errors
  - [ ] Visual consistency

- [ ] **Firefox** (latest 2 versions)
  - [ ] All features work
  - [ ] No console errors
  - [ ] Visual consistency

- [ ] **Safari** (latest 2 versions)
  - [ ] All features work
  - [ ] No console errors
  - [ ] Visual consistency

### Mobile Browsers (Must Pass)

- [ ] **iOS Safari** (iOS 15+)
  - [ ] Touch interactions work
  - [ ] Responsive layout works
  - [ ] No scroll issues

- [ ] **Chrome Mobile** (Android 10+)
  - [ ] Touch interactions work
  - [ ] Responsive layout works
  - [ ] No scroll issues

---

## Testing Sign-Off

### v1.1 Release Sign-Off

**Date**: ___________

- [ ] All P0 tests passed
- [ ] 90%+ P1 tests passed
- [ ] Known issues documented
- [ ] Performance benchmarks met
- [ ] Security scan clean
- [ ] Browser compatibility verified

**Approved by**:
- Product Owner: ___________
- Engineering Lead: ___________
- QA Lead: ___________

---

## Updating This Runbook

**When to Update:**
- Roadmap changes significantly
- New features added to scope
- Security vulnerabilities discovered
- Performance benchmarks adjusted
- Browser support changes

**Change Log:**
- 2025-12-09: Initial version created for v1.0-2.0 roadmap
