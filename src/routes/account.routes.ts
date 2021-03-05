import { Router } from "express";

import AccountController from "../controllers/AccountController";

const router = Router();

const accountController = new AccountController();

router.get("/", accountController.show);
router.get("/:id/balance", accountController.balance);
router.post("/", accountController.create);

export default router;
