import { db } from "../config/pool";
import { logger } from "../utils";
import { roles, users } from "../schemas";
import { NewUser } from "../entities";
import { eq } from "drizzle-orm";

export const userModel = {
    getAll: async () => {
        try {
            return await db.query.users.findMany({
                columns: {
                    id: true,
                    firstname: true,
                    lastname: true,
                    birthdate: true,
                    email: true,
                    phoneNumber: true,
                    createdAt: true,
                    drivingLicense: true,
                    addressNumber: true,
                    addressStreet: true,
                    addressCity: true,
                    addressZip: true,
                    addressCountry: true,
                },
                with: {
                    vehicles: {
                        columns: {
                            id: true,
                            brand: true,
                            model: true,
                            registrationPlate: true,
                        },
                        with: {
                            category: {
                                columns: {
                                    name: true,
                                },
                            },
                        },
                    },
                    role: {
                        columns: {
                            name: true,
                        },
                    },
                    pictures: {
                        where: {
                            vehicleId: "",
                        },
                        columns: {
                            id: true,
                            src: true,
                            alt: true,
                        },
                    },
                },
            });
        } catch (err: any) {
            logger.error(
                `Erreur lors de la récupération des utilisateurs: ${err.message}`,
            );
            throw new Error("Impossible de récupérer les utilisateurs");
        }
    },
    get: async (id: string) => {
        try {
            return await db.query.users.findFirst({
                columns: {
                    id: true,
                    firstname: true,
                    lastname: true,
                    phoneNumber: true,
                    addressCity: true,
                    addressZip: true,
                },
                with: {
                    vehicles: {
                        columns: {
                            id: true,
                            brand: true,
                            model: true,
                            registrationDate: true,
                            isAvailable: true,
                        },
                        with: {
                            category: {
                                columns: {
                                    name: true,
                                },
                            },
                            pictures: {
                                columns: {
                                    id: true,
                                    alt: true,
                                    src: true,
                                },
                            },
                        },
                    },
                    pictures: {
                        where: {
                            vehicleId: "",
                        },
                        column: {
                            id: true,
                            src: true,
                            alt: true,
                        },
                    },
                },
            });
        } catch (err: any) {
            logger.error(
                `Erreur lors de la récupération de l'utilisateur: ${err.message}`,
            );
            throw new Error("Impossible de récupérer l'utilisateur");
        }
    },
    getDetails: async (id: string) => {
        try {
            return await db.query.users.findFirst({
                columns: {
                    id: true,
                    firstname: true,
                    lastname: true,
                    birthdate: true,
                    email: true,
                    phoneNumber: true,
                    createdAt: true,
                    drivingLicense: true,
                    addressNumber: true,
                    addressStreet: true,
                    addressCity: true,
                    addressZip: true,
                    addressCountry: true,
                },
                with: {
                    vehicles: {
                        columns: {
                            id: true,
                            brand: true,
                            model: true,
                            registrationPlate: true,
                        },
                        with: {
                            category: {
                                columns: {
                                    name: true,
                                },
                            },
                            pictures: {
                                columns: {
                                    id: true,
                                    alt: true,
                                    src: true,
                                },
                            },
                        },
                    },
                    role: {
                        columns: {
                            name: true,
                        },
                    },
                    pictures: {
                        where: {
                            vehicleId: "",
                        },
                        column: {
                            id: true,
                            src: true,
                            alt: true,
                        },
                    },
                },
            });
        } catch (err: any) {
            logger.error(
                `Erreur lors de la récupération de l'utilisateur: ${err.message}`,
            );
            throw new Error("Impossible de récupérer l'utilisateur");
        }
    },
    getCredentials: async (id: string) => {
        try {
            return await db.select({
                password: users.password,
            })
                .from(users)
                .where(eq(users.id, id));
        } catch (err: any) {
            logger.error(
                `Erreur lors de la récupération de l'utilisateur: ${err.message}`,
            );
            throw new Error("Impossible de récupérer l'utilisateur");
        }
    },
    findByCredentials: async (email: string) => {
        try {
            return await db.select({
                id: users.id,
                password: users.password,
                email: users.email,
                firstname: users.firstname,
                lastname: users.lastname,
            })
                .from(users)
                .where(eq(users.email, email));
        } catch (err: any) {
            logger.error(
                `Erreur lors de la récupération de l'utilisateur: ${err.message}`,
            );
            throw new Error("Impossible de récupérer l'utilisateur");
        }
    },
    getRole: async (id: string) => {
        try {
            return await db.select({
                role: {
                    name: roles.name,
                },
            }).from(users)
                .leftJoin(roles, eq(users.roleId, roles.id))
                .where(eq(users.id, id))
                .execute();
        } catch (err: any) {
            logger.error(
                `Erreur lors de la récupération du rôle de l'utilisateur ${id}: ${err.message}`,
            );
            throw new Error(
                `Impossible de récupérer le rôle de l'utilisateur ${id}`,
            );
        }
    },
    create: async (user: NewUser) => {
        try {
            const {
                roleId,
                firstname,
                lastname,
                birthdate,
                email,
                phoneNumber,
                password,
                createdAt,
                drivingLicense,
                addressNumber,
                addressStreet,
                addressCity,
                addressZip,
                addressCountry,
            } = user;

            return await db.insert(users).values({
                roleId,
                firstname,
                lastname,
                birthdate,
                email,
                phoneNumber,
                password,
                createdAt,
                drivingLicense,
                addressNumber,
                addressStreet,
                addressCity,
                addressZip,
                addressCountry,
            }).returning({ id: users.id });
        } catch (err: any) {
            logger.error(
                `Erreur lors de la création de l'utilisateur: ${err.message}`,
            );
            throw new Error("Impossible de créer l'utilisateur");
        }
    },

    update: async (id: string, user: Partial<NewUser>) => {
        try {
            return await db.update(users).set(user).where(eq(users.id, id));
        } catch (err: any) {
            logger.error(
                `Erreur lors de la mise à jour de l'utilisateur: ${err.message}`,
            );
            throw new Error("Impossible de mettre à jour l'utilisateur");
        }
    },

    delete: async (id: string) => {
        try {
            return await db.delete(users).where(eq(users.id, id));
        } catch (err: any) {
            logger.error(
                `Erreur lors de la suppression de l'utilisateur: ${err.message}`,
            );
            throw new Error("Impossible de supprimer l'utilisateur");
        }
    },
};
