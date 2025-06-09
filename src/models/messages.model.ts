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
                .execute();
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
                .execute();
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
                        eq(messages.senderId, sender),
                    ),
                )
                .orderBy(desc(messages.createdAt))
                .execute();
        } catch (error: any) {
            logger.error(`Impossible de récupérer les messages: `, error);
            return [];
        }
    },
    getAllChatsByUser: async (userId: string) => {
        try {
            const userConversations = await db.execute(sql`
                SELECT DISTINCT 
                    CASE 
                        WHEN ${userId} = messages.id_sender THEN messages.id_receiver
                        ELSE messages.id_sender
                    END AS chat_user_id,
                    users.firstname AS chat_user_firstname,
                    users.lastname AS chat_user_lastname
                FROM messages
                LEFT JOIN users ON users.id = (
                    CASE 
                        WHEN ${userId} = messages.id_sender THEN messages.id_receiver
                        ELSE messages.id_sender
                    END
                )
                WHERE messages.id_sender = ${userId} OR messages.id_receiver = ${userId}
            `);

            const lastMessages = await db.execute(sql`
                SELECT messages.*
                FROM messages
                WHERE messages.created_at = (
                    SELECT MAX(sub_messages.created_at) 
                    FROM messages AS sub_messages
                    WHERE 
                        (sub_messages.id_sender = ${userId} AND sub_messages.id_receiver = messages.id_receiver) 
                        OR (sub_messages.id_receiver = ${userId} AND sub_messages.id_sender = messages.id_sender)
                )
                AND (messages.id_sender = ${userId} OR messages.id_receiver = ${userId})
                ORDER BY messages.created_at DESC
            `);

            const conversations = userConversations.rows.map(user => {
                const lastMessage = lastMessages.rows.find(msg => 
                    msg.id_sender === user.chat_user_id || msg.id_receiver === user.chat_user_id
                );

                return {
                    user: {
                        id: user.chat_user_id,
                        firstname: user.chat_user_firstname,
                        lastname: user.chat_user_lastname
                    },
                    last_message: lastMessage 
                        ? {
                            id: lastMessage.id,
                            content: lastMessage.content,
                            status: lastMessage.status,
                            createdAt: lastMessage.created_at,
                            isReceived: userId === lastMessage.id_receiver
                        }
                        : null // Si aucun message trouvé
                };
            });

            return conversations
        } catch (error: any) {
            logger.error(`Impossible de récupérer les conversations: `, error);
            return [];
        }
    },
    getAll: async () => {
        try {
            return await db.select()
                .from(messages)
                .execute();
        } catch (error: any) {
            logger.error(`Impossible de récupérer les messages: `, error);
            return [];
        }
    },
};
