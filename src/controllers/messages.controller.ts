import { Request, Response } from "express";
import { APIResponse, logger } from "../utils";
import { messagesRegisterValidation, messagesUpdateValidation } from "../validations";
import { messagesModel } from "../models";
import { z } from "zod";

const messagesController = {
    create: async (request: Request, response: Response) => {
        try {
            const messageData = messagesRegisterValidation.parse(request.body);

            logger.info("[POST] Créer un message"); // Log d'information en couleur

            const message = await messagesModel.create({
                senderId: response.locals.user.id,
                ...messageData,
            });
            APIResponse(response, message, "OK", 201);
        } catch (error: any) {
            logger.error("Erreur lors de la création du message: ", error);
            if (error instanceof z.ZodError) {
                return APIResponse(response, error.errors, "Le formulaire est invalide", 400);
            }
            APIResponse(
                response,
                null,
                "Erreur lors de la création du message",
                500,
            );
        }
    },
    delete: async (request: Request, response: Response) => {
        try {
            const { id } = request.params;

            logger.info(`[DELETE] Supprimer le message avec l'id: ${id}`);

            const message = await messagesModel.get(id);
            if (!message) {
                logger.error("Message inexistant");
                return APIResponse(response, null, "Message inexistant", 404);
            }

            await messagesModel.delete(id);
            APIResponse(response, null, "OK", 201);
        } catch (error: any) {
            logger.error("Erreur lors de la suppression du message: ", error);
            APIResponse(
                response,
                null,
                "Erreur lors de la suppression du message",
                500,
            );
        }
    },
    update: async (request: Request, response: Response) => {
        try {
            const { id } = request.params;

            logger.info(`[UPDATE] Modifier le message avec l'id: ${id}`);

            const message = await messagesModel.get(id);
            if (!message) {
                logger.error("Message inexistant");
                return APIResponse(response, null, "Message inexistant", 404);
            }

            const messageData = messagesUpdateValidation.parse(request.body);

            await messagesModel.update(id, messageData);
            APIResponse(response, null, "OK", 201);
        } catch (error: any) {
            logger.error("Erreur lors de la màj du message: ", error);
            if (error instanceof z.ZodError) {
                return APIResponse(response, error.errors, "Le formulaire est invalide", 400);
            }
            APIResponse(
                response,
                null,
                "Erreur lors de la màj du message",
                500,
            );
        }
    },
    get: async (request: Request, response: Response) => {
        try {
            const { id } = request.params;

            logger.info(`[GET] Récupérer le message avec l'id: ${id}`);

            const message = await messagesModel.get(id);
            if (!message) {
                logger.error("Message inexistant");
                return APIResponse(response, null, "Message inexistant", 404);
            }

            APIResponse(response, message, "OK");
        } catch (error: any) {
            logger.error("Erreur lors de la récupération du message: ", error);
            APIResponse(
                response,
                null,
                "Erreur lors de la récupération du message",
                500,
            );
        }
    },
    getAllFromChat: async (request: Request, response: Response) => {
        try {
            logger.info("[GET] Récupérer tous les messages d'une conversation"); // Log d'information en couleur

            const { id } = request.params;

            const messages = await messagesModel.getAllFromChat(
                response.locals.user.id,
                id,
            );

            APIResponse(response, messages, "OK");
        } catch (error: any) {
            logger.error(
                "Erreur lors de la récupération des messages d'une conversation: ",
                error,
            );
            APIResponse(
                response,
                null,
                "Erreur lors de la récupération des messages d'une conversation",
                500,
            );
        }
    },
    getAllChatsByUser: async (request: Request, response: Response) => {
        try {
            logger.info("[GET] Récupérer toutes les conversations d'un user"); // Log d'information en couleur

            const messages = await messagesModel.getAllChatsByUser(
                response.locals.user.id,
            );

            APIResponse(response, messages, "OK");
        } catch (error: any) {
            logger.error(
                "Erreur lors de la récupération des conversations: ",
                error,
            );
            APIResponse(
                response,
                null,
                "Erreur lors de la récupération des conversations",
                500,
            );
        }
    },
    getAll: async (request: Request, response: Response) => {
        try {
            logger.info("[GET] Récupérer tous les messages"); // Log d'information en couleur

            const messages = await messagesModel.getAll();
            APIResponse(response, messages, "OK");
        } catch (error: any) {
            logger.error(
                "Erreur lors de la récupération des messages: ",
                error,
            );
            APIResponse(
                response,
                null,
                "Erreur lors de la récupération des messages",
                500,
            );
        }
    },
};

export default messagesController;
