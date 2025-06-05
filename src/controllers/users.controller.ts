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
            logger.error("Erreur lors de la récupération des users: " + error.message);
            APIResponse(response, null, "Erreur lors de la récupération des users", 500);
        }
    },

    get: async (request: Request, response: Response) => {
        try {
            const { id } = request.params;
            const user = await userModel.get(id);

            if (!user) {
                logger.warn(`[GET] User non trouvé pour l'id: ${id}`);
                return APIResponse(response, null, "User non trouvé", 404);
            }

            logger.info(`[GET] Récupérer l'user avec l'id: ${id}`);
            APIResponse(response, user, "OK");
        } catch (error: any) {
            logger.error("Erreur lors de la récupération de l'user: " + error.message);
            APIResponse(response, null, "Erreur lors de la récupération de l'user", 500);
        }
    },
    update: async (request: Request, response: Response) => {
        try {
            const { id } = request.params;
            
            const updateData = userRegisterValidation.parse(request.body);
            const user = await userModel.get(id);
            if (!user) {
                return APIResponse(response, null, "User non trouvé", 404);
            }

            if(updateData.oldPassword && updateData.password) {
                const [oldPassword] = await userModel.getCredentials(id)
                const validPassword = await verifyPassword(updateData.oldPassword, oldPassword.password)
                if (!validPassword)
                    return APIResponse(response, null, "L'ancien mot de passe est erroné", 400);
                
                const hash = await hashPassword(updateData.password)
                updateData.password = hash
            }
            const { oldPassword, ...filteredUpdateData } = updateData;

            await userModel.update(id, filteredUpdateData);
            APIResponse(response, null, "Utilisateur mis à jour", 200);
        } catch (error: any) {
            logger.error("Erreur lors de la mise à jour de l'utilisateur: " + error.message);
            APIResponse(response, null, "Erreur lors de la mise à jour de l'utilisateur", 500);
        }
    },

    delete: async (request: Request, response: Response) => {
        try {
            const { id } = request.params;
            const user = await userModel.get(id);
            if (!user) {
                return APIResponse(response, null, "User non trouvé", 404);
            }
            await userModel.delete(id);
            APIResponse(response, null, "Utilisateur supprimé", 200);
        } catch (error: any) {
            logger.error("Erreur lors de la suppression de l'utilisateur: " + error.message);
            APIResponse(response, null, "Erreur lors de la suppression de l'utilisateur", 500);
        }
    }
};

export default usersController;