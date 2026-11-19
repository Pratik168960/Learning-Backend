import mongoose from "mongoose"
import { ApiError } from "../utils/ApiError.js"
import {ApiResponse} from "../utils/ApiResponse.js"
import {asyncHandler} from "../utils/asyncHandler.js"


const healthcheck = asyncHandler(async (req, res) => {
    //TODO: build a healthcheck response that simply returns the OK status as json with a message
    
    if (mongoose.connection.readyState !== 1) { // readyState: 0 = disconnected, 1 = connected, 2 = connecting, 3 = disconnecting
        throw new ApiError(503, "Database connection is not healthy")
    }

    return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                { status: "OK", database: "connected" },
                "Service is healthy"
            )
        )
})

export {
    healthcheck
    }
    