import { Request, Response, NextFunction } from "express";
import { APIResponse } from "../utils/response";

export const isAdminOrOwner = (request: Request, response: Response, next: NextFunction) => {
    try {
        const { user } = response.locals
        const { userId } = request.body

        if(!(user.id === userId) || !user.isAdmin)
            throw new Error ()

        next();
    } catch (err: any) {
        return APIResponse(response, null, "Droits invalides", 403);
    }
}