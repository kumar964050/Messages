import { Request as Req, Response as Res, NextFunction as Next } from "express";

import CatchAsync from "../utils/CatchAsync";
import CustomError from "../utils/CustomError";
import UserModel from "../models/user.model";
import {
  EMAIL_MESSAGES,
  ERROR_MESSAGES,
  SUCCESS_MESSAGES,
} from "../constants/messages";
import EmailService from "../services/EmailService";

// email service
const emailServices = new EmailService();

// POST : Create a new User
export const signup = CatchAsync(async (req: Req, res: Res, next: Next) => {
  const email = req.body?.email?.toLowerCase() ?? "";
  // checking email is already exist
  const findUser = await UserModel.findOne({ email });
  if (findUser && findUser.is_active) {
    return next(new CustomError(ERROR_MESSAGES.ALREADY_USER_EXIST, 400));
  }

  let user = findUser;

  if (findUser && !findUser.is_active) {
    findUser.is_active = true;
    findUser.password = req.body.password;
    user = await findUser.save({ validateBeforeSave: false });
  } else {
    user = findUser ?? (await UserModel.create(req.body));
  }

  // creating a new user
  // send confirmation email along with verification LINK
  await emailServices.sendWelcomeEmail(user.email, user.name);

  const { password, ...userWithOutPassword } = user.toObject();

  res.status(201).json({
    status: "success",
    message: SUCCESS_MESSAGES.USER_REGISTERED,
    data: { user: userWithOutPassword },
  });
});

export const login = CatchAsync(async (req: Req, res: Res, next: Next) => {
  // email or username
  const identifier = req.body?.identifier?.toLowerCase();

  if (!identifier || !req.body.password) {
    return next(new CustomError(ERROR_MESSAGES.INVALID_CREDENTIALS, 401));
  }

  // get user details
  const findUser = await UserModel.findOne({
    $and: [
      { $or: [{ username: identifier }, { email: identifier }] },
      { is_active: true },
    ],
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
      $and: [
        { $or: [{ username: identifier }, { email: identifier }] },
        { is_active: true },
      ],
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

// // set temp password for login
// export const AccountVerification = CatchAsync(
//   async (req: Req, res: Res, next: Next) => {
//     // extract id from token
//     // get details by id
//     // change the status of is_verified
//     // send res
//     // res.json({ status: "success", message:  });
//   }
// );
