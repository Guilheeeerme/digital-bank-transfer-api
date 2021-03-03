import { Router } from "express";

import AccountController from "../controllers/Account";

const accountRouter = Router();

const accountController = new AccountController();

accountRouter.get("/", accountController.show);
accountRouter.get("/:id/balance", accountController.balance);
accountRouter.post("/", accountController.create);

export default accountRouter;
