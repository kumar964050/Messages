import { Router } from "express";

import {
  deleteMsg,
  getMsgs,
  sendMsg,
  uploadFile,
} from "../controllers/msg.controller";
import auth from "../middlewares/auth";

const router = Router();

router.post("/send", auth, sendMsg);
router.post("/send-image", auth, uploadFile);
router.post("/get", auth, getMsgs);
router.delete("/:id", auth, deleteMsg);

export default router;
