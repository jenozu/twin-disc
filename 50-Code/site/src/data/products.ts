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
