import { Router } from "express";

import { login, signup, forgotPassword } from "../controllers/auth.controller";

const router = Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/forgot-password", forgotPassword);

export default router;
