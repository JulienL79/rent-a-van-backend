import { db } from "../config/pool";
import { logger } from "../utils";
import { users } from "../schemas";
import { NewUser } from "../entities";
import { eq } from "drizzle-orm";

export const userModel = {
    getAll: async () => {
        try {
            return await db.select({
                id: users.id,
                firstname: users.firstname,
                lastname: users.lastname,
                birthdate: users.birthdate,
                email: users.email,
                phoneNumber: users.phoneNumber,
                password: users.password,
                createdAt: users.createdAt,
                drivingLicense: users.drivingLicense,
                addressNumber: users.addressNumber,
                addressStreet: users.addressStreet,
                addressCity: users.addressCity,
                addressZip: users.addressZip,
                addressCountry: users.addressCountry,
            }).from(users);
        } catch (err: any) {
            logger.error(
                `Erreur lors de la récupération des utilisateurs: ${err.message}`,
            );
            throw new Error("Impossible de récupérer les utilisateurs");
        }
    },

    get: async (id: string) => {
        try {
            return await db.select({
                id: users.id,
                firstname: users.firstname,
                lastname: users.lastname,
                birthdate: users.birthdate,
                email: users.email,
                phoneNumber: users.phoneNumber,
                password: users.password,
                createdAt: users.createdAt,
                drivingLicense: users.drivingLicense,
                addressNumber: users.addressNumber,
                addressStreet: users.addressStreet,
                addressCity: users.addressCity,
                addressZip: users.addressZip,
                addressCountry: users.addressCountry,
            }).from(users)
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
            }).from(users)
                .where(eq(users.email, email));
        } catch (err: any) {
            logger.error(
                `Erreur lors de la récupération de l'utilisateur: ${err.message}`,
            );
            throw new Error("Impossible de récupérer l'utilisateur");
        }
    },

    create: async (user: NewUser) => {
        try {
            // On s'assure que tous les champs attendus sont bien présents
            const {
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
