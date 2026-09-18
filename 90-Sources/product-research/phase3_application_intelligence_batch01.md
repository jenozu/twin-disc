# Phase 2–3 Research — Batch 01

## Objective
Classify the highest-priority SAP SKUs into normalized product families, then connect them to documented Twin Disc families, applications, OEM cross-references, equipment evidence, and lead-generation targets.

## Evidence rules
Use three levels:

- **Exact** — the exact SKU/assembly/part number is explicitly shown in an official Twin Disc drawing, an authorized distributor parts list, OEM manual, or other strong source.
- **Family** — the product family is confirmed, but the source only documents applications/specifications for the broader family.
- **Unverified** — plausible from numbering or context, but not supported by a source. Do not publish as compatibility.

Never convert a family-level application into an exact equipment-fit claim without evidence.

## Batch 01 findings

### SP211P304-TWD
- Classification: Mechanical PTO / complete PTO assembly.
- Twin Disc model: SP211HP3; assembly/drawing SP211P304.
- Official configuration: two 11.5-inch plates, solid molded, 2.5-inch ball-bearing collar, SAE #3, 2.5 x 6.5-inch output shaft, 72 mm pilot bearing.
- SP211 family applications commonly include mud/manure/injection/irrigation pumps, oil & gas, flood control, wood chippers, tub grinders, conveyors, compressors, blowers, fans, and grain dryers.
- Exact OEM cross-reference: Bandit 900-6915-74.
- Specific market evidence: a Conveyair grain vacuum listing identifies an SP211HP3 with BOM SP211P304; Bandit aftermarket listings market 900-6915-74/SP211P304 for chippers, stump grinders, and horizontal grinders.
- Status caution: Twin Disc's engineering drawing carries an obsolete-for-production note with service replacement PX1039839C, while Palmer Johnson lists SP211P304 as active. Verify before listing for sale.

### SP111P340-TWD
- Classification: Mechanical PTO / complete PTO assembly.
- Twin Disc model: SP111HP3; assembly SP111P340.
- Configuration: one 11.5-inch plate, solid molded, 2.0-inch ball-bearing collar, SAE #3, 2.25 x 6.5-inch output shaft, 72 mm pilot bearing.
- Family applications: wood chippers, irrigation pumps, manure pumps, flood control, snow blowers, agriculture.
- Exact OEM/equipment mapping for P340 is still open.
- Status caution: Twin Disc drawing says obsolete for production and references service replacement PX1039800D; Palmer Johnson lists P340 as active. Verify sellable status.

### CX110P315-TWD
- Classification: Mechanical PTO / complete PTO assembly.
- Family: CX110P; authorized-distributor parts list identifies P315 as C110HP3 MD1 BB 306 SB.
- Family torque: 448 Nm organic / 556 Nm sintered.
- Family applications: mud, manure, injection and irrigation pumps; oil & gas; flood control; wood chippers; tub grinders; conveyors; compressors; blowers; fans; sewer trucks; grain dryers.
- Exact P315 OEM/equipment mapping remains open.

### CX110P418-TWD
- Classification: Mechanical PTO / complete PTO assembly.
- Family: CX110P.
- Palmer Johnson lists P418 as an active assembly.
- Exact configuration and OEM mapping remain open. Do not infer SAE housing or shaft data from the number alone.

### CX108P405-TWD
- Classification: Mechanical PTO / complete PTO assembly.
- Family: CX108P; parts list identifies P405 as C108HP4 MD3 BB 305 SB.
- Family torque: 312 Nm organic / 387 Nm sintered.
- Family applications: mud/manure/injection/irrigation pumps, oil & gas, flood control, wood chippers, tub grinders, conveyors, compressors, blowers, fans, grain dryers.
- Exact equipment mapping remains open.

### SP314C006-TWD
- Classification: clutch assembly / SP314 PTO component.
- Parts list description: SP314 3.25TA M SIN BB S697.
- Treat as a service/replacement component for installed SP314 units, not as a standalone application.
- One NSN listing associates the part with ship propulsion, but that is one end-use record and should not be generalized.

### SP314S120-TWD
- Classification: Mechanical PTO / complete straddle-bearing PTO.
- Family: SP314S / SP314SB1.
- Parts list description: SP314SB1 SIN BB, no pilot bearing, with auxiliary shaft.
- Family rating: 2430 lb-ft max input torque; published clutch HP ratings vary by duty class.
- Family applications: sand dredges, irrigation pumps, cranes/hoisting, metal shredders, recycling equipment, jaw crushers, compressors.
- Equipment evidence: Bandit Beast 3680 documentation uses the SP314SB1 family. Exact S120 fit is not yet confirmed.

### SP211C006-TWD
- Classification: clutch assembly / SP211 PTO component.
- Parts list description: SP211 2.30TA D MD1 BB S745.
- Exact OEM cross-references: Gear Products 600-30063-1; Morbark 24541-258; Terex 04U421V3609; Bandit 900-6943-78.
- Strong e-commerce/SEO candidate because buyers may search any of those OEM numbers.

### SP111C006-TWD
- Classification: clutch assembly / SP111 PTO component.
- Parts list description: SP111 2.00TA C MD1 BB S670.
- Exact OEM cross-reference: Bandit 900-6944-34.
- Strong long-tail replacement-parts candidate.

### A6518A-TWD
- Classification: drive ring.
- Twin Disc/Palmer Johnson parts lists identify A6518A as a drive ring.
- Bandit Beast 3680 documentation shows A6518A inside an SP314SB1 PTO.
- Strong product-page/search combination: A6518A + SP314SB1 + Bandit Beast 3680.
- Do not claim universal SP314 fit without additional BOM evidence.

## Family-level buyer segments

### SP111
Prioritize:
1. Wood-chipper dealers and repair shops.
2. Irrigation pump packagers/service companies.
3. Agricultural-equipment repair.
4. Snow/flood-control equipment service.
5. PTO rebuilders.

### SP211
Prioritize:
1. Bandit/Morbark/Terex forestry equipment service.
2. Grain-vacuum and grain-handling equipment.
3. Irrigation and industrial pump packagers.
4. Tub/horizontal grinder operators.
5. Compressor/blower/fan packagers.
6. Oilfield and flood-control equipment service.

### CX108/CX110
Prioritize:
1. Irrigation, manure, injection and mud-pump packagers.
2. Oil & gas service-equipment builders.
3. Sewer/vacuum truck repair (especially CX110).
4. Wood-chipper and tub-grinder service.
5. Conveyor, compressor, blower and fan OEMs/service.
6. Grain-dryer equipment.

### SP314S
Prioritize:
1. Recycling and metal-shredder operators.
2. Jaw-crusher/aggregate equipment service.
3. Sand dredging.
4. Irrigation pumps.
5. Crane/hoist equipment.
6. Compressor packagers.
7. Bandit Beast / heavy grinder service as a family-level lead source.

## Product-page keyword structure
For each SKU, create keyword clusters in this order:

1. Exact Twin Disc SKU.
2. Exact OEM cross-reference(s).
3. Twin Disc family/model.
4. Product type.
5. Verified equipment model, when exact evidence exists.
6. Verified application category.
7. Replacement / clutch / PTO / rebuild / parts terms.

Example:
- Twin Disc SP211C006
- Morbark 24541-258
- Bandit 900-6943-78
- Terex 04U421V3609
- SP211 clutch assembly
- Twin Disc SP211 PTO clutch

## Phase 3 research workflow for each next SKU
1. Search exact Twin Disc part number.
2. Search official Twin Disc product/drawing pages.
3. Search authorized distributor part lists.
4. Search exact SKU with OEM names: Bandit, Morbark, Vermeer, CAT, Cummins, CNH, Terex, Vactor, John Deere, Komatsu, Manitowoc.
5. Search exact SKU in equipment operator/parts manuals.
6. Capture only evidence-backed cross-references.
7. Add buyer segment and prospect-search keywords.
8. Mark confidence as Exact / Family / Unverified.
9. Add supersession/obsolete status if documented.
10. Only then approve compatibility text for the website.

## Sources
- Twin Disc SP111P/211P product page: https://twindisc.com/product/sp111p-211p/
- Twin Disc CX108P product page: https://twindisc.com/product/cx108p/
- Twin Disc CX110P product page: https://twindisc.com/product/cx110p/
- Twin Disc SP314S product page: https://twindisc.com/product/sp314s/
- Twin Disc Mechanical PTO Selection Guide: https://twindisc.com/downloads/Mechanical_Power-Take-offs_-_Selection_Guide.pdf
- Twin Disc SP211P304 drawing: https://twindisc.com/downloads/SP211P304-2.pdf
- Twin Disc SP111P340 drawing: https://twindisc.com/downloads/Sp111p340-2.pdf
- Palmer Johnson SP111P: https://www.pjpower.com/products/twindisc/ptos/sp111p
- Palmer Johnson SP211P: https://www.pjpower.com/products/twindisc/ptos/sp211p
- Palmer Johnson CX108P: https://www.pjpower.com/products/twindisc/ptos/cx108p
- Palmer Johnson CX110P: https://www.pjpower.com/products/twindisc/ptos/cx110p
- Palmer Johnson SP314S: https://www.pjpower.com/products/twindisc/ptos/sp314s
- Palmer Johnson Twin Disc Parts List: https://static.pjpower.com/document_library/Twin-Disc-Part-List-0821.pdf
- Bandit Beast 3680 manual (SP314SB1/A6518A evidence): https://www.stephensonequipment.com/wp-content/uploads/2023/08/bandit-beast-grinder-3680.pdf
