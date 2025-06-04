import { Request, Response } from "express";
import { APIResponse } from "../utils/response";
import logger from "../utils/logger";
import { userModel } from "../models/users.model";
import { userRegisterValidation } from "../validations/users.validations";
import { z } from "zod";

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

    getById: async (request: Request, response: Response) => {
        try {
            const { id } = request.params;
            const [user] = await userModel.get(id);

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

    create: async (request: Request, response: Response) => {
        try {
            const userData = userRegisterValidation.parse(request.body);

            // Vérifier si l'email existe déjà
            const [emailAlreadyExists] = await userModel.findByCredentials(userData.email);
            if (emailAlreadyExists) {
                return APIResponse(response, null, "Cette adresse email est déjà utilisée", 400);
            }

            // Hash du mot de passe (à adapter si besoin)
            // const hash = await hashPassword(userData.password);
            // if (!hash) return APIResponse(response, null, "Erreur lors du hash", 500);
            // userData.password = hash;

            const [newUser] = await userModel.create(userData);
            if (!newUser)
                return APIResponse(response, null, "Un problème est survenu", 500);
            APIResponse(response, newUser.id, "Utilisateur créé", 201);
        } catch (err: any) {
            logger.error("Erreur lors de la création de l'utilisateur: " + err.message);
            if (err instanceof z.ZodError) {
                return APIResponse(response, err.errors, "Le formulaire est invalide", 400);
            }
            APIResponse(response, null, "Erreur lors de la création de l'utilisateur", 500);
        }
    },

    update: async (request: Request, response: Response) => {
        try {
            const { id } = request.params;
            // On ne valide ici que les champs présents dans le body
            const updateData = request.body;
            const [user] = await userModel.get(id);
            if (!user) {
                return APIResponse(response, null, "User non trouvé", 404);
            }
            await userModel.update(id, updateData);
            APIResponse(response, null, "Utilisateur mis à jour", 200);
        } catch (error: any) {
            logger.error("Erreur lors de la mise à jour de l'utilisateur: " + error.message);
            APIResponse(response, null, "Erreur lors de la mise à jour de l'utilisateur", 500);
        }
    },

    delete: async (request: Request, response: Response) => {
        try {
            const { id } = request.params;
            const [user] = await userModel.get(id);
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