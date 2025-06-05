import { Request, Response } from "express";
import { APIResponse } from "../utils/response";
import logger from "../utils/logger";
import { categoriesModel } from "../models";

const categoriesController = {
    get: async (request: Request, response: Response) => {
        try {
            const { id } = request.params;
            logger.info("[GET] Récupérer une categorie"); // Log d'information en couleur
            const category = await categoriesModel.get(id);
            if (!category) {
                return APIResponse(response, null, "Categorie inexistante", 404);
            }
            APIResponse(response, category, "OK");
        } catch (error: any) {
            logger.error(
                "Erreur lors de la récupération de la categorie: " + error.message,
            );
            APIResponse(
                response,
                null,
                "Erreur lors de la récupération de la categorie",
                500,
            );
        }
    },
    create: async (request: Request, response: Response) => {
        try {
            const {
                name
            } = request.body;
            const { user } = response.locals;

            logger.info("[POST] Créer une categorie"); // Log d'information en couleur

            if(!user.isAdmin) {
                logger.error("Erreur lors de la création d'une catégorie: réservé aux admin")
                return APIResponse(response, null, "Vous n'êtes pas administrateur", 403);
            }

            const category = await categoriesModel.create({
                name
            });
            APIResponse(response, category, "OK", 201);
        } catch (error: any) {
            logger.error(
                "Erreur lors de la récupération de la categorie: " + error.message,
            );
            APIResponse(
                response,
                null,
                "Erreur lors de la récupération de la categorie",
                500,
            );
        }
    },
    delete: async (request: Request, response: Response) => {
        try {
            const { id } = request.params;
            const { user } = response.locals;

            logger.info("[DELETE] Supprimer une categorie"); // Log d'information en couleur
            
            if(!user.isAdmin) {
                logger.error("Erreur lors de la suppression d'une catégorie: réservé aux admin")
                return APIResponse(response, null, "Vous n'êtes pas administrateur", 403);
            }
            
            await categoriesModel.delete(id);
            APIResponse(response, null, "OK", 201);
        } catch (error: any) {
            logger.error(
                "Erreur lors de la suppression de la categorie: " + error.message,
            );
            APIResponse(
                response,
                null,
                "Erreur lors de la suppression de la categorie",
                500,
            );
        }
    },
    update: async (request: Request, response: Response) => {
        try {
            const { id } = request.params;
            const {
                name
            } = request.body;
            const { user } = response.locals;
            
            if(!user.isAdmin) {
                logger.error("Erreur lors de la modification d'une catégorie: réservé aux admin")
                return APIResponse(response, null, "Vous n'êtes pas administrateur", 403);
            }
            
            logger.info("[UPDATE] Update une categorie"); // Log d'information en couleur
            
            await categoriesModel.update(id, {
                name
            });
            APIResponse(response, null, "OK", 201);
        } catch (error: any) {
            logger.error("Erreur lors de la màj de la categorie: " + error.message);
            APIResponse(
                response,
                null,
                "Erreur lors de la màj de la categorie",
                500,
            );
        }
    },
    getAll: async (request: Request, response: Response) => {
        try {
            logger.info("[GET] Récupérer toutes les categories"); // Log d'information en couleur
            
            const categories = await categoriesModel.getAll();
            APIResponse(response, categories, "OK");
        } catch (error: any) {
            logger.error(
                "Erreur lors de la récupération des categories: " +
                    error.message,
            );
            APIResponse(
                response,
                null,
                "Erreur lors de la récupération des categories",
                500,
            );
        }
    },
};

export default categoriesController;
