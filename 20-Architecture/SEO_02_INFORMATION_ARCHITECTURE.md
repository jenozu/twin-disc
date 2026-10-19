# SEO-02 — Canonical Website Information Architecture
**2026-10-19 | Design only; no public routes deployed.** Source-of-truth: SEO-01 43 mapped canonical intents and 47 backlog records, Phase 4 relationship master, Phase 5 Launch-20 index and SEO-00 claim register. Public canonical origin remains unverified: configure APPROVED_CANONICAL_ORIGIN only after owner approval.

## URL taxonomy and sitemap
| URL | Page ownership | Parent | Conditional indexation |
|---|---|---|---|
| / | brand/navigation | root | yes after brand approval |
| /products/ | broad browse | / | approved content |
| /products/power-take-offs/ | commercial PTO parts | /products/ | approved |
| /products/clutches/ | clutch categories/components | /products/ | approved and nonduplicative |
| /products/marine-transmissions/ | marine commercial browse | /products/ | research dependent |
| /products/pump-drives/ | pump-drive parts | /products/ | research dependent |
| /power-take-offs/{family}/ | model hub: SP111, SP211, SP314, SP318, CX107, CX108, CX110 | /products/power-take-offs/ | reviewed variant/family facts |
| /marine-transmissions/mg-506/ | legacy model hub | /products/marine-transmissions/ | marine revision proof required |
| /parts/{normalized-part}/ | exact SKU including approved OEM aliases | evidenced family hub or category | Phase 5 and both human approvals |
| /resources/{topic}/ | identification, comparison, troubleshooting, maintenance, repair/replace | /resources/ | technical safety review |
| /industries/{application}/ | unique equipment/application inquiry | /industries/ | applicability review |
| /locations/ontario/ | genuine supported Ontario parts enquiries | /locations/ | territory/fulfilment verified |
| /locations/{region}/ | distinct regional enquiry context | /locations/ontario/ | local proof + business scope |
| /solutions/twin-disc-pto-clutch-replacement/ | unknown-model identification conversion | /solutions/ | working RFQ and staffed processing |
| /request-quote/ | general RFQ | / | working backend/privacy gate |

**Distinct intent rules:** products category is for broad catalog discovery, family hub is for model/BOM and approved related parts, /parts/ exact part-number pages own SKU/OEM lookup. Never mirror family at /products/power-take-offs/sp211/ or make separate indexable OEM-number pages. Model variants receive separate paths only with different supported primary intent. No zero-content taxonomy indexes and no auto-generated faceted combinations. Resource taxonomy is stored in metadata, NOT nested URL folders: preserve SEO-01 short /resources/pto-clutch-slipping/ etc.

**Navigation:** Products > PTO, Clutches, Marine, Pump Drives (hide empty); Find by Model; Guides; Industries; Request Parts Quote; approved Regions in footer. No implied on-site repair/emergency service. Visible breadcrumbs: Home > Products > PTO > SP211 > SP211C006 if Phase4 Yes/Exact MEMBER_OF; otherwise Home > Products > Clutches > SKU. Home > Resources > Troubleshooting > Slipping article (Troubleshooting is a labeled breadcrumb category only; no competing URL). Home > Ontario > Hamilton only if both geographic pages are approved. BreadcrumbList JSON-LD mirrors visible breadcrumbs.

**Canonical normalization:** choose ONE real HTTPS production host. Normalize SKU uppercase identity SP211C006-TWD to public lowercase /parts/sp211c006/; retain exact public part spelling in body, never confuse O with zero. Existing preview Astro 50-Code/site sets trailingSlash:never, while original proposed paths end in slashes. SEO-03 must choose one production representation and enforce 301/308, self-canonical, sitemap and internal link consistency; paths in documents are logical slashed forms. Case/UTM/query/filtered URLs are not alternate indexable pages. A query without equivalent content should use noindex, not canonical-to-home.

**Migration/redirect plan (NOT executed):** inspect real deployed URL inventory before activating 301s. On verified identity only, /products/sp211c006 and /products/sp211c006/ -> approved /parts/sp211c006/; model /products/sp211 -> /power-take-offs/sp211/ if same exact topic. No unsafe redirects to alleged replacements. SP211P304 and SP111P340 stay blocked, no redirects to PX service references, no transactional destinations. Old orphan/broken routes assessed individually for 404/410 or approved content redirect. Never redirect everything to homepage. Before release, compare old/new canonical, sitemap, redirects, search and analytics and crawl staging with/without slash.

**Sitemap contract:** include only Published, 200, self-canonical, substantively unique pages with current source/reviewer and all business approval flags. Exclude draft/research/review/hold pages, SP211P304/SP111P340, internal-search/filter URLs, unapproved regional/service pages, and staging. lastmod represents material review/update, not build clock. Generate sitemap/robots after canonical host validated. SEO-02 delivers this design, not a running sitemap.

**Growth rule:** a new SKU requires Phase5 public record, Phase4 sourced relationships, canonical intent registry, human technical/commercial signoff, unique copy, verified quote route, link parent or fallback. A new city requires verified fulfilment and unique visitor utility; generic city substitutions fail. Existing SEO-01 mapping is qualitative, not measured search-volume data.
