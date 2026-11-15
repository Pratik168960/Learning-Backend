import mongoose, {Schema} from "mongoose" // it helps you define the structure of the document and model

const subscriptionSchema = new Schema({ // Define the Subscription schema with fields for subscriber and channel, both referencing the User model
    subscriber: {
        type: Schema.Types.ObjectId, // one who is subscribing
        ref: "User"
    },
    channel: {
        type: Schema.Types.ObjectId, // one to whom 'subscriber' is subscribing
        ref: "User"
    }
}, {timestamps: true})


export const Subscription = mongoose.model("Subscription", subscriptionSchema)