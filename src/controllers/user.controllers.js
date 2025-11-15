import { User } from "../models/users.models.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/AsyncHandler.js";

const generateAccessAndRefreshToken = async (user) => {
  try {

    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();
    user.refrehTokne = refreshToken;
    await user.save();
    return { accessToken, refreshToken };
  } catch (error) {
    console.log("error in token generator", error);
  }
};

export const registerUser = asyncHandler(async (req, res) => {
  const { fullname, email, username, password } = req.body;

  const existedUser = await User.findOne({
    $or: [{ email }, { username }],
  });

  if (existedUser) {
    throw new ApiError(401, "User already exist");
  }

  const user = await User.create({
    fullname,
    email,
    username,
    password,
  });

  if (!user) {
    throw new ApiError(501, "Internal server error");
  }

  //sendMail();

  return res
    .status(200)
    .json(new ApiResponse(200, "User created successfully", user));
});

export const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({
    email
  })

  if (!user) {
    throw new ApiError(401, "User does not exist");
  }

  const isPasswordMatched = user.comparePassword(password);

  if (!isPasswordMatched) {
    throw new ApiError(401, "Invalid password");
  }

  
  const { accessToken, refreshToken } = await generateAccessAndRefreshToken(
    user,
  );

  const options = {
    httpOnly: true,
  };
  return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(new ApiResponse(200, "User loged In successfully", user));
});

export const logoutUser = asyncHandler(async (req, res) => {
  const userId = req.user?._id;

  if (!userId) {
    throw new ApiError(401, "User not logged In");
  }
    
  const user = await User.findByIdAndUpdate(
      userId,
    {
      $set: {
        refrehTokne: null,
      },
    },
  );

  if (!user) {
    throw new ApiError(501, "Internal server error");
  }

  const options = {
    httpOnly: true,
  };

  return res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(new ApiResponse(200, "User loged out successfully", {}));
});

export const getCurrentUser = asyncHandler(async (req, res) => {
  const userId = req.user?._id;

  console.log(userId);
  
  const user = await User.findById(userId);

  if (!user) {
    throw new ApiError(501, "User not found");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, "User found successfully", user));
});

export const verifyEmail = asyncHandler(async (req, res) => {});
