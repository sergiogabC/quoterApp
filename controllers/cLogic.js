import { MaterialModel } from "../models/json/materialsModel.js";
import { Operations } from "../utils/entities/operations.js";
import { Results } from "../utils/entities/results.js";
import {
  validateManu,
  validateParameterSecundary,
  validateParametersPrimary,
} from "../utils/schema/parametersSchema.js";
import { iterManu } from "../utils/scripts.js";

export class LogicController {
  static async home(req, res) {
    return res.render("index");
  }

  static async paramsShow(req, res) {
    return res.render("quoter");
  }

  static async params(req, res) {
    const validateP = validateParametersPrimary(req.body);
    const validateS = validateParameterSecundary(req.body);

    let cost = 0;
    try {
      let manu = iterManu(validateS.data.manufacturerPart);

      if (typeof manu === "string") {
        let response = await MaterialModel.getMaterial(
          paramsResultS.data.manufacturerPart
        );
        cost = response.cost;
      } else if (Array.isArray(manu)) {
        let response = await MaterialModel.getMaterials(manu);
        for (let material of response) {
          cost += material.cost;
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
      validateS.data.margin,
      validateS.data.discount,
      validateS.data.type,
      validateS.data.qty,
      validateP.data.contract,
      validateP.data.numSites,
      validateP.data.cTotalBandaKa,
      validateS.data.finance,
      validateP.data.rateFinancingCapex
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

  static async exists(req, res) {
    console.log("start");
    const validate = validateManu(req.body);

    let manu = iterManu(validate.data.manufacturerPart);
    let response;
    let cost;
    try {
      if (typeof manu === "string") {
        response = await MaterialModel.getMaterial(
          validate.data.manufacturerPart
        );
        cost = response.cost;
      } else if (Array.isArray(manu)) {
        response = await MaterialModel.getMaterials(manu);
        for (let material of response) {
          cost += material.cost;
        }
      }
    } catch (e) {
      return res.status(400).send("material_number invalidos");
    }

    return res.status(200).json(response);
  }
}
