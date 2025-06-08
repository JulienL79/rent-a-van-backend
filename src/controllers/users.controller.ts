import { Request, Response } from "express";
import { APIResponse, hashPassword, logger, verifyPassword } from "../utils";
import { passwordResetTokenModel, userModel } from "../models";
import { emailValidation, updateCredentialsValidation, userRegisterValidation, userUpdateValidation } from "../validations";
import { sendResetEmail } from "../utils/mailer";

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

            const updateData = userUpdateValidation.parse(request.body);

            await userModel.update(id, updateData);
            APIResponse(response, null, "Utilisateur mis à jour", 200);
        } catch (error: any) {
            logger.error("Erreur lors de la mise à jour de l'utilisateur: ", error);
            APIResponse(response, null, "Erreur lors de la mise à jour de l'utilisateur", 500);
        }
    },
    updateCredentials: async (request: Request, response: Response) => {
        try {
            const { id } = request.params;

            logger.info(`[UPDATE] Modifier password/email du user: ${id}`);

            const user = await userModel.get(id);
            if (!user) {
                logger.error("User inexistant");
                return APIResponse(response, null, "User inexistant", 404);
            }

            const { oldPassword, password, email} = updateCredentialsValidation.parse(request.body);
            let newPassword

            if (!oldPassword) {
                logger.error("Veuillez saisir votre mot de passe actuel pour modifier vos informations");
                return APIResponse(response, null, "Action interdite", 403);
            }

            if(password) {
                const [oldPasswordInDB] = await userModel.getCredentials(id)
                const validPassword = await verifyPassword(oldPassword, oldPasswordInDB.password)
                if (!validPassword) {
                    logger.error("L'ancien mot de passe est erroné");
                    return APIResponse(response, null, "L'ancien mot de passe est erroné", 400);
                }
                
                const hash = await hashPassword(password)
                newPassword = hash
            }

            const filteredUpdateData = { 
                password: newPassword ?? password,
                email
            };

            await userModel.update(id, filteredUpdateData);
            APIResponse(response, null, "Utilisateur mis à jour", 200);
        } catch (error: any) {
            logger.error("Erreur lors de la mise à jour de l'utilisateur: ", error);
            APIResponse(response, null, "Erreur lors de la mise à jour de l'utilisateur", 500);
        }
    },
    requestResetPassword: async (request: Request, response: Response) => {
        try {
            logger.info(`[POST] Demande de réinitialisation de mot de passe`);

            const { email } = request.body

            const [ user ] = await userModel.findByCredentials(email);
            if (!user) {
                logger.error("Adresse mail non reliée à un compte");
                return APIResponse(response, null, "Si un compte est associé à cette adresse, un email de réinitialisation a été envoyé.", 200);
            }

            const [{ token }] = await passwordResetTokenModel.create({
                expiresAt: new Date(Date.now() + 15 * 60 * 1000), // expiration après 15 minutes
                userId: user.id
            })

            await sendResetEmail(email, token)

            APIResponse(response, null, "Si un compte est associé à cette adresse, un email de réinitialisation a été envoyé.", 200);
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