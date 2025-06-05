import { Router } from "express";
import picturesController from "../controllers/pictures.controllers";
import { isAuthenticated, isAdminOrOwner } from "../middlewares";

const picturesRouter = Router();

picturesRouter.get("/:id", picturesController.get);

picturesRouter.get("/vehicle/:id", picturesController.getAllByVehicle);

picturesRouter.get("/", isAuthenticated, isAdminOrOwner, picturesController.getAll);

picturesRouter.post("/", isAuthenticated, isAdminOrOwner, picturesController.create);

picturesRouter.put("/:id", isAuthenticated, isAdminOrOwner, picturesController.update);

picturesRouter.delete("/:id", isAuthenticated, isAdminOrOwner, picturesController.delete);

export default picturesRouter;
