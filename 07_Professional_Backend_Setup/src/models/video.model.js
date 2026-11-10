import mongoose, {Schema} from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2"; // it allows write aggregation queries, injected as plugin

const videoSchema = new Schema(
    {
        videoFile: {
            type: String, // cloudinary url
            required: true
        },
        thumbnail: {
            type: String, // cloudinary url
            required: true
        },
        title: {
            type: String, 
            required: true
        },
        description: {
            type: String, 
            required: true
        },
        duration: {
            type: Number, // duration is extracted from cloudinary url payload
            required: true
        },
        views: {
            type: Number,
            default: 0
        },
        isPublished: {
            type: Boolean,
            default: true
        },
        owner: {
            type: Schema.Types.ObjectId,
            ref: "User" 
        }

    }, 
    {
        timestamps: true
    }
)

// Inject the pagination plugin so we can write advanced aggregation queries
videoSchema.plugin(mongooseAggregatePaginate)

export const Video = mongoose.model("Video", videoSchema) 