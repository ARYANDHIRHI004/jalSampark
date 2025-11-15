import { Router } from "express";
import { verifyJWT, checkUserRole } from "../middlewares/auth.middlewares.js";
import { getAllOperators } from "../controllers/operators.controllers.js";

const operatorRouter = Router();

operatorRouter.route("/getAllOperators").get(verifyJWT, checkUserRole(["admin"]), getAllOperators);

export default operatorRouter;