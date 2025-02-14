import mongoose, { Schema, Document } from "mongoose";
import { hash, compare } from "bcryptjs";
import jwt from "jsonwebtoken";
import crypto from "crypto";

import { ROLES_ENUMS } from "../constants/enums";

export interface IUser extends Document {
  name: string;
  age: number;
  gender: string;
  username?: string;
  email: string;
  password: string;
  role: string;
  temporary_password: { password: string | null; expiry: Date | null };
  is_verified: boolean;
  is_active: boolean;
  comparePassword(
    candidatePassword: string
  ): Promise<{ isTempPassword: boolean; comparedPassword: boolean }>;
  generateJWTtoken(): string;
  setTemporaryPassword(): Promise<string>;
}

function generateUsername(): string {
  return "user-" + crypto.randomBytes(12).toString("hex");
}

const userSchema: Schema = new Schema(
  {
    name: { type: String, trim: true, default: "user" },
    age: { type: Number, default: 18 },
    gender: { type: String, enum: ["MALE", "FEMALE"] },
    username: {
      type: String,
      unique: true,
      lowercase: true,
      default: generateUsername,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    password: { type: String, required: true, select: false },
    is_verified: { type: Boolean, default: false },
    is_active: { type: Boolean, default: true },
    role: { type: String, enum: ROLES_ENUMS, default: ROLES_ENUMS[0] },
    temporary_password: {
      password: { type: String, select: false },
      expiry: { type: Date, select: false },
    },
  },
  { timestamps: true }
);

// encrypting password
userSchema.pre<IUser>("save", async function (next) {
  if (!this.isModified("password")) return next();
  const SALT = Number(process.env.PASS_SALT) || 10;
  this.password = await hash(this.password, SALT);
  next();
});

// decrypting password method
userSchema.methods.comparePassword = async function (
  userPassword: string
): Promise<{ isTempPassword: boolean; comparedPassword: boolean }> {
  // comparing main password
  const isMainPasswordMatch = await compare(userPassword, this.password);
  if (isMainPasswordMatch) {
    return { isTempPassword: false, comparedPassword: true };
  }

  // comparing temp password
  if (
    this.temporary_password?.password &&
    this.temporary_password.expiry &&
    new Date() < this.temporary_password.expiry
  ) {
    const isTempPasswordMatch = await compare(
      userPassword,
      this.temporary_password.password
    );

    if (isTempPasswordMatch) {
      // Clear temp password once used
      this.temporary_password = { password: null, expiry: null };
      await this.save({ validateBeforeSave: false });

      return { isTempPassword: true, comparedPassword: true };
    }
  }
  return { isTempPassword: false, comparedPassword: false };
};

// generate an jwt token
userSchema.methods.generateJWTtoken = function (): string {
  const expiryDays = Number(process.env.JWT_EXPIRY_IN_DAYS) || 30;
  return jwt.sign(
    { id: this._id.toString() },
    process.env.JWT_SECRET_KEY as string,
    { expiresIn: `${expiryDays}d` }
  );
};

// generate a temporary password
userSchema.methods.setTemporaryPassword = async function (): Promise<string> {
  const chars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@";
  let password = "";
  for (let i = 0; i < 8; i++) {
    password += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  const hashedPassword = await hash(password, 10);
  this.temporary_password = {
    password: hashedPassword,
    expiry: new Date(Date.now() + 20 * 60 * 1000), // 20 min
  };
  await this.save({ validateBeforeSave: false });
  return password;
};

export default mongoose.model<IUser>("User", userSchema);
