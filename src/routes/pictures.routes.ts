import { Router } from "express";
import picturesController from "../controllers/pictures.controllers";
import { isAuthenticated } from "../middlewares";

const picturesRouter = Router();

picturesRouter.get("/:id", picturesController.get);

picturesRouter.get("/", isAuthenticated, picturesController.getAll);

picturesRouter.get("/vehicle/:id", picturesController.getAllByVehicle);

picturesRouter.post("/", isAuthenticated, picturesController.create);

picturesRouter.put("/:id", isAuthenticated, picturesController.update);

picturesRouter.delete("/:id", isAuthenticated, picturesController.delete);

export default picturesRouter;
