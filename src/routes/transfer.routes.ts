import { Router } from "express";

import AuthMiddleware from "../middlewares/authMiddleware";
import TransferController from "../controllers/TransferController";

const router = Router();

router.get("/", AuthMiddleware, TransferController.show);
router.post("/", AuthMiddleware, TransferController.create);

export default router;
