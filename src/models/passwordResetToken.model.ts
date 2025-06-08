import { db } from "../config/pool";
import { NewPasswordResetToken } from "../entities";
import { passwordResetToken } from "../schemas";
import { logger } from "../utils";
import { eq, lt, or } from "drizzle-orm";

export const passwordResetTokenModel = {
    create: async (token: NewPasswordResetToken) => {
        try {
            return await db.insert(passwordResetToken)
            .values(token)
            .returning({
                id: passwordResetToken.id,
                token: passwordResetToken.token
            })
            .execute();
        } catch (error: any) {
            logger.error("Impossible de créer le token:", error);
            throw new Error("Le token n'a pas pu être créée");
        }
    },
    delete: async (id: string) => {
        try {
            return await db.delete(passwordResetToken)
            .where(eq(passwordResetToken.id, id))
            .execute();
        } catch (error: any) {
            logger.error("Impossible de supprimer le token: ", error);
            throw new Error("Le token ne peut pas être supprimé");
        }
    },
    update: async (id: string, token: Partial<NewPasswordResetToken>) => {
        try {
            return await db.update(passwordResetToken)
            .set(token)
            .where(eq(passwordResetToken.id, id))
            .execute()
        } catch (error: any) {
            logger.error("Impossible d'update le token: ", error);
            throw new Error("Le token ne peut pas être màj");
        }
    },
    getByToken: async (token: string) => {
        try {
            return await db.select({
                id: passwordResetToken.id,
                token: passwordResetToken.token,
                expiresAt: passwordResetToken.expiresAt,
                userId: passwordResetToken.userId,
                isUsed: passwordResetToken.isUsed
            })
            .from(passwordResetToken)
            .where(eq(passwordResetToken.token, token))
            .execute()
        } catch (error: any) {
            logger.error("Impossible de récupérer le token: ", error);
            throw new Error("Le token ne peut pas être récupéré");
        }
    },
    getAll: async () => {
        try {
            return await db.select({
                id: passwordResetToken.id,
                token: passwordResetToken.token,
                expiresAt: passwordResetToken.expiresAt,
                userId: passwordResetToken.userId,
                isUsed: passwordResetToken.isUsed
            })
            .from(passwordResetToken)
            .execute()
        } catch (error: any) {
            logger.error(`Impossible de récupérer les passwordResetToken: `, error);
            return [];
        }
    },
    deleteExpiredOrUsedTokens: async () => {
        try {
            return await db.delete(passwordResetToken)
                .where(
                    or(
                        lt(passwordResetToken.expiresAt, new Date()), // Supprime les tokens expirés
                        eq(passwordResetToken.isUsed, true) // Supprime les tokens déjà utilisés
                    )
                )
                .execute();
        } catch (error: any) {
            logger.error("Impossible de supprimer les tokens expirés ou utilisés: ", error);
            throw new Error("Les tokens ne peuvent pas être supprimés");
        }
    }
};
