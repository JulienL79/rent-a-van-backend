import { Router } from "express";
import vehiclesController from "../controllers/vehicles.controllers";
import { isAdminOrOwner, isAuthenticated } from "../middlewares";
import { vehicles } from "../schemas";

const vehiclesRouter = Router();

vehiclesRouter.get("/:id", vehiclesController.get);

vehiclesRouter.get("/user/:id", vehiclesController.getAllByUser);

vehiclesRouter.get("/", isAuthenticated, isAdminOrOwner(vehicles), vehiclesController.getAll);

vehiclesRouter.post("/", isAuthenticated, vehiclesController.create);

vehiclesRouter.put("/:id", isAuthenticated, isAdminOrOwner(vehicles), vehiclesController.update);

vehiclesRouter.delete("/:id", isAuthenticated, isAdminOrOwner(vehicles), vehiclesController.delete);

export default vehiclesRouter;
