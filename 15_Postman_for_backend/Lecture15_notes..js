/* LECTURE 15: HOW TO USE POSTMAN FOR BACKEND

THE GOAL:
- Learn how industry professionals use Postman.
- Set up Postman Collections and Environment Variables.
- Test the `registerUser` controller using `form-data` to send both text and files.
- Live debug minor logical errors encountered during testing.

CORE CONCEPTS:
1. Professional Postman Setup:
    * We don't just type URLs and hit send. We create a "Collection" (e.g., `youtube-backend`) to save all our API endpoints.
    * We use Postman Environments to save variables. Instead of typing `http://localhost:8000/api/v1`, we save it as a variable named `server` and use it like `{{server}}/users/register`.
    * This allows us to easily switch between local development and production servers later.

2. Testing Multipart Form Data:
    * Because our `/register` route expects files (`avatar`, `coverImage`), we CANNOT use "raw JSON" in Postman.
    * We MUST select `Body -> form-data`.
    * For text fields (username, email), keep the type as "Text".
    * For file fields (avatar, coverImage), hover over the key input, change the type from "Text" to "File", and select an image from your computer.

3. Debugging Controller Logic:
    * Bug 1: A missing `await` on the database query. `User.findOne()` returns a promise. If we don't `await` it, it evaluates to true (an empty object is truthy), causing false "User already exists" errors.
    * Bug 2: `req.files.coverImage` can be undefined if the user doesn't upload one. Our initial code threw a "Cannot read properties of undefined (reading '0')" error. We fixed this by adding proper conditional checks (`Array.isArray` and checking `.length`).

4. Unlinking Files (fs.unlinkSync):
    * We confirmed that our `uploadOnCloudinary` utility is successfully deleting the local file from `public/temp` after it uploads to Cloudinary, keeping our server clean.
*/