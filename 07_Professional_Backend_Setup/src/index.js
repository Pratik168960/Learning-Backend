// Database connection and app start will go here
import dotenv from "dotenv"
import connectDB from "./db/index.js";
import { app } from "./app.js"; // Import the configured Express app

dotenv.config({
    path: './.env'
})

// Execute the database connection
connectDB()
.then(() => {
    // If the database connects, listen for server errors before starting
    app.on("error", (error) => {
        console.log("ERRR: ", error);
        throw error
    })

    // Start the Express server on the port defined in .env, or default to 8000
    const port = process.env.PORT || 8000
    app.listen(port, () => {
        console.log(`⚙️  Server is running at port : ${port}`);
    })
})
.catch((err) => {
    console.log("MONGO db connection failed !!! ", err);
})


/*
//  NOTE: This is the FIRST approach Hitesh Sir showed (the IIFE approach).
// We keep it commented out for reference, but we are using the modular approach above.

import express from "express"
const app = express()

;( async () => {
    try {
        await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)

        // Sometimes the database is connected, but the express app fails to talk to it
        app.on("error", (error) => {
            console.log("ERROR: ", error);
            throw error
        })

        app.listen(process.env.PORT, () => {
            console.log(`App is listening on port ${process.env.PORT}`);
        })

    } catch (error) {
        console.error("ERROR: ", error)
        throw error
    }
})()
*/