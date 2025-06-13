import { pgTable, timestamp, uuid, varchar, numeric } from "drizzle-orm/pg-core";
import { vehicles } from "./vehicles";

export const pricePeriods = pgTable("price_periods", {
    id: uuid("id").defaultRandom().primaryKey(),
    name: varchar("name", { length: 255 }).notNull(),
    coefficient: numeric("coefficient", { precision: 6, scale: 4 }).notNull(),
    startDate: timestamp("start_date").notNull(),
    endDate: timestamp("end_date").notNull(),
    vehicleId: uuid("id_vehicles").references(() => vehicles.id).notNull()
});