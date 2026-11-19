import mongoose, {isValidObjectId} from "mongoose"
import {User} from "../models/user.model.js"
import { Subscription } from "../models/subscription.model.js"
import {ApiError} from "../utils/ApiError.js"
import {ApiResponse} from "../utils/ApiResponse.js"
import {asyncHandler} from "../utils/asyncHandler.js"


const toggleSubscription = asyncHandler(async (req, res) => {
    
    const {channelId} = req.params
    // TODO: toggle subscription

    // Step 1: Validate the channelId parameter to ensure it is a valid ObjectId.
    if (!isValidObjectId(channelId)) {
        throw new ApiError(400, "Invalid channel ID")
    }

    if(channelId === req.user._id.toString()) {
        throw new ApiError(400, "You cannot subscribe to your own channel")
    }

    // Step 2: Check if the channel exists.
    const channel = await User.findById(channelId)
    if (!channel) {
        throw new ApiError(404, "Channel not found")
    }

    // Step 3: Check if the user is already subscribed to the channel.
    const existingSubscription = await Subscription.findOne({ subscriber: req.user._id, channel: channelId })


    // Step 4: If the user is subscribed, unsubscribe them. Otherwise, subscribe them.
    if (existingSubscription) {
        await Subscription.findByIdAndDelete(existingSubscription._id)

        return res
            .status(200)
            .json(
                new ApiResponse(
                    200,
                    { subscribed: false },
                    "Unsubscribed successfully"
                )
            )
    }

    // Step 5: Otherwise, create a new subscription
    await Subscription.create({
        subscriber: req.user._id,
        channel: channelId
    })

    return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                { subscribed: true },
                "Subscribed successfully"
            )
        )

})

// controller to return subscriber list of a channel
const getUserChannelSubscribers = asyncHandler(async (req, res) => {
    const { channelId } = req.params
    
    // Step 1: Validate the channelId parameter to ensure it is a valid ObjectId.
    if(!isValidObjectId(channelId)){
        throw new ApiError(400, "Invalid channel ID")
    }

    // Step 2: Check if the channel exists.
    const channel = await User.findById(channelId)

    if (!channel) {
        throw new ApiError(404, "Channel not found")
    }



    // Step 3: Get the list of subscribers for the channel.
    const subscribers = await Subscription.aggregate([
        {
            // Match the channel
            $match: {
                channel: new mongoose.Types.ObjectId(channelId)
            }
        },
        {
            // Lookup the subscriber details from the users collection
            $lookup: {
                from: "users",
                localField: "subscriber",
                foreignField: "_id",
                as: "subscriberInfo",

                // nested pipeline for projecting the subscriber details
                pipeline: [
                    {
                        $project: {
                            _id: 1,
                            username: 1,
                            fullName: 1,
                            avatar: 1
                        }
                    }
                ]
            }
        },
        {
            // Add the subscriber information to the result
            $addFields: {
                subscriber: {
                    $first: "$subscriberInfo"
                }
            }
        },
        {
            // Project the final output to include only the subscriber and createdAt fields
            $project: {
                subscriber: 1,
                createdAt: 1 
            }
        }
        
    ])

    // Step 4: Return the list of subscribers along with the count.
    return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                {
                    subscribers,
                    subscribersCount: subscribers.length
                },
                "Channel subscribers fetched successfully"
            )
        )
           
})

// controller to return channel list to which user has subscribed
const getSubscribedChannels = asyncHandler(async (req, res) => {
    const { subscriberId } = req.params


    // Step 1: Validate the subscriberId parameter to ensure it is a valid ObjectId.
    if (!isValidObjectId(subscriberId)) {
        throw new ApiError(400, "Invalid subscriber ID")
    }


    // Step 2: check if the subscriber exists 
    const subscriber = await User.findById(subscriberId)
    if (!subscriber) {
        throw new ApiError(404, "Subscriber not found")
    }


    // Step 3: Get the list of channels subscribed by user 
    const subscribedChannels = await Subscription.aggregate([
        {
            // Match the subscriber
            $match: { 
                subscriber: new mongoose.Types.ObjectId(subscriberId)
            }
        },
        {
            // Lookup the channel details from the users collection
            $lookup: {
                from: "users",
                localField: "channel",
                foreignField: "_id",
                as: "channelInfo",

                // nested pipeline for projecting the channel details
                pipeline: [
                    {
                        $project: {
                            _id: 1,
                            username: 1,
                            fullName: 1,
                            avatar: 1
                        }
                    }
                ]
            }
        },
        {
            // Add the channel information to the result
            $addFields: {
                subscribedChannel: {
                    $first: "$channelInfo"
                }
            }
        },
        {
            $project: {
                subscribedChannel: 1,
                createdAt: 1
            }
        }
    ])

    // Step 4: Return the list of subscribed channels along with the count.
    return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                {
                    subscribedChannels,
                    channelsCount: subscribedChannels.length
                },
                "Subscribed channels fetched successfully"
            )
        )
})

export {
    toggleSubscription,
    getUserChannelSubscribers,
    getSubscribedChannels
}