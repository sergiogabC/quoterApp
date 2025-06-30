import { z } from "zod/v4";

const parametersP = z.object({
  client: z.string().optional(),
  country: z.string().optional(),
  proposalManager: z.string().optional(),
  ht19NumberSites: z.preprocess((val) => Number(val), z.number()).optional(),
  sitesOutCoverage: z
    .preprocess((val) => Number(val), z.number().min(0))
    .optional(),

  numSites: z.preprocess((val) => {
    if (val === "" || val === null || typeof val === "undefined") return 0;
    return Number(val);
  }, z.number().min(0, "El número de sitios debe ser mayor a 0").catch(0)),

  // remoteSpares: preprocess((val) => Number(val), number().min(0).max(100)),
  // totalOfSpares: preprocess((val) => Number(val), number()),
  // capacitySes17: preprocess((val) => Number(val), number()),
  // overbooking: preprocess((val) => Number(val), number().min(0).max(100)),

  cTotalBandaKa: z.preprocess((val) => {
    if (val === "" || val === null || typeof val === "undefined") return 0;
    return Number(val);
  }, z.number().catch(0)),

  // mbpsProm: preprocess((val) => Number(val), number()),
  // solDolar: preprocess((val) => Number(val), number()),
  // pUTExWorks: preprocess((val) => Number(val), number()),
  // costBandKaSes: preprocess((val) => Number(val), number()),
  // costHBandKa: preprocess((val) => Number(val), number()),
  contract: z.preprocess((val) => {
    if (val === "" || val === null || typeof val === "undefined") return 0;
    return Number(val);
  }, z.number().catch(0)),
  // sitesPenalties: preprocess((val) => Number(val), number().min(0).max(100)),
  rateFinancingCapex: z.preprocess((val) => {
    if (val === "" || val === null || typeof val === "undefined") return 0;
    return Number(val);
  }, z.number().min(0, "El porcentaje no puede ser negativo").max(100, " El porcentaje no debe ser mayor a 100").catch(0)),

  // uit: preprocess((val) => Number(val), number().positive()),
});

export function validateParametersPrimary(object) {
  return parametersP.safeParse(object);
}

const parametersS = z.object({
  type: z.preprocess((val) => {
    if (typeof val !== "string" || val.trim() === "") return "";
    return val.trim().toUpperCase();
  }, z.string().catch("")),

  manufacturerPart: z.preprocess((val) => {
    if (typeof val !== "string" || val.trim() === "") return "";
    return val.trim();
  }, z.string().catch("")),

  margin: z.preprocess(
    (val) => {
      if (val === "" || val === null || typeof val === "undefined") return 0;
      return Number(val);
    },
    z
      .number()
      .catch(0)
      .transform((val) => {
        if (val < 0) val = 0;
        if (val > 99) val = 99;
        return val;
      })
  ),

  qty: z.preprocess((val) => {
    if (val === "" || val === null || typeof val === "undefined") return 0;
    return Number(val);
  }, z.number().catch(0)),

  discount: z.preprocess(
    (val) => {
      if (val === "" || val === null || typeof val === "undefined") return 0;
      return Number(val);
    },
    z
      .number()
      .catch(0)
      .transform((val) => {
        if (val < 0) val = 0;
        if (val > 99) val = 99;
        return val;
      })
  ),

  finance: z.preprocess((val) => {
    if (typeof val !== "string" || val.trim() === "") return "";
    return val.trim().toUpperCase();
  }, z.string().catch("")),
});

const manufacturerPartES = z.object({
  manufacturerPart: z.preprocess((val) => {
    if (typeof val !== "string" || val.trim() === "") return "";
    return val.trim();
  }, z.string().catch("")),
});

export function validateManu(object) {
  return manufacturerPartES.safeParse(object);
}

export function validateParameterSecundary(object) {
  return parametersS.safeParse(object);
}
