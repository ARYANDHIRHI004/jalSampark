import express from "express";
import cors from "cors";
import { env } from "./constents.js";
import cookieParser from "cookie-parser"

const app = express();


app.use(
  cors({
    origin: `${env.ORIGIN}`,
    credentials: true,
    methods:["GET","POST","PUT","DELETE","OPTIONS"],
    allowedHeaders: ['Content-Type', 'Authorization']
  }),
);



app.use(express.json());
app.use(express.urlencoded());
app.use(cookieParser());

import authRouter from "./routes/auth.routes.js";
import userQueryRouter from "./routes/userQuery.routes.js";
import operatorRouter from "./routes/operator.routes.js";
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/userQuery", userQueryRouter);
app.use("/api/v1/operators", operatorRouter);

export default app;