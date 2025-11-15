import { User } from "../models/users.models.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/AsyncHandler.js";

export const getAllOperators = asyncHandler(async (req, res) => {
    const operators = await User.find({ role: "operator" });

    if(!operators){
        throw new ApiError(401, "Internal server error");
    }

    return res.status(200).json(
        new ApiResponse(200, "Query submitted successfully", operators)
    );
})