import { z } from "zod";

export const categoriesRegisterValidation = z.object({
    name: z.enum(["van", "camping-car"])
});