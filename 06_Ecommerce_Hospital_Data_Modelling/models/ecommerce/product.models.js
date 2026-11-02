import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
    {
        description: {
            type: String,
            required: true
        },
        name: {
            type: String,
            required: true
        },
        // For product images, you usually store a string URL (e.g., from Cloudinary or AWS S3)
        productImage: {
            type: String
        },
        price: {
            type: Number,
            default: 0
        },
        stock: {
            type: Number,
            default: 0
        },
        // Relationship: A product belongs to a specific Category
        category: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Category",
            required: true
        },
        // Relationship: The user who added the product
        owner: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }
    },
    { timestamps: true }
)

export const Product = mongoose.model("Product", productSchema)