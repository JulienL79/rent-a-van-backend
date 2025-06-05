import { Router } from "express";
import categoriesController from "../controllers/categories.controllers";
import { isAdminOrOwner, isAuthenticated } from "../middlewares";

const categoriesRouter = Router();

categoriesRouter.get("/:id", categoriesController.get);

categoriesRouter.get("/", categoriesController.getAll);

categoriesRouter.post("/", isAuthenticated, isAdminOrOwner, categoriesController.create);

categoriesRouter.put("/:id", isAuthenticated, isAdminOrOwner, categoriesController.update);

categoriesRouter.delete("/:id", isAuthenticated, isAdminOrOwner, categoriesController.delete);

export default categoriesRouter;
