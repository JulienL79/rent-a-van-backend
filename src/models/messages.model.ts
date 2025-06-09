import { db } from "../config/pool";
import { NewMessage } from "../entities";
import { messages, users } from "../schemas";
import { logger } from "../utils";
import { and, desc, eq, or, sql } from "drizzle-orm";

export const messagesModel = {
    create: async (message: NewMessage) => {
        try {
            return await db.insert(messages)
            .values(message)
            .returning({
                id: messages.id,
            })
            .execute();
        } catch (error: any) {
            logger.error("Impossible de créer le message:", error);
            throw new Error("Le message n'a pas pu être créée");
        }
    },
    delete: async (id: string) => {
        try {
            return await db.delete(messages)
            .where(eq(messages.id, id))
            .execute();
        } catch (error: any) {
            logger.error("Impossible de supprimer le message: ", error);
            throw new Error("Le message ne peut pas être supprimé");
        }
    },
    update: async (id: string, message: Partial<NewMessage>) => {
        try {
            return await db.update(messages)
            .set(message)
            .where(eq(messages.id, id))
            .execute()
        } catch (error: any) {
            logger.error("Impossible d'update le message: ", error);
            throw new Error("Le message ne peut pas être màj");
        }
    },
    get: async (id: string) => {
        try {
            return await db.select()
            .from(messages)
            .where(eq(messages.id, id))
            .execute()
        } catch (error: any) {
            logger.error("Impossible de récupérer le message: ", error);
            throw new Error("Le message ne peut pas être récupéré");
        }
    },
    getAllFromChat: async (sender: string, receiver: string) => {
        try {
            return await db.select()
            .from(messages)
            .where(
                and(
                    eq(messages.receiverId, receiver),
                    eq(messages.senderId, sender)
                )
            )
            .orderBy(desc(messages.createdAt))
            .execute()
        } catch (error: any) {
            logger.error(`Impossible de récupérer les messages: `, error);
            return [];
        }
    },
    getAllChatsByUser: async (userId: string) => {
        try {
            const conversations = await db.execute(sql`
            SELECT DISTINCT ON (
                CASE
                WHEN ${userId} = messages.sender_id THEN messages.receiver_id
                ELSE messages.sender_id
                END
            )
                messages.id,
                messages.content,
                messages.step,
                messages.created_at,
                messages.sender_id,
                messages.receiver_id,
                users.firstname,
                users.lastname
            FROM messages
            INNER JOIN users ON users.id = (
                CASE
                WHEN ${userId} = messages.sender_id THEN messages.receiver_id
                ELSE messages.sender_id
                END
            )
            WHERE messages.sender_id = ${userId}
                OR messages.receiver_id = ${userId}
            ORDER BY 
                CASE
                WHEN ${userId} = messages.sender_id THEN messages.receiver_id
                ELSE messages.sender_id
                END,
                messages.created_at DESC
            `);
            return conversations;
        } catch (error: any) {
            logger.error(`Impossible de récupérer les conversations: `, error);
            return [];
        }
    },
    getAll: async () => {
        try {
            return await db.select()
            .from(messages)
            .execute()
        } catch (error: any) {
            logger.error(`Impossible de récupérer les messages: `, error);
            return [];
        }
    },
};
