import { z } from "zod";

export const vehicleRegisterValidation = z.object({
    ownerId: z.string().uuid({ message: "ID propriétaire invalide" }),
    brand: z.string()
        .trim()
        .min(1, { message: "La marque est requise" })
        .max(100, { message: "La marque ne doit pas dépasser 100 caractères" }),
    model: z.string()
        .trim()
        .min(1, { message: "Le modèle est requis" })
        .max(100, { message: "Le modèle ne doit pas dépasser 100 caractères" }),
    mileage: z.number()
        .int()
        .min(0, { message: "Le kilométrage doit être positif" }),
    registrationDate: z.coerce.date({ required_error: "La date d'immatriculation est requise" }),
    registrationPlate: z.string()
        .trim()
        .length(7, { message: "La plaque d'immatriculation doit contenir 7 caractères" }),
    description: z.string()
        .trim()
        .max(500, { message: "La description ne doit pas dépasser 500 caractères" }),
    numberOfSeats: z.number()
        .int()
        .min(1, { message: "Le véhicule doit avoir au moins 1 siège" }),
    numberOfSleepingPlaces: z.number()
        .int()
        .min(0, { message: "Les places pour dormir doivent être un nombre valide" }),
    length: z.number()
        .min(1, { message: "La longueur doit être valide" })
        .max(9999, { message: "Valeur trop élevée" }),
    height: z.number()
        .min(1, { message: "La hauteur doit être valide" })
        .max(9999, { message: "Valeur trop élevée" }),
    weight: z.number()
        .min(1, { message: "Le poids doit être valide" })
        .max(999999, { message: "Valeur trop élevée" }),
    fuelType: z.enum(["diesel", "petrol", "electric", "hybrid", "other"], { message: "Type de carburant invalide" }),
    gearType: z.enum(["manual", "automatic"], { message: "Type de transmission invalide" }),
    consumption: z.number()
        .min(0, { message: "La consommation doit être un nombre positif" }),
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
    basePrice: z.number()
        .min(0, { message: "Le prix de base doit être valide" }),
    isAvailable: z.boolean().default(false)
});