import { Router } from "express";
import {
  getCurrentUser,
  loginUser,
  logoutUser,
  registerUser,
  verifyEmail,
} from "../controllers/user.controllers.js";
import { verifyJWT } from "../middlewares/auth.middlewares.js";

const authRouter = Router();

authRouter.route("/register-user").post(registerUser);
authRouter.route("/loginUser").post(loginUser);
authRouter.route("/logoutUser").get(verifyJWT, logoutUser);
authRouter.route("/get-current-user").get(verifyJWT, getCurrentUser);
authRouter.route("/verifyEmail").post(verifyEmail);

export default authRouter;
