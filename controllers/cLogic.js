import {
  validateParameterSecundary,
  validateParametersPrimary,
} from "../utils/schema/parametersSchema.js";
import { MaterialModel } from "../models/json/materialsModel.js";
import { Operations } from "../utils/entities/operations.js";
import { Results } from "../utils/entities/results.js";

export class LogicController {
  static async home(req, res) {
    res.render("index");
  }

  static async paramsShow(req, res) {
    res.render("quoter");
  }

  static async params(req, res) {
    const paramsResultP = validateParametersPrimary(req.body);
    const paramsResultS = validateParameterSecundary(req.body);

    const materialData = await MaterialModel.getMaterial(
      paramsResultS.data.manufacturerPart
    );

    const unitPrice = Operations.unitPrice(
      materialData.cost,
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
      materialData.cost,
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

    const result = new Results(
      materialData.cost,
      unitPrice,
      unitDiscPrice,
      extDiscPrice,
      extCost,
      monthlyPriceSite,
      monthlyCostSite,
      monthlyPriceMbps,
      monthlyCostMbps,
      financedCapex,
      financedMonthlyPriceSite
    );

    console.log("El costo es: " + materialData.cost);
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

    res.json(JSON.stringify(result));
  }

  static async resultShow(req, res) {
    res.render("inputsParameters/result", { res: "" });
  }
}
