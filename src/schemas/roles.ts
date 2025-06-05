import { pgEnum, pgTable, uuid } from "drizzle-orm/pg-core";

const nameEnum = pgEnum("name", ["admin", "user"])

export const roles = pgTable("roles", {
    id: uuid("id").defaultRandom().primaryKey(),
    name: nameEnum().notNull()
});