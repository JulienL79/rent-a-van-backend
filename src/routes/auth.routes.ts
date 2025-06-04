import { Router } from "express";
import authController from "../controllers/auth.controller";
import { isAuthenticated } from "../middlewares";

const authRouter = Router();

// POST http://localhost:3000/auth/login
authRouter.post('/login', authController.login);

// POST http://localhost:3000/auth/register
authRouter.post('/register', authController.register);

// GET http://localhost:3000/auth/logout
authRouter.get('/logout', isAuthenticated, authController.logout);

export default authRouter;