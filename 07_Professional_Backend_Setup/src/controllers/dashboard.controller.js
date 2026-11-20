import mongoose, {isValidObjectId} from "mongoose"
import {Video} from "../models/video.model.js"
import {Subscription} from "../models/subscription.model.js"
import {Like} from "../models/like.model.js"
import {ApiError} from "../utils/ApiError.js"
import {ApiResponse} from "../utils/ApiResponse.js"
import {asyncHandler} from "../utils/asyncHandler.js"

const getChannelStats = asyncHandler(async (req, res) => {
    // TODO: Get the channel stats like total video views, total subscribers, total videos, total likes etc.
    const userId = req.user?._id


    if(!isValidObjectId(userId)) {
        throw new ApiError(400, "Invalid user ID")
    }

    const userObjectId = new mongoose.Types.ObjectId(userId)

    const subscriberResult = await Subscription.aggregate([
        {
            $match: {
                channel: userObjectId
            }
        },
        {
            $count: "totalSubscribers"
        }
    ])
    
    const totalSubscribers = subscriberResult.length > 0 ? subscriberResult[0].totalSubscribers : 0

    
    const videoStatsResult = await Video.aggregate([
        {
            $match: {
                owner: userObjectId
            }
        },
        {
            $group: {
                _id: null,
                totalVideos: { $sum: 1 },
                totalViews: { $sum: "$views" }
            }
        }
    ])

    const totalViews = videoStatsResult.length > 0 ? videoStatsResult[0].totalViews : 0
    const totalVideos = videoStatsResult.length > 0 ? videoStatsResult[0].totalVideos : 0


    const userVideos = await Video.find({ owner: userObjectId }).select("_id")
    const videoIds = userVideos.map(video => video._id)

    const totalLikes = videoIds.length > 0 ? await Like.countDocuments({ video: { $in: videoIds } }) : 0

    return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                {
                    totalSubscribers,
                    totalVideos,
                    totalViews,
                    totalLikes
                 },
                "Channel stats retrieved successfully"
            )
        )
})

const getChannelVideos = asyncHandler(async (req, res) => {
    // TODO: Get all the videos uploaded by the channel
    const userId = req.user?._id

    if(!isValidObjectId(userId)) {
        throw new ApiError(400, "Invalid user ID")
    }



    const channelVideos = await Video.find({ owner: userId }).sort({ createdAt: -1 })

    return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                channelVideos,
                "Channel videos retrieved successfully"
            )
        )
})

export {
    getChannelStats, 
    getChannelVideos
    }