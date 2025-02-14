import { Router } from "express";

import {
  deleteMyAccount,
  getAllUsers,
  getProfile,
  getUserById,
  updateDetails,
  updatePassword,
} from "../controllers/user.controller";
import auth from "../middlewares/auth";

const router = Router();

router.get("/", auth, getAllUsers);
router.route("/my-profile").get(auth, getProfile).delete(auth, deleteMyAccount);
//
router.get("/:id", auth, getUserById);

router.patch("/update-password", auth, updatePassword);
router.put("/update-details", auth, updateDetails);

export default router;
