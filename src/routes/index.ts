import { Router } from "express";

import accountRouter from "./account.routes";
import authRouter from "./auth.routes";
import transferRouter from "./transfer.routes";

const routes = Router();

routes.use("/accounts", accountRouter);
routes.use("/login", authRouter);
routes.use("/transfers", transferRouter);

export default routes;
