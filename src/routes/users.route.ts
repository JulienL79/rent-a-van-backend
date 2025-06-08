import { Router } from 'express';
import usersController from '../controllers/users.controller';
import { isAdminOrOwner, isAuthenticated } from '../middlewares';
import { users } from '../schemas';

const usersRouter = Router();

usersRouter.get("/", isAuthenticated(true), isAdminOrOwner(users), usersController.getAll);

usersRouter.get("/:id", usersController.get);

usersRouter.get("/details/:id", isAuthenticated(true), isAdminOrOwner(users), usersController.getDetails);

usersRouter.put("/:id", isAuthenticated(true), isAdminOrOwner(users), usersController.update);

usersRouter.put("/credentials/:id", isAuthenticated(true), isAdminOrOwner(users), usersController.updateCredentials);

usersRouter.delete("/:id", isAuthenticated(true), isAdminOrOwner(users), usersController.delete);

export default usersRouter;