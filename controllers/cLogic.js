import { fileURLToPath } from "url";
import path from "path";
import {
  validateParameterSecundary,
  validateParametersPrimary,
} from "../utils/schema/parametersSchema.js";
import { MaterialModel } from "../models/json/materialsModel.js";
import { Operations } from "../utils/entities/operations.js";
import { Material } from "../utils/entities/material.js";
import { type } from "os";

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
    const margin = req.body.margin;
    console.log(req.body);
    console.log(req.body.margin);
    console.log(typeof margin);
    console.log(typeof paramsResultS.data.margin);
    console.log(paramsResultS);

    res.render("../view/quoter");
  }

  static async paramsShow(req, res) {
    res.render("../view/quoter");
  }
}
