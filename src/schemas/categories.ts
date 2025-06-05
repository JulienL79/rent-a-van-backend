import { pgEnum, pgTable, uuid, varchar } from "drizzle-orm/pg-core";

const nameEnum = pgEnum("name", ["van", "camping-car"])

export const categories = pgTable("categories", {
    id: uuid("id").defaultRandom().primaryKey(),
    name: nameEnum().notNull()
});