import { InferSelectModel, InferInsertModel } from "drizzle-orm";
import { pricePeriods } from "../schemas";

export type PricePeriod = InferSelectModel<typeof pricePeriods>;

export type NewPricePeriod = InferInsertModel<typeof pricePeriods>;