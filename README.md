# Twin Disc Reseller & Customer Acquisition System

Data-driven product intelligence, e-commerce, and B2B prospecting system for selecting and selling Twin Disc products.

## Source of Truth

`MASTER_ROADMAP.md` is the project source of truth. Update it whenever a phase, task, assumption, or milestone changes.

## Structure

- `00-Inbox/` — unsorted notes, ideas, and temporary planning
- `10-Strategy/` — business model, product strategy, pricing, ICPs
- `20-Architecture/` — system architecture, data model, integrations
- `30-Decisions/` — durable decisions and rationale
- `40-Data/` — data schemas, SAP query definitions, sanitized examples; raw/private exports are gitignored
- `50-Code/` — analysis scripts, importers, scoring logic, store/app code
- `60-Operations/` — order workflow, sourcing, shipping, returns, customer outreach
- `70-Project-State/` — current status, milestones, known issues, next actions
- `80-Outputs/` — sanitized generated product lists, reports, prospecting outputs
- `90-Sources/` — Twin Disc documentation, research notes, references
- `Templates/` — reusable templates

## Data Safety

This repository is public. Do not commit raw SAP exports, customer lists, negotiated costs, credentials, or other confidential MarIndustrial information. Store raw exports locally under `40-Data/raw/`; that path is excluded by `.gitignore`.

## Current Objective

Advance the approved product-data records and evidence-controlled RFQ website MVP. The initial Launch-20 product shortlist and supporting research are documented in the master roadmap.

## SEO Strategy and Workstream

- **[Ontario SEO Audit & Growth Strategy](10-Strategy/SEO_AUDIT_AND_GROWTH_STRATEGY.md)** — keyword/intent analysis, content gaps, marine/PTO/application clusters, local targeting, safe technical publishing, RFQ conversion strategy.
- **[Phased SEO Implementation Roadmap](70-Project-State/SEO_IMPLEMENTATION_ROADMAP.md)** — SEO-00 through SEO-09 detailed tasks, dependencies, human approval gates, deliverables and test criteria.
- **[SEO Page Backlog](70-Project-State/SEO_PAGE_BACKLOG.csv)** — prioritized canonical page candidates and publication blockers.

These SEO planning documents supplement the existing project-wide `MASTER_ROADMAP.md` and Phase 5 catalog workflow. The SEO workstream is planned; no production website modifications are part of this documentation change.


### SEO-00 and SEO-01 Research Deliverables (2026-10-19)

- [Business Scope & Claim Boundaries](10-Strategy/SEO_00_BUSINESS_SCOPE_AND_CLAIMS.md) / [Claim Verification Register](10-Strategy/SEO_00_CLAIM_VERIFICATION_REGISTER.csv) / [Editorial & Evidence Policy](10-Strategy/SEO_00_EDITORIAL_AND_EVIDENCE_POLICY.md) / [Owner Approvals](70-Project-State/SEO_00_HUMAN_APPROVAL_CHECKLIST.md).
- [Technical Source/Deployment Audit](70-Project-State/SEO_01_TECHNICAL_AUDIT.md) / [Competitor Analysis](10-Strategy/SEO_01_COMPETITOR_ANALYSIS.md) / [Ontario Local Opportunities](10-Strategy/SEO_01_ONTARIO_LOCAL_OPPORTUNITIES.md).
- [Keyword Research](10-Strategy/SEO_01_KEYWORD_RESEARCH.csv) / [Keyword-to-Page Mapping](10-Strategy/SEO_01_KEYWORD_TO_PAGE_MAP.csv) / [Mapping Method](10-Strategy/SEO_01_KEYWORD_MAPPING_METHOD.md) / [Content Gap & Page Briefs](10-Strategy/SEO_01_CONTENT_GAP_ANALYSIS.md).
- [Analytics Baseline](70-Project-State/SEO_01_ANALYTICS_BASELINE.md) / [Ranked Recommendations and Task Status](70-Project-State/SEO_01_PRIORITIZED_RECOMMENDATIONS.md).

**Research is documented, but production crawl/GSC and seller/service approvals are still unverified/pending.** These files contain no authorization to publish products, emergency services, or unsupported compatibility claims.
