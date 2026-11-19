import { isValidObjectId } from "mongoose"
import {Tweet} from "../models/tweet.model.js"
import {User} from "../models/user.model.js"
import {ApiError} from "../utils/ApiError.js"
import {ApiResponse} from "../utils/ApiResponse.js"
import {asyncHandler} from "../utils/asyncHandler.js"

const createTweet = asyncHandler(async (req, res) => {
    //TODO: create tweet

    // Step 1: Validate the tweet content to ensure it is not empty or just whitespace.
    const { content } = req.body
    if (!content?.trim()) {
        throw new ApiError(400, "Tweet content is required")
    }

    // Step 2: Create a new tweet associated with the authenticated user.
    const tweet = await Tweet.create({
        content,
        owner: req.user._id
    })

    // Step 3: Return a success response with the created tweet.
    return res
        .status(201)
        .json(
            new ApiResponse(
                201,
                tweet,
                "Tweet created successfully"
            )
        )
})

const getUserTweets = asyncHandler(async (req, res) => {
    // TODO: get user tweets

    // Step 1: Validate the userId parameter to ensure it is a valid ObjectId.
    const { userId } = req.params
    if (!isValidObjectId(userId)) {
        throw new ApiError(400, "Invalid user ID")
    }

    // Step 2: Find the user by the provided userId.
    const user = await User.findById(userId)
    if (!user) {
        throw new ApiError(404, "User not found")
    }

    // Step 3: Find all tweets associated with the user.
    const tweets = await Tweet.find({ owner: user._id }).sort({ createdAt: -1 })

    // Step 4: Return a success response with the user's tweets.
    return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                tweets,
                "User's tweets retrieved successfully"
            )
        )
})

const updateTweet = asyncHandler(async (req, res) => {
    //TODO: update tweet

    // Step 1: Validate the tweetId parameter to ensure it is a valid ObjectId.
    const { tweetId } = req.params
    if (!isValidObjectId(tweetId)) {
        throw new ApiError(400, "Invalid tweet ID")
    }

     // Step 2: Validate the content of the tweet to ensure it is not empty or just whitespace.
    const { content } = req.body
    if (!content?.trim()) {
        throw new ApiError(400, "Tweet content is required")
    }

    // Step 3: Find the tweet by the provided tweetId.
    const tweet = await Tweet.findById(tweetId)
    if (!tweet) {
        throw new ApiError(404, "Tweet not found")
    }

    // Step 4: Check if the authenticated user is the owner of the tweet.
    if (tweet.owner.toString() !== req.user?._id?.toString()) {
        throw new ApiError(403, "You are not authorized to update this tweet")
    }

    // Step 5: Update the tweet with the new content.
    tweet.content = content
    await tweet.save()

    return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                tweet,
                "Tweet updated successfully"
            )
        )
})

const deleteTweet = asyncHandler(async (req, res) => {
    //TODO: delete tweet

    // Step 1: Validate the tweetId parameter to ensure it is a valid ObjectId.
    const { tweetId } = req.params 
    if (!isValidObjectId(tweetId)) {
        throw new ApiError(400, "Invalid tweet ID")
    }

    // Step 2: Find the tweet by the provided tweetId.
    const tweet = await Tweet.findById(tweetId)
    if (!tweet) {
        throw new ApiError(404, "Tweet not found")
    }

    if (tweet.owner.toString() !== req.user?._id?.toString()) {
        throw new ApiError(403, "You are not authorized to delete this tweet")
    }

    await Tweet.deleteOne({ _id: tweetId })

    // Step 4: Return a success response.
    return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                null,
                "Tweet deleted successfully"
            )
        )
})

export {
    createTweet,
    getUserTweets,
    updateTweet,
    deleteTweet
}