import { execFile } from "node:child_process";
import path from "node:path";
import { MaterialModel } from "../models/materialsModel.js";
import { Operations } from "../utils/entities/operations.js";
import { Results } from "../utils/entities/results.js";
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
    const rutaJar = path.resolve("../services/createExcel-1.0-SNAPSHOT.jar");
    const outpath = path.resolve("../services/")

    const data = JSON.stringify([
      {
        row: 0,
        data: {
          type: "1111",
          category: "sda",
          subCategory: "asa",
          manufacturerPart: "qqqqq+qqq",
          productCode: "vv",
          description: "11",
          qty: 22,
          unitMeasure: "asda",
          discount: 11,
          finance: "www",
        },
      },
      {
        row: 1,
        data: {
          type: "22",
          category: "vs",
          subCategory: "da",
          manufacturerPart: "11",
          productCode: "aa",
          description: "ss",
          qty: 2,
          unitMeasure: "ad",
          discount: 11,
          finance: "122",
        },
      },
    ]);

    //console.log("req body: ", req.body);
    let valP = validateParamPriExcel(req.body);
    let valS = validateParamSecExcel(req.body);

    // exec("java -version", (error, stdout, stderr) => {
    //   if (error) {
    //     console.error("Error ejecutando java:", error);
    //     return;
    //   }

    //   console.log("Versión de Java detectada:");
    //   console.log(stderr); // la versión suele venir en stderr
    // });

    execFile("java", ["-jar", rutaJar, data], (error, stdout, stderr) => {
      if (error) {
        console.error(error);
        return;
      }
    });

    //   if (fs.existsSync(outputPath)) {
    //     res.download(outputPath, "", (e) => {
    //       if (e) {
    //         console.error("Error al enviar archivo", error);
    //       }
    //     });
    //   }
    // });

    // console.log("valP:", valP.data);
    // console.log("valS:", valS.data);

    return res.send("");
  }
}
