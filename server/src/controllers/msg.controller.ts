import { Request as Req, Response as Res, NextFunction as Next } from "express";
import CatchAsync from "../utils/CatchAsync";
import CustomError from "../utils/CustomError";
import { ERROR_MESSAGES, SUCCESS_MESSAGES } from "../constants/messages";

import UserModel, { IUser } from "../models/user.model";
import MessageModel from "../models/message.model";

interface ReqWithUser extends Req {
  user?: IUser | undefined;
}

// send msg
export const sendMsg = CatchAsync(async (req: ReqWithUser, res: Res) => {
  const newMsg = await MessageModel.create(req.body);
  res.json({
    status: "success",
    message: SUCCESS_MESSAGES.MESSAGE_SENT,
    data: { message: newMsg },
  });
});

// get msgs
export const getMsgs = CatchAsync(async (req: ReqWithUser, res: Res) => {
  // retrieve pattern sender --> to or to --> sender and is_delete : false

  const msgs = await MessageModel.find({
    $or: [
      { from: req.body.from, to: req.body.to },
      { from: req.body.to, to: req.body.from },
    ],
    is_deleted: false,
  })
    .select("-_id -__v -updatedAt")
    .lean();

  res.json({
    status: "success",
    message: SUCCESS_MESSAGES.MESSAGE_GET,
    results: msgs.length,
    data: { messages: msgs },
  });
});

// delete msg
export const deleteMsg = CatchAsync(
  async (req: ReqWithUser, res: Res, next: Next) => {
    // find msg details
    const msg = await MessageModel.findOne({
      msg_id: req.params.id,
      is_deleted: false,
    });
    if (!msg) {
      return next(new CustomError(ERROR_MESSAGES.MESSAGE_NOT_FOUND, 404));
    }
    msg.is_deleted = true;
    // Todo : later add who's deleted the msg
    await msg.save();

    // change status code later
    res.status(204).json({
      status: "success",
      message: SUCCESS_MESSAGES.MESSAGE_DELETED,
    });
  }
);

// send msg
export const uploadFiles = CatchAsync(async (req: ReqWithUser, res: Res) => {
  //
  // res.json({
  // status: "success",
  // message: SUCCESS_MESSAGES.MESSAGE_SENT,
  // data: { message: newMsg },
  // });
});
