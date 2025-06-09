import { InferSelectModel, InferInsertModel} from "drizzle-orm";
import { messages } from "../schemas";

export type Message = InferSelectModel<typeof messages>;

export type NewMessage = InferInsertModel<typeof messages>;