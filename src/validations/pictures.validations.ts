import { z } from "zod";

export const pictureRegisterValidation = z.object({
    src: z.string()
        .trim()
        .url({ message: "L'URL de l'image est invalide" })
        .max(255, { message: "L'URL de l'image ne doit pas dépasser 255 caractères" }),
    alt: z.string()
        .trim()
        .min(1, { message: "Le texte alternatif est requis" })
        .max(255, { message: "Le texte alternatif ne doit pas dépasser 255 caractères" }),
    usersId: z.string()
        .uuid({ message: "L'ID utilisateur est invalide" }),
    vehiclesId: z.string()
        .uuid({ message: "L'ID véhicule est invalide" })
        .optional(),
});