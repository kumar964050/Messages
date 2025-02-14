import { Request as Req, Response as Res, NextFunction as Next } from "express";

import CatchAsync from "../utils/CatchAsync";
import CustomError from "../utils/CustomError";
import UserModel, { IUser } from "../models/user.model";
import { ERROR_MESSAGES, SUCCESS_MESSAGES } from "../constants/messages";
import EmailService from "../services/EmailService";

interface ReqWithUser extends Req {
  user?: IUser | undefined;
}

const emailService = new EmailService();

// get all users
export const getAllUsers = CatchAsync(async (_: ReqWithUser, res: Res) => {
  const users = await UserModel.find({ is_active: true });
  const results = users.length;
  res.json({ status: "success", message: "success", results, data: { users } });
});
// get user by id
export const getUserById = CatchAsync(
  async (req: ReqWithUser, res: Res, next: Next) => {
    const user = await UserModel.findOne({
      _id: req.params.id,
      is_active: true,
    });
    if (!user) return next(new CustomError(ERROR_MESSAGES.USER_NOT_FOUND, 404));
    res.json({ status: "success", message: "success", data: { user } });
  }
);
// get my profile
export const getProfile = CatchAsync(
  async (req: ReqWithUser, res: Res, next: Next) => {
    res.json({
      status: "success",
      message: "success",
      data: { user: req.user },
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

    // informing to user
    await emailService.sendUpdatePasswordEmail(user.email);

    res.json({
      status: "success",
      message: SUCCESS_MESSAGES.PASSWORD_UPDATED,
    });
  }
);

// update user details
export const updateDetails = CatchAsync(
  async (req: ReqWithUser, res: Res, next: Next) => {
    const user = req.user;
    if (!user) return next(new CustomError(ERROR_MESSAGES.USER_NOT_FOUND, 404));
    const { name, age, gender, username } = req.body;

    if (name) user.name = name.trim();
    if (age) user.age = age;
    if (gender) user.gender = gender;

    // check username availability then assign to user
    if (username && user.username !== username.trim().toLowerCase()) {
      const existingUser = await UserModel.findOne({
        username: username.trim().toLowerCase(),
      }).lean();
      if (existingUser) {
        return next(
          new CustomError(ERROR_MESSAGES.ALREADY_USERNAME_EXIST, 401)
        );
      }
      user.username = username.trim().toLowerCase();
      // informing about updating username
      await emailService.sendUpdateUsernameEmail(user.email, username);
    }
    await user.save();

    res.status(200).json({
      status: "success",
      message: "Account details updated successfully",
      data: { user },
    });
  }
);

//  delete my account :review
export const deleteMyAccount = CatchAsync(
  async (req: ReqWithUser, res: Res, next: Next) => {
    // const user = await UserModel.findById(req.params.id);
    const { user } = req;
    if (!user) return next(new CustomError(ERROR_MESSAGES.USER_NOT_FOUND, 404));
    user.is_active = false;
    await user.save({ validateBeforeSave: false });

    // dlt email
    await emailService.sendAccountDeletionEmail(user.email);

    res.status(204).json({
      status: "success",
      message: "Account deleted successfully",
    });
  }
);
