import { Router } from "express";
import rolesController from "../controllers/roles.controllers";
import { isAuthenticated } from "../middlewares";

const rolesRouter = Router();

rolesRouter.get("/:id", rolesController.get);

rolesRouter.get("/", rolesController.getAll);

rolesRouter.post("/", isAuthenticated, rolesController.create);

rolesRouter.put("/:id", isAuthenticated, rolesController.update);

rolesRouter.delete("/:id", isAuthenticated, rolesController.delete);

export default rolesRouter;
