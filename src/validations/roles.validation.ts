import { z } from "zod";

export const rolesRegisterValidation = z.object({
    name: z.enum(["user", "admin"])
});