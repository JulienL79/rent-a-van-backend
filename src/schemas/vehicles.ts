import { pgTable, varchar, uuid, timestamp, smallint, pgEnum, integer, numeric, boolean } from "drizzle-orm/pg-core";
import { users } from "./users";

const fuelTypeEnum = pgEnum("fuel_type", ["diesel", "petrol", "electric", "hybrid", "other"]);
const gearTypeEnum = pgEnum("gear_type", ["manual", "automatic"]);

export const vehicles = pgTable("vehicles", {
    id: uuid("id").defaultRandom().primaryKey(),
    ownerId: uuid("id_owner").references(() => users.id, { onDelete: "cascade"}).notNull(),
    brand: varchar("brand", { length: 100 }).notNull(),
    model: varchar("model", { length: 100 }).notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    mileage: integer("mileage").notNull(),
    registrationDate: timestamp("registration_date").notNull(),
    registrationPlate: varchar("registration_plate", { length: 7 }).notNull(),
    description: varchar("description", { length: 500 }).notNull(),
    numberOfSeats: smallint("number_of_seat").notNull(),
    numberOfSleepingPlaces: smallint("number_of_sleeping_place").notNull(),
    length: numeric("length", { precision: 4, scale: 2 }).notNull(),
    height: numeric("height", { precision: 4, scale: 2 }).notNull(),
    weight: numeric("weight", { precision: 10, scale: 2 }).notNull(),
    fuelType: fuelTypeEnum().notNull(),
    gearType: gearTypeEnum().notNull(),
    consumption: numeric("consumption", { precision: 5, scale: 2 }).notNull(),
    cityName: varchar("city_name", { length: 100 }).notNull(),
    cityCoordinates: varchar("city_coordinates", { length: 100 }).notNull(),
    insuranceNumber: varchar("insurance_number", { length: 100 }).notNull(),
    insuranceExpirationDate: timestamp("insurance_expiration_date").notNull(),
    basePrice: numeric("base_price", { precision: 10, scale: 2 }).notNull(),
    isAvailable: boolean("is_available").default(false)
});
