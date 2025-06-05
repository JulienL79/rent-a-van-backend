import { db } from "../config/pool";
import { NewCategory } from "../entities";
import { categories } from "../schemas";
import logger from "../utils/logger";
import { and, eq } from "drizzle-orm";

export const categoriesModel = {
    create: (category: NewCategory) => {
        try {
            return db.insert(categories)
            .values(category)
            .returning({
                id: categories.id,
            })
            .execute();
        } catch (error: any) {
            logger.error("Impossible de créer la catégorie:", error.message);
            throw new Error("La catégorie n'a pas pu être créée");
        }
    },
    delete: (id: string) => {
        try {
            return db.delete(categories)
            .where(eq(categories.id, id))
            .execute();
        } catch (err: any) {
            logger.error("Impossible de supprimer la catégorie: ", err.message);
            throw new Error("La catégorie ne peut pas être supprimé");
        }
    },
    update: (id: string, category: Partial<NewCategory>) => {
        try {
            return db.update(categories)
            .set(category)
            .where(eq(categories.id, id))
            .execute()
        } catch (err: any) {
            logger.error("Impossible d'update la catégorie: +", err.message);
            throw new Error("La catégorie ne peut pas être màj");
        }
    },
    get: (id: string) => {
        try {
            return db.select({
                name: categories.name
            })
            .from(categories)
            .where(eq(categories.id, id))
            .execute()
        } catch (err: any) {
            logger.error("Impossible de récupérer la catégorie: +", err.message);
            throw new Error("La catégorie ne peut pas être récupéré");
        }
    },
    getAll: () => {
        try {
            return db.select({
                name: categories.name
            })
            .from(categories)
            .execute()
        } catch (err: any) {
            logger.error(
                `Impossible de récupérer les categories: +`,
                err.message,
            );
            return [];
        }
    },
};
