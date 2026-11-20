import mongoose, {isValidObjectId} from "mongoose"
import {Video} from "../models/video.model.js"
import { User } from "../models/user.model.js"
import { Like } from "../models/like.model.js"
import { Comment } from "../models/comment.model.js"
import {ApiError} from "../utils/ApiError.js"
import {ApiResponse} from "../utils/ApiResponse.js"
import {asyncHandler} from "../utils/asyncHandler.js"
import {uploadOnCloudinary, deleteFromCloudinary} from "../utils/cloudinary.js"

const publishAVideo = asyncHandler(async (req, res) => {
    const { title, description} = req.body
    // TODO: get video, upload to cloudinary, create video

    // Step 1: Validate the title and description to ensure they are not empty or just whitespace.
    if(!title?.trim() || !description?.trim()) {
        throw new ApiError(400, "Title and description are required")
    }

    // Step 2: Validate the video file and thumbnail to ensure they are provided in the request.
    const videoFile = req.files?.videoFile?.[0]?.path
    const thumbnailFile = req.files?.thumbnail?.[0]?.path

    if (!videoFile || !thumbnailFile) { 
        throw new ApiError(400, "Video file and thumbnail are required")
    }

    // Step 3: Upload the video and thumbnail to Cloudinary and check for successful uploads.
    const video = await uploadOnCloudinary(videoFile)
    if (!video?.url) {
        throw new ApiError(500, "Error uploading video to cloudinary")
    }

    const thumbnail = await uploadOnCloudinary(thumbnailFile)
    if (!thumbnail?.url) {
        throw new ApiError(500, "Error uploading thumbnail to cloudinary")
    }


    // Step 4: Create a new video document in the database
    const createdVideo = await Video.create({
        title: title.trim(),
        description: description.trim(),
        videoFile: video.url,
        thumbnail: thumbnail.url,
        duration: video.duration || 0,
        owner: req.user._id,
        isPublished: true
    })

    if (!createdVideo) {
        throw new ApiError(500, "Error creating video")
    }

    // Step 5: Return a success response with the created video details.
    return res
        .status(201)
        .json(
            new ApiResponse(
                201,
                createdVideo,
                "Video published successfully"
            )
        )
})

const getAllVideos = asyncHandler(async (req, res) => {
    const { page = 1, limit = 10, query, sortBy, sortType, userId } = req.query
    //TODO: get all videos based on query, sort, pagination

    // Step 1: Build the aggregation pipeline to fetch videos based on the provided query parameters.
    const pipeline = [
        {
            $match: {
                isPublished: true 
            }
        }
    ]

    // Step 2: Apply additional filters based on the query parameters
    // Apply additional filters based on the query parameters
    if (query) {
        pipeline.push({
            $match: {
                $or: [
                    { title: { $regex: query, $options: "i" } },
                    { description: { $regex: query, $options: "i" } }
                ]
            }
        })
    }

    
    // Step 3: If a userId is provided, filter videos by the specified userId
    if (userId) {
        if (!isValidObjectId(userId)) {
            throw new ApiError(400, "Invalid user ID")
        }
        pipeline.push({
            $match: {
                owner: new mongoose.Types.ObjectId(userId)
            }
        })
    }

    
    // Step 4: Lookup the owner details for each video from the users collection
    pipeline.push({
        $lookup: { // Lookup the owner details from the users collection
            from: "users",
            localField: "owner",
            foreignField: "_id",
            as: "ownerInfo",
             
            pipeline: [ // nested pipeline for projecting the owner details
                {
                    $project: { // Project only the required fields from the owner document
                        _id: 1,
                        username: 1,
                        fullName: 1,
                        avatar: 1
                    },
                }
            ]
        }
    },
    {
        $addFields: {
            owner: {
                $first: "$ownerInfo"
            }
        }
    }
    )

    // Step 5: Project the final output to include only the required fields for each video
    // Apply sorting
    if (sortBy) {
        pipeline.push({
            $sort: {
                [sortBy]: sortType === "desc" ? -1 : 1
            }
        })
    } else {
        pipeline.push({
            $sort: {
                createdAt: -1
            }
        })
    }

    // Step 6: Create an aggregate query for the Video model using the constructed pipeline
    const videoAggregate = Video.aggregate(pipeline)
    // Apply pagination
    const videos = await Video.aggregatePaginate(videoAggregate, {
        page : parseInt(page, 10),
        limit: parseInt(limit, 10)
    })

    return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                videos,
                "Videos fetched successfully"
            )
        )
})


const getVideoById = asyncHandler(async (req, res) => {
    const { videoId } = req.params
    //TODO: get video by id


    // Step 1: Validate the videoId parameter to ensure it is a valid ObjectId.
    if (!isValidObjectId(videoId)) {
        throw new ApiError(400, "Invalid video ID")
    }

    // Step 2: Use an aggregation pipeline to fetch the video details along with the owner information.
    const video = await Video.aggregate(
        [
            
            {
                $match: { // Match the video document with the provided videoId 
                    _id: new mongoose.Types.ObjectId(videoId)
                }
            },

            {
                $lookup: { // Lookup the owner details from the users collection
                    from: "users",
                    localField: "owner",
                    foreignField: "_id",
                    as: "owner",

                    pipeline: [ // nested pipeline for projecting the owner details
                        {
                            $project: { // Project only the required fields from the owner document
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
                $addFields: { // Add the first element of the owner array to the owner field for easier access
                    owner: {
                        $first: "$owner"
                    }
                }
            }
        ]
    )

    // Step 3: Check if the video was found; if not, throw a 404 error.
    if (!video?.length) { 
        throw new ApiError(404, "Video not found")
    }

    // Step 4: Increment the view count for the video and add it to the user's watch history.
    await Video.findByIdAndUpdate(videoId, {
        $inc: { views: 1 }
    })

    // Step 5: Add the video to the authenticated user's watch history using $addToSet to avoid duplicates.
    await User.findByIdAndUpdate(req.user?._id, {
        $addToSet: { watchHistory: videoId }
    })

    //  Step 6: Return a success response with the video details.
    return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                video[0],
                "Video fetched successfully"
            )
        )

})

const updateVideo = asyncHandler(async (req, res) => {
    const { videoId } = req.params
    //TODO: update video details like title, description, thumbnail

    // Step 1: Validate the videoId parameter to ensure it is a valid ObjectId.
    if (!isValidObjectId(videoId)) {
        throw new ApiError(400, "Invalid video ID")
    }

    // Step 2: Extract the title, description, and thumbnailPath from the request body and files. Validate that at least one of these fields is provided for the update.
    const title = req.body?.title?.trim()
    const description = req.body?.description?.trim()
    const thumbnailPath = req.file?.path || req.files?.thumbnail?.[0]?.path
    
    if (!title && !description && !thumbnailPath) {
        throw new ApiError(400, "At least one field (title, description, or thumbnail) is required to update")
    }

    // Step 3: Find the video by the provided videoId. If the video is not found, throw a 404 error. Also, check if the authenticated user is the owner of the video; if not, throw a 403 error.
    const video = await Video.findById(videoId)
    if(!video) {
        throw new ApiError(404, "Video not found")
    }

    if(video.owner.toString() !== req.user?._id?.toString()) {
        throw new ApiError(403, "You are not authorized to update this video")
    }


    // Step 4: Update the video fields (title, description, thumbnail) if they are provided in the request. If a new thumbnail is provided, upload it to Cloudinary and update the video's thumbnail URL. Optionally, delete the old thumbnail from Cloudinary if it exists.
    if (title) {
        video.title = title
    }

    if (description) {
        video.description = description
    }

    if (thumbnailPath) {
        const oldThumbnailUrl = video.thumbnail
        const uploadedThumbnail = await uploadOnCloudinary(thumbnailPath)

        if (!uploadedThumbnail?.url) {
            throw new ApiError(500, "Error uploading thumbnail to cloudinary")
        }

        video.thumbnail = uploadedThumbnail.url

        // Optional: delete oldThumbnailUrl from Cloudinary if you have a delete helper
        if (oldThumbnailUrl) {
            await deleteFromCloudinary(oldThumbnailUrl)
        }
    }

    await video.save()

    //  Step 5: Return a success response with the updated video details.
    return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                video,
                "Video updated successfully"
            )
        )

})

const deleteVideo = asyncHandler(async (req, res) => {
    const { videoId } = req.params
    //TODO: delete video
    // Step 1: Validate the videoId parameter to ensure it is a valid ObjectId.
    if(!isValidObjectId(videoId)) {
        throw new ApiError(400, "Invalid video ID")
    }


    const video = await Video.findById(videoId)
    if(!video) {
        throw new ApiError(404, "Video not found")
    }

    if(video.owner.toString() !== req.user?._id?.toString()) {
        throw new ApiError(403, "You are not authorized to delete this video")
    }

    const deletedVideo = await Video.findByIdAndDelete(videoId)

    if(!deletedVideo) {
        throw new ApiError(500, "Error deleting video")
    }

    // Step 2: Delete the video file and thumbnail from Cloudinary using the appropriate Cloudinary API calls.
    await cloudinary.uploader.destroy(deletedVideo.videoFile, { resource_type: "video" }) // delete video from cloudinary
    await cloudinary.uploader.destroy(deletedVideo.thumbnail) // delete thumbnail from cloudinary

    await Like.deleteMany({ video: videoId }) // delete all likes for this video
    await Comment.deleteMany({ video: videoId }) // delete all comments for this video

    //  Step 3: Return a success response indicating that the video has been deleted successfully.
    return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                null,
                "Video deleted successfully"
            )
        )
})

const togglePublishStatus = asyncHandler(async (req, res) => {
    const { videoId } = req.params

    if(!isValidObjectId(videoId)) {
        throw new ApiError(400, "Invalid video ID")
    }

    const video = await Video.findById(videoId)
    if(!video) {
        throw new ApiError(404, "Video not found")
    }

    if(video.owner.toString() !== req.user?._id?.toString()) {
        throw new ApiError(403, "You are not authorized to toggle the publish status of this video")
    }

    video.isPublished = !video.isPublished
    await video.save(
        {
            validateBeforeSave: false
        }
    )

    return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                { isPublished: video.isPublished },
                "Video publish status toggled successfully"
            )
        )
})

export {
    getAllVideos,
    publishAVideo,
    getVideoById,
    updateVideo,
    deleteVideo,
    togglePublishStatus
}