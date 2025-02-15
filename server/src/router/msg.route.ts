import { Router } from "express";

import { deleteMsg, getMsgs, sendMsg } from "../controllers/msg.controller";
import auth from "../middlewares/auth";

const router = Router();

router.post("/send", auth, sendMsg);
router.post("/get", auth, getMsgs);
router.delete("/:id", auth, deleteMsg);

export default router;
