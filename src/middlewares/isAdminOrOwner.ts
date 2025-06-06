import { db } from "../config/pool";
import { NextFunction, Request, Response } from "express";
import { APIResponse } from "../utils/response";
import { PgTableWithColumns } from "drizzle-orm/pg-core";
import { eq, and } from "drizzle-orm";
import { logger } from "../utils";

export const isAdminOrOwner = (schema: PgTableWithColumns<any>) => {
    return async (request: Request, response: Response, next: NextFunction) => {
        try {
            logger.info("[MIDDLEWARE] : isAdminOrOwner")
            const { user } = response.locals;

            if (user.isAdmin) 
                return next();

            const { id } = request.params
            const [owner] = await db.select({ id: schema.id }).from(schema)
                .where(
                    and(
                        eq(schema.userId, user.id),
                        eq(schema.id, id)
                    )
                );
            if (!owner) throw new Error();
            return next();
        } catch (error: any) {
            logger.error("Droits invalides", error);
            return APIResponse(response, null, "Droits invalides", 403);
        }
    };
};
