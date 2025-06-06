import { db } from "../config/pool";
import { NewCategory } from "../entities";
import { categories } from "../schemas";
import { logger } from "../utils";
import { eq } from "drizzle-orm";

export const categoriesModel = {
    create: async (category: NewCategory) => {
        try {
            return await db.insert(categories)
            .values(category)
            .returning({
                id: categories.id,
            })
            .execute();
        } catch (error: any) {
            logger.error("Impossible de créer la catégorie:", error);
            throw new Error("La catégorie n'a pas pu être créée");
        }
    },
    delete: async (id: string) => {
        try {
            return await db.delete(categories)
            .where(eq(categories.id, id))
            .execute();
        } catch (error: any) {
            logger.error("Impossible de supprimer la catégorie: ", error);
            throw new Error("La catégorie ne peut pas être supprimé");
        }
    },
    update: async (id: string, category: Partial<NewCategory>) => {
        try {
            return await db.update(categories)
            .set(category)
            .where(eq(categories.id, id))
            .execute()
        } catch (error: any) {
            logger.error("Impossible d'update la catégorie: ", error);
            throw new Error("La catégorie ne peut pas être màj");
        }
    },
    get: async (id: string) => {
        try {
            return await db.select({
                name: categories.name
            })
            .from(categories)
            .where(eq(categories.id, id))
            .execute()
        } catch (error: any) {
            logger.error("Impossible de récupérer la catégorie: ", error);
            throw new Error("La catégorie ne peut pas être récupéré");
        }
    },
    getAll: async () => {
        try {
            return await db.select({
                name: categories.name
            })
            .from(categories)
            .execute()
        } catch (error: any) {
            logger.error(`Impossible de récupérer les categories: `, error);
            return [];
        }
    },
};
