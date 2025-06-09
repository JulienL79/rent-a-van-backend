import { pgTable, uuid, varchar, timestamp, boolean, pgEnum } from "drizzle-orm/pg-core";
import { users } from "./";

const step = pgEnum("step", ["sent", "delivered", "read"]);

export const messages = pgTable("messages", {
    id: uuid("id").defaultRandom().primaryKey(),
    content: varchar("content", { length: 500 }).notNull(),
    senderId: uuid("id_sender").references(() => users.id, { onDelete: "set null"}),
    receiverId: uuid("id_receiver").references(() => users.id, { onDelete: "set null"}),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at"),
    step: step().default("sent").notNull()
});