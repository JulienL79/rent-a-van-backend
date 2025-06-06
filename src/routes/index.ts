import { Router } from "express";
import usersRouter from "./users.route";
import vehiclesRouter from "./vehicles.route";
import authRouter from "./auth.route";
import categoriesRouter from "./categories.route";
import rolesRouter from "./roles.route";
import picturesRouter from "./pictures.route";

const router = Router();

router.use('/users', usersRouter);

router.use('/vehicles', vehiclesRouter);

router.use('/auth', authRouter);

router.use('/categories', categoriesRouter);

router.use('/roles', rolesRouter);

router.use('/pictures', picturesRouter);

export default router;