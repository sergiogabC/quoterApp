import { MaterialModel } from "../models/json/materialsModel.js";
import { Operations } from "../utils/entities/operations.js";
import { Results } from "../utils/entities/results.js";
import {
  validateParameterSecundary,
  validateParametersPrimary,
} from "../utils/schema/parametersSchema.js";
import { iterManu } from "../utils/scripts.js";

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

    let cost = 0;
    try {
      let manu = iterManu(paramsResultS.data.manufacturerPart);

      if (typeof manu === "string") {
        let materialData = await MaterialModel.getMaterial(
          paramsResultS.data.manufacturerPart
        );
        cost = materialData.cost;
      } else if (Array.isArray(manu)) {
        let materialsDatas = await MaterialModel.getMaterials(manu);
        for (let materialData of materialsDatas) {
          cost += materialData.cost;
        }
      }
    } catch (err) {
      const numCero = 0.0;
      const result = new Results(
        numCero,
        numCero,
        numCero,
        numCero,
        numCero,
        numCero,
        numCero,
        numCero,
        numCero,
        numCero,
        numCero
      );
      return res.json(result);
    }

    const qto = Operations.qto(
      cost,
      paramsResultS.data.margin,
      paramsResultS.data.discount,
      paramsResultS.data.type,
      paramsResultS.data.qty,
      paramsResultP.data.contract,
      paramsResultP.data.numSites,
      paramsResultP.data.cTotalBandaKa,
      paramsResultS.data.finance,
      paramsResultP.data.rateFinancingCapex
    );

    const result = new Results(
      cost,
      qto.unitPrice,
      qto.unitDiscPrice,
      qto.extDiscPrice,
      qto.extCost,
      qto.monthlyPriceSite,
      qto.monthlyCostSite,
      qto.monthlyPriceMbps,
      qto.monthlyCostMbps,
      qto.financedCapex,
      qto.financedMonthlyPriceSite
    );

    return res.json(result);
  }

  static async resultShow(req, res) {
    res.render("inputsParameters/result", { res: "" });
  }
}
