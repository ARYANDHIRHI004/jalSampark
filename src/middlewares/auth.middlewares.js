import mongoose from "mongoose";
import { env } from "../constents.js";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/AsyncHandler.js";
import jwt from "jsonwebtoken";
import { User } from "../models/users.models.js";

const verifyJWT = asyncHandler(async (req, _, next) => {
  const accessToken =
    req.cookies?.accessToken ||
    req.header("Authorization")?.replace("Bearer ", "");

  if (!accessToken) {
    throw new ApiError(401, "Not Logged In");
  }

  const decodedToken = jwt.verify(accessToken, env.ACCESS_TOKEN_SECRET);

  req.user = decodedToken;
  next();
});

const checkUserRole = function (roles = []) {
  return asyncHandler(async (req, res, next) => {
    const userId = req.user._id;

    const user = await User.findById(userId);

    if (!user) {
      throw new ApiError(401, "You are not member of this account");
    }

    const role = user?.role;

    req.user.role = role;

    if (!roles.includes(role)) {
      throw new ApiError(401, "Unauthorized request");
    }
    next();
  });
};

export { verifyJWT, checkUserRole };
