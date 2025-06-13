import { pgTable, uuid, varchar, timestamp, boolean, pgEnum } from "drizzle-orm/pg-core";
import { users } from "./";

const step = pgEnum("status", ["sent", "delivered", "read"]);

export const messages = pgTable("messages", {
    id: uuid("id").defaultRandom().primaryKey(),
    content: varchar("content", { length: 500 }).notNull(),
    senderId: uuid("id_sender").references(() => users.id, { onDelete: "set null"}),
    receiverId: uuid("id_receiver").references(() => users.id, { onDelete: "set null"}),
    messageLinked: uuid("message_linked"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    isEdited: boolean("is_edited").default(false).notNull(),
    updatedAt: timestamp("updated_at"),
    status: step().default("sent").notNull()
});