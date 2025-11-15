import mongoose from "mongoose";
import { AvailableUserRoles, env, UserRolesEnum } from "../constents.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema(
  {
    avatar: {
      type: {
        url: String,
        localpath: String,
      },
      default: {
        url: ``,
        localpath: "",
      },
      required: [true, "Avatar is required"],
    },
    username: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowecase: true,
      trim: true,
    },
    role: {
      type: String,
      enum: AvailableUserRoles,
      default: UserRolesEnum.USER,
    },
    fullname: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    isEmailVerified: {
      type: Boolean,
      default: false,
    },
    emailVerificationToken: {
      type: String,
    },
    emailVerificationTokenExpiry: {
      type: Date,
    },
    forgotPasswordToken: {
      type: String,
    },
    forgotPasswordExpity: {
      type: Date,
    },
    refreshToken: {
      type: String,
    },
    refreshPasswordExpity: {
      type: Date,
    },
  },
  { timestamps: true },
);

userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 10);
    next();
  }
});

userSchema.methods.comparePassword = async function (password) {
  const isMatched = await bcrypt.compare(password, this.password);
  return isMatched;
};

userSchema.methods.generateAccessToken = function () {
  return jwt.sign(
    {
      _id: this._id,
      email: this.email,
    },
    env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: env.ACCESS_TOKEN_EXPIRY,
    },
  );
};

userSchema.methods.generateRefreshToken = function () {
  return jwt.sign(
    {
      _id: this._id,
    },
    env.REFRESH_TOKEN_SECRET,
    {
      expiresIn: env.REFRESH_TOKEN_EXPIRY,
    },
  );
};

export const User = mongoose.model("User", userSchema);
