// Database connection and app start will go here

import connectDB from "./db/index.js";



// Execute the database connection
connectDB()


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