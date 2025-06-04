import { Request, Response } from "express";
import { env } from "../config/env";
import jwt from "jsonwebtoken";

import { APIResponse } from "../utils/response";
import logger from "../utils/logger";
import { userModel } from "../models/users.model";
import { hashPassword, verifyPassword } from "../utils/password";

import { userRegisterValidation } from "../validations/users.validations";
import { z } from "zod";

const { JWT_SECRET, NODE_ENV } = env;

const authController = {
    login: async (request: Request, response: Response) => {
        try {
            const { email, password } = request.body;
            const [ user ] = await userModel.findByCredentials(email);
            if (!user) {
                return APIResponse(response, null, "Les identifiants saisits sont incorrects", 400);
            }

            const validPassword = await verifyPassword(user.password, password);
            if (!validPassword)
                return APIResponse(response, null, "Les identifiants saisits sont incorrects", 400);

            // vérification mot de passe hashé
            // En dessous, on admet que le mot de passe saisit est le bon !

            // generation du jwt
            const accessToken = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: '1h' })

            response.cookie('accessToken', accessToken, {
                httpOnly: true, // true - cookie réservé uniquement pour communication HTTP - pas accessible en js
                sameSite: 'strict', // protection CSRF
                secure: NODE_ENV === "production" // le cookie ne sera envoyé que sur du HTTPS uniquement en prod
            });
            APIResponse(response, null, "Vous êtes bien connecté", 200);
        } catch (err: any) {
            logger.error(`Erreur lors de la connexion de l'utilisateur: ${err.message}`);
            APIResponse(response, null, "Erreur serveur", 500);
        }
    },
    register: async (request: Request, response: Response) => {
        try {
            const { firstname, lastname, birthdate, email, phoneNumber, password, createdAt, drivingLicense, addressNumber, addressStreet, addressCity, addressZip, addressCountry } = userRegisterValidation.parse(request.body);

            // on vérifie qu'un user n'a pas déjà cet adresse email
            const [ emailAlreadyExists ] = await userModel.findByCredentials(email);
            if (emailAlreadyExists) {
                return APIResponse(response, null, "Cette adresse email est déjà utilisée", 400);
            }

            // On hash le mot de passe en clair du formulaire
            const hash = await hashPassword(password);
            if (!hash) {
                // erreur lors du hash => réponse api erreur
                return APIResponse(response, null, "Un problème est survenu lors du hash", 500);
            }

            // On ajoute le new user dans la db avec le mdp hashé
            const [ newUser ] = await userModel.create({ firstname, lastname, birthdate, email, phoneNumber, password: hash, createdAt, drivingLicense, addressNumber, addressStreet, addressCity, addressZip, addressCountry })
            if (!newUser)
                return APIResponse(response, null, "Un problème est survenu", 500);
            APIResponse(response, newUser.id, "Vous êtes inscrit", 200);
        } catch (err: any) {
            logger.error(`Erreur lors de l'inscription de l'utilisateur: ${err.message}`)
            if (err instanceof z.ZodError) {
                return APIResponse(response, err.errors, "Le formulaire est invalide", 400);
            }
            APIResponse(response, null, "Erreur serveur", 500);
        }
    },
    logout: async (request: Request, response: Response) => {
        response.clearCookie("accessToken");
        APIResponse(response, null, "Vous êtes déconnecté", 200);
    },
}

export default authController