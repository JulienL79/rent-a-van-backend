import { Request, Response } from "express";
import { APIResponse, logger } from "../utils";
import { categoriesModel } from "../models";
import { categoriesRegisterValidation } from "../validations";

const categoriesController = {
    get: async (request: Request, response: Response) => {
        try {
            const { id } = request.params;

            logger.info(`[GET] Récupérer la catégorie avec l'id: ${id}`);

            const category = await categoriesModel.get(id);
            if (!category) {
                logger.error("Catégorie inexistante");
                return APIResponse(response, null, "Categorie inexistante", 404);
            }
            APIResponse(response, category, "OK");
        } catch (error: any) {
            logger.error("Erreur lors de la récupération de la categorie: ", error);
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
            const { name } = categoriesRegisterValidation.parse(request.body);

            logger.info("[POST] Créer une categorie"); // Log d'information en couleur

            const category = await categoriesModel.create({
                name
            });
            APIResponse(response, category, "OK", 201);
        } catch (error: any) {
            logger.error("Erreur lors de la récupération de la categorie: ", error);
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

            logger.info(`[DELETE] Supprimer la catégorie avec l'id: ${id}`);

            const category = await categoriesModel.get(id);
            if (!category) {
                logger.error("Catégorie inexistante");
                return APIResponse(response, null, "Categorie inexistante", 404);
            }
            
            await categoriesModel.delete(id);
            APIResponse(response, null, "OK", 201);
        } catch (error: any) {
            logger.error("Erreur lors de la suppression de la categorie: ", error);
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

            logger.info(`[UPDATE] Modifier la catégorie avec l'id: ${id}`);

            const category = await categoriesModel.get(id);
            if (!category) {
                logger.error("Catégorie inexistante");
                return APIResponse(response, null, "Categorie inexistante", 404);
            }

            const { name } = categoriesRegisterValidation.parse(request.body);
            
            await categoriesModel.update(id, {
                name
            });
            APIResponse(response, null, "OK", 201);
        } catch (error: any) {
            logger.error("Erreur lors de la màj de la categorie: ", error);
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
            logger.error("Erreur lors de la récupération des categories: ", error);
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
