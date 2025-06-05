import { Router } from "express";
import usersRouter from "./users.routes";
import vehiclesRouter from "./vehicles.routes";
import authRouter from "./auth.routes";
import categoriesRouter from "./categories.routes";
import rolesRouter from "./roles.routes";
import picturesRouter from "./pictures.routes";

const router = Router();

router.use('/users', usersRouter);

router.use('/vehicles', vehiclesRouter);

router.use('/auth', authRouter);

router.use('/categories', categoriesRouter);

router.use('/roles', rolesRouter);

router.use('/pictures', picturesRouter);

export default router;