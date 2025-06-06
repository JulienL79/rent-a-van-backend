import { Router } from "express";
import rolesController from "../controllers/roles.controllers";
import { isAuthenticated, isAdminOrOwner } from "../middlewares";
import { roles } from "../schemas";

const rolesRouter = Router();

rolesRouter.get("/:id", isAuthenticated(true), isAdminOrOwner(roles), rolesController.get);

rolesRouter.get("/", isAuthenticated(true), isAdminOrOwner(roles), rolesController.getAll);

rolesRouter.post("/", isAuthenticated(true), isAdminOrOwner(roles), rolesController.create);

rolesRouter.put("/:id", isAuthenticated(true), isAdminOrOwner(roles), rolesController.update);

rolesRouter.delete("/:id", isAuthenticated(true), isAdminOrOwner(roles), rolesController.delete);

export default rolesRouter;
