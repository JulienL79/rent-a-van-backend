
import { pgTable, uuid, varchar, timestamp, smallint } from "drizzle-orm/pg-core";

// ici users est un schéma de la table users, qui aura 3 colonnes
export const users = pgTable("users", {
    id: uuid("id").defaultRandom().primaryKey(), // On précise la colonne id, qui sera un uuid avec une valeur par défaut aléatoire et qui sera la primary key de la table
    firstname: varchar("firstname", { length: 255 }).notNull(), // On précise la colonne firstname qui est un varchar de taille 255 et non nul
    lastname: varchar("lastname", { length: 255 }).notNull(), // On précise la colonne lastname qui est un varchar de taille 255 et non nul
    birthdate: timestamp("birthdate").notNull(), // On précise la colonne birthdate qui est un timestamp non nul
    email: varchar("email", { length: 255 }).notNull().unique(), // On précise la email username qui est un varchar de taille 255, non nul ett unique
    phoneNumber: varchar("phone_number", { length: 20 }).notNull(), // On précise la colonne phone_number qui est un varchar de taille 20 et non nul
    password: varchar("password", { length: 255 }).notNull().unique(), // On précise la colonne password qui est un varchar de taille 255 et non nul
    createdAt: timestamp("created_at").defaultNow(), // On précise la colonne created_at qui est un timestamp avec une valeur par défaut à l'heure actuelle
    drivingLicense: varchar("driving_license", { length: 255 }), // On précise la colonne driving_license qui est un varchar de taille 255
    addressNumber: smallint("address_number"), // On précise la colonne address_number qui est un smallint de taille 20*
    addressStreet: varchar("address_street", { length: 255 }).notNull(), // On précise la colonne address_street qui est un varchar de taille 255 non nul
    addressCity: varchar("address_city", { length: 255 }).notNull(), // On précise la colonne address_city qui est un varchar de taille 255 non nul
    addressZip: varchar("address_zip", { length: 5 }).notNull(), // On précise la colonne address_zip qui est un varchar de taille 5 non nul
    addressCountry: varchar("address_country", { length: 255 }).notNull() // On précise la colonne address_country qui est un varchar de taille 255 non nul
})