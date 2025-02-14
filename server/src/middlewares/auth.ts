import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

import User, { IUser } from "../models/user.model";
import CustomError from "../utils/CustomError";
import CatchAsync from "../utils/CatchAsync";
import { ERROR_MESSAGES } from "../constants/messages";

interface AuthRequest extends Request {
  user?: IUser | undefined;
}
// TODO : extract token from cookie
const authMiddleware = CatchAsync(
  async (req: AuthRequest, res: Response, next: NextFunction) => {
    // extract token from authorization header
    const token = req.header("Authorization")?.split(" ")[1];

    // if token does not exist
    if (!token) return next(new CustomError(ERROR_MESSAGES.TOKEN_MISSING, 401));

    // extract id from token
    const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY as string;
    const decoded: any = jwt.verify(token, JWT_SECRET_KEY);

    // find user by id
    const user = await User.findById(decoded.id);
    if (!user) return next(new CustomError(ERROR_MESSAGES.USER_NOT_FOUND, 404));

    req.user = user;
    next();
  }
);

export default authMiddleware;
