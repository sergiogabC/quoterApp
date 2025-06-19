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
  // client: string(),
  // country: string(),
  // proposalManager: string(),
  // ht19NumberSites: preprocess((val) => Number(val), number()),
  // sitesOutCoverage: preprocess((val) => Number(val), number().min(0)),
  numSites: preprocess((val) => Number(val), number().min(0)),
  // remoteSpares: preprocess((val) => Number(val), number().min(0).max(100)),
  // totalOfSpares: preprocess((val) => Number(val), number()),
  // capacitySes17: preprocess((val) => Number(val), number()),
  // overbooking: preprocess((val) => Number(val), number().min(0).max(100)),
  cTotalBandaKa: preprocess((val) => Number(val), number()),
  // mbpsProm: preprocess((val) => Number(val), number()),
  // solDolar: preprocess((val) => Number(val), number()),
  // pUTExWorks: preprocess((val) => Number(val), number()),
  // costBandKaSes: preprocess((val) => Number(val), number()),
  // costHBandKa: preprocess((val) => Number(val), number()),
  contract: preprocess((val) => Number(val), number().min(2)),
  // sitesPenalties: preprocess((val) => Number(val), number().min(0).max(100)),
  rateFinancingCapex: preprocess(
    (val) => Number(val),
    number().min(0).max(100)
  ),
  // uit: preprocess((val) => Number(val), number().positive()),
});

export function validateParametersPrimary(object) {
  return parametersP.safeParse(object);
}

const parametersS = object({
  type: string(),
  manufacturerPart: string(),
  margin: preprocess((val) => Number(val), number().min(0).max(100)),
  qty: preprocess((val) => Number(val), number()),
  discount: preprocess((val) => Number(val), number().min(0).max(100)),
  finance: string(),
});

export function validateParameterSecundary(object) {
  return parametersS.safeParse(object);
}
