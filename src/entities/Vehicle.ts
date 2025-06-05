import { InferSelectModel, InferInsertModel } from "drizzle-orm";
import { vehicles } from "../schemas";

export type Vehicle = InferSelectModel<typeof vehicles>;

export type NewVehicle = InferInsertModel<typeof vehicles>;