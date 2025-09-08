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
    if (val === "" || val === null || Number.isNaN(val)) return 0;
    return Number(val);
  }, z.number().min(0).catch(0)),

  numSites: z.preprocess((val) => {
    if (val === "" || val === null || Number.isNaN(val)) return 0;
    return Number(val);
  }, z.number().min(0, "El número de sitios debe ser mayor a 0").catch(0)),

  remoteSpares: z.preprocess((val) => {
    if (val === "" || val === null || Number.isNaN(val)) return 0;
    return Number(val) > 0 ? Number(val) / 100 : 0;
  }, z.number().min(0).max(100).catch(0)),

  totalOfSpares: z.preprocess((val) => {
    if (val === "" || val === null || Number.isNaN(val)) return 0;
    return Number(val);
  }, z.number().catch(0)),

  capacitySes17: z.preprocess((val) => {
    if (val === "" || val === null || Number.isNaN(val)) return 0;
    return Number(val);
  }, z.number()),

  overbooking: z.preprocess((val) => {
    if (val === "" || val === null || Number.isNaN(val)) return 0;
    return Number(val) > 0 ? Number(val) / 100 : 0;
  }, z.number().min(0).max(100).catch(0)),

  cTotalBandaKa: z.preprocess((val) => {
    if (val === "" || val === null || Number.isNaN(val)) return 0;
    return Number(val);
  }, z.number().catch(0)),

  mbpsProm: z.preprocess((val) => {
    if (val === "" || val === null || Number.isNaN(val)) return 0;
    return Number(val) > 0 ? Number(val) / 100 : 0;
  }, z.number()),
  solDolar: z.preprocess((val) => {
    if (val === "" || val === null || Number.isNaN(val)) return 0;
    return Number(val) > 0 ? Number(val) / 100 : 0;
  }, z.number()),
  pUTExWorks: z.preprocess((val) => {
    if (val === "" || val === null || Number.isNaN(val)) return 0;
    return Number(val);
  }, z.number()),
  costBandKaSes: z.preprocess((val) => {
    if (val === "" || val === null || Number.isNaN(val)) return 0;
    return Number(val);
  }, z.number()),

  costHBandKa: z.preprocess((val) => {
    if (val === "" || val === null || Number.isNaN(val)) return 0;
    return Number(val);
  }, z.number()),

  contract: z.preprocess((val) => {
    if (val === "" || val === null || Number.isNaN(val)) return 0;
    return Number(val);
  }, z.number().catch(0)),

  sitesPenalties: z.preprocess((val) => {
    if (val === "" || val === null || Number.isNaN(val)) return 0;
    return Number(val) > 0 ? Number(val) / 100 : 0;
  }, z.number().min(0).max(100).catch(0)),

  rateFinancingCapex: z.preprocess((val) => {
    if (val === "" || val === null || Number.isNaN(val)) return 0;
    return Number(val) > 0 ? Number(val) / 100 : 0;
  }, z.number().min(0, "El porcentaje no puede ser negativo").max(100, " El porcentaje no debe ser mayor a 100").catch(0)),

  uit: z.preprocess((val) => {
    if (val === "" || val === null || Number.isNaN(val)) return 0;
    return Number(val);
  }, z.number().positive().catch(0)),
});

export function validateParamPriExcel(object) {
  return parametersPriExcel.safeParse(object);
}

const parametersSecExcel = z.object({
  type: z.preprocess((val) => {
    if (!Array.isArray(val)) return new Array(val.toUpperCase());
    return val.map((v) => v.toUpperCase());
  }, z.array(z.string().catch(""))),

  category: z.preprocess((val) => {
    if (!Array.isArray(val)) return new Array(val);
    return val;
  }, z.array(z.string().catch(""))),

  subcategory: z.preprocess((val) => {
    if (!Array.isArray(val)) return new Array(val);
    return val;
  }, z.array(z.string().catch(""))),

  manufacturerPart: z.preprocess((val) => {
    if (!Array.isArray(val)) return new Array(val);
    return val;
  }, z.array(z.string().catch(""))),

  margin: z.preprocess(
    (val) => {
      if (!Array.isArray(val)) {
        !isNaN(val) ? (val = Number(val)) : (val = 0);
        let list = [val];
        return list;
      } else {
        let list = [];
        for (let v of val) {
          !isNaN(v) ? list.push(Number(v)) : 0;
        }
        return list;
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

  productCode: z.preprocess((val) => {
    if (!Array.isArray(val)) return new Array(val);
    return val;
  }, z.array(z.string().catch(""))),

  description: z.preprocess((val) => {
    if (!Array.isArray(val)) return new Array(val);
    return val;
  }, z.array(z.string().catch(""))),

  qty: z.preprocess((val) => {
    if (!Array.isArray(val)) {
      !isNaN(val) ? (val = Number(val)) : (val = 0);
      let list = [val];
      return list;
    } else {
      let list = [];
      for (let v of val) {
        !isNaN(v) ? list.push(Number(v)) : 0;
      }
      return list;
    }
  }, z.array(z.number().positive().catch(0))),

  unitMeasure: z.preprocess((val) => {
    if (!Array.isArray(val)) return new Array(val);
    return val;
  }, z.array(z.string().catch(""))),

  discount: z.preprocess(
    (val) => {
      if (!Array.isArray(val)) {
        !isNaN(val) ? (val = Math.round(Number(val))) : (val = 0);
        let list = [val];
        return list;
      } else {
        let list = [];
        for (let v of val) {
          !isNaN(v) ? list.push(Math.round(Number(v))) : 0;
        }
        return list;
      }
    },
    z.array(
      z
        .number()
        .catch(0)
        .transform((val) => {
          if (val == 0) return 0;
          if (val < 0) return 0;
          if (val > 99) return 99 / 100;
          return val / 100;
        })
    )
  ),

  finance: z.preprocess((val) => {
    if (!Array.isArray(val)) return new Array(val.toUpperCase());
    return val.map((v) => v.toUpperCase());
  }, z.array(z.string().catch(""))),

  owner: z.preprocess((val) => {
    if (!Array.isArray(val)) return new Array(val);
    return val;
  }, z.array(z.string().catch(""))),
});

export function validateParamSecExcel(object) {
  return parametersSecExcel.safeParse(object);
}
