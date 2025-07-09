import { Router } from "express";

import { LogicController } from "../controllers/cLogic.js";

export const qRoutes = Router();

qRoutes.get("/", LogicController.home);

qRoutes.get("/parametros", LogicController.paramsShow);

qRoutes.post("/results", LogicController.params);

qRoutes.post("/exists", LogicController.exists);
