# Clarity Roadmap

This roadmap outlines the planned features and improvements for Clarity. As an open-source project, we welcome community input and contributions!

> **Note**: This roadmap is subject to change based on community feedback and priorities. Dates are estimates and not commitments.

## Business Model

Clarity follows an **Open Core** business model:
- 🆓 **Free (Open Source)**: Core documentation platform, self-hostable, Apache 2.0 license
- 💼 **Team Plan ($39/month)**: Advanced features for growing teams
- 🏢 **Enterprise (Custom)**: Advanced security, SSO, multi-site management

See [BUSINESS-MODEL-AUDIT.md](./BUSINESS-MODEL-AUDIT.md) for detailed feature split.

## Legend

- 🆓 **Free** - Available in open-source version
- 💼 **Team** - Requires Team Plan subscription ($39/month)
- 🏢 **Enterprise** - Requires Enterprise Plan (custom pricing)
- 🎯 **Planned** - On the roadmap, not yet started
- 🚧 **In Progress** - Currently being worked on
- ✅ **Completed** - Implemented and available
- 💡 **Considering** - Under consideration, needs community feedback

---

## Version 1.0 (Current) ✅ 🆓

**Released**: December 2025

Core foundation with essential documentation features - **All FREE and Open Source**

- ✅ 🆓 OAuth Authentication (Google & GitHub)
- ✅ 🆓 Full-text search with keyboard shortcuts
- ✅ 🆓 Dark/light theme support
- ✅ 🆓 Responsive design with mobile sidebar
- ✅ 🆓 Table of contents with scroll spy
- ✅ 🆓 Markdown-based content with Content Collections
- ✅ 🆓 SEO optimization (sitemap, meta tags)
- ✅ 🆓 GitHub integration (edit links)
- ✅ 🆓 Advanced components (Callouts, Tabs, Copy Code)
- ✅ 🆓 Breadcrumb navigation
- ✅ 🆓 Centralized configuration system
- ✅ 🆓 Production deployment guides
- ✅ 🆓 Customizable homepage
- ✅ 🆓 Mermaid diagram support
- ✅ 🆓 Apache 2.0 license

---

## Version 1.1 - Team Plan MVP + CLI Launch 🚀 💼

**Target**: Q1 2026 (January - March, 10 weeks)

**Strategy**: Launch revenue-generating Team Plan with basic CLI for professional DX

> **Key Decision**: Hybrid approach combining revenue features + modern developer experience in one launch for maximum market impact.

### 🎯 Development Timeline

**Weeks 1-6**: Core Team Plan features (Priority 1 - Revenue)  
**Weeks 4-8**: Basic CLI tooling (Priority 2 - Growth)  
**Weeks 9-10**: Launch preparation & marketing

### Team Plan Features 💼

**Price**: $39/month per site | **Target**: 25-30 beta customers

#### 1. **Protected Documentation** 💼 (Weeks 1-2)
- Route-based access control (public vs protected pages)
- Astro middleware for authentication checks
- Simple frontmatter flag: `protected: true`
- Configurable auth per route/folder
- Auto-redirect to login for protected content
- Leverage existing OAuth backend infrastructure

#### 2. **User Management Dashboard** 💼 (Weeks 2-3)
- Admin panel (extends existing dashboard.astro)
- Add/remove team members (up to 5 users in MVP)
- Email invitations
- User roles: Admin, Editor, Viewer
- Team member list with status
- Powered by existing Express backend

#### 3. **Basic Analytics Dashboard** 💼 (Weeks 3-4)
- Page view tracking (client-side → API)
- Popular pages report
- Search analytics (what users search for)
- Simple stats dashboard
- Weekly usage summary
- CSV export

#### 4. **Stripe Integration** 💼 (Weeks 4-5)
- Subscription management ($39/month)
- Customer portal for billing
- License key validation system
- Webhook handlers for subscription events
- Trial period support (14 days)
- Hosted checkout flow

#### 5. **Custom Branding** 💼 (Weeks 5-6)
- Logo upload (replaces default)
- Custom color scheme (CSS variables via config)
- Custom footer content
- Remove "Powered by Clarity" badge
- Favicon customization
- Builds on existing config system

### Basic CLI Tooling 🆓 (Weeks 4-8)

**Essential developer experience features for launch:**

- 🎯 **`create-clarity`** - Project scaffolding
  ```bash
  npm create clarity@latest my-docs
  # Interactive wizard: name, template, auth, deployment
  ```

- 🎯 **Basic CLI Commands**
  ```bash
  clarity dev      # Start development server
  clarity build    # Production build
  clarity preview  # Preview production build
  ```

- 🎯 **Setup Wizard**
  - Site name and description
  - Template selection (basic/team/enterprise)
  - Authentication provider choice (Google/GitHub/None)
  - Deployment target (Vercel/Netlify/GitHub Pages)
  - Auto-generates config files

- 🎯 **Template System**
  - Basic template (minimal, public docs)
  - Team template (auth + protected pages)
  - Enterprise template (full features)

**Note**: Advanced CLI features (migrate, deploy, analytics) deferred to v1.3

### Free Features Continue 🆓

**Enhanced search improvements:**
- Fuzzy matching for typo tolerance
- Better search result display
- Search keyboard shortcuts improvements

**Navigation enhancements:**
- Collapsible sidebar sections
- "Back to top" button
- Improved mobile navigation

**Performance & Quality:**
- Performance optimization
- Accessibility improvements (WCAG 2.1 AA)
- Better error handling
- Updated documentation

### Technical Infrastructure

**Backend (SaaS Platform):**
- 🎯 PostgreSQL database (user accounts, subscriptions, analytics)
- 🎯 Stripe webhook handlers
- 🎯 License validation API
- 🎯 Analytics collection endpoints
- 🎯 User management API
- 🎯 Hosted on Railway/Render

**Frontend:**
- 🎯 Protected route middleware
- 🎯 Admin dashboard pages
- 🎯 Subscription status UI
- 🎯 Analytics dashboard
- 🎯 User settings panel

**CLI Package:**
- 🎯 `create-clarity` npm package
- 🎯 Template repository structure
- 🎯 Interactive prompts (inquirer)
- 🎯 Config generation
- 🎯 Basic validation

### Launch Strategy

**Week 9: Beta Launch**
- Private beta to 10 early customers
- Pricing validation ($39/mo)
- Feature feedback collection
- Bug fixes and refinements

**Week 10: Public Launch**
- Product Hunt launch
- Blog post announcement
- Twitter/LinkedIn campaign
- "Docusaurus DX + Team Features" positioning
- Documentation site updates
- Demo videos and tutorials

### Success Metrics

**Community Growth (CLI Impact):**
- GitHub stars: 500+ (Month 3)
- CLI installations: 1,000+ (Month 3)
- Free tier users: 200+ (Month 3)

**Revenue (Team Plan):**
- Beta customers: 25-30 (Month 1-3)
- MRR: $975-1,170 (Month 3)
- Target: $1,950 MRR (Month 6)
- Conversion rate: 5% of CLI users

**Quality:**
- < 10 critical bugs at launch
- 95%+ uptime
- < 2 second page load
- 90%+ customer satisfaction

---

## Version 1.2 - Community Growth & Team Enhancements 🎯

**Target**: Q2 2026 (April - June)

**Strategy**: Grow free tier community while enhancing Team Plan based on customer feedback

> **Focus**: Balance community building (free features) with Team Plan improvements from beta learnings.

### Free Features for Community 🆓

**Goal**: Keep community engaged and growing while Team customers stabilize

#### 1. **Component Library Expansion** 🆓
- Video embed component (YouTube, Vimeo)
- File tree visualization component
- Changelog/release notes component
- Timeline component
- Card grid component
- API reference table components (basic)
- Step-by-step tutorial component

#### 2. **CLI Enhancements** 🆓
- `clarity check` - Validate config and broken links
- `clarity search-index` - Rebuild search index manually
- Content validation and linting
- Markdown quality checks
- SEO analyzer
- Link checker with detailed reports

#### 3. **Performance Improvements** 🆓
- Incremental builds (faster dev server)
- Image optimization improvements
- Bundle size optimization
- Better caching strategies
- Lazy loading for images
- Font optimization

#### 4. **Navigation & UX** 🆓
- Sidebar search/filter
- Reading progress indicator
- Related pages suggestions (basic algorithm)
- Recently updated pages widget
- Improved breadcrumbs with icons
- Better mobile menu experience

#### 5. **Documentation & Templates** 🆓
- More starter templates
- Video tutorials
- Migration guides from other platforms
- Best practices guide
- Performance optimization guide
- SEO optimization guide

### Team Plan Enhancements 💼

**Based on v1.1 beta customer feedback:**

#### 1. **Team Collaboration** 💼
- Page-level comments (up to 3 reviewers)
- @mentions in comments
- Comment threads
- Basic review workflow (request review → approve)
- Email notifications for comments
- Activity feed

#### 2. **User Management Improvements** 💼
- Increase user limit: 5 → 10 users
- User groups/teams
- Bulk user operations
- User activity logs
- Last login tracking
- Session management

#### 3. **Content Management** 💼
- Draft/Published state toggle
- Version history (last 30 days)
- Scheduled publishing (set future publish date)
- Bulk operations (move, delete, publish multiple pages)
- Content templates (reusable page structures)
- Duplicate page functionality

#### 4. **Analytics Expansion** 💼
- User journey tracking
- Search term analysis
- Page engagement time
- Bounce rate tracking
- Monthly reports (email)
- Custom date ranges
- Export to PDF

#### 5. **Enhanced Customization** 💼
- Custom CSS editor (in dashboard)
- Google Fonts integration
- Custom footer HTML
- Social media links configuration
- Announcement banner
- Custom 404 page

### Bug Fixes & Stability

- 🎯 Fix issues reported in v1.1 beta
- 🎯 Improve error messages
- 🎯 Better mobile responsiveness
- 🎯 Cross-browser compatibility fixes
- 🎯 Performance optimizations
- 🎯 Security updates

### Success Metrics

**Community:**
- GitHub stars: 1,000+ (Month 6)
- CLI downloads: 3,000+ (Month 6)
- Free tier users: 500+ sites (Month 6)
- Community contributors: 10+

**Revenue:**
- Team customers: 50 (Month 6)
- MRR: $1,950 (Month 6)
- Churn rate: < 5%
- Customer satisfaction: 90%+

**Quality:**
- Zero critical bugs
- 99%+ uptime
- < 1.5 second page load
- WCAG 2.1 AA compliant

---

## Version 1.3 - Advanced CLI & Team Growth 🎯 💼

**Target**: Q3 2026 (July - September)

**Strategy**: Add high-value migration tools and integrations to drive Team Plan upgrades

> **Focus**: Competitive differentiation through migration tools (win customers from GitBook/Confluence) and advanced automation.

### Advanced CLI Features 💼

**These features justify Team Plan pricing and drive competitive wins:**

#### 1. **Migration Tools** 💼 (Killer Feature)
```bash
# Import from competitors (Team Plan exclusive)
clarity migrate --from gitbook --url https://team.gitbook.com
clarity migrate --from confluence --space DOCS --server company.atlassian.net
clarity migrate --from readme --api-key xxx
clarity migrate --from notion --token xxx
```
- Preserve structure, images, links
- Convert custom components
- Maintain internal links
- Download assets
- Generate frontmatter
- Progress tracking

**Value Proposition**: "Switch from GitBook in 10 minutes, save $26/month"

#### 2. **Deployment Automation** 💼
```bash
clarity deploy --platform vercel --domain docs.company.com
clarity deploy --platform netlify
clarity deploy --platform github-pages
```
- One-command deployment
- Auto-configure platforms
- Environment variable setup
- Custom domain configuration
- SSL certificate setup
- Deploy previews

#### 3. **Content Generation** 💼
```bash
clarity add page guides/quickstart --template guide
clarity add section api-reference --template api
clarity generate changelog --from-git
clarity generate openapi --spec api.yaml
```
- Template library
- Smart defaults
- Auto-navigation
- Frontmatter generation

#### 4. **Analytics CLI** 💼
```bash
clarity analytics --range last-7-days
clarity analytics --page /docs/intro --detail
clarity export analytics --format csv --output report.csv
```
- View stats from terminal
- Page-level analytics
- Export capabilities
- Scheduled reports

### Team Plan Improvements 💼

#### 1. **Editor Experience** 💼
- VS Code extension with live preview
- Markdown snippets library
- Auto-complete for components
- Link validation on save
- Spell check integration
- Grammar checking (Grammarly API)

#### 2. **Integrations & Webhooks** 💼
- Webhooks for events (page published, comment added, user invited)
- Slack notifications (page updates, comments, reviews)
- GitHub Actions integration (auto-deploy on merge)
- Zapier integration (basic triggers/actions)
- Microsoft Teams integration
- Discord webhooks

#### 3. **Advanced Search** 💼
- ML-powered search ranking
- Search result personalization
- Search history per user
- Saved searches with alerts
- Filter by multiple criteria (tags, date, author)
- Search API for custom integrations

#### 4. **Enhanced Navigation** 💼
- Bookmark favorite pages (per user)
- Custom sidebar ordering (drag-and-drop in dashboard)
- Persistent sidebar state across sessions
- Reading lists (save for later)
- Popular/trending pages widget
- "Recently viewed" history

#### 5. **Capacity Increases** 💼
- User limit: 10 → 15 users
- Version history: 30 → 90 days
- Storage: 1GB → 5GB
- API rate limits increased
- More webhook events
- Priority support (email response < 24 hours)

### Free Features Continue 🆓

#### 1. **Developer Tooling** 🆓
- Link checker improvements
- SEO recommendations
- Performance profiling
- Build time optimization
- Dependency updates
- Security scanning

#### 2. **Documentation** 🆓
- Migration guides (from GitBook, Confluence, ReadMe)
- Advanced customization tutorials
- Performance optimization guide
- SEO best practices
- Video tutorial series
- Case studies

### Success Metrics

**Team Plan Growth:**
- Team customers: 100+ (Month 9)
- MRR: $3,900+ (Month 9)
- Migration tool usage: 50+ migrations
- Churn rate: < 3%
- NPS score: 50+

**Community:**
- GitHub stars: 2,000+ (Month 9)
- CLI downloads: 10,000+ (Month 9)
- Free tier users: 1,000+ sites
- Community contributors: 25+

**Competitive Wins:**
- GitBook migrations: 20+
- Confluence migrations: 15+
- ReadMe migrations: 10+
- Average time to migrate: < 30 minutes

---

## Version 2.0 - Enterprise Plan Launch 🏢 🎯

**Target**: Q4 2026 (October - December)

Launch of Enterprise Plan with advanced security and multi-site management.

**Price**: Starting at $499/month (custom pricing)

### Enterprise Features 🏢

#### 1. **Advanced Authentication & Security** 🏢
- Full SSO support (SAML, OIDC, LDAP)
- Multi-factor authentication (MFA)
- IP whitelisting
- Advanced session policies
- Audit logs (all user actions)
- SOC 2 compliance documentation
- Custom authentication flows

#### 2. **Multi-Site Management** 🏢
- Manage unlimited documentation sites
- Centralized user management across sites
- Shared components/templates library
- Cross-site search
- Global navigation
- Site cloning/templates
- Centralized billing

#### 3. **Advanced Team & Permissions** 🏢
- Unlimited team members
- Advanced RBAC (custom roles)
- Team hierarchy (departments, groups)
- Delegation of permissions
- Unlimited reviewers per document
- Advanced approval workflows (multi-stage)
- Content access policies

#### 4. **Advanced Analytics & Insights** 🏢
- Custom dashboards
- Advanced reporting (PDF/CSV export)
- User engagement metrics
- Content quality scores
- A/B testing for documentation
- API access to analytics data
- Google Analytics/Mixpanel integration
- Funnel analysis

#### 5. **API & Advanced Integrations** 🏢
- REST API for content management
- GraphQL API
- Webhooks for all events
- Slack/Microsoft Teams integration
- Jira/Linear integration
- Confluence import/export
- Salesforce integration
- Custom integrations via API

#### 6. **Advanced Content Features** 🏢
- Internationalization (unlimited languages)
- Translation workflow with TMS integration
- Versioned documentation (multiple versions)
- PDF/EPUB export (branded)
- Content reuse (snippets, variables, transclusion)
- Documentation coverage metrics
- Advanced broken link checker
- Content recommendations (AI-powered)

#### 7. **White Label & Customization** 🏢
- Complete white labeling
- Custom domains per site
- Custom authentication UI
- Custom React components
- Source code access (for customization)
- Custom build pipeline
- Dedicated infrastructure option

#### 8. **Enterprise Support & SLA** 🏢
- Priority support (< 4 hour response)
- Dedicated account manager
- Custom onboarding program
- Training sessions for team
- 99.9% uptime SLA
- Dedicated Slack channel
- Quarterly business reviews
- Custom feature development (add-on)

### Team Plan Continues 💼

All Team Plan features included, plus Enterprise additions.

---

## Future Considerations (Post-2.0) 💡

Features under consideration for future versions:

### Free Tier 🆓
- 💡 Offline mode/PWA support
- 💡 Built-in diagramming tool (beyond Mermaid)
- 💡 Automated changelog from git commits
- 💡 More component templates
- 💡 Better mobile editing

### Team/Enterprise 💼🏢
- 💡 AI-powered search and Q&A (GPT integration)
- 💡 AI content suggestions
- 💡 Documentation quality scoring (AI-powered)
- 💡 Interactive tutorials/tours builder
- 💡 Advanced A/B testing
- 💡 Video transcription and search
- 💡 Content personalization
- 💡 Advanced automation rules
- 💡 Custom ML models for search

### Community Requests

Vote on features you want at [GitHub Discussions](https://github.com/alex-migwi/clarity/discussions)

---

## Revenue Projections

### Conservative Scenario

| Quarter | Team Customers | MRR | ARR | Cumulative |
|---------|----------------|-----|-----|------------|
| Q1 2026 | 25-30 | $975-1,170 | $11.7-14K | Launch |
| Q2 2026 | 50 | $1,950 | $23.4K | +100% |
| Q3 2026 | 100 | $3,900 | $46.8K | +100% |
| Q4 2026 | 150 | $5,850 | $70.2K | +50% |

**End of Year 1**: 150 Team customers, $5,850 MRR, $70K ARR

### Optimistic Scenario (with strong marketing)

| Quarter | Team Customers | MRR | ARR | Cumulative |
|---------|----------------|-----|-----|------------|
| Q1 2026 | 50 | $1,950 | $23.4K | Launch |
| Q2 2026 | 100 | $3,900 | $46.8K | +100% |
| Q3 2026 | 200 | $7,800 | $93.6K | +100% |
| Q4 2026 | 300 | $11,700 | $140K | +50% |

**End of Year 1**: 300 Team customers, $11,700 MRR, $140K ARR

**Key Assumptions:**
- Average price: $39/month
- Churn rate: 3-5%
- Conversion rate: 5% of CLI users
- CLI growth drives Team signups
- Migration tools win competitive deals

### Enterprise Revenue (Q4 2026+)

**Conservative**: 2-3 customers @ $499-999/mo = $1,000-3,000 MRR  
**Optimistic**: 5-10 customers @ $999-2,000/mo = $5,000-20,000 MRR

**Total Year 1 ARR**: $82K-160K (before Enterprise)

---

## Pricing Summary

| Plan | Price | Users | Best For | Launch |
|------|-------|-------|----------|--------|
| **Free** 🆓 | $0 | Unlimited | Individuals, small teams, OSS projects, public docs | ✅ Live Now |
| **Team** 💼 | $39/month | 5 → 10 → 15* | Growing teams, internal docs, customer portals | 🚀 Q1 2026 |
| **Enterprise** 🏢 | $499+/month | Unlimited | Large orgs, multi-site, SSO, advanced security | Q4 2026 |

*User limits increase: v1.1 (5 users) → v1.2 (10 users) → v1.3 (15 users)

**Competitive Positioning:**
- 20-50% below GitBook ($65+/mo)
- 50% below ReadMe ($79+/mo)
- Per-site pricing (not per-user) = predictable costs
- Includes CLI + migration tools (competitors charge extra)

See [BUSINESS-MODEL-AUDIT.md](./BUSINESS-MODEL-AUDIT.md) for complete feature comparison and [PRICING-ANALYSIS.md](./PRICING-ANALYSIS.md) for market research.

---

## How to Contribute

We welcome contributions to **free features** and community input on commercial features!

### Vote on Features

- 👍 React to issues on GitHub with 👍 for features you want
- 💬 Comment with your use case
- 📊 We prioritize based on community interest

### Propose New Features

1. Check if similar feature exists in issues
2. Open a new issue with:
   - Clear description of the feature
   - Use case and benefits
   - Potential implementation approach
3. Use the label `enhancement`

### Contribute Code

1. Check roadmap for features marked 🚧 In Progress
2. Comment on the issue to coordinate
3. Fork and create a feature branch
4. Submit PR with tests and documentation
5. Participate in code review

### Sponsor Development

- ⭐ Star the repository
- 💰 Sponsor on GitHub
- 🏢 Enterprise support (contact us)

---

## Roadmap Updates

This roadmap is reviewed and updated quarterly. Last update: **December 2025**

### Stay Informed

- Watch the [GitHub repository](https://github.com/alex-migwi/clarity)
- Follow release notes in [CHANGELOG.md](./CHANGELOG.md)
- Join discussions in GitHub Discussions
- Subscribe to release notifications

---

## Questions?

Have questions about the roadmap or want to discuss priorities?

- 💬 Open a [Discussion](https://github.com/alex-migwi/clarity/discussions)
- 🐛 Report bugs in [Issues](https://github.com/alex-migwi/clarity/issues)
- 📧 Contact maintainers

**Your feedback shapes the future of Clarity!**
