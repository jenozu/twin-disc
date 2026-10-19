# SEO-02 — Verified Internal Linking Architecture
**Specification, not active site code.** Node keys are unique canonical page IDs. Link projection requires a Published destination and appropriate approved evidence. Category→model hub is browse; family→SKU requires Phase4 Yes + Exact MEMBER_OF or an equivalently explicit reviewed relationship; application→exact equipment SKU needs Yes + Exact-equipment for that very machine; Family-only grants only qualified family-context links. Never turn a hyperlink card into unsupported 'Fits this machine' wording.

| Source | Target | Link purpose & gate |
|---|---|---|
| category | model hub | browse verified family, approved published hub |
| model | SKU | documented family component with MEMBER_OF Yes/Exact and approved SKU page |
| SKU | family/category | proper parent/breadcrumb via source, else category |
| SKU | RFQ | part-prefilled enquiry; backend must truly send/record |
| troubleshooting | model | reviewed applicability, not symptom-based model diagnosis |
| troubleshooting | identification | universal safe fallback |
| comparison | the two models | approved revision-qualified compare targets |
| application | family | Family-only label, never exact-fit promise |
| application | SKU | Yes/Exact-equipment only, named variant |
| identification | unknown-model RFQ | accept missing serial/BOM/model |
| Ontario region | supported product/category | fulfilment + distinct region approved |

**Related-content ranking:** closest intent > source-backed relationship > educational guide > verified RFQ > category fallback. Deduplicate by canonical URL, max six related cards, natural anchors, never self-link or generate dead target. Avoid overlinking reciprocal cards. Include accessible navigation and meaningful link text. Build graph from filtered content, not raw CSV; no public Review/HOLD relationships, no copy of private SAP edges.

**Example, conditional on approval:** /resources/pto-clutch-slipping/ > /power-take-offs/sp211/ if visitor has established SP211 identity > /parts/sp211c006/ shown only as an SP211 documented part (Phase4 MEMBER_OF Yes/Exact, not machine-fit proof) > /request-quote/?part=SP211C006 with required human BOM/serial verification. No assumption slipping identifies SP211. **Safer unknown path:** slipping guide > /resources/identify-twin-disc-pto/ > /solutions/twin-disc-pto-clutch-replacement/ > human review of incomplete model info. HOLD SP211P304 yields manual-review path only; no replacement card and no direct PX redirect.

**Breadcrumbs:** published category/family hierarchy, even when path lives outside /products/. Visible and JSON-LD BreadcrumbList parity. Example Home > Products > Power Take-Offs > SP211 > SP211C006. If family not publishable, parent is proper category. Resources breadcrumb label is virtual, no duplicate indexable path.

**Automated QA acceptance:** no broken href (must resolve 200 approved canonical; avoid authoring redirect hops), no orphan eligible page except root/explicit exempt, unique URL/intent, no duplicate related destination, no forbidden claim in anchor/card, stable breadcrumbs, accessible focus, no link to held/Review as confirmed part, RFQ CTA truthful and operational. Future Astro build exports in/out-degree, broken edges, disallowed claim links, canonical divergence and orphan list and blocks release.
