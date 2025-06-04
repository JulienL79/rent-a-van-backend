import { db } from "../config/pool";
import { NewPicture } from "../entities";
import { pictures } from "../schemas";
import logger from "../utils/logger";
import { and, eq } from "drizzle-orm";

export const picturesModel = {
    create: (picture: NewPicture) => {
        try {
            return db.insert(pictures).values(picture).returning({
                id: pictures.id,
            }).execute();
        } catch (error: any) {
            logger.error("Impossible de créer l'image:", error.message);
            throw new Error("L'image n'a pas pu être créée");
        }
    },
    delete: (id: string, userId: string, isAdmin: boolean) => {
        try {
            const query = isAdmin
                ? db.delete(pictures).where(eq(pictures.id, id)) // Supprime sans condition sur vehicleId
                : db.delete(pictures).where(
                    and(eq(pictures.id, id), eq(pictures.usersId, userId)),
                ); // Vérifie le propriétaire

            return query.execute();
        } catch (err: any) {
            logger.error("Impossible de supprimer l'image: ", err.message);
            throw new Error("L'image ne peut pas être supprimé");
        }
    },
    update: (id: string, userId: string, isAdmin: boolean, picture: Partial<NewPicture>) => {
        try {
            const query = isAdmin
                ? db.update(pictures).set(picture).where(eq(pictures.id, id))
                : db.update(pictures).set(picture).where(
                and(eq(pictures.id, id), eq(pictures.usersId, userId)))

            return query.execute()
        } catch (err: any) {
            logger.error("Impossible d'update l'image: +", err.message);
            throw new Error("L'image ne peut pas être màj");
        }
    },
    getAllByVehicles: (vehicleId: string) => {
        try {
            return db.select({
                id: pictures.id,
                alt: pictures.alt,
                src: pictures.src
            })
            .from(pictures)
            .where(eq(pictures.vehiclesId, vehicleId))
            .execute()
        } catch (err: any) {
            logger.error(
                `Impossible de récupérer les images de ${vehicleId}: +`,
                err.message,
            );
            return [];
        }
    },
    get: (id: string) => {
        try {
            return db.select({
                id: pictures.id,
                alt: pictures.alt,
                src: pictures.src
            })
            .from(pictures)
            .where(eq(pictures.id, id))
            .execute()
        } catch (err: any) {
            logger.error("Impossible de récupérer l'image: +", err.message);
            throw new Error("L'image ne peut pas être récupéré");
        }
    },
    getAll: () => {
        try {
            return db.select({
                id: pictures.id,
                alt: pictures.alt,
                src: pictures.src,
                vehiclesId: pictures.vehiclesId,
                usersId: pictures.usersId
            })
            .from(pictures)
            .execute()
        } catch (err: any) {
            logger.error(
                `Impossible de récupérer les images: +`,
                err.message,
            );
            return [];
        }
    },
};
