import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { env } from "../config/env";
import { APIResponse } from "../utils/response";
import { userModel } from "../models";
import { db } from "../config/pool";
import { users } from "../schemas";
import { eq } from "drizzle-orm";
import { logger } from "../utils";

const { JWT_SECRET } = env;

export const isAuthenticated = (isExpected: boolean) => {
    return async (request: Request, response: Response, next: NextFunction) => {
        logger.info("[MIDDLEWARE] : isAuthenticated")
        const { accessToken } = request.cookies; // on récupére le cookie "accessToken" qui contient le JWT
        if (!accessToken) {
            // Si nous avons besoin de ne pas être identifié (ex: login, register,..)
            if (!isExpected) {
                return next();
            }
            // Sinon
            return APIResponse(response, null, "Vous devez être connecté", 401);
        } else {
            // Si nous avons besoin de ne pas être identifié (ex: login, register,..)
            if (!isExpected) {
                logger.error("Vous devez être déconnecté");
                return APIResponse(
                    response,
                    null,
                    "Vous devez être déconnecté",
                    401,
                );
            }
            // Sinon
            try {
                const decoded = jwt.verify(accessToken, JWT_SECRET);
                // en dessous, c'est que verify est bien passé correctement !
                response.locals.user = decoded;

                // On récupère le rôle du user pour l'intégrer en response.locals
                const [role] = await userModel.getRole(response.locals.user.id);

                // On récupère le token temporaire en BDD pour vérifier s'il est cohérent avec celui du token actuel
                const [tempTokenDb] = await db.select({ id: users.tempTokenId })
                    .from(users)
                    .where(eq(users.id, response.locals.user.id));
                const isSameToken =
                    tempTokenDb?.id === response.locals.user.tempTokenId;

                // Il y a eu changement du token temp (changement mdp) ou le user a été supprimé -> Déconnexion
                if (!role || !tempTokenDb || !isSameToken) { 
                    response.clearCookie("accessToken");
                    logger.error("Token invalide");
                    return APIResponse(
                        response,
                        null,
                        "Votre session a expiré, veuillez vous reconnecter",
                        401,
                    );
                }

                response.locals.user.isAdmin = role.role?.name === "admin";
                next();

            } catch (error: any) {
                logger.error("Token invalide", error);
                return APIResponse(response, null, "Token invalide", 401);
            }
        }
    };
};
