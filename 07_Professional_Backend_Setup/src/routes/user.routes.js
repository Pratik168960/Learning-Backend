import { Router } from "express";
import { 
    loginUser, 
    logoutUser, 
    registerUser, 
    refreshAccessToken, 
    changeCurrentPassword, 
    getCurrentUser, 
    updateUserAvatar, 
    updateUserCoverImage, 
    getUserChannelProfile, 
    updateAccountDetails,
    getWatchHistory
} from "../controllers/user.controller.js";
import { upload } from "../middlewares/multer.middleware.js"; // Import the multer middleware for handling file uploads
import { verifyJWT } from "../middlewares/auth.middleware.js"; // Import the middleware

const router = Router()

// Define a route for user registration.
// When someone hits this route with a POST request, it executes the registerUser controller.
// router.route("/register").post(registerUser) This is a POST request to register a new user. registerUser is the controller function that will handle the logic for this route. which is present in the user.controller.js file.


// We inject the multer middleware `upload.fields()` BEFORE the registerUser controller.

router.route("/register").post(
    // Multer middleware to handle file uploads. It expects two fields: 'avatar' and 'coverImage'. Each can have a maximum of 1 file.
    upload.fields([ 
        {
            name: "avatar",
            maxCount: 1
        }, 
        {
            name: "coverImage",
            maxCount: 1
        }
    ]),
    registerUser
)


router.route("/login").post(loginUser)

// SECURED ROUTES
// We inject verifyJWT before logoutUser. The middleware ensures the user is logged in, 
// and if successful, calls next() to trigger logoutUser.
router.route("/logout").post(verifyJWT, logoutUser)

router.route("/refresh-token").post(refreshAccessToken)


router.route("/logout").post(verifyJWT,  logoutUser)
router.route("/refresh-token").post(refreshAccessToken)
router.route("/change-password").post(verifyJWT, changeCurrentPassword)
router.route("/current-user").get(verifyJWT, getCurrentUser)
router.route("/update-account").patch(verifyJWT, updateAccountDetails)

router.route("/avatar").patch(verifyJWT, upload.single("avatar"), updateUserAvatar)
router.route("/cover-image").patch(verifyJWT, upload.single("coverImage"), updateUserCoverImage)

// NEW ROUTE for Channel Profile
// Uses 'get' request, expects a dynamic :username param, and requires verifyJWT to calculate subscription status.
router.route("/c/:username").get(verifyJWT, getUserChannelProfile) // Fetch a user's channel profile from params
router.route("/history").get(verifyJWT, getWatchHistory)

export default router