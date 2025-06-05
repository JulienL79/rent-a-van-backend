import { db } from "../config/pool";
import { NextFunction, Request, Response } from "express";
import { APIResponse } from "../utils/response";
import { PgTableWithColumns } from "drizzle-orm/pg-core";
import { eq, and } from "drizzle-orm";

export const isAdminOrOwner = (schema: PgTableWithColumns<any>) => {
    return async (request: Request, response: Response, next: NextFunction) => {
        try {
            const { user } = response.locals;

            if (user.isAdmin) next();

            const { id } = request.params
            const [owner] = await db.select({ id: schema.id }).from(schema)
                .where(
                    and(
                        eq(schema.userId, user.id),
                        eq(schema.id, id)
                    )
                );
            if (!owner) throw new Error();
            next();
        } catch (err: any) {
            return APIResponse(response, null, "Droits invalides", 403);
        }
    };
};
