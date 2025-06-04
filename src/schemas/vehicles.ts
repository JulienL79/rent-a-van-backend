import { pgTable, varchar, uuid, timestamp, smallint, pgEnum, integer } from "drizzle-orm/pg-core";
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
    length: smallint("length").notNull(),
    height: smallint("height").notNull(),
    weigth: smallint("weight").notNull(),
    fuelType: fuelTypeEnum().notNull(),
    gearType: gearTypeEnum().notNull(),
    consumption: smallint("consumption").notNull(),
    cityName: varchar("city_name", { length: 100 }).notNull(),
    cityCoordinates: varchar("city_coordinates", { length: 100 }).notNull(),
    insuranceNumber: varchar("insurance_number", { length: 100 }).notNull(),
    insuranceExpirationDate: timestamp("insurance_expiration_date").notNull(),
    basePrice: smallint("base_price").notNull(),
});
