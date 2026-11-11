/* LECTURE 14: LOGIC BUILDING | REGISTER CONTROLLER

THE GOAL:
- Build the complete business logic for registering a new user.
- Handle multi-part form data (text fields + files).
- Validate data, check for duplicates, upload images to Cloudinary, and securely save the user to the database.

CORE CONCEPTS:
1. The Mental Model (The Algorithm):
    * Step 1: Get user details from the frontend (req.body).
    * Step 2: Validate the data (ensure nothing is empty).
    * Step 3: Check if a user already exists (by email or username).
    * Step 4: Check for uploaded files (avatar is required, coverImage is optional) via `req.files`.
    * Step 5: Upload those files to Cloudinary using our utility.
    * Step 6: Create the user object in the database (Mongoose automatically hashes the password thanks to our pre-save hook).
    * Step 7: Remove the password and refreshToken fields from the response object for security.
    * Step 8: Send the final response to the user.

2. req.body vs req.files:
    * Standard JSON data (like username, email) comes through `req.body`.
    * Files (images, PDFs) come through `req.files` (which is an object with arrays if we use `upload.fields`).
    * To parse `req.files`, the route must use the `multer` middleware before passing control to the controller.

3. Validating Empty Fields:
    * We use an array method to check multiple fields at once: 
      `[fullName, email, username, password].some((field) => field?.trim() === "")`
    * `some()` returns true if ANY of the fields meet the condition (being empty).

4. Security Best Practice (Removing Data from Response):
    * When `User.create()` finishes, it returns the whole user document (including the hashed password).
    * We MUST NOT send the password back to the frontend.
    * We query the DB again using `User.findById(createdUser._id).select("-password -refreshToken")` to get a clean object. The minus sign means "do not include".
*/