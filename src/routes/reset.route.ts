import { Router } from 'express';
import { requestLimiter } from '../middlewares';
import resetController from '../controllers/reset.controller';

const resetRouter = Router();

resetRouter.post("/",  requestLimiter(3), resetController.requestResetPassword);

resetRouter.put("/:token", resetController.resetPassword);

export default resetRouter;