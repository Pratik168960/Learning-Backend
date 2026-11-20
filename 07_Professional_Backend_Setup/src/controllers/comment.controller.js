import mongoose, {isValidObjectId} from "mongoose"
import { Comment } from "../models/comment.model.js"
import { Video } from "../models/video.model.js"
import { Like } from "../models/like.model.js"
import {ApiError} from "../utils/ApiError.js"
import {ApiResponse} from "../utils/ApiResponse.js"
import {asyncHandler} from "../utils/asyncHandler.js"

const getVideoComments = asyncHandler(async (req, res) => {
    //TODO: get all comments for a video 
    
    const {videoId} = req.params
    const { page = 1, limit = 10 } = req.query
    
    if(!isValidObjectId(videoId)) {
        throw new ApiError(400, "Invalid video ID")
    }

    const video = await Video.findById(videoId)
    if(!video) {
        throw new ApiError(404, "Video not found")
    }

    const commentAggregate = await Comment.aggregate([
        {
            $match: {
                video: new mongoose.Types.ObjectId(videoId)
            }
        },
        {     
            $lookup: {
                from: "users",
                localField: "owner",
                foreignField: "_id",
                as: "owner",

                pipeline: [
                    {
                        $project: {
                            _id: 1,
                            username: 1,
                            fullName: 1,
                            avatar: 1
                        }
                    },
                    
                ]
            }
        },
        {
            $addFields: {            
                owner: {        
                    $first: "$owner"
                }
            }
        },                    
        {
            $sort: {
                createdAt: -1
            }
        }
    ])

    const paginatedComments = await Comment.aggregatePaginate(commentAggregate, {
        page: parseInt(page, 10),
        limit: parseInt(limit, 10)
    })

    return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                paginatedComments,
                "Comments retrieved successfully"
            )
        )

})

const addComment = asyncHandler(async (req, res) => {
    // TODO: add a comment to a video
    const {videoId} = req.params
    const {content} = req.body
    if(!isValidObjectId(videoId)) {
        throw new ApiError(400, "Invalid video ID")
    }
    if(!content.trim()) {
        throw new ApiError(400, "Content is required")
    }

    const video = await Video.findById(videoId)
    if(!video) {
        throw new ApiError(404, "Video not found")
    }

    const comment = await Comment.create({
        content: content.trim(),
        video: videoId,
        owner: req.user?._id
    })

    if(!comment) {
        throw new ApiError(500, "Failed to add comment")
    }

    return res
        .status(201)
        .json(
            new ApiResponse(
                201,
                comment,
                "Comment added successfully"
            )
        )
})

const updateComment = asyncHandler(async (req, res) => {
    // TODO: update a comment
    const {commentId} = req.params
    const { content } = req.body
    
    if(!isValidObjectId(commentId)) {
        throw new ApiError(400, "Invalid comment ID")
    }

    if(!content?.trim()) {
        throw new ApiError(400, "Content is required")
    }

    const comment = await Comment.findById(commentId)

    if(!comment) {
        throw new ApiError(404, "Comment not found")
    }

    if(comment.owner.toString() !== req.user._id.toString()) {
        throw new ApiError(403, "You are not authorized to update this comment")
    }

    comment.content = content.trim()
    await comment.save()

    return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                comment,
                "Comment updated successfully"
            )
        )
})

const deleteComment = asyncHandler(async (req, res) => {
    // TODO: delete a comment

    const {commentId} = req.params

    if(!isValidObjectId(commentId)) {
        throw new ApiError(400, "Invalid comment ID")
    }

    const comment = await Comment.findById(commentId)

    if(!comment) {
        throw new ApiError(404, "Comment not found")
    }

    if(comment.owner.toString() !== req.user._id.toString()) {
        throw new ApiError(403, "You are not authorized to delete this comment")
    }

    await Comment.findByIdAndDelete(commentId)

    await Like.deleteMany({ comment: commentId })

    return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                null,
                "Comment deleted successfully"
            )
        )
})

export {
    getVideoComments, 
    addComment, 
    updateComment,
     deleteComment
    }