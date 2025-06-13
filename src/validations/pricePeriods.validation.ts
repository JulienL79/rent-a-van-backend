import { z } from "zod";

export const pricePeriodsRegisterValidation = z.object({
    name: z.string()
        .trim()
        .min(1, { message: "Le nom est requis" })
        .max(255, { message: "Le nom ne doit pas dépasser 255 caractères" }),
    coefficient: z.number()
        .min(0, { message: "Le coefficient doit être positif" })
        .max(1000, { message: "Le coefficient ne doit pas dépasser 1000%" })
        .refine(val => /^\d+(\.\d{1,2})?$/.test(val.toString()), { message: "Le coefficient doit avoir au moins deux décimales"})
        .transform((val) => val.toFixed(2)),
    startDate: z.coerce.date({ required_error: "La date de début est requise" }),
    endDate: z.coerce.date({ required_error: "La date de fin est requise" }),
    vehicleId: z.string()
        .uuid({ message: "L'ID véhicule est invalide" })
});

export const pricePeriodsUpdateValidation = z.object({
    name: z.string()
        .trim()
        .min(1, { message: "Le nom est requis" })
        .max(255, { message: "Le nom ne doit pas dépasser 255 caractères" }),
    coefficient: z.number()
        .min(0, { message: "Le coefficient doit être positif" })
        .max(1000, { message: "Le coefficient ne doit pas dépasser 1000%" })
        .refine(val => /^\d+(\.\d{1,2})?$/.test(val.toString()), { message: "Le coefficient doit avoir au moins deux décimales"})
        .transform((val) => val.toFixed(2)),
    startDate: z.coerce.date({ required_error: "La date de début est requise" }),
    endDate: z.coerce.date({ required_error: "La date de fin est requise" }),
});