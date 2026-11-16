/* LECTURE 21: HOW TO WRITE SUB PIPELINES AND ROUTES

THE GOAL:
- Write the `getWatchHistory` controller using nested aggregation pipelines.
- Understand how to perform a `$lookup` inside another `$lookup`.
- Map all the user controllers we have built over the last few lectures to their respective router endpoints.

CORE CONCEPTS:
1. Object ID Conversion in Aggregation:
    * When using Mongoose methods like `User.findById(req.user._id)`, Mongoose automatically converts the string `req.user._id` into a MongoDB `ObjectId` behind the scenes.
    * HOWEVER, Aggregation Pipelines bypass Mongoose's magic and talk almost directly to MongoDB. Therefore, passing a string ID to a `$match` stage will fail. We MUST manually convert it using `new mongoose.Types.ObjectId(req.user._id)`.

2. Nested Lookups (Sub-Pipelines):
    * Our user document has a `watchHistory` array containing Video IDs.
    * First Lookup: We join the `videos` collection to get the video documents.
    * The Problem: The video document only has an `owner` ID (a reference to the User who uploaded it). We want the owner's actual username and avatar.
    * Second (Nested) Lookup: Inside the first lookup's `pipeline` array, we perform *another* `$lookup` to join the `users` collection based on the video's `owner` field.

3. Array Operators (`$first` / `$arrayElemAt`):
    * Lookups always return arrays (e.g., the owner lookup returns an array containing one user document).
    * To flatten this for the frontend, we use `$addFields` and `$first` (or `$arrayElemAt`) to extract that single object out of the array.
*/