import { Request, Response } from "express";
import { APIResponse, logger } from "../utils";
import { picturesModel } from "../models";
import { picturesRegisterValidation } from "../validations";

const picturesController = {
    get: async (request: Request, response: Response) => {
        try {
            const { id } = request.params;

            logger.info(`[GET] Récupérer l'image avec l'id: ${id}`);

            const picture = await picturesModel.get(id);
            if (!picture) {
                logger.error("Image inexistante");
                return APIResponse(response, null, "Image inexistante", 404);
            }

            APIResponse(response, picture, "OK");
        } catch (error: any) {
            logger.error("Erreur lors de la récupération de l'image: ", error);
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
            logger.info("[POST] Créer une image"); // Log d'information en couleur

            const pictureData = picturesRegisterValidation.parse(request.body);
            const { user } = response.locals;
            
            const picture = await picturesModel.create({
                userId: user.id,
                ...pictureData
            });
            APIResponse(response, picture, "OK", 201);
        } catch (error: any) {
            logger.error("Erreur lors de la création de l'image: ", error);
            APIResponse(
                response,
                null,
                "Erreur lors de la création de l'image",
                500,
            );
        }
    },
    delete: async (request: Request, response: Response) => {
        try {
            const { id } = request.params;

            logger.info(`[DELETE] Supprimer l'image avec l'id: ${id}`);

            const picture = await picturesModel.get(id);
            if (!picture) {
                logger.error("Image inexistante");
                return APIResponse(response, null, "Image inexistante", 404);
            }

            await picturesModel.delete(id);
            APIResponse(response, null, "OK", 201);
        } catch (error: any) {
            logger.error("Erreur lors de la suppression de l'image: ", error);
            APIResponse(
                response,
                null,
                "Erreur lors de la suppression de l'image",
                500,
            );
        }
    },
    getAllByVehicle: async (request: Request, response: Response) => {
        try {
            const { id } = request.params;

            logger.info(`[GET] Récupérer tous les images du véhicule : ${id}`); // Log d'information en couleur
            
            const pictures = await picturesModel.getAllByVehicle(id);
            APIResponse(response, pictures, "OK");
        } catch (error: any) {
            logger.error(`Erreur lors de la récupération des images de l'utilisateur cible: `, error);
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
            logger.info("[GET] Récupérer tous les images"); // Log d'information en couleur

            const vehicles = await picturesModel.getAll();
            APIResponse(response, vehicles, "OK");
        } catch (error: any) {
            logger.error("Erreur lors de la récupération des images: ", error);
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
