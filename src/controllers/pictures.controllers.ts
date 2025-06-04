import { Request, Response } from "express";
import { APIResponse } from "../utils/response";
import logger from "../utils/logger";
import { picturesModel } from "../models";

const picturesController = {
    get: async (request: Request, response: Response) => {
        try {
            const { id } = request.params;
            logger.info("[GET] Récupérer une image"); // Log d'information en couleur
            const picture = await picturesModel.get(id);
            if (!picture) {
                return APIResponse(response, null, "Image inexistante", 404);
            }
            APIResponse(response, picture, "OK");
        } catch (error: any) {
            logger.error(
                "Erreur lors de la récupération de l'image: " + error.message,
            );
            APIResponse(
                response,
                null,
                "Erreur lors de la récupération de l'image",
                500,
            );
        }
    },
    create: async (request: Request, response: Response) => {
        try {
            const {
                src,
                alt,
                vehiclesId,
            } = request.body;
            const { user } = response.locals;
            logger.info("[POST] Créer une image"); // Log d'information en couleur
            const picture = await picturesModel.create({
                usersId: user.id,
                src,
                alt,
                vehiclesId,
            });
            APIResponse(response, picture, "OK", 201);
        } catch (error: any) {
            logger.error(
                "Erreur lors de la récupération de l'image: " + error.message,
            );
            APIResponse(
                response,
                null,
                "Erreur lors de la récupération de l'image",
                500,
            );
        }
    },
    delete: async (request: Request, response: Response) => {
        try {
            const { id } = request.params;
            const { user } = response.locals;

            logger.info("[DELETE] Supprimer une image"); // Log d'information en couleur
            await picturesModel.delete(id, user.id, user.isAdmin);
            APIResponse(response, null, "OK", 201);
        } catch (error: any) {
            logger.error(
                "Erreur lors de la suppression de l'image: " + error.message,
            );
            APIResponse(
                response,
                null,
                "Erreur lors de la suppression de l'image",
                500,
            );
        }
    },
    update: async (request: Request, response: Response) => {
        try {
            const { id } = request.params;
            const {
                src,
                alt,
                vehiclesId,
            } = request.body;

            const { user } = response.locals;
            logger.info("[UPDATE] Update une image"); // Log d'information en couleur
            await picturesModel.update(id, user.id, user.isAdmin, {
                ownerId: user.id,
                src,
                alt,
                vehiclesId,
            });
            APIResponse(response, null, "OK", 201);
        } catch (error: any) {
            logger.error("Erreur lors de la màj de l'image: " + error.message);
            APIResponse(
                response,
                null,
                "Erreur lors de la màj de l'image",
                500,
            );
        }
    },
    getAllByVehicles: async (request: Request, response: Response) => {
        try {
            const { id } = request.params;
            logger.info(
                `[GET] Récupérer tous les images de l'utilisateur : ${id}`,
            ); // Log d'information en couleur
            const vehicles = await picturesModel.getAllByVehicles(id);
            APIResponse(response, vehicles, "OK");
        } catch (error: any) {
            logger.error(
                `Erreur lors de la récupération des images de l'utilisateur cible: ` +
                    error.message,
            );
            APIResponse(
                response,
                null,
                "Erreur lors de la récupération des images",
                500,
            );
        }
    },
    getAll: async (request: Request, response: Response) => {
        try {
            const { user } = response.locals;

            if (!user.isAdmin) {
                return APIResponse(
                    response,
                    null,
                    "Vous n'êtes pas administrateur",
                    403,
                );
            }

            logger.info("[GET] Récupérer tous les images"); // Log d'information en couleur
            const vehicles = await picturesModel.getAll();
            APIResponse(response, vehicles, "OK");
        } catch (error: any) {
            logger.error(
                "Erreur lors de la récupération des images: " +
                    error.message,
            );
            APIResponse(
                response,
                null,
                "Erreur lors de la récupération des images",
                500,
            );
        }
    },
};

export default picturesController;
