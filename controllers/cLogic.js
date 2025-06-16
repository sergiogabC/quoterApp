import { fileURLToPath } from "url";
import path from "path";
import {
  validateParameterSecundary,
  validateParametersPrimary,
} from "../utils/schema/parametersSchema.js";
import { ParametersPrimary } from "../utils/entities/parametersPrimary.js";
import { ParametersSecundary } from "../utils/entities/parameterSecundary.js";
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
    //const paramsResultP = validateParametersPrimary(req.body);
    const paramsResultS = validateParameterSecundary(req.body);

    // const parameterP = new ParametersPrimary(
    //   paramsResultP.data.client,
    //   paramsResultP.data.country,
    //   paramsResultP.data.proposalManager
    // );

    const parameterS = new ParametersSecundary(
      paramsResultS.data.piezaFabricante
    );

    //parameterS.mostrarMaterial();

    const materialData = await MaterialModel.getMaterial(
      parameterS.materialNumber
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

    const unitPrice = Operations.priceUnit(materialObject.cost, 0.7);

    console.log("El costo es: " + materialObject.cost);
    console.log("El precio unitario es: " + unitPrice);
    //parameterP.mostrarUsuario();

    res.render("../view/quoter");
  }

  static async paramsShow(req, res) {
    res.render("../view/quoter");
  }
}

// const client = req.body.client;
// const country = req.body.country;
// const proposalManager = req.body.proposalManager;
// const ht19NumberSites = req.body.ht19NumberSites;
// const sitesOutCoverage = req.body.sitesOutCoverage;
// const numSites = req.body.numSites;
// const remoteSpares = req.body.remoteSpares;
// const totalOfSpares = req.body.totalOfSpares;
// const capacitySes17 = req.body.capacitySes17;
// const overbooking = req.body.overbooking;
// const cTotalBandaKa = req.body.cTotalBandaKa;
// const mbpsProm = req.body.mbpsProm;
// const solDolar = req.body.solDolar;
// const pUTExWorks = req.body.pUTExWorks;
// const costBandKaSes = req.body.costBandKaSes;
// const costHBandKa = req.body.costHBandKa;
// const contract = req.body.contract;
// const sitesPenalties = req.body.sitesPenalties;
// const rateFinancingCapex = req.body.rateFinancingCapex;
// const uit = req.body.UIT;
