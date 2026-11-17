/* LECTURE 23: MONGODB MODELS FOR LIKE, PLAYLIST, AND TWEET

THE GOAL:
- Scaffold the remaining Mongoose models required for the Mega Project: `Comment`, `Like`, `Playlist`, and `Tweet`.
- Understand how to use `Schema.Types.ObjectId` to create references between these standalone entities.
- Inject `mongoose-aggregate-paginate-v2` into models (like `Comment`) that will require pagination for scalability.

CORE CONCEPTS:
1. The Comment Model:
    * A standalone entity containing the text `content`.
    * References the `Video` it belongs to and the `User` (owner) who wrote it.
    * Needs the pagination plugin because a popular video can have thousands of comments, and we can't load them all at once.

2. The Like Model:
    * A versatile model designed to handle likes for multiple entities.
    * It contains an `ObjectId` reference for `video`, `comment`, and `tweet`.
    * Only ONE of these three will be populated per document, depending on what the user liked.
    * Always references the `User` (likedBy) who performed the action.

3. The Playlist Model:
    * Contains a `name` and `description`.
    * Contains an array of `videos`, where each element is an `ObjectId` referencing the `Video` model.
    * References the `User` (owner) who created the playlist.

4. The Tweet Model:
    * The simplest model, mimicking a community post.
    * Contains text `content` and an `owner` (User).

NEXT STEPS:
- In the next lecture, Hitesh Sir will provide empty "filler" controller functions for all these models as an assignment to practice logic building before writing the implementation together.
*/