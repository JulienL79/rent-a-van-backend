import { Router } from "express";
import vehiclesController from "../controllers/vehicles.controllers";
import { isAuthenticated } from "../middlewares";

const vehiclesRouter = Router();

vehiclesRouter.get("/:id", vehiclesController.get);

vehiclesRouter.get("/", isAuthenticated, vehiclesController.getAll);

vehiclesRouter.get("/user/:id", isAuthenticated, vehiclesController.getAllByUser);

vehiclesRouter.post("/", vehiclesController.create);

vehiclesRouter.put("/:id", vehiclesController.update);

vehiclesRouter.delete("/:id", vehiclesController.delete);

export default vehiclesRouter;
