import { execFile } from "child_process";
import fs from "fs";
import path from "path";
import { MaterialModel } from "../models/materialsModel.js";
import { Operations } from "../utils/entities/operations.js";
import { ParametersData } from "../utils/entities/parametersData.js";
import { Results } from "../utils/entities/results.js";
import { UnitData } from "../utils/entities/unitData.js";
import {
  validateParamPriExcel,
  validateParamSecExcel,
} from "../utils/schema/ExcelSchema.js";
import {
  validateCost,
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

  static async results(req, res) {
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

    return res.status(200).json(result);
  }

  static async exists(req, res) {
    const validate = validateManu(req.body);

    let manu = iterManu(validate.data.manufacturerPart);
    let response;
    let cost = 0;
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
      return res.json({ complete: false });
    }

    return res.status(200).json({ complete: true, cost: cost });
  }

  static async calculate(req, res) {
    const validateP = validateParametersPrimary(req.body);
    const validateS = validateParameterSecundary(req.body);
    const validateC = validateCost(req.body);

    const qto = Operations.qto(
      validateC.data.cost,
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
      validateC.data.cost,
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

    return res.status(200).json(result);
  }

  static async conversion(req, res) {
    const validateP = validateParamPriExcel(req.body);
    const validateS = validateParamSecExcel(req.body);

    const contSizeData = validateS.data.category.length;

    const listDatas = [];

    const parametersData = new ParametersData(validateP.data);

    for (let i = 0; i < contSizeData; i++) {
      let response = { cost: 0 };
      try {
        response = await MaterialModel.getMaterial(
          validateS.data.manufacturerPart[i]
        );
      } catch (e) {
        response = { cost: 0 };
      }

      const unitData = new UnitData(
        validateS.data.type[i],
        validateS.data.category[i],
        validateS.data.subcategory[i],
        validateS.data.manufacturerPart[i],
        validateS.data.margin[i],
        validateS.data.productCode[i],
        validateS.data.description[i],
        validateS.data.qty[i],
        validateS.data.unitMeasure[i],
        validateS.data.discount[i],
        validateS.data.finance[i],
        validateS.data.owner[i],
        response.cost
      );

      listDatas.push({ row: i, data: unitData.exportData() });
    }

    const schememaData = {
      parameters: parametersData.exportData(),
      listDatas: listDatas,
    };

    const jarPath = path.resolve("./services/modifiedExcel-1.0-SNAPSHOT.jar");
    const outDir = path.resolve("./data/documents");

    if (!fs.existsSync(outDir)) {
      fs.mkdirSync(outDir, { recursive: true });
    }

    const outpath = path.join(outDir, "workbook.xlsx");

    const args = ["-jar", jarPath, JSON.stringify(schememaData), outpath];

    execFile("java", args, (error, stdout, stderr) => {
      if (error) {
        console.error(error);
        return;
      }
      if (stderr) {
        console.log(stderr);
        return;
      }
      console.log("check");
      console.log(stdout);
      return res.download(outpath, "workbook.xlsx", (e) => {
        if (e) {
          return e;
        }
      });
    });
  }
}
