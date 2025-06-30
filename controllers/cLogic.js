import { MaterialModel } from "../models/json/materialsModel.js";
import { Operations } from "../utils/entities/operations.js";
import { Results } from "../utils/entities/results.js";
import {
  validateParameterSecundary,
  validateParametersPrimary,
} from "../utils/schema/parametersSchema.js";

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

    console.log("Datos req.body: ", req.body);
    console.log("Datos con parse P:", paramsResultP);
    console.log("Datos con parse S: ", paramsResultS);

    const materialData = await MaterialModel.getMaterial(
      paramsResultS.data.manufacturerPart
    );

    console.log(materialData);

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

    console.log(result);

    return res.json(result);
  }

  static async resultShow(req, res) {
    res.render("inputsParameters/result", { res: "" });
  }
}
