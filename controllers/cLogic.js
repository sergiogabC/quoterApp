import { QuoterModel } from "../models/quoterModel.js";
import { fileURLToPath } from "url";
import path from "path";
import { Console } from "console";
import { validateParametersPrimary } from "../utils/schema/parametersSchema.js";

//importar los schemas(validaciones)

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export class LogicController {
  static async home(req, res) {
    console.log(__dirname);
    res.render("../view/index");
  }

  static async params(req, res) {
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
    const result = validateParametersPrimary(req.body);
    console.log(result);
    console.log(result.data.client);
    res.render("../view/quoter");
  }

  static async paramsShow(req, res) {
    res.render("../view/quoter");
  }
}
