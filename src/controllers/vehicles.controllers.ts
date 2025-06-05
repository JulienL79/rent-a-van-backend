import { Request, Response } from "express";
import { APIResponse } from "../utils/response";
import logger from "../utils/logger";
import { vehiclesModel } from "../models";
import { vehiclesRegisterValidation } from "../validations/vehicles.validations";

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
                categoryId,
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
                cityCoordinates,
                insuranceNumber,
                insuranceExpirationDate,
                basePrice,
                isAvailable
            } = vehiclesRegisterValidation.parse(request.body);
            const { user } = response.locals;
            logger.info("[POST] Créer un véhicule") // Log d'information en couleur
            const vehicle = await vehiclesModel.create({
                ownerId: user.id,
                categoryId,
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
                cityCoordinates,
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
            await vehiclesModel.delete(id, user.id, user.isAdmin);
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
                categoryId,
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
                cityCoordinates,
                insuranceNumber,
                insuranceExpirationDate,
                basePrice,
                isAvailable
            } = vehiclesRegisterValidation.parse(request.body)
            
            const { user } = response.locals;
            logger.info("[UPDATE] Update un véhicule") // Log d'information en couleur
            await vehiclesModel.update(id, user.id, user.isAdmin, {
                ownerId: user.id,
                categoryId,
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
                cityCoordinates,
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
                logger.error("Erreur lors de la récupération des véhicules: réservé aux admin")
                return APIResponse(response, null, "Vous n'êtes pas administrateur", 403);
            }

            logger.info("[GET] Récupérer tous les véhicules"); // Log d'information en couleur
            const vehicles = await vehiclesModel.getAll();
            APIResponse(response, vehicles, "OK");
        } catch (error: any) {
            logger.error("Erreur lors de la récupération des véhicules: " + error.message);
            APIResponse(response, null, "Erreur lors de la récupération des véhicules", 500);
        }
    },
}

export default vehiclesController