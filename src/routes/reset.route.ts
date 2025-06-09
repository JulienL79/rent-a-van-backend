import { Router } from 'express';
import { isAuthenticated, requestLimiter } from '../middlewares';
import resetController from '../controllers/reset.controller';

const resetRouter = Router();

resetRouter.post("/",  isAuthenticated(false), requestLimiter(3), resetController.requestResetPassword);

resetRouter.put("/:token", isAuthenticated(false), requestLimiter(3), resetController.resetPassword);

export default resetRouter;