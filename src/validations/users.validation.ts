import { z } from "zod";

export const userRegisterValidation = z.object({
    roleId: z.string().uuid({ message: "ID role invalide" }).optional(),
    firstname: z.string()
        .trim()
        .min(1, { message: "Le prénom est requis" })
        .max(255, { message: "Le prénom ne doit pas dépasser 255 caractères" }),
    lastname: z.string()
        .trim()
        .min(1, { message: "Le nom est requis" })
        .max(255, { message: "Le nom ne doit pas dépasser 255 caractères" }),
    birthdate: z.coerce.date({ required_error: "La date de naissance est requise" }),
    email: z.string()
        .trim()
        .email({ message: "Adresse email invalide" })
        .max(255, { message: "L'email ne doit pas dépasser 255 caractères" }),
    phoneNumber: z.string()
        .trim()
        .length(10, { message: "Le numéro de téléphone doit contenir exactement 10 chiffres" })
        .regex(/^\d{10}$/, { message: "Le numéro de téléphone doit être composé uniquement de chiffres" }),
    password: z.string()
        .trim()
        .min(6, { message: "Votre mot de passe doit contenir au moins 6 caractères"})
        .max(255, { message: "Le mot de passe ne doit pas dépasser 255 caractères" })
        .regex(/[0-9]/, { message: "Votre mot de passe doit contenir au moins un chiffre" })
        .regex(/[!@#$%^&*(),.?":{}|<>]/, { message: "Votre mot de passe doit contenir au moins un caractère spécial" }),
    confirmPassword: z.string()
        .trim()
        .min(6, { message: "Votre mot de passe doit contenir au moins 6 caractères"})
        .max(255, { message: "Le mot de passe ne doit pas dépasser 255 caractères" }),
    createdAt: z.coerce.date().optional(),
    drivingLicense: z.string()
        .trim()
        .max(255, { message: "Le permis de conduire ne doit pas dépasser 255 caractères" })
        .optional()
        .or(z.literal("").transform(() => undefined)),
    addressNumber: z.coerce.number()
        .int({ message: "Le numéro d'adresse doit être un entier" })
        .positive({ message: "Le numéro d'adresse doit être positif" })
        .optional(),
    addressStreet: z.string()
        .trim()
        .min(1, { message: "La rue est requise" })
        .max(255, { message: "La rue ne doit pas dépasser 255 caractères" }),
    addressCity: z.string()
        .trim()
        .min(1, { message: "La ville est requise" })
        .max(255, { message: "La ville ne doit pas dépasser 255 caractères" }),
    addressZip: z.string()
        .trim()
        .length(5, { message: "Le code postal doit contenir 5 caractères" }),
    addressCountry: z.string()
        .trim()
        .min(1, { message: "Le pays est requis" })
        .max(255, { message: "Le pays ne doit pas dépasser 255 caractères" }),
}).refine((data) => data.password === data.confirmPassword, {message: "Les mots de passe doivent être identiques."});

export const userUpdateValidation = z.object({
    firstname: z.string()
        .trim()
        .min(1, { message: "Le prénom est requis" })
        .max(255, { message: "Le prénom ne doit pas dépasser 255 caractères" }),
    lastname: z.string()
        .trim()
        .min(1, { message: "Le nom est requis" })
        .max(255, { message: "Le nom ne doit pas dépasser 255 caractères" }),
    birthdate: z.coerce.date({ required_error: "La date de naissance est requise" }),
    phoneNumber: z.string()
        .trim()
        .length(10, { message: "Le numéro de téléphone doit contenir exactement 10 chiffres" })
        .regex(/^\d{10}$/, { message: "Le numéro de téléphone doit être composé uniquement de chiffres" }),
    drivingLicense: z.string()
        .trim()
        .max(255, { message: "Le permis de conduire ne doit pas dépasser 255 caractères" })
        .optional()
        .or(z.literal("").transform(() => undefined)),
    addressNumber: z.coerce.number()
        .int({ message: "Le numéro d'adresse doit être un entier" })
        .positive({ message: "Le numéro d'adresse doit être positif" })
        .optional(),
    addressStreet: z.string()
        .trim()
        .min(1, { message: "La rue est requise" })
        .max(255, { message: "La rue ne doit pas dépasser 255 caractères" }),
    addressCity: z.string()
        .trim()
        .min(1, { message: "La ville est requise" })
        .max(255, { message: "La ville ne doit pas dépasser 255 caractères" }),
    addressZip: z.string()
        .trim()
        .length(5, { message: "Le code postal doit contenir 5 caractères" }),
    addressCountry: z.string()
        .trim()
        .min(1, { message: "Le pays est requis" })
        .max(255, { message: "Le pays ne doit pas dépasser 255 caractères" })
});

export const emailValidation = z.object({
    email: z.string()
        .trim()
        .email({ message: "Adresse email invalide" })
        .max(255, { message: "L'email ne doit pas dépasser 255 caractères" }),
});

export const updateCredentialsValidation = z.object({
    email: z.string()
        .trim()
        .email({ message: "Adresse email invalide" })
        .max(255, { message: "L'email ne doit pas dépasser 255 caractères" }),
    password: z.string()
        .trim()
        .min(6, { message: "Votre mot de passe doit contenir au moins 6 caractères"})
        .max(255, { message: "Le mot de passe ne doit pas dépasser 255 caractères" })
        .regex(/[0-9]/, { message: "Votre mot de passe doit contenir au moins un chiffre" })
        .regex(/[!@#$%^&*(),.?":{}|<>]/, { message: "Votre mot de passe doit contenir au moins un caractère spécial" })
        .optional(),
    confirmPassword: z.string()
        .trim()
        .min(6, { message: "Votre mot de passe doit contenir au moins 6 caractères"})
        .max(255, { message: "Le mot de passe ne doit pas dépasser 255 caractères" }),
    oldPassword: z.string()
        .trim()
        .min(6, { message: "Votre mot de passe doit contenir au moins 6 caractères"})
        .max(255, { message: "Le mot de passe ne doit pas dépasser 255 caractères" })
        .regex(/[0-9]/, { message: "Votre mot de passe doit contenir au moins un chiffre" })
        .regex(/[!@#$%^&*(),.?":{}|<>]/, { message: "Votre mot de passe doit contenir au moins un caractère spécial" })
}).refine((data) => data.password === data.confirmPassword, {message: "Les mots de passe doivent être identiques."});

export const resetPasswordValidation = z.object({
    password: z.string()
        .trim()
        .min(6, { message: "Votre mot de passe doit contenir au moins 6 caractères"})
        .max(255, { message: "Le mot de passe ne doit pas dépasser 255 caractères" })
        .regex(/[0-9]/, { message: "Votre mot de passe doit contenir au moins un chiffre" })
        .regex(/[!@#$%^&*(),.?":{}|<>]/, { message: "Votre mot de passe doit contenir au moins un caractère spécial" }),
    confirmPassword: z.string()
        .trim()
        .min(6, { message: "Votre mot de passe doit contenir au moins 6 caractères"})
        .max(255, { message: "Le mot de passe ne doit pas dépasser 255 caractères" }),
}).refine((data) => data.password === data.confirmPassword, {message: "Les mots de passe doivent être identiques."})