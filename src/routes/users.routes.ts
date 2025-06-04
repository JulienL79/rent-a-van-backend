import { Router } from 'express';
import usersController from '../controllers/users.controller';

const usersRouter = Router();

usersRouter.get("/", usersController.getAll);

usersRouter.get("/:id", usersController.get);

usersRouter.put("/:id", usersController.update);

usersRouter.delete("/:id", usersController.delete);

export default usersRouter;