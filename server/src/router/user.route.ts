import { Router } from "express";

import { updatePassword } from "../controllers/user.controller";
import auth from "../middlewares/auth";

const router = Router();

router.patch("/update-password", auth, updatePassword);

export default router;
