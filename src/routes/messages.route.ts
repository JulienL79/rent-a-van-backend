import { Router } from "express";
import { isAuthenticated, isAdminOrOwner } from "../middlewares";
import { messages } from "../schemas";
import messagesController from "../controllers/messages.controller";

const messagesRouter = Router();

messagesRouter.get("/", isAuthenticated(true), isAdminOrOwner(messages), messagesController.getAll);

messagesRouter.get("/chat/", isAuthenticated(true), messagesController.getAllChatsByUser);

messagesRouter.get("/chat/:id", isAuthenticated(true), messagesController.getAllFromChat);

messagesRouter.get("/:id", isAuthenticated(true), isAdminOrOwner(messages), messagesController.get);

messagesRouter.post("/", isAuthenticated(true), messagesController.create);

messagesRouter.put("/:id", isAuthenticated(true), isAdminOrOwner(messages), messagesController.update);

messagesRouter.delete("/:id", isAuthenticated(true), isAdminOrOwner(messages), messagesController.delete);

export default messagesRouter;