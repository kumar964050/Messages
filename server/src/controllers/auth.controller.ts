import { Request as Req, Response as Res, NextFunction as Next } from "express";

import CatchAsync from "../utils/CatchAsync";
import CustomError from "../utils/CustomError";
import UserModel from "../models/user.model";
import { ERROR_MESSAGES, SUCCESS_MESSAGES } from "../constants/messages";
import EmailService from "../services/EmailService";

// email service
const emailServices = new EmailService();

// POST : Create a new User
export const signup = CatchAsync(async (req: Req, res: Res, next: Next) => {
  const email = req.body?.email?.toLowerCase() ?? "";
  // checking email is already exist
  const findUser = await UserModel.findOne({ email });
  if (findUser) {
    return next(new CustomError(ERROR_MESSAGES.ALREADY_USER_EXIST, 400));
  }

  // creating a new user
  const newUser = await UserModel.create(req.body);
  // send confirmation email along with verification LINK
  await emailServices.sendWelcomeEmail(newUser.email, newUser.name);

  const { password, ...userWithOutPassword } = newUser.toObject();

  res.status(201).json({
    status: "success",
    message: SUCCESS_MESSAGES.USER_REGISTERED,
    data: { user: userWithOutPassword },
  });
});

export const login = CatchAsync(async (req: Req, res: Res, next: Next) => {
  // email or username
  const identifier = req.body?.identifier?.toLowerCase();

  // get user details
  const findUser = await UserModel.findOne({
    $or: [{ username: identifier }, { email: identifier }],
  }).select(
    "+password +temporary_password.password +temporary_password.expiry"
  );

  if (!findUser) {
    return next(new CustomError(ERROR_MESSAGES.USER_NOT_FOUND, 404));
  }

  // verifying password details
  const { isTempPassword, comparedPassword } = await findUser.comparePassword(
    req.body.password
  );
  if (!comparedPassword) {
    return next(new CustomError(ERROR_MESSAGES.INVALID_CREDENTIALS, 401));
  }
  const { password, temporary_password, ...userWithoutPassword } =
    findUser.toObject();

  res.json({
    status: "success",
    message: SUCCESS_MESSAGES.LOGIN_SUCCESS,
    data: { user: userWithoutPassword, isTempPassword },
    token: findUser.generateJWTtoken(),
  });
});

// set temp password for login
export const forgotPassword = CatchAsync(
  async (req: Req, res: Res, next: Next) => {
    const identifier = req.body?.identifier?.toLowerCase();

    // Find user by email or username
    const user = await UserModel.findOne({
      $or: [{ username: identifier }, { email: identifier }],
    });

    if (!user) {
      return next(new CustomError(ERROR_MESSAGES.USER_NOT_FOUND, 404));
    }
    // Generate OTP
    const temporaryPassword = await user.setTemporaryPassword();

    // Send OTP via email
    await emailServices.sendTemporaryPassword(user.email, temporaryPassword);

    res.json({ status: "success", message: ERROR_MESSAGES.TEMP_PASSWORD_SENT });
  }
);
