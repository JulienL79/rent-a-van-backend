import { Router } from "express";
import pricePeriodsController from "../controllers/pricePeriods.controller";
import { isAdminOrOwner, isAuthenticated } from "../middlewares";
import { pricePeriods, vehicles } from "../schemas";

const pricePeriodsRouter = Router();

pricePeriodsRouter.get("/", isAuthenticated(true), isAdminOrOwner(pricePeriods), pricePeriodsController.getAll);

pricePeriodsRouter.get("/vehicles/:id/search/:date", pricePeriodsController.getByVehicleAndDate);

pricePeriodsRouter.get("/vehicles/:id", isAuthenticated(true), isAdminOrOwner(vehicles), pricePeriodsController.getByVehicleId);

pricePeriodsRouter.get("/:id", isAuthenticated(true), isAdminOrOwner(pricePeriods), pricePeriodsController.get);

pricePeriodsRouter.post("/", isAuthenticated(true), isAdminOrOwner(pricePeriods), pricePeriodsController.create);

pricePeriodsRouter.put("/:id", isAuthenticated(true), isAdminOrOwner(pricePeriods), pricePeriodsController.update);

pricePeriodsRouter.delete("/:id", isAuthenticated(true), isAdminOrOwner(pricePeriods), pricePeriodsController.delete);

export default pricePeriodsRouter;
