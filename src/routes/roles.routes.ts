import { Router } from "express";
import rolesController from "../controllers/roles.controllers";
import { isAuthenticated, isAdminOrOwner } from "../middlewares";
import { roles } from "../schemas";

const rolesRouter = Router();

rolesRouter.get("/:id", isAuthenticated, isAdminOrOwner(roles), rolesController.get);

rolesRouter.get("/", isAuthenticated, isAdminOrOwner(roles), rolesController.getAll);

rolesRouter.post("/", isAuthenticated, isAdminOrOwner(roles), rolesController.create);

rolesRouter.put("/:id", isAuthenticated, isAdminOrOwner(roles), rolesController.update);

rolesRouter.delete("/:id", isAuthenticated, isAdminOrOwner(roles), rolesController.delete);

export default rolesRouter;
