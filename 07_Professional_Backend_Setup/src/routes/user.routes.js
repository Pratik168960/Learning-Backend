import { Router } from "express";
import { registerUser } from "../controllers/user.controller.js";

const router = Router()

// Define a route for user registration.
// When someone hits this route with a POST request, it executes the registerUser controller.
router.route("/register").post(registerUser) // This is a POST request to register a new user. registerUser is the controller function that will handle the logic for this route. which is present in the user.controller.js file. 

export default router