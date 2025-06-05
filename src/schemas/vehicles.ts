import { pgTable, varchar, uuid, timestamp, smallint, pgEnum, integer, numeric, boolean } from "drizzle-orm/pg-core";
import { users } from "./users";
import { categories } from "./categories";

const fuelTypeEnum = pgEnum("fuel_type", ["diesel", "petrol", "electric", "hybrid", "other"]);
const gearTypeEnum = pgEnum("gear_type", ["manual", "automatic"]);

export const vehicles = pgTable("vehicles", {
    id: uuid("id").defaultRandom().primaryKey(),
    userId: uuid("id_user").references(() => users.id, { onDelete: "cascade"}).notNull(),
    categoryId: uuid("id_category").references(() => categories.id).notNull(),
    brand: varchar("brand", { length: 100 }).notNull(),
    model: varchar("model", { length: 100 }).notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    mileage: varchar("mileage", { length: 100 }).notNull(),//integer("mileage").notNull(),
    registrationDate: timestamp("registration_date").notNull(),
    registrationPlate: varchar("registration_plate", { length: 7 }).notNull(),
    description: varchar("description", { length: 500 }).notNull(),
    numberOfSeats: varchar("number_of_seat", { length: 100 }).notNull(),//smallint("number_of_seat").notNull(),
    numberOfSleepingPlaces: varchar("number_of_sleeping_place", { length: 100 }).notNull(),//smallint("number_of_sleeping_place").notNull(),
    length: numeric("length", { precision: 10, scale: 2 }).notNull(),
    height: numeric("height", { precision: 10, scale: 2 }).notNull(),
    weight: numeric("weight", { precision: 10, scale: 2 }).notNull(),
    fuelType: fuelTypeEnum().notNull(),
    gearType: gearTypeEnum().notNull(),
    consumption: numeric("consumption", { precision: 5, scale: 2 }).notNull(),
    cityName: varchar("city_name", { length: 100 }).notNull(),
    cityCoordinates: varchar("city_coordinates", { length: 100 }).notNull(),
    insuranceNumber: varchar("insurance_number", { length: 100 }).notNull(),
    insuranceExpirationDate: timestamp("insurance_expiration_date").notNull(),
    basePrice: numeric("base_price", { precision: 10, scale: 2 }).notNull(),
    isAvailable: boolean("is_available").default(false).notNull()
});
