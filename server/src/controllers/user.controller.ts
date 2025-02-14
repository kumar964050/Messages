import { Request as Req, Response as Res, NextFunction as Next } from "express";

import CatchAsync from "../utils/CatchAsync";
import CustomError from "../utils/CustomError";
import UserModel, { IUser } from "../models/user.model";
import { ERROR_MESSAGES, SUCCESS_MESSAGES } from "../constants/messages";

interface ReqWithUser extends Req {
  user?: IUser | undefined;
}

export const allUsers = CatchAsync(async (_: ReqWithUser, res: Res) => {
  const users = await UserModel.find();
  res.json({
    status: "success",
    message: "success",
    results: users.length,
    data: { users },
  });
});

export const getUserById = CatchAsync(
  async (req: ReqWithUser, res: Res, next: Next) => {
    //
    const user = await UserModel.findById(req.params.id);
    if (user) return next(new CustomError(ERROR_MESSAGES.USER_NOT_FOUND, 404));
    res.json({
      status: "success",
      message: "success",
      data: { user },
    });
  }
);

export const updatePassword = CatchAsync(
  async (req: ReqWithUser, res: Res, next: Next) => {
    //
    const user = await UserModel.findById(req.user?._id).select(
      "+password +temporary_password.password +temporary_password.expiry"
    );
    if (!user) return next(new CustomError(ERROR_MESSAGES.USER_NOT_FOUND, 404));

    const { comparedPassword } = await user.comparePassword(req.body.password);
    if (!comparedPassword) {
      return next(new CustomError(ERROR_MESSAGES.INVALID_CREDENTIALS, 401));
    }

    // update password
    user.password = req.body.newPassword;
    user.temporary_password.password = null;
    user.temporary_password.expiry = null;
    await user.save({ validateBeforeSave: true });

    res.json({
      status: "success",
      message: SUCCESS_MESSAGES.PASSWORD_UPDATED,
    });
  }
);
