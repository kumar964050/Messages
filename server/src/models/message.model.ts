import { Schema, model, Types, Document } from "mongoose";

const MSG_TYPE = ["text", "image", "video"];
const MSG_STATUS = ["pending", "sent", "delivered", "seen"];

interface IMessage extends Document {
  msg_id: string;
  type: string;
  content: string;
  image: { id: String; url: String };
  from: Types.ObjectId;
  to: Types.ObjectId;
  status: string;
  is_deleted?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
  // deletedBy?: Types.ObjectId[];
}

const messageSchema = new Schema<IMessage>(
  {
    msg_id: { type: String, unique: true },
    type: { type: String, required: true, enum: MSG_TYPE },
    content: { type: String, required: true, trim: true },
    from: { type: Schema.Types.ObjectId, ref: "User", required: true },
    image: { type: { id: String, url: String } },
    to: { type: Schema.Types.ObjectId, ref: "User", required: true },
    status: { type: String, required: true, enum: MSG_STATUS },
    is_deleted: { type: Boolean, default: false },
    // deletedBy: [{ type: Schema.Types.ObjectId, ref: "User" }],
  },
  { timestamps: true }
);

export default model<IMessage>("Message", messageSchema);
