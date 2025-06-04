import { Router } from "express";
import vehiclesController from "../controllers/vehicles.controllers";
import { isAuthenticated } from "../middlewares";

const router = Router();

router.get("/:id", vehiclesController.get);

router.get("/", isAuthenticated, vehiclesController.getAll);

router.get("/user/:id", isAuthenticated, vehiclesController.getAllByUser);

router.post("/", vehiclesController.create);

router.put("/:id", vehiclesController.update);

router.delete("/:id", vehiclesController.delete);

export default router;
