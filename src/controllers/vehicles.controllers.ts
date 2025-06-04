import { Request, Response } from "express";
import { APIResponse } from "../utils/response";
import logger from "../utils/logger";
import { vehiclesModel } from "../models";

const vehiclesController = {
    get: async (request: Request, response: Response) => {
        try {
            const { id } = request.params;
            logger.info("[GET] Récupérer un véhicule") // Log d'information en couleur
            const vehicle = await vehiclesModel.get(id);
            if (!vehicle) {
                return APIResponse(response, null, "Véhicule inexistant", 404);
            }
            APIResponse(response, vehicle, "OK");
        } catch (error: any) {
            logger.error("Erreur lors de la récupération du véhicule: " + error.message);
            APIResponse(response, null, "Erreur lors de la récupération du véhicule", 500);
        }
    },
    create: async (request: Request, response: Response) => {
        try {
            const { 
                brand, 
                model, 
                mileage, 
                registrationDate, 
                registrationPlate, 
                description, 
                numberOfSeats, 
                numberOfSleepingPlaces, 
                length, 
                height, 
                weight, 
                fuelType, 
                gearType, 
                consumption, 
                cityName,
                insuranceNumber,
                insuranceExpirationDate,
                basePrice,
                isAvailable
            } = request.body;
            const { user } = response.locals;
            logger.info("[vehicle] Créer un véhicule") // Log d'information en couleur
            const vehicle = await vehiclesModel.create({
                ownerId: user.id,
                brand,
                model,
                mileage, 
                registrationDate, 
                registrationPlate, 
                description, 
                numberOfSeats, 
                numberOfSleepingPlaces, 
                length, 
                height, 
                weight, 
                fuelType, 
                gearType, 
                consumption, 
                cityName,
                insuranceNumber,
                insuranceExpirationDate,
                basePrice,
                isAvailable
            });
            APIResponse(response, vehicle, "OK", 201);
        } catch (error: any) {
            logger.error("Erreur lors de la récupération du véhicule: " + error.message);
            APIResponse(response, null, "Erreur lors de la récupération du véhicule", 500);
        }
    },
    delete: async (request: Request, response: Response) => {
        try {
            const { id } = request.params;
            const { user } = response.locals;

            logger.info("[DELETE] Supprimer un véhicule") // Log d'information en couleur
            await vehiclesModel.delete(id, user.id);
            APIResponse(response, null, "OK", 201);
        } catch (error: any) {
            logger.error("Erreur lors de la suppression du véhicule: " + error.message);
            APIResponse(response, null, "Erreur lors de la suppression du véhicule", 500);
        }
    },
    update: async (request: Request, response: Response) => {
        try {
            const { id } = request.params;
            const { 
                brand, 
                model, 
                mileage, 
                registrationDate, 
                registrationPlate, 
                description, 
                numberOfSeats, 
                numberOfSleepingPlaces, 
                length, 
                height, 
                weight, 
                fuelType, 
                gearType, 
                consumption, 
                cityName,
                insuranceNumber,
                insuranceExpirationDate,
                basePrice,
                isAvailable
            } = request.body;
            
            const { user } = response.locals;
            logger.info("[UPDATE] Update un véhicule") // Log d'information en couleur
            await vehiclesModel.update(id, user.id, {
                ownerId: user.id,
                brand,
                model,
                mileage, 
                registrationDate, 
                registrationPlate, 
                description, 
                numberOfSeats, 
                numberOfSleepingPlaces, 
                length, 
                height, 
                weight, 
                fuelType, 
                gearType, 
                consumption, 
                cityName,
                insuranceNumber,
                insuranceExpirationDate,
                basePrice,
                isAvailable
            })
            APIResponse(response, null, "OK", 201);
        } catch (error: any) {
            logger.error("Erreur lors de la màj du véhicule: " + error.message);
            APIResponse(response, null, "Erreur lors de la màj du véhicule", 500);
        }
    },
    getAllByUser: async (request: Request, response: Response) => {
        try {
            const { id } = request.params;
            logger.info(`[GET] Récupérer tous les véhicules de l'utilisateur : ${id}`) // Log d'information en couleur
            const vehicles = await vehiclesModel.getAllByUser(id);
            APIResponse(response, vehicles, "OK");
        } catch (error: any) {
            logger.error(`Erreur lors de la récupération des véhicules de l'utilisateur cible: ` + error.message);
            APIResponse(response, null, "Erreur lors de la récupération des véhicules", 500);
        }
    },
    getAll: async (request: Request, response: Response) => {
        try {
            const { user } = response.locals;

            if(!user.isAdmin) {
                return APIResponse(response, null, "Vous n'êtes pas administrateur", 403);
            }

            logger.info("[GET] Récupérer tous les véhicules"); // Log d'information en couleur
            const vehicles = await vehiclesModel.getAll(user.isAdmin);
            APIResponse(response, vehicles, "OK");
        } catch (error: any) {
            logger.error("Erreur lors de la récupération des véhicules: " + error.message);
            APIResponse(response, null, "Erreur lors de la récupération des véhicules", 500);
        }
    },
}

export default vehiclesController