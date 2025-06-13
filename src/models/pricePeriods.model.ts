import { db } from "../config/pool";
import { NewPricePeriod } from "../entities";
import { pricePeriods } from "../schemas";
import { logger } from "../utils";
import { and, or, lte, gte, eq } from "drizzle-orm";

export const pricePeriodsModel = {

    create: async (pricePeriod: NewPricePeriod) => {
        try {
            // Vérifie s'il existe déjà une période qui chevauche
            const overlaps = await db.select()
                .from(pricePeriods)
                .where(
                    and(
                        eq(pricePeriods.vehicleId, pricePeriod.vehicleId),
                        or(
                            and(
                                lte(pricePeriods.startDate, pricePeriod.startDate),
                                gte(pricePeriods.endDate, pricePeriod.startDate)
                            ),
                            and(
                                lte(pricePeriods.startDate, pricePeriod.endDate),
                                gte(pricePeriods.endDate, pricePeriod.endDate)
                            ),
                            and(
                                gte(pricePeriods.startDate, pricePeriod.startDate),
                                lte(pricePeriods.endDate, pricePeriod.endDate)
                            )
                        )
                    )
                )
                .execute();

            if (overlaps.length > 0) {
                throw new Error("Un coefficient saisonnier existe déjà pour une période chevauchante.");
            }

            // Pas de chevauchement : insertion
            return await db.insert(pricePeriods)
                .values(pricePeriod)
                .returning({ id: pricePeriods.id })
                .execute();

        } catch (error: any) {
            logger.error("Impossible de créer le coefficient saisonnier:", error);
            throw new Error("Le coefficient saisonnier n'a pas pu être créé.");
        }
    },
    delete: async (id: string) => {
        try {
            return await db.delete(pricePeriods)
            .where(eq(pricePeriods.id, id))
            .execute();
        } catch (error: any) {
            logger.error("Impossible de supprimer le coefficient saisonnier: ", error);
            throw new Error("Le coefficient saisonnier ne peut pas être supprimé");
        }
    },
    update: async (id: string, pricePeriod: Partial<NewPricePeriod>) => {
        try {
            return await db.update(pricePeriods)
            .set(pricePeriod)
            .where(eq(pricePeriods.id, id))
            .execute()
        } catch (error: any) {
            logger.error("Impossible d'update le coefficient saisonnier: ", error);
            throw new Error("Le coefficient saisonnier ne peut pas être màj");
        }
    },
    get: async (id: string) => {
        try {
            return await db.select({
                name: pricePeriods.name
            })
            .from(pricePeriods)
            .where(eq(pricePeriods.id, id))
            .execute()
        } catch (error: any) {
            logger.error("Impossible de récupérer le coefficient saisonnier: ", error);
            throw new Error("Le coefficient saisonnier ne peut pas être récupéré");
        }
    },
    getAll: async () => {
        try {
            return await db.select({
                name: pricePeriods.name
            })
            .from(pricePeriods)
            .execute()
        } catch (error: any) {
            logger.error(`Impossible de récupérer les pricePeriods: `, error);
            return [];
        }
    },
    getByVehicleId: async (vehicleId: string) => {
        try {
            return await db.select()
                .from(pricePeriods)
                .where(eq(pricePeriods.vehicleId, vehicleId))
                .execute();
        } catch (error: any) {
            logger.error("Impossible de récupérer les coefficients pour ce véhicule :", error);
            throw new Error("Les périodes de prix n'ont pas pu être récupérées.");
        }
    },
    getByVehicleAndDate: async (vehicleId: string, date: Date) => {
        try {
            return await db.select()
                .from(pricePeriods)
                .where(and(
                    eq(pricePeriods.vehicleId, vehicleId),
                    lte(pricePeriods.startDate, date),
                    gte(pricePeriods.endDate, date)
                ))
                .limit(1)
                .execute();
        } catch (error: any) {
            logger.error("Erreur lors de la récupération de la période par date et véhicule :", error);
            throw new Error("Impossible de trouver la période de prix correspondant.");
        }
    }
};
