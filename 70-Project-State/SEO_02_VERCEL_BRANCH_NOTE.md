# SEO-02 Vercel Status and Error Recovery

**Evidence:** GitHub commit f12d911 and subsequent SEO-02 docs commit b8e3344 show Vercel failure status. Reported Vercel error NOW_SANDBOX_WORKER_ROOTDIR_NOT_EXIST. A documentation-only tree derived from feat/twd-seo-phase-00-01 does not contain the Astro application at 50-Code/site, which the Vercel project expects. Actual SEO-03 website implementation is on a distinct feature branch (PR #7 based on feat/twd-lumo-interactive-redesign).

**Assessment:** missing app root is deployment-configuration/branch-selection mismatch, not schema validation failure or a failed website compile. Previous session stopped after successful push f12d911; prior JavaScript syntax errors were recovered from and are not evidence of missing committed files.

**Action:** do NOT alter production configuration, deploy another branch, copy website code to SEO-02 or force a merge. Keep docs CI (GitHub Actions SEO02 validator) separate. Owner can later choose a Vercel build/deploy branch allowlist or separate app/docs project without touching this SEO-02 architecture branch.
