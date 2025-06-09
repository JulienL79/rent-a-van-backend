import { z } from "zod";

export const messagesRegisterValidation = z.object({
    content: z.string()
        .trim()
        .max(500, { message: "La description ne doit pas dépasser 500 caractères" }),
    receiverId: z.string().uuid({ message: "ID propriétaire invalide" })
});

export const messagesUpdateValidation = z.object({
    content: z.string()
        .trim()
        .max(500, { message: "La description ne doit pas dépasser 500 caractères" })
        .optional(),
    status: z.enum(["delivered", "read"]).optional(),
});