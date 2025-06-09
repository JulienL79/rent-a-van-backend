import { Router } from "express";
import authController from "../controllers/auth.controller";
import { isAuthenticated, requestLimiter } from "../middlewares";

const authRouter = Router();

authRouter.post('/login', isAuthenticated(false), requestLimiter(10), authController.login);

authRouter.post('/register', isAuthenticated(false), authController.register);

authRouter.get('/logout', isAuthenticated(true), authController.logout);

export default authRouter;