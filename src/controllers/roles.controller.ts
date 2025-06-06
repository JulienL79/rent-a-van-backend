import { Request, Response } from "express";
import { APIResponse, logger } from "../utils";
import { rolesModel } from "../models";
import { rolesRegisterValidation } from "../validations";

const rolesController = {
    get: async (request: Request, response: Response) => {
        try {
            const { id } = request.params;

            logger.info(`[GET] Récupérer le role avec l'id: ${id}`);

            const role = await rolesModel.get(id);
            if (!role) {
                logger.error("Role inexistant");
                return APIResponse(response, null, "Role inexistant", 404);
            }

            APIResponse(response, role, "OK");
        } catch (error: any) {
            logger.error("Erreur lors de la récupération du role: ", error);
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

            logger.info("[POST] Créer un role"); // Log d'information en couleur

            const role = await rolesModel.create({
                name
            });
            APIResponse(response, role, "OK", 201);
        } catch (error: any) {
            logger.error("Erreur lors de la récupération du role: ", error);
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

            logger.info(`[DELETE] Supprimer le role avec l'id: ${id}`);

            const role = await rolesModel.get(id);
            if (!role) {
                logger.error("Role inexistant");
                return APIResponse(response, null, "Role inexistant", 404);
            }
            
            await rolesModel.delete(id);
            APIResponse(response, null, "OK", 201);
        } catch (error: any) {
            logger.error("Erreur lors de la suppression du role: ", error);
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

            logger.info(`[UPDATE] Modifier le role avec l'id: ${id}`);

            const role = await rolesModel.get(id);
            if (!role) {
                logger.error("Role inexistant");
                return APIResponse(response, null, "Role inexistant", 404);
            }

            const { name } = rolesRegisterValidation.parse(request.body);
            
            await rolesModel.update(id, {
                name
            });
            APIResponse(response, null, "OK", 201);
        } catch (error: any) {
            logger.error("Erreur lors de la màj du role: ", error);
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
            logger.error("Erreur lors de la récupération des roles: ", error);
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
