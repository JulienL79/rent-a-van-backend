import { Router } from "express";
import authController from "../controllers/auth.controller";
import { isAuthenticated } from "../middlewares";

const authRouter = Router();

authRouter.post('/login', isAuthenticated(false), authController.login);

authRouter.post('/register', isAuthenticated(false), authController.register);

authRouter.get('/logout', isAuthenticated(true), authController.logout);

export default authRouter;