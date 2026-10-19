#!/usr/bin/env python3
"""SEO-02 independent documentation/schema/architecture validations.
Requires: pip install jsonschema>=4.20
Run from repository root: python scripts/validate_seo02.py
This does NOT crawl or test any production website or RFQ backend.
"""
from __future__ import annotations

import copy
import csv
import json
import sys
from pathlib import Path
from collections import Counter

from jsonschema import Draft202012Validator, FormatChecker

ROOT = Path(__file__).resolve().parents[1]
FIX = ROOT / "Templates" / "SEO"
REPO = ROOT / "40-Data" / "derived"
STATE = ROOT / "70-Project-State"

def load_json(name):
    return json.loads((FIX / name).read_text(encoding="utf-8"))

def rows(path):
    with path.open(encoding="utf-8-sig", newline="") as handle:
        return list(csv.DictReader(handle))

def require(condition, message):
    if not condition:
        raise AssertionError(message)

def run():
    json_names = [
        "content-model.schema.json", "page-types.json", "examples.json",
        "link-rules.json", "qa-scenarios.json",
    ]
    docs = {name: load_json(name) for name in json_names}
    schema = docs["content-model.schema.json"]
    Draft202012Validator.check_schema(schema)
    validator = Draft202012Validator(schema, format_checker=FormatChecker())
    examples = docs["examples.json"]
    registry = docs["page-types.json"]["templates"]
    links = docs["link-rules.json"]
    scenarios = docs["qa-scenarios.json"]

    require(len(registry) == 11, "Expected 11 template definitions")
    require(len(examples) == 11, "Expected 11 example records")
    require(len(scenarios) == 10, "Expected 10 architecture scenarios")
    require(len(set(x["type"] for x in registry)) == 11, "Duplicate template type")
    require(len(set(x["canonicalPath"] for x in examples)) == 11, "Duplicate example URL")
    require(set(x["type"] for x in registry) == set(x["type"] for x in examples),
            "Template and example type set mismatch")
    require(len(links["edges"]) >= 9, "Insufficient permitted link rules")

    for example in examples:
        errors = list(validator.iter_errors(example))
        require(not errors, "Example %s failed schema: %s" % (
            example.get("id"), "; ".join(x.message for x in errors)))
        require(example["status"] == "Research", "Examples may not impersonate published copy")
        require(not example["sourceIds"] and not example["claims"],
                "Sanitized source-less fixtures must not assert compatibility")
        require(not any(v for k,v in example["review"].items() if k.endswith("Approved")),
                "No fictitious reviewer approval allowed")

    # Negative JSON Schema tests (these must fail).
    sample = copy.deepcopy(examples[2])
    sample["status"] = "Published"
    require(bool(list(validator.iter_errors(sample))),
            "Publication gate must block an unapproved source-less sample")
    sample = copy.deepcopy(examples[2])
    sample["canonicalPath"] = "/parts//sp211c006/"
    require(bool(list(validator.iter_errors(sample))), "Double slash canonical must fail")
    sample = copy.deepcopy(examples[2])
    sample["sku"] = "SP211C006"
    require(bool(list(validator.iter_errors(sample))), "Non-internal SKU must fail")
    sample = copy.deepcopy(examples[2])
    sample["claims"] = [{
        "claimId": "test-review", "sourceSku": "SP314C002-TWD",
        "relationshipType": "OEM_CROSS_REFERENCE", "targetType": "OEM_PART_NUMBER",
        "target": "unverified number", "scope": "Exact-part / secondary-xref",
        "evidenceLevel": "Specialist reseller", "publishRule": "Review",
        "sourceUrl": "https://example.org/test", "sourceId": "source-test",
        "technicalReviewStatus": "Pending", "approvedForPublication": True,
    }]
    require(bool(list(validator.iter_errors(sample))),
            "Review evidence cannot be marked publication-approved")

    phase4 = rows(REPO / "phase4_product_relationships_public.csv")
    phase5 = rows(REPO / "phase5_product_catalog_index_public.csv")
    backlog = rows(STATE / "SEO_PAGE_BACKLOG.csv")
    architecture = rows(STATE / "SEO_02_PAGE_ARCHITECTURE.csv")
    require(len(phase5) == 20, "Expected Phase5 Launch-20 catalog")
    require(len(backlog) == 58, "Expected original 47 plus 11 backlog additions")
    require(len(architecture) == 60, "Expected 58 planned + 2 internal HOLD records")
    require(len({r["ProposedURL"] for r in backlog}) == 58, "Duplicate planned URL")
    require(len({r["CanonicalURL"] for r in architecture}) == 60, "Duplicate architecture URL")
    require(len(architecture[0]) == 17, "Architecture must preserve all 17 mapped columns")

    old_part_ids = ("SP211P304-TWD", "SP111P340-TWD")
    status = {r["SKU"]: r["PublicationStatus"] for r in phase5}
    for sku in old_part_ids:
        require(status.get(sku) == "HOLD", "Held SKU status unexpectedly changed")
    require(sum(1 for r in phase5 if r["PublicationStatus"] == "DRAFT") == 18,
            "Expected 18 separate unapproved Phase5 drafts")
    require(all(k in phase4[0] for k in
                ("SourceSKU", "RelationshipType", "TargetType", "Target",
                 "Scope", "EvidenceLevel", "PublishRule", "SourceURL", "Notes")),
            "Phase4 compatibility columns changed")

    planned = {r["ProposedURL"] for r in backlog}
    arch_urls = {r["CanonicalURL"] for r in architecture}
    require(planned.issubset(arch_urls), "Missing backlog destinations from rich architecture")
    require({r["CanonicalURL"] for r in architecture if "HOLD" in r["Status"]} ==
            {"/parts/sp211p304/", "/parts/sp111p340/"},
            "HOLD-only page mapping incorrect")

    accepted = set()
    def case(number, title, condition, detail):
        require(condition, "Scenario %s: %s" % (number, detail))
        accepted.add(number)
        print("ARCHITECTURE PASS", number, title)

    def has_rel(sku, typ, rule, scope=None, target=None):
        return any(r["SourceSKU"] == sku and r["RelationshipType"] == typ
                   and r["PublishRule"] == rule
                   and (scope is None or r["Scope"] == scope)
                   and (target is None or target in r["Target"]) for r in phase4)

    # Ten test cases are *source/architecture* tests, NOT deployed website assertions.
    case("01", "Exact SKU identification",
         "/parts/sp211c006/" in planned and
         has_rel("SP211C006-TWD", "MEMBER_OF", "Yes", "Exact") and
         has_rel("CX110C005-TWD", "OEM_CROSS_REFERENCE", "Yes", "Exact",
                 "603643003"),
         "SKU/OEM evidence or canonical missing")

    case("02", "Unknown model or BOM",
         "/solutions/twin-disc-pto-clutch-replacement/" in planned and
         "rfq-solution" in {x["type"] for x in registry} and
         any("acceptsUnknownModel" in t["required"]
             for t in registry if t["type"] == "rfq-solution"),
         "Unknown-model intake template absent")

    case("03", "Family-only stays family",
         any(r["PublishRule"] == "Family-only" for r in phase4) and
         any("Family-only" in x["sourceRequirement"]
             for x in registry if x["type"] == "application"),
         "Family context must be separately labeled")

    case("04", "HOLD product restrictions",
         all(status.get(sku) == "HOLD" for sku in old_part_ids) and
         "/parts/sp211p304/" not in planned,
         "Held product leaked into public candidate backlog")

    case("05", "Duplicate URL and intent",
         len({r["ProposedURL"] for r in backlog}) == 58 and
         sum(r["ProposedURL"] == "/parts/sp211c006/" for r in backlog) == 1,
         "Duplicate canonical found")

    case("06", "Troubleshooting journey",
         all(u in planned for u in [
             "/resources/pto-clutch-slipping/",
             "/resources/identify-twin-disc-pto/",
             "/power-take-offs/sp211/",
         ]) and any(e[0] == "troubleshooting" and e[1] == "identification"
                    for e in links["edges"]),
         "Missing safe troubleshooting-to-identification path")

    case("07", "Ontario local claims",
         "/locations/hamilton/" in planned and
         "fulfilment" in next(r["MissingEvidence"] for r in architecture
                              if r["CanonicalURL"] == "/locations/hamilton/").lower()
         and not any("/services/" in r["ProposedURL"] for r in backlog),
         "Geography lacks conditional evidence gate")

    case("08", "Unsupported specifications and cross-references",
         has_rel("SP314C002-TWD", "OEM_CROSS_REFERENCE", "Review") and
         any(x["type"] == "maintenance" and "relevantManualRevision" in x["required"]
             for x in registry) and
         bool(list(validator.iter_errors(sample))),
         "Revision or secondary-xref restrictions missing")

    case("09", "New product scaling",
         len(phase5) == 20 and
         any(x["type"] == "sku" and "partNumber" in x["required"]
             for x in registry) and
         len([r for r in architecture if r["ContentType"] == "sku"]) >= 18,
         "New SKU template or category mapping incomplete")

    case("10", "Source revision and supersession invalidation",
         "NeedsRevalidation" in schema["properties"]["status"]["enum"] and
         "SUPERSEDED_BY" in schema["$defs"]["claim"]["properties"]["relationshipType"]["enum"] and
         any(x["type"] == "maintenance" for x in registry),
         "Cannot represent source-revision/review state")

    require(len(accepted) == 10, "All 10 scenarios must be evaluated")
    require(len({x["id"] for x in scenarios}) == 10, "QA scenario IDs duplicate")
    print("PASS: %d valid JSON documents, JSON Schema Draft 2020-12 checked,"
          " %d valid research examples, four negative-policy samples rejected,"
          " %d architecture scenarios, %d page rows (%d internal HOLD) "
          "and Phase4/5 source compatibility." %
          (len(json_names), len(examples), len(accepted), len(architecture),
           len(architecture)-len(backlog)))
    print("LIMIT: No live Astro/SEO03 production routes, redirects, RFQ or crawl tested.")

if __name__ == "__main__":
    try:
        run()
    except Exception as exc:
        print("SEO02 VALIDATION FAILED:", exc, file=sys.stderr)
        raise
