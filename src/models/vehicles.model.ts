import { db } from "../config/pool";
import { NewVehicle } from "../entities";
import { vehicles, users, pictures } from "../schemas";
import logger from "../utils/logger";
import { and, eq } from "drizzle-orm";

export const vehiclesModel = {
    create: (vehicle: NewVehicle) => {
        try {
            return db.insert(vehicles).values(vehicle).returning({
                id: vehicles.id
            }).execute();
        } catch (error: any) {
            logger.error("Impossible de créer le véhicule:", error.message);
            throw new Error("Le véhicule n'a pas pu être créée");
        }
    },
    delete: (id: string, ownerId: string) => {
        try {
            return db.delete(vehicles).where(
                and(
                    eq(vehicles.id, id),
                    eq(vehicles.ownerId, ownerId)
                )
            )
        } catch (err: any) {
            logger.error("Impossible de supprimer le véhicule: +", err.message);
            throw new Error("Le véhicule ne peut pas être supprimé");
        }
    },
    update: (id: string, ownerId: string, vehicle: Partial<NewVehicle>) => {
        try {
            return db.update(vehicles).set(vehicle).where(
                and(
                    eq(vehicles.id, id),
                    eq(vehicles.ownerId, ownerId)
                )
            ).execute();
        } catch (err: any) {
            logger.error("Impossible d'update le véhicule: +", err.message);
            throw new Error("Le véhicule ne peut pas être màj");
        }
    },
    getAllByUser: (ownerId: string) => {
        try {
            return db.query.vehicles.findMany({
                where: eq(vehicles.ownerId, ownerId),
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
                    pictures: {
                        columns: {
                            id: true,
                            alt: true,
                            src: true
                        }
                    }
                }
            })
        } catch (err: any) {
            logger.error(`Impossible de récupérer les véhicules de ${ownerId}: +`, err.message);
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
                            src: true
                        }
                    },
                    user: {
                        columns: {
                            id: true,
                            firstName: true,
                            lastName: true
                        },
                        with: {
                            pictures: {
                                columns: {
                                    id: true,
                                    alt: true,
                                    src: true
                                }
                            }
                        }
                    }
                }
            })
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
                            firstName: true,
                            lastName: true
                        }
                    }
                }
            })
        } catch (err: any) {
            logger.error(`Impossible de récupérer les véhicules: +`, err.message);
            return [];
        }
    },
}