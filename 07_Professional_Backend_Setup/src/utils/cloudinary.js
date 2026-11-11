import {v2 as cloudinary} from "cloudinary"
import fs from "fs" // Node.js built-in file system module

cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
  api_key: process.env.CLOUDINARY_API_KEY, 
  api_secret: process.env.CLOUDINARY_API_SECRET 
});

const uploadOnCloudinary = async (localFilePath) => {
    try {
        if (!localFilePath) return null
        
        // Upload the file on cloudinary
        const response = await cloudinary.uploader.upload(localFilePath, { // uploader.upload() method is used to upload the file to Cloudinary
            resource_type: "auto" // Automatically detect if it's an image, video, raw file, etc.
        })
        
        // File has been uploaded successfully testing statement
        // console.log("File is uploaded on cloudinary ", response.url);
        
        fs.unlinkSync(localFilePath) // Delete the local file synchronously to free up space on the server

        // We will return the response to the user so they can extract the URL
        return response;

    } catch (error) {
        // If the upload failed, we MUST delete the local file to prevent our server from filling up with garbage files
        fs.unlinkSync(localFilePath) // Delete the local file synchronously
        return null;
    }
}

export {uploadOnCloudinary}