import { Router } from "express";
import vehiclesController from "../controllers/vehicles.controllers";
import { isAdminOrOwner, isAuthenticated } from "../middlewares";
import { vehicles } from "../schemas";

const vehiclesRouter = Router();

vehiclesRouter.get("/:id", vehiclesController.get);

vehiclesRouter.get("/user/:id", vehiclesController.getAllByUser);

vehiclesRouter.get("/", isAuthenticated(true), isAdminOrOwner(vehicles), vehiclesController.getAll);

vehiclesRouter.post("/", isAuthenticated(true), vehiclesController.create);

vehiclesRouter.put("/:id", isAuthenticated(true), isAdminOrOwner(vehicles), vehiclesController.update);

vehiclesRouter.delete("/:id", isAuthenticated(true), isAdminOrOwner(vehicles), vehiclesController.delete);

export default vehiclesRouter;
