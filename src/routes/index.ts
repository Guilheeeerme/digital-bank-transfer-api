import { Router } from "express";

import accountRouter from "./account.routes";
import authRouter from "./auth.routes";

const routes = Router();

routes.use("/accounts", accountRouter);
routes.use("/login", authRouter);

export default routes;
