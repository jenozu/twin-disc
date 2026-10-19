// SEO-02 additional public-safe types. Preserve Phase4/Phase5 CSV fields and statuses.
export type PublishRule = 'Yes'|'Family-only'|'Review'|'Hold'|'No';
export type RelationshipType = 'MEMBER_OF'|'PART_DEFINITION'|'COMPONENT_OF'|'CONFIGURATION'|'OEM_CROSS_REFERENCE'|'AFTERMARKET_CROSS_REFERENCE'|'USED_IN_EQUIPMENT'|'APPLICATION_CLUSTER'|'SERVICE_REPLACED_BY'|'SUPERSEDED_BY'|'POSSIBLE_COMPATIBILITY';
export interface Phase4Relationship {SourceSKU:string;RelationshipType:RelationshipType;TargetType:string;Target:string;Scope:string;EvidenceLevel:string;PublishRule:PublishRule;SourceURL:string;Notes?:string;}
export interface Phase5PublicProduct {SKU:string;TwinDiscPartNumber:string;ProductTitle:string;ProductFamily:string;TwinDiscModelFamily:string;PricingMode:string;PublicationStatus:string;PrimarySource:string;}
export interface ContentSource {sourceId:string;url:string;publisher:string;documentTitle:string;revision:string|null;pageOrTable?:string;accessedAt?:string;assetRights?:'unknown'|'link-only'|'licensed';}
export interface CompatibilityEvidence extends Phase4Relationship {claimId:string;sourceRowId:string;sourceId:string;documentRevision:string|null;applicableSerialOrBom?:string|null;technicalReviewStatus:'Pending'|'Approved'|'Rejected'|'NeedsRevalidation';approvedForPublication:boolean;technicalReviewerId?:string|null;reviewedAt?:string|null;nextReviewAt?:string|null;}
export interface TechnicalSpecification {name:string;value:string|number;unit:string;applicableModel:string;revision:string;sourceId:string;claimId:string;}
export interface OEMCrossReference {sku:string;partNumber:string;claimId:string;publishRule:PublishRule;}
export interface PublicationApproval {technicalApproved:boolean;commercialApproved:boolean;assetsApproved:boolean;identityApproved:boolean;privacyApproved:boolean;technicalReviewerId?:string|null;commercialReviewerId?:string|null;nextReviewAt:string|null;}
export type PageType = 'category'|'model-hub'|'sku'|'identification'|'comparison'|'troubleshooting'|'maintenance'|'repair-vs-replace'|'application'|'location'|'rfq-solution';
export type PublicationStatus = 'Research'|'StructuredEvidence'|'AIDraft'|'AutomatedValidation'|'TechnicalReview'|'CommercialLegalReview'|'Approved'|'Published'|'NeedsRevalidation'|'Hold'|'Retired';
export interface SEOPage {id:string;type:PageType;canonicalPath:string;intent:string;title:string;h1:string;metaDescription:string;status:PublicationStatus;sourceIds:string[];claims:CompatibilityEvidence[];review:PublicationApproval;sections:string[];links:InternalLink[];sku?:string|null;partNumber?:string|null;familyId?:string|null;regionId?:string|null;missingEvidence?:string[];extra?:Record<string,unknown>;}
export interface InternalLink {href:string;anchor:string;relation:string;evidenceClaimIds:string[];}
export interface ModelComparison {leftFamilyId:string;rightFamilyId:string;comparisonClaimIds:string[];}
export interface EquipmentApplication {applicationId:string;familyClaimIds:string[];exactEquipmentClaimIds:string[];}
export interface LocationLandingPage {regionId:string;approvedCoverageClaimId:string|null;uniqueLocalEvidenceIds:string[];}
export interface RFQLandingPage {acceptsUnknownModel:true;operationalRFQStatus:'not-implemented'|'verified-working'|'paused';}

// Editor/revision/CTA and related-page fields are required for approved releases;
// Research-only fixtures intentionally may omit them.
export interface PublicationReadyFields {
  authorId: string;
  sourceRevision: string;
  lastVerifiedAt: string;
  nextReviewAt: string;
  primaryCta: string;
  relatedIds: string[];
}
export type ApprovedSEOPage = SEOPage & PublicationReadyFields & { status: 'Approved' | 'Published' };
