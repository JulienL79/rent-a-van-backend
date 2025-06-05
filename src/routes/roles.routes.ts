import { Router } from "express";
import rolesController from "../controllers/roles.controllers";
import { isAuthenticated, isAdminOrOwner } from "../middlewares";

const rolesRouter = Router();

rolesRouter.get("/:id", isAuthenticated, isAdminOrOwner, rolesController.get);

rolesRouter.get("/", isAuthenticated, isAdminOrOwner, rolesController.getAll);

rolesRouter.post("/", isAuthenticated, isAdminOrOwner, rolesController.create);

rolesRouter.put("/:id", isAuthenticated, isAdminOrOwner, rolesController.update);

rolesRouter.delete("/:id", isAuthenticated, isAdminOrOwner, rolesController.delete);

export default rolesRouter;
