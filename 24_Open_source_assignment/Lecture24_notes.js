/* LECTURE 24: BUILD IN PUBLIC AND OPEN SOURCE ASSIGNMENT

THE GOAL:
- Transition from passively watching tutorials ("Tutorial Hell") to actively building and problem-solving.
- Understand how to navigate a pre-scaffolded codebase (like you would in a real company).
- Accept the massive open-source assignment: Implement the logic for all remaining empty controllers (Videos, Tweets, Playlists, Comments, Likes).

CORE CONCEPTS:
1. The Assignment Architecture:
    * Hitesh Sir created empty controller functions for every feature in the Mega Project.
    * Each function contains a `//TODO:` comment explaining exactly what needs to be implemented.
    * He also created router files (e.g., `tweet.routes.js`, `video.routes.js`) and mapped these empty controllers to specific URL endpoints.
    * Finally, he registered all these new routers in `app.js` (e.g., `app.use("/api/v1/tweets", tweetRouter)`).

2. Global Middleware Application:
    * In previous routes (like `user.routes.js`), we applied the `verifyJWT` middleware individually to specific endpoints (e.g., `.post(verifyJWT, logoutUser)`).
    * For some new routers (like Comments or Tweets), EVERY route needs authentication.
    * Instead of pasting `verifyJWT` on every line, we can apply it globally to the entire router file using: `router.use(verifyJWT)`. Any route defined after this line will automatically require authentication.

3. The "Learn in Public" Philosophy:
    * You are meant to clone/fork the repository, write the complex database queries (Mongoose and Aggregations) to fulfill the `//TODO:` comments, and share your progress publicly (GitHub, Hashnode, LinkedIn).
    * This is the exact workflow of a Level 1/Level 2 Software Development Engineer (SDE). You are given a scaffolded file and a feature requirement, and you must write the logic.
*/