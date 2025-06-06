import { Router } from "express";
import picturesController from "../controllers/pictures.controllers";
import { isAuthenticated, isAdminOrOwner } from "../middlewares";
import { pictures } from "../schemas";

const picturesRouter = Router();

picturesRouter.get("/:id", picturesController.get);

picturesRouter.get("/vehicle/:id", picturesController.getAllByVehicle);

picturesRouter.get("/", isAuthenticated(true), isAdminOrOwner(pictures), picturesController.getAll);

picturesRouter.post("/", isAuthenticated(true), picturesController.create);

picturesRouter.put("/:id", isAuthenticated(true), isAdminOrOwner(pictures), picturesController.update);

picturesRouter.delete("/:id", isAuthenticated(true), isAdminOrOwner(pictures), picturesController.delete);

export default picturesRouter;
