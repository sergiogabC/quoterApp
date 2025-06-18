import { object, string, number, preprocess } from "zod/v4";

// const stringToNumber = () => {
//   preprocess((val) => {
//     if (typeof val === "string") {
//       return Number.parseInt(val);
//     }
//     return val;
//   });
// };

const parametersP = object({
  client: string(),
  country: string(),
  proposalManager: string(),
  ht19NumberSites: number(),
  sitesOutCoverage: number().min(0),
  numSites: number().min(0),
  remoteSpares: number().min(0).max(100),
  totalOfSpares: number(),
  capacitySes17: number(),
  overbooking: number().min(0).max(100),
  cTotalBandaKa: number(),
  mbpsProm: number(),
  solDolar: number(),
  pUTExWorks: number(),
  costBandKaSes: number(),
  costHBandKa: number(),
  contract: number().min(2),
  sitesPenalties: number().min(0).max(100),
  rateFinancingCapex: number().min(0).max(100),
  uit: number().positive(),
});

export function validateParametersPrimary(object) {
  return parametersP.safeParse(object);
}

const parametersS = object({
  //type: string(),
  manufacturerPart: string(),
  margin: preprocess((val) => Number(val), number()),
  //qty: number(),
  //discount: number().min(0).max(100),
});

export function validateParameterSecundary(object) {
  return parametersS.safeParse(object);
}
