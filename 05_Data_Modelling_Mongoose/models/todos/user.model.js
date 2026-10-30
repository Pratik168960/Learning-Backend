import mongoose from "mongoose";

// Step 2: Define the Schema
const userSchema = new mongoose.Schema(
    {
        // Using the advanced object notation for detailed validation
        username: {
            type: String,
            required: true,
            unique: true,
            lowercase: true
        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true
        },
        password: {
            type: String,
            // You can optionally pass an array to required: [true, "Custom error message"]
            required: [true, "Password is required"]
        }
    },
    // The second parameter to the Schema constructor is for options like timestamps
    { timestamps: true }
)

// Step 3: Export the Model
// Note: "User" will be transformed into "users" inside the MongoDB database.
export const User = mongoose.model("User", userSchema)