# SEO-02 architecture contract snapshot — SEO-03
Imported from `feat/twd-seo-phase-02` at commit `1532639bbe06fba99fbd270351d1229d982c7574` on 2026-10-19.

SEO-02 architecture **design and data validation are complete**, with GitHub Actions run 39276110322. The owner has not approved individual product claims, business terms, content rights, geographic coverage, the final canonical domain or production publication.

- `content-model.types.ts`, `content-model.schema.json`, `page-types.json`, and `link-rules.json` are selective, unchanged snapshots.
- `examples.json` contains eleven **Research** fixtures. Ten non-location examples are rendered only in an isolated non-indexable staging branch. No fixtures enter the XML sitemap.
- The Hamilton location example is excluded from rendered routes until source-backed local value and real coverage are confirmed.
- The interface adapter provides a fail-closed review and claims view model, without importing confidential Phase4/5 sources.
- Future changes to the SEO-02 architecture require a reviewed reconciliation. Source code branches are not merged blindly.
