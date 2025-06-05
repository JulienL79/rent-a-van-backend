import { db } from "../config/pool";
import { NewRole } from "../entities";
import { roles } from "../schemas";
import logger from "../utils/logger";
import { and, eq } from "drizzle-orm";

export const rolesModel = {
    create: (role: NewRole) => {
        try {
            return db.insert(roles)
            .values(role)
            .returning({
                id: roles.id,
            })
            .execute();
        } catch (error: any) {
            logger.error("Impossible de créer le role:", error.message);
            throw new Error("Le role n'a pas pu être créée");
        }
    },
    delete: (id: string) => {
        try {
            return db.delete(roles)
            .where(eq(roles.id, id))
            .execute();
        } catch (err: any) {
            logger.error("Impossible de supprimer le role: ", err.message);
            throw new Error("Le role ne peut pas être supprimé");
        }
    },
    update: (id: string, role: Partial<NewRole>) => {
        try {
            return db.update(roles)
            .set(role)
            .where(eq(roles.id, id))
            .execute()
        } catch (err: any) {
            logger.error("Impossible d'update le role: +", err.message);
            throw new Error("Le role ne peut pas être màj");
        }
    },
    get: (id: string) => {
        try {
            return db.select({
                name: roles.name
            })
            .from(roles)
            .where(eq(roles.id, id))
            .execute()
        } catch (err: any) {
            logger.error("Impossible de récupérer le role: +", err.message);
            throw new Error("Le role ne peut pas être récupéré");
        }
    },
    getAll: () => {
        try {
            return db.select({
                name: roles.name
            })
            .from(roles)
            .execute()
        } catch (err: any) {
            logger.error(
                `Impossible de récupérer les roles: +`,
                err.message,
            );
            return [];
        }
    },
};
