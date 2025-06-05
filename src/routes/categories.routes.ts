import { Router } from "express";
import categoriesController from "../controllers/categories.controllers";
import { isAdminOrOwner, isAuthenticated } from "../middlewares";
import { categories } from "../schemas";

const categoriesRouter = Router();

categoriesRouter.get("/:id", categoriesController.get);

categoriesRouter.get("/", categoriesController.getAll);

categoriesRouter.post("/", isAuthenticated, isAdminOrOwner(categories), categoriesController.create);

categoriesRouter.put("/:id", isAuthenticated, isAdminOrOwner(categories), categoriesController.update);

categoriesRouter.delete("/:id", isAuthenticated, isAdminOrOwner(categories), categoriesController.delete);

export default categoriesRouter;
