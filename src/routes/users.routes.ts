import { Router } from 'express';
import controller from "../controllers/users.controller";

const usersRouter = Router();

usersRouter.get("/", controller.getAll);

usersRouter.get("/:id", controller.getById);

usersRouter.post("/", controller.create);

usersRouter.put("/:id", controller.update);

usersRouter.delete("/:id", controller.delete);

export default usersRouter;