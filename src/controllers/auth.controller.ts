import { Request, Response } from "express";
import { env } from "../config/env";
import jwt from "jsonwebtoken";

import { APIResponse, logger, hashPassword, verifyPassword } from "../utils";
import { userModel } from "../models";

import { userRegisterValidation } from "../validations";
import { z } from "zod";
import { db } from "../config/pool";
import { roles } from "../schemas";
import { eq } from "drizzle-orm";

const { JWT_SECRET, NODE_ENV, ROLE_USER_ID } = env;

const authController = {
    login: async (request: Request, response: Response) => {
        try {
            logger.info("[AUTH] Login") // Log d'information en couleur

            const { email, password } = request.body;
            const [ user ] = await userModel.findByCredentials(email);
            if (!user) {
                return APIResponse(response, null, "Les identifiants saisis sont incorrects", 400);
            }

            // vérification mot de passe hashé
            const validPassword = await verifyPassword(password, user.password);
            if (!validPassword)
                return APIResponse(response, null, "Les identifiants saisis sont incorrects", 400);
            // En dessous, on admet que le mot de passe saisit est le bon !

            // generation du jwt
            const accessToken = jwt.sign({ id: user.id, firstName: user.firstname, lastName: user.lastname, tempTokenId: user.tempTokenId }, JWT_SECRET, { expiresIn: '1h' })

            response.cookie('accessToken', accessToken, {
                httpOnly: true, // true - cookie réservé uniquement pour communication HTTP - pas accessible en js
                sameSite: 'strict', // protection CSRF
                secure: NODE_ENV === "production" // le cookie ne sera envoyé que sur du HTTPS uniquement en prod
            });
            APIResponse(response, null, "Vous êtes bien connecté", 200);
        } catch (error: any) {
            logger.error("Erreur lors de la connexion de l'utilisateur:", error);
            APIResponse(response, null, "Erreur serveur", 500);
        }
    },
    register: async (request: Request, response: Response) => {
        try {
            logger.info("[AUTH] Register") // Log d'information en couleur
            const { firstname, lastname, birthdate, email, phoneNumber, password, createdAt, drivingLicense, addressNumber, addressStreet, addressCity, addressZip, addressCountry } = userRegisterValidation.parse(request.body);

            // on vérifie qu'un user n'a pas déjà cet adresse email
            const [ emailAlreadyExists ] = await userModel.findByCredentials(email);
            if (emailAlreadyExists) {
                logger.error("Cette adresse email est déjà utilisée")
                return APIResponse(response, null, "Cette adresse email est déjà utilisée", 400);
            }
            // on vérifie qu'un user n'a pas déjà ce numéro de téléphone
            const [ phoneNumberAlreadyExists ] = await userModel.findByPhoneNumber(phoneNumber)
            if (phoneNumberAlreadyExists) {
                logger.error("Ce numéro de téléphone est déjà utilisé")
                return APIResponse(response, null, "Ce numéro de téléphone est déjà utilisé", 400);
            }

            // On hash le mot de passe en clair du formulaire
            const hash = await hashPassword(password);
            if (!hash) {
                logger.error("Un problème est survenu lors du hash")
                return APIResponse(response, null, "Un problème est survenu lors du hash", 500);
            }

            const [role] = await db.select({ id: roles.id }).from(roles).where(eq(roles.name, "user"));

            // On ajoute le new user dans la db avec le mdp hashé
            const [ newUser ] = await userModel.create({ roleId: role.id, firstname, lastname, birthdate, email, phoneNumber, password: hash, createdAt, drivingLicense, addressNumber, addressStreet, addressCity, addressZip, addressCountry })
            if (!newUser) {
                logger.error("Un problème est survenu lors de la création");
                return APIResponse(response, null, "Un problème est survenu lors de la création", 500);
            }
                
            APIResponse(response, newUser.id, "Vous êtes inscrit", 200);
        } catch (error: any) {
            logger.error("Erreur lors de l'inscription de l'utilisateur:", error);
            if (error instanceof z.ZodError) {
                return APIResponse(response, error.errors, "Le formulaire est invalide", 400);
            }
            APIResponse(response, null, "Erreur serveur", 500);
        }
    },
    logout: async (request: Request, response: Response) => {
        logger.info("[AUTH] Logout") // Log d'information en couleur
        response.clearCookie("accessToken");
        APIResponse(response, null, "Vous êtes déconnecté", 200);
    },
}

export default authController