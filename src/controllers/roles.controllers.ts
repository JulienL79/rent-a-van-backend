import { Request, Response } from "express";
import { APIResponse } from "../utils/response";
import logger from "../utils/logger";
import { rolesModel } from "../models";
import { rolesRegisterValidation } from "../validations/roles.validation";

const rolesController = {
    get: async (request: Request, response: Response) => {
        try {
            const { id } = request.params;
            logger.info("[GET] Récupérer une role"); // Log d'information en couleur
            const role = await rolesModel.get(id);
            if (!role) {
                return APIResponse(response, null, "Role inexistant", 404);
            }
            APIResponse(response, role, "OK");
        } catch (error: any) {
            logger.error(
                "Erreur lors de la récupération du role: " + error.message,
            );
            APIResponse(
                response,
                null,
                "Erreur lors de la récupération du role",
                500,
            );
        }
    },
    create: async (request: Request, response: Response) => {
        try {
            const {
                name
            } = rolesRegisterValidation.parse(request.body);
            const { user } = response.locals;

            logger.info("[POST] Créer une role"); // Log d'information en couleur

            if(!user.isAdmin) {
                logger.error("Erreur lors de la création d'un role: réservé aux admin")
                return APIResponse(response, null, "Vous n'êtes pas administrateur", 403);
            }

            const role = await rolesModel.create({
                name
            });
            APIResponse(response, role, "OK", 201);
        } catch (error: any) {
            logger.error(
                "Erreur lors de la récupération du role: " + error.message,
            );
            APIResponse(
                response,
                null,
                "Erreur lors de la récupération du role",
                500,
            );
        }
    },
    delete: async (request: Request, response: Response) => {
        try {
            const { id } = request.params;
            const { user } = response.locals;

            logger.info("[DELETE] Supprimer une role"); // Log d'information en couleur
            
            if(!user.isAdmin) {
                logger.error("Erreur lors de la suppression d'un role: réservé aux admin")
                return APIResponse(response, null, "Vous n'êtes pas administrateur", 403);
            }
            
            await rolesModel.delete(id);
            APIResponse(response, null, "OK", 201);
        } catch (error: any) {
            logger.error(
                "Erreur lors de la suppression du role: " + error.message,
            );
            APIResponse(
                response,
                null,
                "Erreur lors de la suppression du role",
                500,
            );
        }
    },
    update: async (request: Request, response: Response) => {
        try {
            const { id } = request.params;
            const {
                name
            } = rolesRegisterValidation.parse(request.body);
            const { user } = response.locals;
            
            if(!user.isAdmin) {
                logger.error("Erreur lors de la modification d'un role: réservé aux admin")
                return APIResponse(response, null, "Vous n'êtes pas administrateur", 403);
            }
            
            logger.info("[UPDATE] Update une role"); // Log d'information en couleur
            
            await rolesModel.update(id, {
                name
            });
            APIResponse(response, null, "OK", 201);
        } catch (error: any) {
            logger.error("Erreur lors de la màj du role: " + error.message);
            APIResponse(
                response,
                null,
                "Erreur lors de la màj du role",
                500,
            );
        }
    },
    getAll: async (request: Request, response: Response) => {
        try {
            logger.info("[GET] Récupérer tous les roles"); // Log d'information en couleur
            
            const roles = await rolesModel.getAll();
            APIResponse(response, roles, "OK");
        } catch (error: any) {
            logger.error(
                "Erreur lors de la récupération des roles: " +
                    error.message,
            );
            APIResponse(
                response,
                null,
                "Erreur lors de la récupération des roles",
                500,
            );
        }
    },
};

export default rolesController;
