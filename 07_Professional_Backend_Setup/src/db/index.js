import mongoose from "mongoose";
// NOTE: When using ES modules, always include the file extension (.js) in local imports!
import { DB_NAME } from "../constants.js";

const connectDB = async () => {
    try {
        // Mongoose gives us a connection instance back which we can inspect
        const connectionInstance = await mongoose.connect(process.env.MONGODB_URI)
        
        console.log(`\n MongoDB connected !! DB HOST: ${connectionInstance.connection.host}`);
    } catch (error) {
        console.log("MONGODB connection FAILED: ", error);
        // Process is an inbuilt Node feature. 1 means exit with a failure code.
        process.exit(1)
    }
}

export default connectDB