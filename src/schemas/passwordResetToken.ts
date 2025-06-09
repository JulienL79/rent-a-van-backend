import { boolean, pgTable, timestamp, uuid } from "drizzle-orm/pg-core";
import { users } from "./users";

export const passwordResetToken = pgTable("password_reset_token", {
    id: uuid("id").defaultRandom().primaryKey(),
    token: uuid("token").defaultRandom().notNull().unique(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    expiresAt: timestamp("expires_at").notNull(),
    userId: uuid("id_users").references(() => users.id, { onDelete: "cascade" }).notNull(),
    isUsed: boolean("isUsed").default(false).notNull()
});