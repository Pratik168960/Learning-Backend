import mongoose from "mongoose";

// A nested sub-schema used only within this file to define the structure of items in an order.
const orderItemSchema = new mongoose.Schema({
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product"
    },
    quantity: {
        type: Number,
        required: true
    }
})

const orderSchema = new mongoose.Schema(
    {
        orderPrice: {
            type: Number,
            required: true
        },
        // Relationship: The user who placed the order
        customer: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        // Embedding the orderItemSchema as an array
        orderItems: {
            type: [orderItemSchema]
        },
        address: {
            type: String,
            required: true
        },
        // Using enum to restrict the allowed status values
        // enumeration gives choices for the status of the order, ensuring data integrity
        status: {
            type: String,
            enum: ["PENDING", "CANCELLED", "DELIVERED"],
            default: "PENDING"
        }
    },
    { timestamps: true }
)

export const Order = mongoose.model("Order", orderSchema)