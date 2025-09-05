import { z } from "zod/v4";

const parametersP = z.object({
  numSites: z.preprocess((val) => {
    if (val === "" || val === null || Number.isNaN(val)) return 0;
    return Number(val);
  }, z.number().min(0, "El número de sitios debe ser mayor a 0").catch(0)),

  cTotalBandaKa: z.preprocess((val) => {
    if (val === "" || val === null || Number.isNaN(val)) return 0;
    return Number(val);
  }, z.number().catch(0)),

  contract: z.preprocess((val) => {
    if (val === "" || val === null || Number.isNaN(val)) return 0;
    return Number(val);
  }, z.number().catch(0)),

  rateFinancingCapex: z.preprocess((val) => {
    if (val === "" || val === null || Number.isNaN(val)) return 0;
    return Number(val);
  }, z.number().min(0, "El porcentaje no puede ser negativo").max(100, " El porcentaje no debe ser mayor a 100").catch(0)),
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
      if (val === "" || val === null || Number.isNaN(val)) return 0;
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
    if (val === "" || val === null || Number.isNaN(val)) return 0;
    return Number(val);
  }, z.number().catch(0)),

  discount: z.preprocess(
    (val) => {
      if (val === "" || val === null || Number.isNaN(val)) return 0;
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

export function validateParameterSecundary(object) {
  return parametersS.safeParse(object);
}

const manufacturerPartES = z.object({
  manufacturerPart: z.preprocess((val) => {
    if (typeof val !== "string" || val.trim() === "") return "";
    return val.trim();
  }, z.string().catch("")),
});

export function validateManu(object) {
  return manufacturerPartES.safeParse(object);
}

const costES = z.object({
  cost: z.preprocess((val) => {
    if (typeof val !== "string" || val.trim() === "") return 0;
    return Number(val);
  }, z.number().catch(0)),
});

export function validateCost(object) {
  return costES.safeParse(object);
}
