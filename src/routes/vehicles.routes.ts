import { Router } from "express";
import vehiclesController from "../controllers/vehicles.controllers";
import { isAdminOrOwner, isAuthenticated } from "../middlewares";

const vehiclesRouter = Router();

vehiclesRouter.get("/:id", vehiclesController.get);

vehiclesRouter.get("/user/:id", vehiclesController.getAllByUser);

vehiclesRouter.get("/", isAuthenticated, isAdminOrOwner, vehiclesController.getAll);

vehiclesRouter.post("/", isAuthenticated, isAdminOrOwner, vehiclesController.create);

vehiclesRouter.put("/:id", isAuthenticated, isAdminOrOwner, vehiclesController.update);

vehiclesRouter.delete("/:id", isAuthenticated, isAdminOrOwner, vehiclesController.delete);

export default vehiclesRouter;
