import { Request, Response } from "express";
import { APIResponse, logger } from "../utils";
import { userModel, vehiclesModel } from "../models";
import { vehiclesRegisterValidation } from "../validations";
import { z } from "zod";

const vehiclesController = {
    get: async (request: Request, response: Response) => {
        try {
            const { id } = request.params;

            logger.info(`[GET] Récupérer le véhicule avec l'id: ${id}`);

            const vehicle = await vehiclesModel.get(id);
            if (!vehicle) {
                logger.error("Véhicule inexistant");
                return APIResponse(response, null, "Véhicule inexistant", 404);
            }

            APIResponse(response, vehicle, "OK");
        } catch (error: any) {
            logger.error("Erreur lors de la récupération du véhicule: ", error);
            APIResponse(response, null, "Erreur lors de la récupération du véhicule", 500);
        }
    },
    getDetails: async (request: Request, response: Response) => {
        try {
            const { id } = request.params;

            logger.info(`[GET] Récupérer le véhicule avec détails avec l'id: ${id}`);

            const vehicle = await vehiclesModel.getDetails(id);
            if (!vehicle) {
                logger.error("Véhicule inexistant");
                return APIResponse(response, null, "Véhicule inexistant", 404);
            }

            APIResponse(response, vehicle, "OK");
        } catch (error: any) {
            logger.error("Erreur lors de la récupération du véhicule: ", error);
            APIResponse(response, null, "Erreur lors de la récupération du véhicule", 500);
        }
    },
    create: async (request: Request, response: Response) => {
        try {
            logger.info("[POST] Créer un véhicule") // Log d'information en couleur

            const vehicleData = vehiclesRegisterValidation.parse(request.body);
            const { user } = response.locals;

            const vehicle = await vehiclesModel.create({
                userId: user.id,
                ...vehicleData
            });
            APIResponse(response, vehicle, "OK", 201);
        } catch (error: any) {
            logger.error("Erreur lors de la création du véhicule: ", error);
            if (error instanceof z.ZodError) {
                return APIResponse(response, error.errors, "Le formulaire est invalide", 400);
            }
            APIResponse(response, null, "Erreur lors de la création du véhicule", 500);
        }
    },
    delete: async (request: Request, response: Response) => {
        try {
            const { id } = request.params;

            logger.info(`[DELETE] Supprimer le véhicule avec l'id: ${id}`);

            const vehicle = await vehiclesModel.get(id);
            if (!vehicle) {
                logger.error("Véhicule inexistant");
                return APIResponse(response, null, "Véhicule inexistant", 404);
            }

            await vehiclesModel.delete(id);
            APIResponse(response, null, "OK", 201);
        } catch (error: any) {
            logger.error("Erreur lors de la suppression du véhicule: ", error);
            APIResponse(response, null, "Erreur lors de la suppression du véhicule", 500);
        }
    },
    update: async (request: Request, response: Response) => {
        try {
            const { id } = request.params;

            logger.info(`[UPDATE] Modifier le véhicule avec l'id: ${id}`);

            const vehicle = await vehiclesModel.get(id);
            if (!vehicle) {
                logger.error("Véhicule inexistant");
                return APIResponse(response, null, "Véhicule inexistant", 404);
            }

            const vehicleData = vehiclesRegisterValidation.parse(request.body)

            await vehiclesModel.update(id, vehicleData)
            APIResponse(response, null, "OK", 201);
        } catch (error: any) {
            logger.error("Erreur lors de la màj du véhicule: ", error);
            if (error instanceof z.ZodError) {
                return APIResponse(response, error.errors, "Le formulaire est invalide", 400);
            }
            APIResponse(response, null, "Erreur lors de la màj du véhicule", 500);
        }
    },
    getAllByUser: async (request: Request, response: Response) => {
        try {
            const { id } = request.params;

            logger.info(`[GET] Récupérer tous les véhicules de l'utilisateur : ${id}`) // Log d'information en couleur
            
            const user = await userModel.get(id);
            if (!user) {
                logger.error("User inexistant");
                return APIResponse(response, null, "User inexistant", 404);
            }

            const vehicles = await vehiclesModel.getAllByUser(id);
            APIResponse(response, vehicles, "OK");
        } catch (error: any) {
            logger.error(`Erreur lors de la récupération des véhicules de l'utilisateur cible: `, error);
            APIResponse(response, null, "Erreur lors de la récupération des véhicules", 500);
        }
    },
    getAll: async (request: Request, response: Response) => {
        try {
            logger.info("[GET] Récupérer tous les véhicules"); // Log d'information en couleur
            
            const vehicles = await vehiclesModel.getAll();
            APIResponse(response, vehicles, "OK");
        } catch (error: any) {
            logger.error("Erreur lors de la récupération des véhicules: ", error);
            APIResponse(response, null, "Erreur lors de la récupération des véhicules", 500);
        }
    },
}

export default vehiclesController