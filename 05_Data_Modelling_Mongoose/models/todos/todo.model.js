import mongoose from "mongoose"

const todoSchema = new mongoose.Schema(
    {
        content: {
            type: String,
            required: true,
        },
        complete: {
            type: Boolean,
            default: false
        },
        // Relationship: This field stores the ID of the user who created the Todo
        createdBy: {
            type: mongoose.Schema.Types.ObjectId,
            // The 'ref' must exactly match the string name given in mongoose.model("User", ...)
            ref: "User"
        },
        // Relationship: A Todo has many SubTodos, so we store an array of ObjectIds
        subTodos: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "SubTodo"
            }
        ] // Array of SubTodos
    }, 
    {timestamps: true}
)

export const Todo = mongoose.model("Todo", todoSchema)