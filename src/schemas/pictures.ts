import { pgTable, uuid, varchar } from "drizzle-orm/pg-core";
import { users } from "./users";
import { vehicles } from "./vehicles";

export const pictures = pgTable("pictures", {
    id: uuid("id").defaultRandom().primaryKey(),
    src: varchar("src", { length: 255 }).notNull(),
    alt: varchar("alt", { length: 255 }).notNull(),
    usersId: uuid("id_users").references(() => users.id).notNull(),
    vehiclesId: uuid("id_vehicles").references(() => vehicles.id)
});