import { db } from "../config/pool";
import { NewVehicle } from "../entities";
import { vehicles } from "../schemas";
import { logger } from "../utils";
import { and, eq } from "drizzle-orm";

export const vehiclesModel = {
    create: (vehicle: NewVehicle) => {
        try {
            return db.insert(vehicles).values(vehicle).returning({
                id: vehicles.id,
            }).execute();
        } catch (error: any) {
            logger.error("Impossible de créer le véhicule:", error.message);
            throw new Error("Le véhicule n'a pas pu être créée");
        }
    },
    delete: (id: string) => {
        try {
            return db.delete(vehicles).where(eq(vehicles.id, id)).execute();
        } catch (err: any) {
            logger.error("Impossible de supprimer le véhicule: ", err.message);
            throw new Error("Le véhicule ne peut pas être supprimé");
        }
    },
    update: (id: string, vehicle: Partial<NewVehicle>) => {
        try {
            return db.update(vehicles).set(vehicle).where(eq(vehicles.id, id)).execute()
        } catch (err: any) {
            logger.error("Impossible d'update le véhicule: +", err.message);
            throw new Error("Le véhicule ne peut pas être màj");
        }
    },
    getAllByUser: (userId: string) => {
        try {
            return db.query.vehicles.findMany({
                where: eq(vehicles.userId, userId),
                columns: {
                    id: true,
                    brand: true,
                    model: true,
                    registrationDate: true,
                    cityName: true,
                    basePrice: true,
                    isAvailable: true,
                },
                with: {
                    pictures: {
                        columns: {
                            id: true,
                            alt: true,
                            src: true,
                        },
                    },
                },
            });
        } catch (err: any) {
            logger.error(
                `Impossible de récupérer les véhicules de ${userId}: +`,
                err.message,
            );
            return [];
        }
    },
    get: (id: string) => {
        try {
            return db.query.vehicles.findFirst({
                where: eq(vehicles.id, id),
                with: {
                    pictures: {
                        columns: {
                            id: true,
                            alt: true,
                            src: true,
                        },
                    },
                    user: {
                        columns: {
                            id: true,
                            firstname: true,
                            lastname: true,
                        },
                        with: {
                            pictures: {
                                columns: {
                                    id: true,
                                    alt: true,
                                    src: true,
                                },
                            },
                        },
                    },
                },
            });
        } catch (err: any) {
            logger.error("Impossible de récupérer le véhicule: +", err.message);
            throw new Error("Le véhicule ne peut pas être récupéré");
        }
    },
    getAll: () => {
        try {
            return db.query.vehicles.findMany({
                columns: {
                    id: true,
                    brand: true,
                    model: true,
                    registrationDate: true,
                    registrationPlate: true,
                    cityName: true,
                    basePrice: true,
                    isAvailable: true,
                },
                with: {
                    user: {
                        columns: {
                            id: true,
                            firstname: true,
                            lastname: true,
                        },
                    },
                },
            });
        } catch (err: any) {
            logger.error(
                `Impossible de récupérer les véhicules: +`,
                err.message,
            );
            return [];
        }
    },
};
