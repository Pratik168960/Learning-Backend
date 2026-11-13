import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken"
import { User } from "../models/user.model.js";

export const verifyJWT = asyncHandler(async(req, _, next) => { // if there is no use res then we can replace it with the _
    try {
        // Step 1: Grab the token from cookies OR the Authorization header (Bearer token)
        const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "") 
        
        // Step 2: If no token exists, the user is not authorized
        if (!token) {
            throw new ApiError(401, "Unauthorized request")
        }
    
        // Step 3: Decode the token using our secret key
        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
    
        // Step 4: Find the user in the database using the ID from the decoded token
        const user = await User.findById(decodedToken?._id).select("-password -refreshToken")
    
        if (!user) {
            
            throw new ApiError(401, "Invalid Access Token")
        }
    
        // Step 5: Inject the verified user object into the request object for the controller to use
        req.user = user;
        next()
    } catch (error) {
        throw new ApiError(401, error?.message || "Invalid access token")
    }
    
})