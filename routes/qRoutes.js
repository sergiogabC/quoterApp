import { Router } from "express";

import { LogicController } from "../controllers/cLogic.js";

export const qRoutes = Router();

qRoutes.get("/", LogicController.home);

qRoutes.get("/parametros", LogicController.paramsShow);

qRoutes.post("/results", LogicController.results);

qRoutes.post("/exists", LogicController.exists);

qRoutes.post("/calculate", LogicController.calculate);
