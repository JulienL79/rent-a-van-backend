import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { env } from "../config/env";
import { APIResponse } from "../utils/response";
import { userModel } from "../models";

const { JWT_SECRET } = env;

export const isAuthenticated = (isExpected: boolean) => {
    return async (request: Request, response: Response, next: NextFunction) => {
        const { accessToken } = request.cookies; // on récupére le cookie "accessToken" qui contient le JWT
        if (!accessToken) {
            if (!isExpected) {
                next();
            }
            return APIResponse(response, null, "Vous devez être connecté", 401);
        } else {
            if (!isExpected) {
                return APIResponse(
                    response,
                    null,
                    "Vous devez être déconnecté",
                    401,
                );
            }

            try {
                const decoded = jwt.verify(accessToken, JWT_SECRET);
                // en dessous, c'est que verify est bien passé correctement !
                response.locals.user = decoded;

                const [role] = await userModel.getRole(response.locals.user.id);
                response.locals.user.isAdmin = role.role?.name === "admin";
                next();
            } catch (err: any) {
                return APIResponse(response, null, "Token invalide", 401);
            }
        }
    };
};
