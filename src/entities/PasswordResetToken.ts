import { InferSelectModel, InferInsertModel } from "drizzle-orm";
import { passwordResetToken } from "../schemas";

export type PasswordResetToken = InferSelectModel<typeof passwordResetToken>;

export type NewPasswordResetToken = InferInsertModel<typeof passwordResetToken>;