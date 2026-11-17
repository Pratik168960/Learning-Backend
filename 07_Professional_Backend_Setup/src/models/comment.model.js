import mongoose, {Schema} from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2"; // This line imports the `mongoose-aggregate-paginate-v2` plugin, which is used to add pagination capabilities to Mongoose models. It allows for efficient pagination of query results, especially useful for large datasets like comments on a video. 
// Pagination is important for performance and user experience, as it prevents loading all comments at once, which can be overwhelming and slow.

const commentSchema = new Schema( 
    {
        content: {
            type: String,
            required: true
        },
        video: {
            type: Schema.Types.ObjectId, // Reference to the Video model
            ref: "Video"
        },
        owner: {
            type: Schema.Types.ObjectId, // Reference to the User model
            ref: "User"
        }
    },
    {
        timestamps: true
    }
)

commentSchema.plugin(mongooseAggregatePaginate) // This line adds the pagination plugin to the commentSchema, enabling efficient pagination of comments when querying the database.

export const Comment = mongoose.model("Comment", commentSchema) // This line creates a Mongoose model named "Comment" based on the commentSchema, allowing interaction with the "comments" collection in the MongoDB database.