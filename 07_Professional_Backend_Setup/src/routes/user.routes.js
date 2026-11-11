import { Router } from "express";
import { registerUser } from "../controllers/user.controller.js";
import { upload } from "../middlewares/multer.middleware.js"; // Import the multer middleware for handling file uploads

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

export default router