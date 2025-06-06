import { db } from "../config/pool";
import { NewPicture } from "../entities";
import { pictures } from "../schemas";
import { logger } from "../utils";
import { and, eq } from "drizzle-orm";

export const picturesModel = {
    create: async (picture: NewPicture) => {
        try {
            return await db.insert(pictures).values(picture).returning({
                id: pictures.id,
            }).execute();
        } catch (error: any) {
            logger.error("Impossible de créer l'image: ", error);
            throw new Error("L'image n'a pas pu être créée");
        }
    },
    delete: async (id: string) => {
        try {
            return await db.delete(pictures).where(eq(pictures.id, id)).execute();
        } catch (error: any) {
            logger.error("Impossible de supprimer l'image: ", error);
            throw new Error("L'image ne peut pas être supprimé");
        }
    },
    getAllByVehicle: async (vehicleId: string) => {
        try {
            return await db.select({
                id: pictures.id,
                alt: pictures.alt,
                src: pictures.src
            })
            .from(pictures)
            .where(eq(pictures.vehicleId, vehicleId))
            .execute()
        } catch (error: any) {
            logger.error(`Impossible de récupérer les images de ${vehicleId}: `, error);
            return [];
        }
    },
    get: async (id: string) => {
        try {
            return await db.select({
                id: pictures.id,
                alt: pictures.alt,
                src: pictures.src
            })
            .from(pictures)
            .where(eq(pictures.id, id))
            .execute()
        } catch (error: any) {
            logger.error("Impossible de récupérer l'image: ", error);
            throw new Error("L'image ne peut pas être récupéré");
        }
    },
    getAll: async () => {
        try {
            return await db.select({
                id: pictures.id,
                alt: pictures.alt,
                src: pictures.src,
                vehicleId: pictures.vehicleId,
                userId: pictures.userId
            })
            .from(pictures)
            .execute()
        } catch (error: any) {
            logger.error(`Impossible de récupérer les images: `, error);
            return [];
        }
    },
};
