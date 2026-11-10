import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"

const app = express()

// app.use is used for all middlewares and configurations
app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))

// Middleware to parse incoming JSON data (with a limit so our server doesn't crash from huge payloads)
app.use(express.json({limit: "16kb"}))

// Middleware to parse URL encoded data (e.g., when spaces become %20 in the URL)
app.use(express.urlencoded({extended: true, limit: "16kb"}))

// Middleware to serve static files (like images/PDFs) from our public/temp folder
app.use(express.static("public"))

// Middleware to securely parse and set cookies on the user's browser
app.use(cookieParser())

// Export the configured app so index.js can import and run it
export { app }