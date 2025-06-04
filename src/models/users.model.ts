import { db } from "../config/pool";
import logger from "../utils/logger";
import { users } from "../schemas/users";
import { NewUser } from "../entities/user";
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
                phone_number: users.phone_number,
                password: users.password,
                created_at: users.created_at,
                driving_license: users.driving_license,
                address_number: users.address_number,
                address_street: users.address_street,
                address_city: users.address_city,
                address_zip: users.address_zip,
                address_country: users.address_country
            }).from(users);
        } catch (err: any) {
            logger.error(`Erreur lors de la récupération des utilisateurs: ${err.message}`);
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
                phone_number: users.phone_number,
                password: users.password,
                created_at: users.created_at,
                driving_license: users.driving_license,
                address_number: users.address_number,
                address_street: users.address_street,
                address_city: users.address_city,
                address_zip: users.address_zip,
                address_country: users.address_country
            }).from(users)
                .where(eq(users.id, id));
        } catch (err: any) {
            logger.error(`Erreur lors de la récupération de l'utilisateur: ${err.message}`);
            throw new Error("Impossible de récupérer l'utilisateur");
        }
    },

    findByCredentials: async (email: string) => {
        try {
            return await db.select({
                id: users.id,
                password: users.password,
                email: users.email
            }).from(users)
                .where(eq(users.email, email));
        } catch (err: any) {
            logger.error(`Erreur lors de la récupération de l'utilisateur: ${err.message}`);
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
                phone_number,
                password,
                created_at,
                driving_license,
                address_number,
                address_street,
                address_city,
                address_zip,
                address_country
            } = user;

            return await db.insert(users).values({
                firstname,
                lastname,
                birthdate,
                email,
                phone_number,
                password,
                created_at,
                driving_license,
                address_number,
                address_street,
                address_city,
                address_zip,
                address_country
            }).returning({ id: users.id });
        } catch (err: any) {
            logger.error(`Erreur lors de la création de l'utilisateur: ${err.message}`);
            throw new Error("Impossible de créer l'utilisateur");
        }
    },

    update: async (id: string, user: Partial<NewUser>) => {
        try {
            return await db.update(users).set(user).where(eq(users.id, id));
        } catch (err: any) {
            logger.error(`Erreur lors de la mise à jour de l'utilisateur: ${err.message}`);
            throw new Error("Impossible de mettre à jour l'utilisateur");
        }
    },

    delete: async (id: string) => {
        try {
            return await db.delete(users).where(eq(users.id, id));
        } catch (err: any) {
            logger.error(`Erreur lors de la suppression de l'utilisateur: ${err.message}`);
            throw new Error("Impossible de supprimer l'utilisateur");
        }
    }
};