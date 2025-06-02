import { QuoterModel } from "../models/quoterModel.js";
import { fileURLToPath } from "url";
import path from "path";

//importar los schemas(validaciones)

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export class LogicController {
  static async home(req, res) {
    console.log(__dirname);
    res.render("../view/index");
  }

  static async params(req, res) {
    const client = req.body.client;
    const country = req.body.country;
    console.log("Client: ", client);
    console.log("Country: ", country);
    res.sendFile(path.join(__dirname, "../view/quoter.ejs"));
  }

  static async paramsShow(req, res) {
    res.render("../view/quoter");
  }
}
