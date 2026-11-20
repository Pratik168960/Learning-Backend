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



// ==========================================
// ROUTES DECLARATION
// ==========================================

// 1. Import the router
import userRouter from './routes/user.routes.js'

// 2. Route declaration
// We use app.use() instead of app.get() because we have modularized the router.
// Any request coming to "/api/v1/users" will be handed over to the userRouter.
// E.g. -> http://localhost:8000/api/v1/users/register
app.use("/api/v1/users", userRouter) // This is the base route for all user-related operations. The userRouter will handle the rest of the path after "/api/v1/users". standard practice is to have a base route for each resource (like users, products, etc.) and then define specific actions (like register, login, etc.) in the router.


import healthcheckRouter from "./routes/healthcheck.routes.js"
import tweetRouter from "./routes/tweet.routes.js"
import subscriptionRouter from "./routes/subscription.routes.js"
import videoRouter from "./routes/video.routes.js"
import commentRouter from "./routes/comment.routes.js"
import likeRouter from "./routes/like.routes.js"
import playlistRouter from "./routes/playlist.routes.js"
import dashboardRouter from "./routes/dashboard.routes.js"

app.use("/api/v1/healthcheck", healthcheckRouter)
app.use("/api/v1/tweets", tweetRouter)
app.use("/api/v1/subscriptions", subscriptionRouter)
app.use("/api/v1/videos", videoRouter)
app.use("/api/v1/comments", commentRouter)
app.use("/api/v1/likes", likeRouter)
app.use("/api/v1/playlist", playlistRouter)
app.use("/api/v1/dashboard", dashboardRouter)

// Export the configured app so index.js can import and run it
export { app }