/* LECTURE 11: HOW TO UPLOAD FILE IN BACKEND | MULTER

THE GOAL:
- Learn the industry-standard two-step process for uploading files (images, PDFs, videos) to a backend.
- Configure Cloudinary to store our media assets in the cloud.
- Setup Multer middleware to intercept incoming file uploads and save them locally.

CORE CONCEPTS:
1. The Two-Step Upload Strategy:
    * We don't upload files directly from the user's browser to Cloudinary.
    * Step 1: User uploads a file. Our server intercepts it using Multer and saves it temporarily on our local disk (inside `public/temp`).
    * Step 2: We use the Cloudinary SDK to upload that local file to their cloud servers.
    * Cleanup: Once the file is safely on Cloudinary (or if the upload fails), we delete the temporary local file using Node's `fs` (File System) module.

2. Cloudinary Configuration (cloudinary.js):
    * Cloudinary requires three secrets: Cloud Name, API Key, and API Secret.
    * These must be stored in our `.env` file and passed into the `v2.config()` method.
    * We write a reusable utility function (`uploadOnCloudinary`) that takes a local file path, uploads it, and then cleanly deletes the local file using `fs.unlinkSync()`.

3. Multer Middleware (multer.middleware.js):
    * Multer is middleware, meaning it runs *before* our final controller logic (the "meet me before you go" concept).
    * We use `multer.diskStorage` to explicitly tell Multer where to save the files (`./public/temp`) and what to name them.np
    * We export `upload`, which we will inject into our routes later (e.g., `app.post("/register", upload.single("avatar"), registerUser)`).
*/