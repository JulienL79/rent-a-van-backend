import { Router } from "express";
import usersRouter from "./users.routes";
import vehiclesRouter from "./vehicles.routes";
import authRouter from "./auth.routes";

const router = Router();

router.use('/users', usersRouter);

router.use('/vehicles', vehiclesRouter);

router.use('/auth', authRouter);

export default router;