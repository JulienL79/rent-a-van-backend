import { Router } from "express";
import picturesController from "../controllers/pictures.controller";
import { isAuthenticated, isAdminOrOwner } from "../middlewares";
import { pictures } from "../schemas";

const picturesRouter = Router();

picturesRouter.get("/", isAuthenticated(true), isAdminOrOwner(pictures), picturesController.getAll);

picturesRouter.get("/:id", picturesController.get);

picturesRouter.get("/vehicle/:id", picturesController.getAllByVehicle);

picturesRouter.post("/", isAuthenticated(true), picturesController.create);

picturesRouter.delete("/:id", isAuthenticated(true), isAdminOrOwner(pictures), picturesController.delete);

export default picturesRouter;
