# SEO-02 — Compatibility Evidence and Publication Gates
**Design; not live code.** Reuse existing Phase 4 names and semantics without rewriting CSV columns:
SourceSKU, RelationshipType, TargetType, Target, Scope, EvidenceLevel, PublishRule, SourceURL, Notes.
Supported relationship types: MEMBER_OF, PART_DEFINITION, COMPONENT_OF, CONFIGURATION, OEM_CROSS_REFERENCE, AFTERMARKET_CROSS_REFERENCE, USED_IN_EQUIPMENT, APPLICATION_CLUSTER, SERVICE_REPLACED_BY, SUPERSEDED_BY, POSSIBLE_COMPATIBILITY.
Scope remains full fidelity, including Exact, Exact-equipment, Family, Family/technical and Exact-part / secondary-xref. EvidenceLevel is source description, NOT AI confidence.

| PublishRule | Output policy | Example |
|---|---|---|
| Yes + Exact | only the sourced exact relationship type; membership does not prove machine fit | SP211C006 belongs to SP211; OEM number references only when exact Yes |
| Yes + Exact-equipment | exact named machine and PTO configuration only | A6518A in Bandit Beast 3680 / SP314SB1; 6926E in Beast 3680 Track / SP318SBO |
| Family-only | clearly labeled family context, never precise equipment compatibility | application clusters |
| Review | internal research only, no public equivalence, search alias or verified-fit card | SP314C002 secondary OEM, 6926E secondary Bandit OEM |
| Hold | no indexable SKU offer, stock, order button or asserted direct replacement | SP211P304-TWD, SP111P340-TWD |
| No | internal only | unverified research |

Official drawing PX1039839C (SP211P304) and PX1039800D (SP111P340) are service references, NOT independently confirmed drop-in/orderable replacements. Never remove HOLD by AI inference or redirect to these numbers. CX110C005↔Vermeer 603643003 and SP318C003 published distributor OEM numbers are Yes/Exact part-number references, not universal machine-fit guarantees.

### CompatibilityClaim extension
Add claimId, sourceRowId, sourceId, documentRevision (nullable), applicableSerialOrBom (nullable), technicalReviewStatus (Pending/Approved/Rejected/NeedsRevalidation), technicalReviewerId, technicalReviewedAt, nextReviewAt, commercialReviewStatus, approvedForPublication. Preserve original SourceSKU/RelationshipType/TargetType/Target/Scope/EvidenceLevel/PublishRule/SourceURL/Notes through lossless ETL mapping. No conversion of Family-only or Review to Yes based on inferred similarity.

### Fail-closed validation specification
1. Check Phase5 product index PublicationStatus; HOLD or missing source record cannot be transactionally published.
2. For every part, equipment fit, OEM equivalent, config, spec, supersession, repair method or service interval assertion (including title, meta, alt, cards, structured data), require traceable claimId, applicable official/documented source, correct revision and scope, and technical reviewer. A MEMEBER_OF/MEMBER_OF family relation cannot justify USED_IN_EQUIPMENT.
3. Verified numerical horsepower, torque, RPM, gear ratio, pressure and maintenance intervals require matching model/variant/BOM, unit, manual edition/page, review and allowed copyright use; omit otherwise.
4. SERVICE_REPLACED_BY and SUPERSEDED_BY are evidence records, NOT proof of present orderability, inventory, supplier approval or drop-in fit. Review separately.
5. No speculative 'discontinued', same-day availability, shop, 24/7 dispatch, local technician, dealer authorization, warranty, stock/price, real email submission or shipping SLA without approved SEO-00 owner claim register.
6. A changed source revision, contradicted evidence or withdrawn source invalidates dependent claim approval and approved link cards. Fail build or remove unsafe projection; prevent stale content.
7. Do not ingest public claims from private SAP BOM/customer/cost/inventory datasets. Only approved public-safe Phase4/5 evidence.
8. Any AI-drafted content stays research/draft; automated pass never confers human approvals.

### Workflow with exact gates
Research (unique intent and source request) > StructuredEvidence (complete provenance/scope and conflicts) > AIDraft (missing fields marked as unverified) > AutomatedValidation (zero blocking errors) > TechnicalReview (named qualified human validates variant/technical safety) > CommercialLegalReview (named owner approves seller, coverage, asset rights, privacy/fulfilment) > Approved (both signed, claim register current and review date set) > Published (separately implemented and verified release) > PeriodicRevalidation (quarterly high-risk OEM/SKU, six-month guides, immediate after supplier/technical change).
Failures go to Hold/NeedsRevalidation; expiry revokes prior approval. No stage skipped for urgent customer.

**Safe tests:** SP211C006 MEMBER_OF Yes/Exact may appear as documented family part once approved; SP211C006 OEM number may appear as exact published part reference, not guaranteed equipment fit. Unsafe tests: Review Bandit 6926E crossref becomes OEM synonym, Family-only implies wood-chipper exact fit, wrong Beast 3680 vs 3680 Track, HOLD old assembly becomes direct PX drop-in, no-revision torque number or unverifiable Hamilton mobile service. Each must be rejected.
