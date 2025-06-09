import { z } from "zod";

export const vehiclesRegisterValidation = z.object({
    categoryId: z.string().uuid({ message: "ID catégorie invalide" }),
    brand: z.string()
        .trim()
        .min(1, { message: "La marque est requise" })
        .max(100, { message: "La marque ne doit pas dépasser 100 caractères" }),
    model: z.string()
        .trim()
        .min(1, { message: "Le modèle est requis" })
        .max(100, { message: "Le modèle ne doit pas dépasser 100 caractères" }),
    mileage: z.coerce.string(),
        // .int()
        // .min(0, { message: "Le kilométrage doit être positif" }),
    registrationDate: z.coerce.date({ required_error: "La date d'immatriculation est requise" }),
    registrationPlate: z.string()
        .trim()
        .length(7, { message: "La plaque d'immatriculation doit contenir 7 caractères" }),
    description: z.string()
        .trim()
        .max(500, { message: "La description ne doit pas dépasser 500 caractères" }),
    numberOfSeats: z.coerce.string(),
        // .int()
        // .min(1, { message: "Le véhicule doit avoir au moins 1 siège" }),
    numberOfSleepingPlaces: z.coerce.string(),
        // .int()
        // .min(0, { message: "Les places pour dormir doivent être un nombre valide" }),
    length: z.coerce.string()
        .refine((val) => !isNaN(parseFloat(val)), { message: "La longueur doit être un nombre valide" })
        .refine((val) => parseFloat(val) > 0, { message: "La longueur doit être supérieur à 0" })
        .refine((val) => parseFloat(val) < 1000, { message: "La longueur doit être inférieur à 100" }),
    height: z.coerce.string()
        .refine((val) => !isNaN(parseFloat(val)), { message: "La hauteur doit être un nombre valide" })
        .refine((val) => parseFloat(val) > 0, { message: "La hauteur doit être supérieur à 0" })
        .refine((val) => parseFloat(val) < 1000, { message: "Le poids doit être inférieur à 1000" }),
    weight: z.coerce.string()
        .refine((val) => !isNaN(parseFloat(val)), { message: "La consommation doit être un nombre valide" })
        .refine((val) => parseFloat(val) > 0, { message: "Le poids doit être supérieur à 0" })
        .refine((val) => parseFloat(val) < 999999, { message: "Le poids doit être inférieur à 9999999" }),
    fuelType: z.enum(["diesel", "petrol", "electric", "hybrid", "other"], { message: "Type de carburant invalide" }),
    gearType: z.enum(["manual", "automatic"], { message: "Type de transmission invalide" }),
    consumption: z.coerce.string()
        .refine((val) => !isNaN(parseFloat(val)), { message: "La consommation doit être un nombre valide" })
        .refine((val) => parseFloat(val) > 0, { message: "La consommation doit être supérieur à 0" }),
    cityName: z.string()
        .trim()
        .max(100, { message: "Le nom de la ville ne doit pas dépasser 100 caractères" }),
    cityCoordinates: z.string()
        .trim()
        .max(100, { message: "Les coordonnées de la ville ne doivent pas dépasser 100 caractères" }),
    insuranceNumber: z.string()
        .trim()
        .max(100, { message: "Le numéro d'assurance ne doit pas dépasser 100 caractères" }),
    insuranceExpirationDate: z.coerce.date({ required_error: "La date d'expiration de l'assurance est requise" }),
    basePrice: z.coerce.string()
        .refine((val) => !isNaN(parseFloat(val)), { message: "Le prix de base doit être un nombre valide" })
        .refine((val) => parseFloat(val) > 0, { message: "Le prix de base doit être supérieur à 0" }),
    isAvailable: z.boolean().default(false).optional()
});