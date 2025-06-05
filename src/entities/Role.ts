import { InferSelectModel, InferInsertModel } from "drizzle-orm";
import { roles } from "../schemas";

export type Role = InferSelectModel<typeof roles>;

export type NewRole = InferInsertModel<typeof roles>;