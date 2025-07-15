import { z } from "zod";

const parametersPriExcel = z.object({
  client: z.string(),
  country: z.string(),
  proposalManager: z.string(),

  ht19NumberSites: z.preprocess((val) => {
    if (val === "" || val === null || typeof val === "undefined") return 1;
    return Number(val);
  }, z.number().positive().catch(1)),

  sitesOutCoverage: z.preprocess((val) => {
    if (val === "" || val === null || typeof val === "undefined") return 0;
    return Number(val);
  }, z.number().min(0).catch(0)),

  numSites: z.preprocess((val) => {
    if (val === "" || val === null || typeof val === "undefined") return 0;
    return Number(val);
  }, z.number().min(0, "El número de sitios debe ser mayor a 0").catch(0)),

  remoteSpares: z.preprocess((val) => {
    if (val === "" || val === null || typeof val === "undefined") return 0;
    return Number(val);
  }, z.number().min(0).max(100).catch(0)),

  totalOfSpares: z.preprocess((val) => {
    if (val === "" || val === null || typeof val === "undefined") return 0;
    return Number(val);
  }, z.number().catch(0)),

  capacitySes17: z.preprocess((val) => {
    if (val === "" || val === null || typeof val === "undefined") return 0;
    return Number(val);
  }, z.number()),

  overbooking: z.preprocess((val) => {
    if (val === "" || val === null || typeof val === "undefined") return 0;
    return Number(val);
  }, z.number().min(0).max(100).catch(0)),

  cTotalBandaKa: z.preprocess((val) => {
    if (val === "" || val === null || typeof val === "undefined") return 0;
    return Number(val);
  }, z.number().catch(0)),

  mbpsProm: z.preprocess((val) => {
    if (val === "" || val === null || typeof val === "undefined") return 0;
    return Number(val);
  }, z.number()),
  solDolar: z.preprocess((val) => {
    if (val === "" || val === null || typeof val === "undefined") return 0;
    return Number(val);
  }, z.number()),
  pUTExWorks: z.preprocess((val) => {
    if (val === "" || val === null || typeof val === "undefined") return 0;
    return Number(val);
  }, z.number()),
  costBandKaSes: z.preprocess((val) => {
    if (val === "" || val === null || typeof val === "undefined") return 0;
    return Number(val);
  }, z.number()),

  costHBandKa: z.preprocess((val) => {
    if (val === "" || val === null || typeof val === "undefined") return 0;
    return Number(val);
  }, z.number()),

  contract: z.preprocess((val) => {
    if (val === "" || val === null || typeof val === "undefined") return 0;
    return Number(val);
  }, z.number().catch(0)),

  sitesPenalties: z.preprocess(
    (val) => Number(val),
    z.number().min(0).max(100)
  ),

  rateFinancingCapex: z.preprocess((val) => {
    if (val === "" || val === null || typeof val === "undefined") return 0;
    return Number(val);
  }, z.number().min(0, "El porcentaje no puede ser negativo").max(100, " El porcentaje no debe ser mayor a 100").catch(0)),

  uit: z.preprocess((val) => {
    if (val === "" || val === null || typeof val === "undefined") return 0;
    return Number(val);
  }, z.number().positive().catch(0)),
});

export function validateParamPriExcel(object) {
  return parametersPriExcel.safeParse(object);
}

const parametersSecExcel = z.object({
  type: z.preprocess((val) => {
    if (!Array.isArray(val)) return new Array(val);
    return val;
  }, z.array(z.string().catch(""))),

  //   manufacturerPart: z.preprocess((val) => {
  //     if (typeof val !== "string" || val.trim() === "") return "";
  //     return val.trim();
  //   }, z.string().catch("")),

  margin: z.preprocess(
    (val) => {
      if (!Array.isArray(val)) {
        !isNaN(val) ? (val = Number(val)) : (val = 0);
        let list = [val];
        return list;
      } else {
        val.flatMap((v) => (!isNaN(v) ? (v = Number(v)) : (v = 0)));
        return val;
      }
    },
    z.array(
      z
        .number()
        .catch(0)
        .transform((val) => {
          if (val < 0) val = 0;
          if (val > 99) val = 99;
          return val;
        })
    )
  ),

  //   qty: z.preprocess((val) => {
  //     if (val === "" || val === null || typeof val === "undefined") return 0;
  //     return Number(val);
  //   }, z.number().catch(0)),

  //   discount: z.preprocess(
  //     (val) => {
  //       if (val === "" || val === null || typeof val === "undefined") return 0;
  //       return Number(val);
  //     },
  //     z
  //       .number()
  //       .catch(0)
  //       .transform((val) => {
  //         if (val < 0) val = 0;
  //         if (val > 99) val = 99;
  //         return val;
  //       })
  //   ),

  //   finance: z.preprocess((val) => {
  //     if (typeof val !== "string" || val.trim() === "") return "";
  //     return val.trim().toUpperCase();
  //   }, z.string().catch("")),
});

export function validateParamSecExcel(object) {
  return parametersSecExcel.safeParse(object);
}
