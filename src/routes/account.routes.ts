import { Router } from "express";

import AccountController from "../controllers/AccountController";

const router = Router();

router.get("/", AccountController.show);
router.get("/:id/balance", AccountController.balance);
router.post("/", AccountController.create);

export default router;
