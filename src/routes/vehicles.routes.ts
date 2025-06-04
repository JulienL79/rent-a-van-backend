import { Router } from "express";
import vehiclesController from "../controllers/vehicles.controllers";

const router = Router();

// router.get("/", vehiclesController.getAll);

router.get("/:id", vehiclesController.get);

router.post("/", vehiclesController.create);

router.put("/:id", vehiclesController.update);

router.delete("/:id", vehiclesController.delete);

export default router;
