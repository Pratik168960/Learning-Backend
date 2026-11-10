/* LECTURE 10: USER AND VIDEO MODEL WITH HOOKS AND JWT

THE GOAL:
- Design production-grade schemas for Users and Videos.
- Understand how to securely hash passwords before saving them to the database.
- Learn how to generate and manage Access Tokens and Refresh Tokens using JWT.
- Inject Mongoose plugins for advanced aggregation queries.

CORE CONCEPTS:
1. Mongoose Hooks (Pre & Post):
    * Mongoose allows us to run middleware functions right before or after an event (like saving a document).
    * We use `userSchema.pre("save", callback)` to intercept the save process.
    * CRITICAL: We must check `if(!this.isModified("password"))` so we don't re-hash an already hashed password when a user updates other fields like their avatar.

2. Custom Mongoose Methods:
    * You can inject custom functions directly into your schema using `userSchema.methods`.
    * We built custom methods to compare passwords (`isPasswordCorrect`) and generate JWTs (`generateAccessToken`, `generateRefreshToken`).
    * This keeps our business logic tightly coupled with the database model, keeping controllers clean.

3. Cryptography (bcrypt & jsonwebtoken):
    * `bcrypt`: Used to securely hash passwords. It takes the plain text password and a "salt round" (we used 10) to generate an encrypted string.
    * `jsonwebtoken (JWT)`: A bearer token system. It encrypts a payload (like user ID and email) with a secret key. We use short-lived Access Tokens and long-lived Refresh Tokens.

4. Mongoose Aggregate Paginate v2:
    * A plugin injected into the Video schema: `videoSchema.plugin(mongooseAggregatePaginate)`.
    * This allows us to write complex aggregation queries (grouping, filtering, matching) and paginate the results easily, which is crucial for a scalable video platform.

5. Field Indexing:
    * Setting `index: true` on fields like `username` and `fullName` heavily optimizes the database for searching. Only use indexing on fields you will query frequently, as it costs storage and write performance.
*/