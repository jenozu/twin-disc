export type Product = {
  priority: number;
  sku: string;
  partNumber: string;
  title: string;
  family: string;
  modelFamily: string;
  pageType: string;
  status: "DRAFT" | "HOLD";
};

export const products: Product[] = [
  { priority: 1, sku: "SP211P304-TWD", partNumber: "SP211P304", title: "Twin Disc SP211P304 Power Take-Off", family: "PTO", modelFamily: "SP211P / SP211HP3", pageType: "Assembly", status: "HOLD" },
  { priority: 2, sku: "SP111P340-TWD", partNumber: "SP111P340", title: "Twin Disc SP111P340 Power Take-Off", family: "PTO", modelFamily: "SP111P / SP111HP3", pageType: "Assembly", status: "HOLD" },
  { priority: 3, sku: "CX110P315-TWD", partNumber: "CX110P315", title: "Twin Disc CX110P315 Power Take-Off", family: "PTO", modelFamily: "CX110P / C110HP3", pageType: "Assembly", status: "DRAFT" },
  { priority: 4, sku: "CX110P418-TWD", partNumber: "CX110P418", title: "Twin Disc CX110P418 Power Take-Off", family: "PTO", modelFamily: "CX110P", pageType: "Assembly", status: "DRAFT" },
  { priority: 5, sku: "CX108P405-TWD", partNumber: "CX108P405", title: "Twin Disc CX108P405 Power Take-Off", family: "PTO", modelFamily: "CX108P / C108HP4", pageType: "Assembly", status: "DRAFT" },
  { priority: 6, sku: "SP314C006-TWD", partNumber: "SP314C006", title: "Twin Disc SP314C006 Clutch Assembly", family: "Clutch", modelFamily: "SP314", pageType: "Service part", status: "DRAFT" },
  { priority: 7, sku: "SP314S120-TWD", partNumber: "SP314S120", title: "Twin Disc SP314S120 Power Take-Off", family: "PTO", modelFamily: "SP314S / SP314SB1", pageType: "Assembly", status: "DRAFT" },
  { priority: 8, sku: "SP211C006-TWD", partNumber: "SP211C006", title: "Twin Disc SP211C006 Clutch Assembly", family: "Clutch", modelFamily: "SP211", pageType: "Service part", status: "DRAFT" },
  { priority: 9, sku: "SP111C006-TWD", partNumber: "SP111C006", title: "Twin Disc SP111C006 Clutch Assembly", family: "Clutch", modelFamily: "SP111", pageType: "Service part", status: "DRAFT" },
  { priority: 10, sku: "A6518A-TWD", partNumber: "A6518A", title: "Twin Disc A6518A Drive Ring", family: "Drive Ring", modelFamily: "SP314SB1 relationship", pageType: "Service part", status: "DRAFT" },
  { priority: 11, sku: "CX107P405-TWD", partNumber: "CX107P405", title: "Twin Disc CX107P405 Power Take-Off", family: "PTO", modelFamily: "CX107P", pageType: "Assembly", status: "DRAFT" },
  { priority: 12, sku: "CX110C005-TWD", partNumber: "CX110C005", title: "Twin Disc CX110C005 Clutch Assembly", family: "Clutch", modelFamily: "CX110 clutch family", pageType: "Service part", status: "DRAFT" },
  { priority: 13, sku: "SP314C002-TWD", partNumber: "SP314C002", title: "Twin Disc SP314C002 Clutch Assembly", family: "Clutch", modelFamily: "SP314P", pageType: "Service part", status: "DRAFT" },
  { priority: 14, sku: "IT1071028B-TWD", partNumber: "IT1071028B", title: "Twin Disc IT1071028B Pump Drive Component", family: "Pump Drive", modelFamily: "AM220 pump drive input assembly", pageType: "Technical component", status: "DRAFT" },
  { priority: 15, sku: "SP318C003-TWD", partNumber: "SP318C003", title: "Twin Disc SP318C003 Clutch Assembly", family: "Clutch", modelFamily: "SP318", pageType: "Service part", status: "DRAFT" },
  { priority: 16, sku: "6926E-TWD", partNumber: "6926E", title: "Twin Disc 6926E Drive Ring", family: "Drive Ring", modelFamily: "SP318 / SP318SBO drive ring", pageType: "Service part", status: "DRAFT" },
  { priority: 17, sku: "O5499E-TWD", partNumber: "O5499E", title: "Twin Disc O5499E Friction Component", family: "Friction Component", modelFamily: "IBF314 / IB314P", pageType: "Service part", status: "DRAFT" },
  { priority: 18, sku: "5659P-TWD", partNumber: "5659P", title: "Twin Disc 5659P Friction Component", family: "Friction Component", modelFamily: "IBF314 / IB314P", pageType: "Service part", status: "DRAFT" },
  { priority: 19, sku: "A5579D-TWD", partNumber: "A5579D", title: "Twin Disc A5579D Friction Component", family: "Friction Component", modelFamily: "SP111", pageType: "Service part", status: "DRAFT" },
  { priority: 20, sku: "CX108P305-TWD", partNumber: "CX108P305", title: "Twin Disc CX108P305", family: "Other Component", modelFamily: "CX108P / C108HP3", pageType: "Product", status: "DRAFT" },
];

export const publicProducts = products.filter((product) => product.status === "DRAFT");

/* -------------------------------------------------------------------------- */
/* SEO model catalog                                                          */
/* -------------------------------------------------------------------------- */

export type ProductCategory =
  | 'marine-transmissions'
  | 'power-take-offs'
  | 'clutches'
  | 'torque-converters'
  | 'parts-and-kits';

export interface FAQ {
  question: string;
  answer: string;
}

export interface TechnicalSpec {
  label: string;
  value: string;
}

export interface ProductModel {
  id: string;
  category: ProductCategory;
  modelName: string;
  metaTitle: string;
  metaDescription: string;
  h1: string;
  heroSubtitle: string;
  introParagraph: string;
  targetKeywords: string[];
  specs: TechnicalSpec[];
  commonApplications: string[];
  faqs: FAQ[];
  /** Alternate model spellings/search forms, e.g. MG5061 or MG-5061SC. */
  aliases?: string[];
  /** Related product IDs used for internal linking and cross-sell modules. */
  relatedProducts?: string[];
  /** Lifecycle flag for UI badges. Leave as unknown unless verified. */
  status?: 'current' | 'legacy' | 'unknown';
  /** Fields a buyer should provide for a fitment-safe RFQ. */
  quoteRequiredFields?: string[];
}

export const SITE_URL = 'https://twd.andel-vps.space';

export const SPEC_DISCLAIMER =
  'Specifications are reference data and can vary by model suffix, ratio, duty class, engine speed, serial number and BOM. Confirm the exact configuration before ordering, repowering or selecting a replacement unit.';

export const categoryLabels: Record<ProductCategory, string> = {
  'marine-transmissions': 'Marine Transmissions',
  'power-take-offs': 'Power Take-Offs (PTOs)',
  clutches: 'Industrial Clutches',
  'torque-converters': 'Torque Converters',
  'parts-and-kits': 'Parts & Overhaul Kits',
};

export const twinDiscProducts: ProductModel[] = [
  {
    id: 'twin-disc-mg506',
    category: 'marine-transmissions',
    modelName: 'Twin Disc MG-506 Marine Transmission',
    aliases: ['Twin Disc MG506', 'Twin Disc MG-506-1', 'Twin Disc MG506-1'],
    relatedProducts: ['twin-disc-mg5061', 'twin-disc-overhaul-kits'],
    status: 'legacy',
    quoteRequiredFields: [
      'Full model and suffix',
      'Serial number',
      'BOM / bill of material number',
      'Reduction ratio',
      'Engine make and model',
      'Engine horsepower',
      'Rated engine RPM',
      'Photos of the transmission nameplate',
    ],
    metaTitle: 'Twin Disc MG-506 Parts, Rebuilds & Marine Gear',
    metaDescription:
      'Source MG-506 parts, rebuild support and replacement marine gears. Send your model, ratio and BOM for fast fitment help and a commercial quote.',
    h1: 'Twin Disc MG-506 Marine Transmission Parts, Rebuilds & Service',
    heroSubtitle:
      'Legacy MG-506 marine gear support for commercial vessels, repowers, emergency replacements and complete transmission overhauls.',
    introParagraph: `The Twin Disc MG-506 remains a widely serviced legacy marine transmission because its mechanically straightforward hydraulic clutch system, durable gear train and broad installed base make it practical to rebuild rather than automatically replace. MG-506 units are found in commercial fishing boats, workboats, patrol craft, charter vessels and older propulsion packages where dependable low-speed maneuvering and field-serviceability matter more than electronic integration. Published MG-506 configurations include multiple reduction ratios and SAE flywheel-housing arrangements, but the exact rating, internal gear set and service parts must be matched to the transmission nameplate, serial number and bill of material before parts are ordered. That is especially important on older MG-506-1, MG-506-A and related variants because decades of production changes, ratio changes and previous rebuilds can alter internal components. For an overhaul, the correct process is to verify clutch friction and steel condition, bearings, seals, pump performance, valve function, gear tooth condition, shaft end play and oil-cooling requirements as a complete system. For downtime-sensitive operators, we can help organize replacement-unit, rebuild-part and overhaul-kit requirements from the model and BOM so the repair scope is established before the vessel is committed to extended teardown time.`,
    targetKeywords: [
      // Emergency intent
      'emergency Twin Disc MG506 replacement',
      'emergency Twin Disc MG506 repair',
      // Commercial intent
      'Twin Disc MG506 marine transmission for sale',
      'Twin Disc MG506 replacement transmission',
      // Model-specific intent
      'Twin Disc MG506 rebuild kit',
      'Twin Disc MG506 parts',
    ],
    specs: [
      {
        label: 'Transmission Type',
        value: 'Hydraulically actuated, oil-cooled marine reduction gear',
      },
      {
        label: 'Legacy Ratios',
        value: '1.09:1, 1.50:1, 1.97:1, 2.50:1 and 2.96:1 depending on MG-506 variant and build',
      },
      {
        label: 'Maximum Input Speed',
        value: '3000 rpm published for legacy MG-506-1 configurations',
      },
      {
        label: 'SAE Housing Sizes',
        value: 'SAE J617 No. 1, No. 2 and No. 3 configurations appear in legacy Twin Disc product guides',
      },
      {
        label: 'Oil Capacity',
        value: 'MG-506-1: approximately 1.2 U.S. gal (4.5 L); verify by exact model and service manual',
      },
      {
        label: 'Dry Weight',
        value: 'Approximately 100-102 kg (220-224 lb) depending on legacy gearset and configuration',
      },
      {
        label: 'Rating Verification',
        value: 'Horsepower and duty rating must be confirmed by ratio, input rpm, service class and exact BOM before repower use',
      },
    ],
    commonApplications: [
      'Commercial Fishing Vessels',
      'Workboats and Utility Craft',
      'Charter and Tour Vessels',
      'Patrol and Service Boats',
      'Legacy Diesel Repower Projects',
    ],
    faqs: [
      {
        question: 'How do I identify the correct MG-506 rebuild parts?',
        answer: `Use the complete Twin Disc nameplate information, including model, serial number, ratio and bill of material. MG-506 units were produced in multiple ratios and configurations, and internal clutch, bearing, seal and gear components can differ. A model name alone is not sufficient for production-grade fitment verification.`,
      },
      {
        question: 'What ratios were used in Twin Disc MG-506 transmissions?',
        answer: `Legacy product literature shows MG-506 family ratios including 1.09:1, 1.50:1, 1.97:1, 2.50:1 and 2.96:1 depending on the exact MG-506 variant. The installed ratio should always be verified from the nameplate or gearset before ordering a replacement transmission.`,
      },
      {
        question: 'Can an MG-506 be rebuilt instead of replaced?',
        answer: `Yes, provided the housing, shafts and major gears remain serviceable and the required parts are available. A proper overhaul should inspect clutch plates, steels, bearings, seals, oil pump output, valve operation, gear tooth condition, cooling circuit condition and shaft end play rather than treating the repair as a seal-only service.`,
      },
    ],
  },
  {
    id: 'twin-disc-mg5061',
    category: 'marine-transmissions',
    modelName: 'Twin Disc MG-5061 Marine Transmission',
    aliases: ['Twin Disc MG5061', 'Twin Disc MG-5061SC', 'Twin Disc MG-5061A'],
    relatedProducts: ['twin-disc-mg506', 'twin-disc-mg5075', 'twin-disc-overhaul-kits'],
    status: 'unknown',
    quoteRequiredFields: [
      'Full model and suffix',
      'Serial number',
      'BOM / bill of material number',
      'Reduction ratio',
      'Engine make and model',
      'Engine horsepower',
      'Rated engine RPM',
      'Vessel duty / operating profile',
      'Photos of the transmission nameplate',
    ],
    metaTitle: 'Twin Disc MG-5061 Marine Transmission & Parts',
    metaDescription:
      'Get MG-5061 SC/A parts, rebuild support or replacement gear help. Verify ratio, duty and BOM for a fast commercial transmission quote.',
    h1: 'Twin Disc MG-5061 SC / A Marine Transmission',
    heroSubtitle:
      'Compact vertical-offset marine gearing with multiple ratios, commercial-duty ratings and live PTO options for propulsion and auxiliary loads.',
    introParagraph: `The Twin Disc MG-5061 series is a compact vertical-offset marine transmission family used where vessel designers need a strong mechanical gear with proven hydraulic clutch control, multiple reduction choices and serviceable auxiliary options. MG-5061SC installations use a vertical-offset arrangement, while MG-5061A variants add a down-angle output configuration for shaft-line packaging. Twin Disc publishes different allowable input ratings by ratio, engine speed and duty classification, which is critical when matching a replacement unit to a commercial vessel. A pleasure-craft number must not be substituted for a continuous-duty rating on a tug, trawler or other high-load workboat. In the published duty table, common MG-5061SC ratios carry substantially lower continuous ratings than their pleasure-craft limits, reflecting the heat and load exposure of long-hour operation. The series also supports SAE flywheel-housing configurations, flexible couplings, trolling options and live hydraulic PTO provisions on selected builds. During overhaul, the clutch pack, control valve, oil strainer, bearings, seals, gear contact pattern and cooler circuit should be evaluated together. For replacement or rebuild work, supplying the transmission model, ratio, engine rating, operating duty, serial number and BOM allows the correct parts and engineering limits to be checked before a quote is finalized.`,
    targetKeywords: [
      // Emergency intent
      'emergency Twin Disc MG5061 replacement',
      'emergency Twin Disc MG5061 rebuild',
      // Commercial intent
      'Twin Disc MG5061 marine transmission for sale',
      'Twin Disc MG5061 replacement marine gear',
      // Model-specific intent
      'Twin Disc MG5061 rebuild kit',
      'Twin Disc MG5061 parts',
    ],
    specs: [
      {
        label: 'Configuration',
        value: 'MG-5061SC vertical offset; MG-5061A vertical offset with down-angle output configuration',
      },
      {
        label: 'MG-5061SC Ratios',
        value: '1.15:1, 1.48:1, 1.77:1, 2.00:1, 2.43:1 and 3.00:1',
      },
      {
        label: 'Pleasure Craft Rating',
        value: 'Published table: up to 345 kW (463 hp) at 2800 rpm; current Twin Disc summary lists MG-5061SC up to 395 kW (530 hp) at 3200 rpm',
      },
      {
        label: 'Continuous Duty Rating',
        value: 'Up to 142 kW (190 hp) at 2100 rpm on common ratios; 3.00:1 is lower in the published duty table',
      },
      {
        label: 'Input Speed',
        value: 'Manufacturer literature lists a 3300 rpm maximum rated engine speed for standard configurations',
      },
      {
        label: 'SAE Housing Sizes',
        value: 'SAE J617 No. 1 through No. 4 configurations/adaptors are listed by Twin Disc for the series',
      },
      {
        label: 'Live PTO',
        value: 'SAE A and SAE B live PTO options; manufacturer page lists up to 35 Nm on SAE A and 197 Nm on SAE B',
      },
    ],
    commonApplications: [
      'Commercial Fishing Vessels',
      'Patrol Boats',
      'Crew and Service Boats',
      'Light-Duty Ferries',
      'Recreational and Charter Craft',
    ],
    faqs: [
      {
        question: 'Why are there different horsepower ratings for the MG-5061?',
        answer: `Twin Disc rates marine gears by duty class, ratio and input speed. Pleasure-craft service permits a higher intermittent load than continuous commercial service, so an MG-5061 that is acceptable in a low-hour planing vessel may require a much lower engine rating in a trawler or tug operating near full load for long periods.`,
      },
      {
        question: 'What reduction ratios are available for the MG-5061SC?',
        answer: `Published MG-5061SC ratios include 1.15:1, 1.48:1, 1.77:1, 2.00:1, 2.43:1 and 3.00:1. Rating changes with ratio, so the ratio must be included when checking whether a transmission is suitable for an engine and vessel duty cycle.`,
      },
      {
        question: 'Can the MG-5061 drive a hydraulic pump from a live PTO?',
        answer: `Yes, selected MG-5061 builds support live SAE hydraulic pump-mount PTO options. Twin Disc literature lists SAE A and SAE B options, with the SAE B provision carrying the higher published torque capability. Pump displacement, pressure, duty cycle and torsional compatibility still need to be checked for the actual installation.`,
      },
    ],
  },
  {
    id: 'twin-disc-mg5075',
    category: 'marine-transmissions',
    modelName: 'Twin Disc MG-5075 Marine Transmission',
    aliases: ['Twin Disc MG5075', 'Twin Disc MG-5075SC', 'Twin Disc MG-5075A', 'Twin Disc MG-5075IV'],
    relatedProducts: ['twin-disc-mg5061', 'twin-disc-mg5091', 'twin-disc-overhaul-kits'],
    status: 'unknown',
    quoteRequiredFields: [
      'Full model and suffix',
      'Serial number',
      'BOM / bill of material number',
      'Reduction ratio',
      'Engine make and model',
      'Engine horsepower',
      'Rated engine RPM',
      'Vessel duty / operating profile',
      'Output configuration / shaft arrangement',
    ],
    metaTitle: 'Twin Disc MG-5075 Marine Transmission & Rebuild',
    metaDescription:
      'Source MG-5075 SC/A/IV parts, overhaul support and replacement gears. Send your ratio, duty, serial and BOM for fitment verification.',
    h1: 'Twin Disc MG-5075 SC / A / IV Marine Transmission',
    heroSubtitle:
      'High-capacity aluminum marine gearing for straight, down-angle and integral V-drive propulsion layouts.',
    introParagraph: `The Twin Disc MG-5075 series is designed for higher-output marine propulsion packages that still require a compact, serviceable mechanical transmission architecture. The family includes the MG-5075SC near-coaxial configuration, the MG-5075A with a 7-degree down-angle output, and the MG-5075IV integral V-drive with a 15-degree down angle. This range gives naval architects and repower specialists several ways to package the same basic transmission family around shaft-line geometry and engine-room constraints. Twin Disc publishes a maximum pleasure-craft rating of 455 kW (610 hp) at 2500 rpm on selected ratios, while continuous-duty limits are substantially lower because sustained commercial loading creates more clutch, bearing and oil-cooling demand. The published ratio range is broad, including near-direct ratios and reductions approaching 2.9:1 depending on configuration. Optional live PTO pads allow auxiliary hydraulic loads to be integrated where the specific build supports them. On overhaul projects, the aluminum housing should be checked for bore condition and mounting damage in addition to the usual clutch, bearing, seal, gear, valve and oil-cooling inspection. For a replacement or rebuild quote, the exact suffix, ratio, duty class, engine rpm, serial number and BOM should be verified before parts are committed.`,
    targetKeywords: [
      // Emergency intent
      'emergency Twin Disc MG5075 replacement',
      'emergency Twin Disc MG5075 repair',
      // Commercial intent
      'Twin Disc MG5075 marine transmission for sale',
      'Twin Disc MG5075 replacement marine gear',
      // Model-specific intent
      'Twin Disc MG5075 rebuild kit',
      'Twin Disc MG5075 parts',
    ],
    specs: [
      {
        label: 'Configurations',
        value: 'MG-5075SC near coaxial; MG-5075A 7-degree down angle; MG-5075IV integral V-drive with 15-degree down angle',
      },
      {
        label: 'Maximum Pleasure Rating',
        value: '455 kW (610 hp) at 2500 rpm on selected MG-5075SC/A ratios',
      },
      {
        label: 'Continuous Duty Rating',
        value: '186 kW (249 hp) at 1800 rpm in the published rating table',
      },
      {
        label: 'Reduction Ratios',
        value: 'SC includes 0.80:1, 0.92:1, 1.00:1, 1.16:1, 1.06:1, 1.33:1, 1.53:1, 1.77:1, 2.05:1, 2.53:1 and 2.88:1 depending on build',
      },
      {
        label: 'Maximum Rated Engine Speed',
        value: '3500 rpm generally; 3000 rpm on 0.80:1, 0.92:1, 1.00:1 and 1.16:1 ratios',
      },
      {
        label: 'SAE Housing Sizes',
        value: 'SAE J617 No. 1, No. 2 and No. 3',
      },
      {
        label: 'Live PTO Options',
        value: 'SAE A up to 58 Nm, SAE B up to 197 Nm and SAE B-B up to 337 Nm',
      },
    ],
    commonApplications: [
      'Fast Commercial Craft',
      'Commercial Fishing Vessels',
      'Patrol and Pilot Boats',
      'Passenger and Charter Vessels',
      'Yacht and Workboat Repowers',
    ],
    faqs: [
      {
        question: 'What is the continuous-duty rating of the MG-5075?',
        answer: `Twin Disc publishes 186 kW (249 hp) at 1800 rpm as the continuous-duty rating in the MG-5075 series bulletin. The allowable rating still depends on the exact ratio and configuration, so the complete application must be checked rather than using the pleasure-craft maximum.`,
      },
      {
        question: 'What is the difference between MG-5075SC, MG-5075A and MG-5075IV?',
        answer: `The MG-5075SC is a near-coaxial transmission, the MG-5075A uses a 7-degree down-angle output, and the MG-5075IV is an integral V-drive with a 15-degree down angle. These layouts change shaft-line packaging and can affect which replacement housing, output and mounting components are required.`,
      },
      {
        question: 'Can an MG-5075 operate an auxiliary hydraulic pump?',
        answer: `Selected MG-5075 configurations can be equipped with live PTO pump mounts. Twin Disc publishes SAE A, SAE B and SAE B-B PTO options with different torque limits, so pump torque at operating pressure and rpm must stay within the specific PTO rating.`,
      },
    ],
  },
  {
    id: 'twin-disc-mg5091',
    category: 'marine-transmissions',
    modelName: 'Twin Disc MG-5091 Marine Transmission',
    aliases: ['Twin Disc MG5091', 'Twin Disc MG-5091SC', 'Twin Disc MG-5091DC'],
    relatedProducts: ['twin-disc-mg5075', 'twin-disc-mg5114-sc-dc', 'twin-disc-overhaul-kits'],
    status: 'unknown',
    quoteRequiredFields: [
      'Full model and suffix',
      'SC or DC configuration',
      'Serial number',
      'BOM / bill of material number',
      'Reduction ratio',
      'Engine make and model',
      'Engine horsepower',
      'Rated engine RPM',
      'Vessel duty / operating profile',
    ],
    metaTitle: 'Twin Disc MG-5091 Marine Transmission & Parts',
    metaDescription:
      'Get MG-5091 SC/DC parts, rebuild support and replacement marine gears. Verify ratio, duty class and BOM for fast commercial fitment help.',
    h1: 'Twin Disc MG-5091 SC / DC Marine Transmission',
    heroSubtitle:
      'Cast-iron commercial marine gearing with shallow-case and deep-case ratios for workboats, fishing vessels and propulsion repowers.',
    introParagraph: `The Twin Disc MG-5091 series is a robust cast-iron marine transmission family intended for propulsion systems that need higher torque capacity, a broad ratio selection and proven hydraulic clutch operation. MG-5091SC shallow-case units cover ratios from near-direct through approximately 3.33:1, while MG-5091DC deep-case versions extend into the higher reductions used where propeller shaft speed must be lowered further. Twin Disc publishes a maximum pleasure-craft rating of 522 kW (700 hp) at 2300 rpm for selected MG-5091SC ratios, with lower limits for light, intermediate, medium and continuous commercial duty. That duty-class distinction is especially important on tugs, trawlers, crew boats and other vessels that accumulate long hours at substantial engine load. The transmission uses a vertical-offset cast-iron housing, hydraulic clutches and a dedicated lubrication circuit, and selected configurations support live or clutchable hydraulic PTO arrangements. A professional rebuild should include clutch clearances, friction and steel condition, bearings, seals, shafts, gear tooth contact, oil pump performance, valve function, lubrication pressure and cooler cleanliness. When replacing or overhauling an MG-5091, the SC or DC suffix, installed ratio, engine rating, duty profile, serial number and BOM should all be verified before a parts list or replacement gear is approved.`,
    targetKeywords: [
      // Emergency intent
      'emergency Twin Disc MG5091 replacement',
      'emergency Twin Disc MG5091 rebuild',
      // Commercial intent
      'Twin Disc MG5091 marine transmission for sale',
      'Twin Disc MG5091 replacement marine gear',
      // Model-specific intent
      'Twin Disc MG5091 rebuild kit',
      'Twin Disc MG5091 parts',
    ],
    specs: [
      {
        label: 'Housing',
        value: 'Vertical-offset cast-iron housing',
      },
      {
        label: 'Maximum Pleasure Rating',
        value: '522 kW (700 hp) at 2300 rpm on selected MG-5091SC ratios',
      },
      {
        label: 'MG-5091SC Ratios',
        value: '1.17:1, 1.45:1, 1.71:1, 2.04:1, 2.45:1, 2.95:1 and 3.33:1',
      },
      {
        label: 'MG-5091DC Ratios',
        value: '3.82:1, 4.50:1 and 5.05:1',
      },
      {
        label: 'Continuous Duty',
        value: 'Up to 242 kW (325 hp) at 1800 rpm on common ratios; lower ratings apply to some high-reduction ratios',
      },
      {
        label: 'Maximum Rated Engine Speed',
        value: '3000 rpm',
      },
      {
        label: 'PTO Capability',
        value: 'Live and hydraulically clutchable PTO options are available on selected builds; verify pad type and torque limit by BOM',
      },
    ],
    commonApplications: [
      'Tugboats and Towboats',
      'Commercial Fishing Vessels',
      'Crew and Supply Boats',
      'Passenger Ferries',
      'Offshore and Harbor Workboats',
    ],
    faqs: [
      {
        question: 'What is the difference between MG-5091SC and MG-5091DC?',
        answer: `The SC configuration covers the lower and mid-range reduction ratios, while the DC deep-case configuration provides higher reductions such as 3.82:1, 4.50:1 and 5.05:1. The deeper reduction is useful when the propulsion system needs lower propeller-shaft rpm and higher shaft torque.`,
      },
      {
        question: 'What is the maximum published MG-5091 input rating?',
        answer: `Twin Disc publishes up to 522 kW (700 hp) at 2300 rpm for selected MG-5091SC ratios in pleasure-craft duty. Commercial duty ratings are lower and must be selected from the proper light, intermediate, medium or continuous-duty column for the vessel's operating profile.`,
      },
      {
        question: 'What should be checked during an MG-5091 overhaul?',
        answer: `A complete overhaul should inspect clutch frictions and steels, piston and rotating seals, bearings, shafts, gear tooth contact, control-valve function, oil pump performance, lube pressure, cooler condition and housing bores. Replacing only worn friction plates without checking the hydraulic and lubrication system can shorten rebuild life.`,
      },
    ],
  },
  {
    id: 'twin-disc-mg5114-sc-dc',
    category: 'marine-transmissions',
    modelName: 'Twin Disc MG-5114 SC / DC Marine Transmission',
    aliases: ['Twin Disc MG5114', 'Twin Disc MG-5114SC', 'Twin Disc MG-5114DC'],
    relatedProducts: ['twin-disc-mg5091', 'twin-disc-overhaul-kits'],
    status: 'unknown',
    quoteRequiredFields: [
      'Full model and suffix',
      'SC or DC configuration',
      'Serial number',
      'BOM / bill of material number',
      'Reduction ratio',
      'Engine make and model',
      'Engine horsepower',
      'Rated engine RPM',
      'Vessel duty / operating profile',
      'PTO configuration if fitted',
    ],
    metaTitle: 'Twin Disc MG-5114 SC/DC Transmission & Parts',
    metaDescription:
      'Source MG-5114 SC/DC marine gears, rebuild parts and overhaul support. Send ratio, engine data, duty class and BOM for fitment review.',
    h1: 'Twin Disc MG-5114 SC / DC Marine Transmission',
    heroSubtitle:
      'Heavy commercial marine gearing with high torque capacity, broad reduction choices and PTO capability for demanding propulsion packages.',
    introParagraph: `The Twin Disc MG-5114 family is a heavy marine transmission platform used where propulsion systems require significantly more torque capacity than the smaller MG series while retaining conventional shaft-line architecture and serviceable hydraulic clutches. The MG-5114SC shallow-case configuration covers ratios from near-direct through 3.00:1, while MG-5114DC deep-case versions provide higher reductions used on tugs, harbor craft and other vessels that benefit from lower propeller rpm and increased shaft torque. Twin Disc literature for the family publishes pleasure-craft ratings around 673 kW (900 hp) at 2300 rpm on selected configurations, with materially lower ratings for continuous-duty commercial operation. The series supports SAE flywheel-housing interfaces, flexible couplings, oil cooling, trolling options and hydraulic PTO provisions depending on the exact build. Because MG-5114 applications often operate in high-load service, overhaul quality depends on more than replacing clutch plates. Bearing condition, shaft runout, gear contact, clutch piston sealing, oil-pump output, valve calibration, cooler restriction and lube pressure must all be checked against the service specification. For an emergency replacement or planned overhaul, the SC/DC configuration, ratio, input rpm, engine power, duty class, serial number and BOM should be matched before a unit or parts kit is released.`,
    targetKeywords: [
      // Emergency intent
      'emergency Twin Disc MG5114 replacement',
      'emergency Twin Disc MG5114 repair',
      // Commercial intent
      'Twin Disc MG5114 marine transmission for sale',
      'Twin Disc MG5114 replacement marine gear',
      // Model-specific intent
      'Twin Disc MG5114 rebuild kit',
      'Twin Disc MG5114 parts',
    ],
    specs: [
      {
        label: 'MG-5114SC Ratios',
        value: '0.93:1, 1.02:1, 1.12:1, 1.50:1, 1.74:1, 2.04:1, 2.54:1 and 3.00:1 in published standard-series literature',
      },
      {
        label: 'MG-5114DC Ratios',
        value: '3.28:1, 3.43:1, 4.17:1, 4.59:1 and 4.86:1',
      },
      {
        label: 'Maximum Pleasure Rating',
        value: 'Approximately 673 kW (900 hp) at 2300 rpm on selected SC/DC configurations',
      },
      {
        label: 'Continuous Duty',
        value: 'MG-5114SC published up to 358 kW (480 hp) at 1800 rpm on common ratios; exact value varies by ratio',
      },
      {
        label: 'Maximum Rated Engine Speed',
        value: '3000 rpm published for the family',
      },
      {
        label: 'Standard Input Interface',
        value: 'SAE J617 No. 1 housing with 14-inch SAE J620 size 355 flexible coupling on common standard builds',
      },
      {
        label: 'PTO Capability',
        value: 'Published live SAE C PTO capability up to approximately 592 Nm on standard MG-5114 series configurations',
      },
    ],
    commonApplications: [
      'Tugboats and Harbor Tugs',
      'Commercial Fishing Vessels',
      'Dredging and Marine Construction Craft',
      'Crew and Supply Vessels',
      'Heavy Workboat Repowers',
    ],
    faqs: [
      {
        question: 'When is an MG-5114DC used instead of an MG-5114SC?',
        answer: `The DC deep-case version is used when the propulsion design requires a higher reduction ratio. Published MG-5114DC ratios extend from 3.28:1 to 4.86:1, allowing lower propeller-shaft speed for applications such as tugs and displacement workboats that need high propeller torque.`,
      },
      {
        question: 'Can I size an MG-5114 using the 900 hp rating alone?',
        answer: `No. The approximately 900 hp figure is a pleasure-craft maximum for selected configurations. Commercial applications must be checked against the correct ratio, input rpm and Twin Disc duty classification. Continuous-duty allowable power is substantially lower than the pleasure rating.`,
      },
      {
        question: 'What information is needed for an MG-5114 emergency replacement?',
        answer: `Provide the full nameplate, SC or DC configuration, ratio, serial number, BOM, engine make and model, rated horsepower, governed rpm, vessel duty and output-flange details. Photos of the nameplate and installation are also valuable for identifying housing, control-valve, cooler and PTO differences.`,
      },
    ],
  },
  {
    id: 'twin-disc-sp214',
    category: 'power-take-offs',
    modelName: 'Twin Disc SP214 Mechanical PTO',
    aliases: ['Twin Disc SP214', 'Twin Disc SP-214', 'Twin Disc SP214 PTO'],
    relatedProducts: ['twin-disc-c108-c110', 'twin-disc-hpto244', 'twin-disc-overhaul-kits'],
    status: 'unknown',
    quoteRequiredFields: [
      'Full PTO model / suffix',
      'Serial number or drawing / BOM number',
      'SAE flywheel housing size',
      'Clutch friction material if known',
      'Output shaft diameter and length',
      'Engine make and model',
      'Engine rated torque / horsepower and RPM',
      'Driven equipment type',
    ],
    metaTitle: 'Twin Disc SP214 Mechanical PTO Parts & Replacement',
    metaDescription:
      'Source SP214 PTO assemblies, clutch parts and rebuild support. Verify SAE housing, clutch material and shaft configuration for fast fitment.',
    h1: 'Twin Disc SP214 Mechanical Power Take-Off',
    heroSubtitle:
      'Heavy-duty 14-inch mechanical PTO for high-torque industrial drives, side-load applications and engine-driven process equipment.',
    introParagraph: `The Twin Disc SP214 is a heavy-duty mechanical power take-off built for engine-driven equipment that needs a simple, manually engaged clutch between the prime mover and driven machine. The SP design uses an over-center clutch arrangement, large main bearings and a 14-inch clutch package suited to industrial loads such as crushers, grinders, pumps, chippers, conveyors and winches. SP214 configurations are commonly supplied for SAE No. 0 or No. 1 flywheel housings, with organic or sintered friction material selected according to torque capacity, engagement frequency and operating severity. Twin Disc publishes approximately 2,198 Nm (1,620 lb-ft) maximum input torque with organic material and a higher rating around 2,748 Nm (2,025 lb-ft) for sintered configurations in the SP214 family. Maximum safe speed depends on the exact drive-ring and plate construction, so a generic rpm limit should not be applied to every BOM. Sintered plates can provide additional torque capacity and better tolerance for frequent engagement, but they do not eliminate the need for correct adjustment and thermal control. During service, the clutch pack, collar or release bearing, pilot bearing, main bearings, drive ring, linkage and output shaft should be inspected as an assembly. Correct fitment requires the PTO model, drawing or BOM number, SAE housing and output-shaft dimensions.`,
    targetKeywords: [
      // Emergency intent
      'emergency Twin Disc PTO replacement',
      'emergency Twin Disc SP214 replacement',
      // Commercial intent
      'Twin Disc SP214 PTO for sale',
      'Twin Disc mechanical PTO replacement',
      // Model-specific intent
      'Twin Disc SP214 clutch kit',
      'Twin Disc SP214 parts',
    ],
    specs: [
      {
        label: 'Clutch Size',
        value: '14-inch, two-plate SP214 family configuration',
      },
      {
        label: 'SAE Housing Sizes',
        value: 'SAE J617 No. 0 and No. 1',
      },
      {
        label: 'Maximum Input Torque - Organic',
        value: 'Approximately 2,198 Nm (1,620 lb-ft)',
      },
      {
        label: 'Maximum Input Torque - Sintered',
        value: 'Approximately 2,748 Nm (2,025 lb-ft) in published SP214 data',
      },
      {
        label: 'Maximum Safe Speed',
        value: 'Up to 3000 rpm on applicable configurations; lower limits apply to some cast or split-plate builds',
      },
      {
        label: 'Typical Output Shaft',
        value: '3.5-inch diameter shaft on many SP214P builds; length and shaft option vary by drawing number',
      },
      {
        label: 'Approximate Weight',
        value: 'About 150 kg (328 lb) for common SP214P configurations',
      },
    ],
    commonApplications: [
      'Wood Chippers',
      'Rock Crushers',
      'Industrial Pumps',
      'Winches and Hoists',
      'Conveyors and Process Equipment',
      'Engine-Driven Compressors',
    ],
    faqs: [
      {
        question: 'What is the torque capacity of a Twin Disc SP214 PTO?',
        answer: `Published SP214 data lists approximately 2,198 Nm (1,620 lb-ft) maximum input torque with organic friction material and approximately 2,748 Nm (2,025 lb-ft) with sintered material. The exact limit and safe operating speed still depend on the specific drive-ring and plate configuration.`,
      },
      {
        question: 'Should I use organic or sintered SP214 clutch plates?',
        answer: `Organic material is appropriate for many standard engagements, while sintered material is selected when higher torque capacity or more frequent engagement is required. The driven-machine inertia, service factor, engagement frequency, ambient conditions and engine speed should be reviewed before changing friction material.`,
      },
      {
        question: 'What do I need to match an SP214 replacement PTO?',
        answer: `Confirm the SP214 model suffix, drawing or BOM number, SAE housing size, clutch material, output-shaft diameter and length, pilot-bearing arrangement and rotation. These details prevent a mechanically compatible-looking PTO from arriving with the wrong shaft or housing interface.`,
      },
    ],
  },
  {
    id: 'twin-disc-c108-c110',
    category: 'clutches',
    modelName: 'Twin Disc C108 / C110 Mechanical Clutch PTO',
    aliases: ['Twin Disc C108', 'Twin Disc C110', 'Twin Disc C108 PTO', 'Twin Disc C110 PTO'],
    relatedProducts: ['twin-disc-sp214', 'twin-disc-hpto244', 'twin-disc-overhaul-kits'],
    status: 'unknown',
    quoteRequiredFields: [
      'Exact C108 or C110 model / suffix',
      'Serial number or drawing / BOM number',
      'SAE housing size',
      'Output shaft dimensions',
      'Clutch friction material if known',
      'Engine make and model',
      'Rated engine RPM',
      'Driven equipment type',
    ],
    metaTitle: 'Twin Disc C108 & C110 Clutch PTO Parts',
    metaDescription:
      'Shop C108 and C110 PTO clutch parts, assemblies and rebuild support. Verify SAE housing, shaft and BOM before ordering a replacement.',
    h1: 'Twin Disc C108 / C110 Heavy-Duty Clutch PTO',
    heroSubtitle:
      'Compact single-plate mechanical PTOs for industrial engines, pumps, generators and side-load drive applications.',
    introParagraph: `Twin Disc C108 and C110 mechanical PTOs are compact, single-plate clutch units used on industrial engines where the driven machine must be engaged and disengaged without shutting down the prime mover. The C108 family uses an 8-inch clutch and is commonly paired with SAE No. 3, No. 4 or No. 5 housings, while the larger C110 uses a 10-inch clutch with SAE No. 1 through No. 4 housing options. Twin Disc publishes approximately 312 Nm (230 lb-ft) organic torque capacity for the C108 and approximately 448 Nm (330 lb-ft) for the C110, with higher capacities available when the appropriate sintered friction configuration is used. Maximum safe speed also changes with plate and drive-ring construction, particularly on the C110, so the exact assembly drawing matters when replacing a unit. These PTOs are suitable for in-line or side-load installations and are frequently used on pumps, small crushers, compressors, generators and process machinery. Wear diagnosis should include the friction plate, pressure components, release collar or bearing, pilot bearing, main bearing, drive ring, linkage geometry and shaft condition. A correct commercial replacement quote requires the exact C108 or C110 model, drawing or BOM number, housing size, output shaft and clutch material.`,
    targetKeywords: [
      // Emergency intent
      'emergency Twin Disc C110 clutch replacement',
      'emergency Twin Disc C108 PTO replacement',
      // Commercial intent
      'Twin Disc C110 PTO for sale',
      'Twin Disc C108 clutch for sale',
      // Model-specific intent
      'Twin Disc C110 clutch kit',
      'Twin Disc C108 parts',
    ],
    specs: [
      {
        label: 'C108 Clutch Size',
        value: '8-inch single-plate clutch',
      },
      {
        label: 'C110 Clutch Size',
        value: '10-inch single-plate clutch',
      },
      {
        label: 'C108 SAE Housings',
        value: 'SAE J617 No. 3, No. 4 and No. 5',
      },
      {
        label: 'C110 SAE Housings',
        value: 'SAE J617 No. 1, No. 2, No. 3 and No. 4',
      },
      {
        label: 'C108 Torque',
        value: '312 Nm (230 lb-ft) organic; approximately 387 Nm (285 lb-ft) sintered',
      },
      {
        label: 'C110 Torque',
        value: '448 Nm (330 lb-ft) organic; 556 Nm (410 lb-ft) sintered',
      },
      {
        label: 'Typical Output Shafts',
        value: 'C108: 1.75 in x 6.00 in; C110: approximately 2.25 in diameter with length depending on SAE housing',
      },
    ],
    commonApplications: [
      'Irrigation and Process Pumps',
      'Industrial Generators',
      'Air Compressors',
      'Small Crushers and Grinders',
      'Conveyors',
      'Engine-Driven Auxiliary Equipment',
    ],
    faqs: [
      {
        question: 'What is the main difference between Twin Disc C108 and C110 PTOs?',
        answer: `The C108 uses an 8-inch single-plate clutch and lower torque capacity, while the C110 uses a 10-inch clutch with higher published torque capacity and a broader set of SAE housing options. Output-shaft dimensions and pilot-bearing arrangements also differ by drawing number.`,
      },
      {
        question: 'Can I replace an organic C110 clutch with a sintered clutch?',
        answer: `Only after confirming that the specific C110 assembly, drive ring, engagement system and application are approved for the sintered configuration. Sintered friction increases published torque capacity, but engagement characteristics and heat loading also change.`,
      },
      {
        question: 'Why is the BOM number important on a C108 or C110?',
        answer: `The BOM or drawing number identifies the exact housing, shaft, pilot bearing, clutch construction and related hardware. Two PTOs carrying the same C108 or C110 family name can have different mechanical interfaces, so BOM-level verification reduces fitment errors.`,
      },
    ],
  },
  {
    id: 'twin-disc-hpto244',
    category: 'power-take-offs',
    modelName: 'Twin Disc HPTO244 Hydraulic PTO',
    aliases: ['Twin Disc HPTO244', 'Twin Disc HPTO-244', 'HPTO244 PTO'],
    relatedProducts: ['twin-disc-sp214', 'twin-disc-c108-c110', 'twin-disc-overhaul-kits'],
    status: 'unknown',
    quoteRequiredFields: [
      'Full HPTO model / suffix',
      'Serial number or BOM number',
      'Input configuration',
      'Rotation',
      'Output shaft configuration',
      'Engine make and model',
      'Engine torque / horsepower and RPM',
      'Driven equipment and duty cycle',
      'Cooling arrangement',
    ],
    metaTitle: 'Twin Disc HPTO244 Hydraulic PTO Parts & Service',
    metaDescription:
      'Source HPTO244 hydraulic PTO parts, rebuild support and replacement units. Verify rotation, input configuration and BOM for fitment.',
    h1: 'Twin Disc HPTO244 Hydraulic Power Take-Off',
    heroSubtitle:
      'Self-adjusting, oil-filled hydraulic clutch PTO rated for high-torque pumps, crushers, winches, chippers and process equipment.',
    introParagraph: `The Twin Disc HPTO244 is a hydraulically actuated power take-off designed for industrial applications that need high torque capacity, repeatable remote engagement and better clutch durability than a basic dry mechanical PTO can provide. The HPTO family uses an oil-filled multiple-disc clutch with a built-in hydraulic pump driven from the primary shaft, allowing clutch-control pressure to be available whenever the engine is running. Published selection data lists the HPTO244 at 2,440 Nm (1,800 lb-ft) maximum torque and 3,200 rpm maximum safe speed, with SAE No. 1, SAE No. 2 or freestanding input configurations. The unit carries approximately 11 litres of oil and published cooling-water flow of 80 L/min at 50 degrees C, emphasizing that thermal management is part of correct PTO selection rather than an optional afterthought. HPTO244 units can be applied to pumps, propellers, generators, fans, conveyors, winches, compressors, crushers and chippers, but Twin Disc selection guidance applies a service factor based on the driven load. A rock crusher or wood chipper imposes more severe shock loading than a centrifugal pump. For replacement or overhaul, rotation, input arrangement, output shaft, selector-valve configuration, cooler layout, serial number and BOM should all be confirmed before parts are released.`,
    targetKeywords: [
      // Emergency intent
      'emergency Twin Disc HPTO244 replacement',
      'emergency hydraulic PTO replacement',
      // Commercial intent
      'Twin Disc HPTO244 for sale',
      'Twin Disc hydraulic PTO replacement',
      // Model-specific intent
      'Twin Disc HPTO244 rebuild kit',
      'Twin Disc HPTO244 parts',
    ],
    specs: [
      {
        label: 'Maximum Torque Rating',
        value: '2,440 Nm (1,800 lb-ft)',
      },
      {
        label: 'Maximum Safe Speed',
        value: '3,200 rpm',
      },
      {
        label: 'Input Configuration',
        value: 'SAE No. 1, SAE No. 2 or freestanding',
      },
      {
        label: 'Clutch Type',
        value: 'Self-adjusting, hydraulically actuated oil-filled multiple-disc clutch',
      },
      {
        label: 'Oil Quantity',
        value: 'Approximately 11 L (2.9 U.S. gal)',
      },
      {
        label: 'Cooling Water Flow',
        value: 'Approximately 80 L/min (21 gal/min) at 50 degrees C in published selection data',
      },
      {
        label: 'Approximate Weight',
        value: '150 kg (330 lb)',
      },
    ],
    commonApplications: [
      'Rock Crushers',
      'Wood Chippers',
      'Mud and Piston Pumps',
      'Winches and Hoists',
      'Hydraulic Pump Drives',
      'Industrial Fans and Compressors',
    ],
    faqs: [
      {
        question: 'What is the torque rating of the Twin Disc HPTO244?',
        answer: `Published HPTO selection data lists the HPTO244 at 2,440 Nm (1,800 lb-ft) maximum torque with a 3,200 rpm maximum safe speed. Application selection must still include the driven-machine service factor, especially for shock loads such as crushers and chippers.`,
      },
      {
        question: 'Does the HPTO244 require an external hydraulic pump?',
        answer: `The HPTO design incorporates a hydraulic pump driven from the primary shaft to generate clutch-control pressure while the engine is running. The installation still requires the correct valve, oil circuit and cooling arrangement specified for the particular PTO build.`,
      },
      {
        question: 'Can an HPTO244 run in either direction?',
        answer: `HPTO units can be configured for either direction of rotation, but the direction must be specified. They are not simply reversible in service without the internal configuration being correct, so replacement orders should include engine rotation and the original BOM.`,
      },
    ],
  },
  {
    id: 'twin-disc-10000-11500-torque-converter',
    category: 'torque-converters',
    modelName: 'Twin Disc 10,000 / 11,500 Series Torque Converter',
    aliases: ['Twin Disc 10000 torque converter', 'Twin Disc 10,000 Series', 'Twin Disc 11500 torque converter', 'Twin Disc 11,500 Series'],
    relatedProducts: ['twin-disc-overhaul-kits'],
    status: 'legacy',
    quoteRequiredFields: [
      'Exact converter model / series',
      'Assembly or serial number',
      'Input configuration',
      'Output shaft / flange configuration',
      'Engine make and model',
      'Engine horsepower and RPM',
      'Driven equipment type',
      'Photos of nameplate and complete assembly',
    ],
    metaTitle: 'Twin Disc 10000 & 11500 Torque Converter Rebuild',
    metaDescription:
      'Get Twin Disc 10000 and 11500 three-stage torque converter rebuild support, parts and exchange options for hoists, winches and heavy equipment.',
    h1: 'Twin Disc 10,000 / 11,500 Series 3-Stage Torque Converter',
    heroSubtitle:
      'Legacy heavy-equipment torque converter support for winches, cranes, hoists, off-highway machinery and industrial drive systems.',
    introParagraph: `Twin Disc 10,000 and 11,500 series hydraulic torque converters are legacy heavy-equipment drive components built around a three-stage converter architecture intended to multiply engine torque at low output speed and transition toward more efficient coupling as output speed increases. These units were used in cranes, hoists, winches, off-highway machinery and specialized industrial equipment where smooth launch, high starting torque and controlled load acceleration were more valuable than a direct mechanical clutch alone. Twin Disc service literature for CO-10,000 and CO-11,500 configurations describes engine-mounted construction with converter, input, output, clutch and fluid-system groups, while other F and FO configurations use different flywheel-drive arrangements. Historical application literature documents torque multiplication up to approximately 5:1 on certain CO-10,000 installations, but converter performance is not interchangeable across every impeller, turbine, freewheel and output combination. Output arrangements were offered for chain-drive and shaft-drive applications, including straight and flanged shafts, with heavier output construction available on selected 11,500 units. Because these converters are legacy products, a rebuild should begin with exact model, series, assembly number and installation details. Internal hard parts, freewheel condition, bearings, seals, pump components, clutch components and converter element condition should be inspected before an exchange or overhaul scope is finalized.`,
    targetKeywords: [
      // Emergency intent
      'emergency Twin Disc torque converter replacement',
      'emergency Twin Disc 10000 torque converter repair',
      // Commercial intent
      'Twin Disc 11500 torque converter for sale',
      'Twin Disc torque converter rebuild service',
      // Model-specific intent
      'Twin Disc 10000 torque converter parts',
      'Twin Disc 11500 torque converter parts',
    ],
    specs: [
      {
        label: 'Series',
        value: 'CO-10,000 and CO-11,500 legacy hydraulic torque converter families',
      },
      {
        label: 'Converter Architecture',
        value: 'Three-stage hydraulic torque converter',
      },
      {
        label: 'Documented Torque Multiplication',
        value: 'Historical CO-10,000 applications document torque multiplication up to approximately 5:1; exact curve depends on converter build',
      },
      {
        label: 'Engine Interface',
        value: 'Engine flywheel-housing mounted configurations; input arrangement varies by F, FO and CO build',
      },
      {
        label: 'CO-Series Clutch',
        value: 'Twin Disc service literature describes a 17-inch over-center engine master clutch on covered CO configurations',
      },
      {
        label: 'Output Options',
        value: 'Chain-housing and direct shaft/flanged-shaft arrangements were offered; heavy-duty output configurations exist on selected 11,500 units',
      },
      {
        label: 'Fitment Requirement',
        value: 'Exact model, assembly number, converter elements and output configuration must be verified before parts interchange is assumed',
      },
    ],
    commonApplications: [
      'Marine and Construction Winches',
      'Cranes and Hoists',
      'Draglines and Heavy Lifting Equipment',
      'Off-Highway Industrial Machinery',
      'Specialized Diesel Powertrains',
    ],
    faqs: [
      {
        question: 'Are Twin Disc 10,000 and 11,500 torque converters interchangeable?',
        answer: `No. They are related legacy converter families, but impeller, turbine, freewheel, clutch, housing and output configurations vary. Replacement or rebuild parts should be selected from the exact model and assembly information rather than the series number alone.`,
      },
      {
        question: 'What does three-stage mean on these Twin Disc torque converters?',
        answer: `A three-stage converter uses multiple turbine or reaction stages to provide high torque multiplication at low output speed. The exact torque ratio and efficiency curve depend on the converter's internal element combination, so performance must be matched to the original equipment application.`,
      },
      {
        question: 'What should be inspected during a 10,000 or 11,500 converter rebuild?',
        answer: `A proper teardown should inspect converter elements, freewheel components, bearings, shafts, seals, fluid pump and passages, clutch components where fitted, output-drive components and housing bores. Wear debris and heat damage should also be used to identify the root cause before the unit is reassembled.`,
      },
    ],
  },
  {
    id: 'twin-disc-overhaul-kits',
    category: 'parts-and-kits',
    modelName: 'Twin Disc Marine & Industrial Replacement Overhaul Kits',
    aliases: ['Twin Disc rebuild kit', 'Twin Disc overhaul kit', 'Twin Disc marine gear rebuild kit', 'Twin Disc PTO rebuild kit'],
    relatedProducts: ['twin-disc-mg506', 'twin-disc-mg5061', 'twin-disc-mg5075', 'twin-disc-mg5091', 'twin-disc-mg5114-sc-dc', 'twin-disc-sp214', 'twin-disc-c108-c110', 'twin-disc-hpto244'],
    status: 'unknown',
    quoteRequiredFields: [
      'Exact model and suffix',
      'Serial number',
      'BOM / assembly number',
      'Ratio for marine transmissions',
      'Rotation where applicable',
      'Requested scope: seal kit, clutch kit or full overhaul',
      'Photos of nameplate',
      'Photos of failed or worn components if available',
    ],
    metaTitle: 'Twin Disc Overhaul Kits, Rebuild Parts & Seals',
    metaDescription:
      'Source Twin Disc overhaul kits, clutch packs, bearings, seals and rebuild parts. Send your model, serial and BOM for commercial fitment help.',
    h1: 'Twin Disc Marine & Industrial Overhaul Kits and Replacement Parts',
    heroSubtitle:
      'BOM-verified rebuild components for Twin Disc marine transmissions, PTOs, clutches and legacy torque converters.',
    introParagraph: `A reliable Twin Disc overhaul starts with correct bill-of-material fitment, not with a generic seal kit selected from the model family name. Marine transmissions, mechanical PTOs, hydraulic PTOs and legacy torque converters were produced in multiple ratios, housing arrangements, clutch materials, shaft options, valve configurations and production revisions. That means two units labeled MG-5091, MG-5114, SP214, C110 or HPTO244 may require different internal parts even when the external housings appear similar. A production-ready overhaul package should therefore be built from the model, serial number, BOM or assembly number and, where applicable, ratio and rotation. Depending on the unit, the repair scope may include friction plates, steel reaction plates, piston seals, O-rings, lip seals, bearings, gaskets, wear rings, pump components, valve components, drive blocks, release bearings and other hard parts identified during teardown. For marine gears, cooler contamination and clutch debris should be addressed so a fresh rebuild is not immediately recontaminated by the existing oil circuit. For PTOs, clutch adjustment and output-shaft loading should be checked at installation. For legacy converters, freewheel and converter-element condition should be evaluated before a kit-only repair is approved. Send clear nameplate photos and operating symptoms so the parts package can be matched to the actual assembly rather than guessed from a catalog family.`,
    targetKeywords: [
      // Emergency intent
      'emergency Twin Disc rebuild kit',
      'emergency Twin Disc parts shipment',
      // Commercial intent
      'authorized Twin Disc parts distributor',
      'Twin Disc overhaul kits supplier',
      // Model-specific intent
      'Twin Disc marine transmission rebuild kit',
      'Twin Disc PTO rebuild kit',
    ],
    specs: [
      {
        label: 'Supported Product Types',
        value: 'Marine transmissions, mechanical PTOs, hydraulic PTOs, clutches and legacy torque converters',
      },
      {
        label: 'Typical Kit Components',
        value: 'Gaskets, O-rings, lip seals, piston seals, friction plates, steel plates, bearings and wear components as applicable',
      },
      {
        label: 'Fitment Method',
        value: 'Model plus serial number and BOM or assembly number; ratio and rotation are also required where applicable',
      },
      {
        label: 'Common Marine Families',
        value: 'MG-506, MG-5061, MG-5075, MG-5091, MG-5114 and related Twin Disc MG-series units',
      },
      {
        label: 'Common PTO Families',
        value: 'SP214, C108/C110, CX-series and HPTO244 configurations',
      },
      {
        label: 'Overhaul Scope',
        value: 'Soft parts plus measured hard-part inspection; complete scope is determined after BOM verification and teardown findings',
      },
    ],
    commonApplications: [
      'Scheduled Vessel Overhauls',
      'Emergency Marine Gear Repairs',
      'Industrial PTO Rebuilds',
      'Fleet Maintenance Programs',
      'Workboat Repowers',
      'Heavy Equipment Drivetrain Repairs',
    ],
    faqs: [
      {
        question: 'Why do you need the Twin Disc BOM number for an overhaul kit?',
        answer: `The BOM or assembly number identifies the production configuration of the unit. It helps distinguish changes in clutch packs, seals, bearings, shafts, valves, housings and other components that may not be obvious from the model family name alone.`,
      },
      {
        question: 'Does a Twin Disc rebuild kit include every part needed for an overhaul?',
        answer: `Not necessarily. A gasket-and-seal kit covers soft parts, while a clutch kit may add friction and steel plates. Bearings, gears, shafts, pumps, valve components, housings and other hard parts are normally added based on measured wear and teardown findings.`,
      },
      {
        question: 'What information should I send for fast Twin Disc parts identification?',
        answer: `Send a clear nameplate photo showing model, serial and BOM or assembly number, plus the ratio for marine gears, rotation where relevant, engine make and model, application, operating symptoms and photos of any failed components. That information greatly reduces fitment risk and quote time.`,
      },
    ],
  },
];

/* -------------------------------------------------------------------------- */
/* Catalog helpers                                                            */
/* -------------------------------------------------------------------------- */

export const getProductById = (id: string): ProductModel | undefined =>
  twinDiscProducts.find((product) => product.id === id);

export const getProductsByCategory = (
  category: ProductCategory,
): ProductModel[] => twinDiscProducts.filter((product) => product.category === category);

export const getRelatedProducts = (product: ProductModel): ProductModel[] =>
  (product.relatedProducts ?? [])
    .map((id) => getProductById(id))
    .filter((item): item is ProductModel => Boolean(item));

export const getProductUrl = (product: ProductModel): string =>
  `${SITE_URL}/products/${product.id}/`;

/** FAQPage JSON-LD generated from the visible FAQ content on the product page. */
export const buildFaqSchema = (product: ProductModel) => ({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: product.faqs.map((faq) => ({
    '@type': 'Question',
    name: faq.question,
    acceptedAnswer: {
      '@type': 'Answer',
      text: faq.answer,
    },
  })),
});

/** Basic Product JSON-LD. Add offers only when real price/availability data exists. */
export const buildProductSchema = (product: ProductModel) => ({
  '@context': 'https://schema.org',
  '@type': 'Product',
  name: product.modelName,
  description: product.metaDescription,
  url: getProductUrl(product),
  brand: {
    '@type': 'Brand',
    name: 'Twin Disc',
  },
  category: categoryLabels[product.category],
});
