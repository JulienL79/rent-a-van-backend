import { Router } from "express";
import categoriesController from "../controllers/categories.controllers";
import { isAuthenticated } from "../middlewares";

const categoriesRouter = Router();

categoriesRouter.get("/:id", categoriesController.get);

categoriesRouter.get("/", categoriesController.getAll);

categoriesRouter.post("/", isAuthenticated, categoriesController.create);

categoriesRouter.put("/:id", isAuthenticated, categoriesController.update);

categoriesRouter.delete("/:id", isAuthenticated, categoriesController.delete);

export default categoriesRouter;
