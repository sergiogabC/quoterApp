import { Router } from "express";

import { LogicController } from "../controllers/cLogic.js";

export const qRoutes = Router();

qRoutes.get("/", LogicController.home);

qRoutes.post("/parametros", LogicController.params);

qRoutes.get("/parametros", LogicController.paramsShow);
