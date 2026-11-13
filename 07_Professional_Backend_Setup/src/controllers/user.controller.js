import { asyncHandler } from "../utils/asyncHandler.js"; // if we export asynchandler as default then we can import it with any name but if we export it as named export then we have to import it with the same name. and curly braces are required
import { ApiError } from "../utils/ApiError.js"
import { User } from "../models/user.model.js"
import { uploadOnCloudinary } from "../utils/cloudinary.js"
import { ApiResponse } from "../utils/ApiResponse.js";

/*
// Wrap the controller logic in asyncHandler to avoid repetitive try/catch blocks
 const registerUser = asyncHandler( async (req, res) => { // method to register a user asynchandler is a higher order function. there are 4 parameters in the function req, res, next, error.
     res.status(200).json({ // send a 200 OK response with a JSON body
         message: "ok"
     })
 } )

export { registerUser }
*/


const registerUser = asyncHandler( async (req, res) => {
    // Step 1: Get user details from frontend 
    const { fullName, email, username, password } = req.body // Destructure the user details from the request body. This assumes that the frontend sends a JSON object with these fields in the body of the POST request.
    
    // Step 2: Validation - not empty 
    if (
        [fullName, email, username, password].some((field) => field?.trim() === "") // Check if any of the required fields are empty or consist only of whitespace. The `some()` method returns true if at least one field meets the condition.
    ) {
        throw new ApiError(400, "All fields are required") 
    }

    // Step 3: Check if user already exists : username, email
    const existedUser = await User.findOne({ // Check if a user with the same username or email already exists using a MongoDB query. The `$or` operator allows us to check multiple conditions.
        $or: [{ username }, { email }]
    })

    if (existedUser) {
        throw new ApiError(409, "User with email or username already exists")
    }

    // Step 4: Check for files (avatar and coverImage) 
    // multer provides req.files. Since we used upload.fields, it's an object with arrays. 
    const avatarLocalPath = req.files?.avatar[0]?.path; // Use optional chaining to safely access the path of the uploaded avatar file. If the avatar file is not provided, this will be undefined.
    let coverImageLocalPath; // Initialize a variable to hold the local path of the cover image. It will be set only if a cover image is provided.
    
    if (req.files && Array.isArray(req.files.coverImage) && req.files.coverImage.length > 0) { // Check if the coverImage field exists in req.files and is a non-empty array. This ensures that we only try to access the path if a cover image was actually uploaded.
        coverImageLocalPath = req.files.coverImage[0].path
    }

    if (!avatarLocalPath) {
        throw new ApiError(400, "Avatar file is required")
    }

    // Step 5: Upload to Cloudinary 
    const avatar = await uploadOnCloudinary(avatarLocalPath)
    const coverImage = await uploadOnCloudinary(coverImageLocalPath)

    if (!avatar) {
        throw new ApiError(400, "Avatar file is required (failed to upload on cloudinary)")
    }

    // Step 6: Create the user object  
    const user = await User.create({ // Create a new user in the database using the User model. 
        fullName,
        avatar: avatar.url, // Store only the URL string provided by Cloudinary
        coverImage: coverImage?.url || "",
        email, 
        password,
        username: username.toLowerCase()
    })

    // Step 7: Remove password and refreshToken from response
    // We search the DB again to get a clean object without the sensitive fields
    const createdUser = await User.findById(user._id).select(
        "-password -refreshToken"
    ) // Use the `select()` method to exclude the password and refreshToken fields from the response. The minus sign (`-`) indicates that these fields should be omitted.

    if (!createdUser) {
        throw new ApiError(500, "Something went wrong while registering the user")
    }

    // Step 8: Send the final response
    return res.status(201).json(
        new ApiResponse(200, createdUser, "User registered Successfully")
    ) // Send a 201 Created response with a standardized API response object. The ApiResponse class is used to create a consistent structure for the response, including the status code, data, and message.
} )

// Helper function to generate both tokens and save the refresh token in the DB
const generateAccessAndRefreshTokens = async(userId) => {
    try {
        const user = await User.findById(userId)
        const accessToken = user.generateAccessToken()
        const refreshToken = user.generateRefreshToken()

        user.refreshToken = refreshToken
        // Save to DB but skip Mongoose validation (like requiring password again)
        await user.save({ validateBeforeSave: false })

        return {accessToken, refreshToken}

    } catch (error) {
        throw new ApiError(500, "Something went wrong while generating refresh and access token")
    }
}

const loginUser = asyncHandler(async (req, res) => {
    // Step 1: Get data from body
    const { email, username, password } = req.body

    // Step 2: Ensure either email or username is provided
    if (!username && !email) { 
        throw new ApiError(400, "username or email is required")
    }

    // Step 3: Find the user
    const user = await User.findOne({
        $or: [{username}, {email}]
    })

    if (!user) {
        throw new ApiError(404, "User does not exist")
    }

    // Step 4: Check if the password is correct using our custom model method
    const isPasswordValid = await user.isPasswordCorrect(password) // capital User is from mongoose model, small user is the instance of the model. we are calling the method on the instance of the model.

    if (!isPasswordValid) {
        throw new ApiError(401, "Invalid user credentials")
    }

    // Step 5: Generate tokens
    const {accessToken, refreshToken} = await generateAccessAndRefreshTokens(user._id) // Call the helper function to generate both access and refresh tokens. The function also saves the refresh token in the database for future validation.

    // Step 6: Fetch the user again to strip out the password and refresh token before sending to frontend
    const loggedInUser = await User.findById(user._id).select("-password -refreshToken")

    const options = { 
        httpOnly: true,
        secure: true
    }

    // Step 7: Send the response with cookies
    return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
        new ApiResponse(
            200, 
            {
                user: loggedInUser, accessToken, refreshToken
            },
            "User logged In Successfully"
        )
    )
})

const logoutUser = asyncHandler(async (req, res) => {
    // We have access to req.user because of our verifyJWT middleware!
    await User.findByIdAndUpdate(
        req.user._id,
        {
            // $set operator updates specific fields
            $set: {
                refreshToken: undefined 
            }
        },
        {
            new: true
        }
    )

    const options = {
        httpOnly: true,
        secure: true
    }

    return res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(new ApiResponse(200, {}, "User logged out"))
})

// Don't forget to export them!
export { registerUser, loginUser, logoutUser } 