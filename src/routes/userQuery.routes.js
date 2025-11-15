import { Router } from "express";
import { verifyJWT, checkUserRole } from "../middlewares/auth.middlewares.js";
import { getAllQuery, getPastQuery, getPastQueryById, submitQuery } from "../controllers/userQuery.controllers.js";

const userQueryRouter = Router();

userQueryRouter.route("/submitQuery").post(verifyJWT, checkUserRole(["user"]), submitQuery);
userQueryRouter.route("/getPastQuery").get(verifyJWT, checkUserRole(["user"]), getPastQuery);
userQueryRouter.route("/getPastQueryById/:queryId").get(verifyJWT, checkUserRole(["user", "admin"]), getPastQueryById);
userQueryRouter.route("/getAllQuery").get(verifyJWT, checkUserRole(["admin"]), getAllQuery);

export default userQueryRouter;