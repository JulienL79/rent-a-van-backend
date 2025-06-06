import { Request, Response } from "express";
import { APIResponse, hashPassword, logger, verifyPassword } from "../utils";
import { userModel } from "../models";
import { userRegisterValidation } from "../validations";

const usersController = {
    getAll: async (request: Request, response: Response) => {
        try {
            logger.info("[GET] Récupérer tous les users");
            const users = await userModel.getAll();
            APIResponse(response, users, "OK");
        } catch (error: any) {
            logger.error("Erreur lors de la récupération des users: ", error);
            APIResponse(response, null, "Erreur lors de la récupération des users", 500);
        }
    },

    get: async (request: Request, response: Response) => {
        try {
            const { id } = request.params;

            logger.info(`[GET] Récupérer l'user avec l'id: ${id}`);

            const user = await userModel.get(id);

            if (!user) {
                logger.error("User inexistant");
                return APIResponse(response, null, "User inexistant", 404);
            }
            APIResponse(response, user, "OK");
        } catch (error: any) {
            logger.error("Erreur lors de la récupération de l'user: ", error);
            APIResponse(response, null, "Erreur lors de la récupération de l'user", 500);
        }
    },
    getDetails: async (request: Request, response: Response) => {
        try {
            const { id } = request.params;

            logger.info(`[GET] Récupérer l'user avec détails avec l'id: ${id}`);

            const user = await userModel.getDetails(id);

            if (!user) {
                logger.error("User inexistant");
                return APIResponse(response, null, "User inexistant", 404);
            }
            APIResponse(response, user, "OK");
        } catch (error: any) {
            logger.error("Erreur lors de la récupération de l'user: ", error);
            APIResponse(response, null, "Erreur lors de la récupération de l'user", 500);
        }
    },
    update: async (request: Request, response: Response) => {
        try {
            const { id } = request.params;

            logger.info(`[UPDATE] Modifier l'user avec l'id: ${id}`);

            const user = await userModel.get(id);
            if (!user) {
                logger.error("User inexistant");
                return APIResponse(response, null, "User inexistant", 404);
            }

            const updateData = userRegisterValidation.parse(request.body);

            if (updateData.password && !updateData.oldPassword) {
                logger.error("L'ancien mot de passe est requis");
                return APIResponse(response, null, "L'ancien mot de passe est requis pour le modifier", 400);
            }

            if (!updateData.password && updateData.oldPassword) {
                logger.error("Le nouveau mot de passe est requis");
                return APIResponse(response, null, "Le nouveau mot de passe est requis pour le modifier", 400);
            }

            if(updateData.oldPassword && updateData.password) {
                const [oldPassword] = await userModel.getCredentials(id)
                const validPassword = await verifyPassword(updateData.oldPassword, oldPassword.password)
                if (!validPassword) {
                    logger.error("L'ancien mot de passe est erroné");
                    return APIResponse(response, null, "L'ancien mot de passe est erroné", 400);
                }
                
                const hash = await hashPassword(updateData.password)
                updateData.password = hash
            }

            const filteredUpdateData = { ...updateData };
            if ("oldPassword" in filteredUpdateData) {
                delete filteredUpdateData.oldPassword;
            }

            await userModel.update(id, filteredUpdateData);
            APIResponse(response, null, "Utilisateur mis à jour", 200);
        } catch (error: any) {
            logger.error("Erreur lors de la mise à jour de l'utilisateur: ", error);
            APIResponse(response, null, "Erreur lors de la mise à jour de l'utilisateur", 500);
        }
    },

    delete: async (request: Request, response: Response) => {
        try {
            const { id } = request.params;

            logger.info(`[DELETE] Supprimer l'user avec l'id: ${id}`);

            const user = await userModel.get(id);
            if (!user) {
                logger.error("User inexistant");
                return APIResponse(response, null, "User inexistant", 404);
            }

            await userModel.delete(id);
            APIResponse(response, null, "Utilisateur supprimé", 200);
        } catch (error: any) {
            logger.error("Erreur lors de la suppression de l'utilisateur: ", error);
            APIResponse(response, null, "Erreur lors de la suppression de l'utilisateur", 500);
        }
    }
};

export default usersController;