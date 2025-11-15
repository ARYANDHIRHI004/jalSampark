import { UserQuery } from "../models/userQuery.models.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/AsyncHandler.js";

export const submitQuery = asyncHandler(async (req, res) => {
    const { issueType, lat, lng, message } = req.body;
    const userId = req.user._id;

    if (!issueType || !lat || !lng || !message) {
        throw new ApiError(401, "All fields are required");
    }

    const userQuery = await UserQuery.create({
        userId,
        queryType: issueType,
        "geoLocation.lat": lat,
        "geoLocation.long": lng,
        query: message
    })

    if (!userQuery) {
        throw new ApiError(401, "Internal server error");
    }

    return res.status(200).json(
        new ApiResponse(200, "Query submitted successfully", userQuery)
    );


})

export const getPastQuery = asyncHandler(async (req, res) => {
    const userId = req.user._id;

    if (!userId) {
        throw new ApiError(401, "User not logged In");
    }

    const userQuery = await UserQuery.find({ userId });

    console.log(userQuery);


    if (!userQuery) {
        throw new ApiError(401, "Internal server error");
    }

    return res.status(200).json(
        new ApiResponse(200, "Query submitted successfully", userQuery)
    );

})

export const getPastQueryById = asyncHandler(async (req, res) => {
    const userId = req.user._id;
    const { queryId } = req.params;

    if (!userId) {
        throw new ApiError(401, "User not logged In");
    }

    const userQuery = await UserQuery.findOne({
        _id: queryId,
    });

    console.log(userQuery);


    if (!userQuery) {
        throw new ApiError(401, "Internal server error");
    }

    return res.status(200).json(
        new ApiResponse(200, "Query submitted successfully", userQuery)
    );

})
export const getAllQuery = asyncHandler(async (req, res) => {


    const userQuery = await UserQuery.find();



    if (!userQuery) {
        throw new ApiError(401, "Internal server error");
    }

    return res.status(200).json(
        new ApiResponse(200, "Query submitted successfully", userQuery)
    );

})