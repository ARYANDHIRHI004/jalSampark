import mongoose from "mongoose";
import { AvailableUserRoles, env, UserRolesEnum } from "../constents.js";

const userQuerySchema = new mongoose.Schema(
  {
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    query: {
      type: String,
      required: true,
    },
    queryType: {
      type: String,
      required: true,
    },
    image: {
      type: {
        url: String,
        localpath: String,
      },
      default: {
        url: ``,
        localpath: "",
      },
    },
    geoLocation: {
      type: {
        let: String,
        long: String,
      },
      required: true,
    },
  },
  { timestamps: true },
);

export const UserQuery = mongoose.model("UserQuery", userQuerySchema);
