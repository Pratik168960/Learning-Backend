/* LECTURE 18: WRITING UPDATE CONTROLLERS AND SUBSCRIPTION MODEL

THE GOAL:
- Create a new `Subscription` model to handle channel subscriptions.
- Write controllers to update user passwords, basic account details (name/email), and files (avatar/cover image).
- Understand how to query the database, validate existing data, and update specific fields using Mongoose's `$set` operator.

CORE CONCEPTS:
1. The Subscription Model:
    * Instead of storing an array of subscribers inside the User model, best practice dictates creating a separate `Subscription` model.
    * It contains a `subscriber` (the User who is subscribing) and a `channel` (the User being subscribed to). Both reference the `User` model.

2. Update Passwords Safely:
    * Passwords must be updated carefully because they need to be hashed before saving.
    * We fetch the user, verify the old password using our custom `isPasswordCorrect` method, manually update the `password` field, and call `.save({validateBeforeSave: false})`. This triggers the `pre("save")` hook to re-hash the new password.

3. Updating Text Fields (findByIdAndUpdate):
    * For basic fields like `fullName` and `email`, we use `User.findByIdAndUpdate`.
    * We use the Mongoose `$set` operator to specifically update only the provided fields.
    * We pass `{ new: true }` to ensure Mongoose returns the *updated* document, not the old one.

4. Updating Files (Avatar & Cover Image):
    * File updates are kept as separate endpoints (best practice) to avoid sending heavy files alongside basic text updates.
    * The flow: Get local file path from Multer -> Upload to Cloudinary -> Use `$set` to update the URL in the database -> Return updated user.
*/