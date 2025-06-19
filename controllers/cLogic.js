import { fileURLToPath } from "url";
import path from "path";
import {
  validateParameterSecundary,
  validateParametersPrimary,
} from "../utils/schema/parametersSchema.js";
import { MaterialModel } from "../models/json/materialsModel.js";
import { Operations } from "../utils/entities/operations.js";
import { Material } from "../utils/entities/material.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export class LogicController {
  static async home(req, res) {
    console.log(__dirname);
    res.render("../view/index");
  }

  static async params(req, res) {
    const paramsResultP = validateParametersPrimary(req.body);
    const paramsResultS = validateParameterSecundary(req.body);

    console.log(typeof paramsResultS.data.margin);
    console.log(paramsResultS);

    const materialData = await MaterialModel.getMaterial(
      paramsResultS.data.manufacturerPart
    );

    const materialObject = new Material(
      materialData.material_number,
      materialData.description,
      materialData.profit_center,
      materialData.costing_date,
      materialData.material_cost,
      materialData.pls,
      materialData.cost
    );

    const unitPrice = Operations.unitPrice(
      materialObject.cost,
      paramsResultS.data.margin
    );

    const unitDiscPrice = Operations.unitDiscPrice(
      unitPrice,
      paramsResultS.data.discount
    );

    const extDiscPrice = Operations.extDiscPrice(
      paramsResultS.data.type,
      paramsResultS.data.qty,
      unitDiscPrice,
      paramsResultP.data.contract
    );

    const extCost = Operations.extCost(
      paramsResultS.data.type,
      paramsResultS.data.qty,
      materialObject.cost,
      paramsResultP.data.contract
    );

    const monthlyPriceSite = Operations.monthlyPriceSite(
      extDiscPrice,
      paramsResultP.data.numSites,
      paramsResultP.data.contract
    );

    const monthlyCostSite = Operations.monthlyCostSite(
      extCost,
      paramsResultP.data.numSites,
      paramsResultP.data.contract
    );

    const monthlyPriceMbps = Operations.monthlyPriceMbps(
      extDiscPrice,
      paramsResultP.data.cTotalBandaKa,
      paramsResultP.data.contract
    );

    const monthlyCostMbps = Operations.monthlyCostMbps(
      extCost,
      paramsResultP.data.cTotalBandaKa,
      paramsResultP.data.contract
    );

    const financedCapex = Operations.financedCapex(
      paramsResultS.data.type,
      paramsResultS.data.finance,
      paramsResultP.data.rateFinancingCapex,
      paramsResultP.data.contract,
      extDiscPrice
    );

    const financedMonthlyPriceSite = Operations.financedMonthlyPriceSite(
      paramsResultS.data.type,
      paramsResultS.data.finance,
      paramsResultP.data.rateFinancingCapex,
      paramsResultP.data.contract,
      extDiscPrice,
      paramsResultP.data.numSites
    );

    console.log("El costo es: " + materialObject.cost);
    console.log("El precio unitario es: " + unitPrice);
    console.log("El precio unitario con descuento es: " + unitDiscPrice);
    console.log("El precio de descuento extendido es: " + extDiscPrice);
    console.log("El costo extendido es: " + extCost);
    console.log("El precio por sitio mensual es: " + monthlyPriceSite);
    console.log("El costo por sitio mensual es: " + monthlyCostSite);
    console.log("El precio mensual por mbps es: " + monthlyPriceMbps);
    console.log("El costo mensual por mbps es: " + monthlyCostMbps);
    console.log("El capex financiado es: " + financedCapex);
    console.log(
      "El precio por sitio mensual financiado es: " + financedMonthlyPriceSite
    );

    res.render("../view/quoter");
  }

  static async paramsShow(req, res) {
    res.render("../view/quoter");
  }
}
