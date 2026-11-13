/* LECTURE 16: ACCESS REFRESH TOKEN, MIDDLEWARE AND COOKIES

THE GOAL:
- Understand the architecture and use cases for Access Tokens (short-lived) vs Refresh Tokens (long-lived).
- Build the `loginUser` controller to validate credentials and generate tokens.
- Securely send tokens to the frontend using HTTP-only cookies.
- Build a custom middleware (`verifyJWT`) to protect routes.
- Build the `logoutUser` controller, utilizing the middleware to securely identify and log out the user.

CORE CONCEPTS:
1. Access Token vs Refresh Token:
    * Access Token: Short-lived (e.g., 15 mins to 1 day). Contains user details like email/username. Used for every API request.
    * Refresh Token: Long-lived (e.g., 10 days to 30 days). Contains only the user ID. Stored in the Database AND sent to the user.
    * Why both? If an Access Token is stolen, the hacker only has a few minutes of access. The frontend uses the Refresh Token to silently get a new Access Token in the background without asking the user for their password again.

2. Secure Cookies:
    * When sending tokens back to the user, we use `res.cookie(key, value, options)`.
    * Options: `httpOnly: true` (prevents frontend JavaScript from reading the cookie) and `secure: true` (ensures it only works over HTTPS).

3. Custom Authentication Middleware (auth.middleware.js):
    * We can't log a user out if we don't know who they are. We can't trust the frontend to just send an ID.
    * Our middleware intercepts the request BEFORE the controller.
    * It grabs the token from the user's cookies (or Authorization header), decodes it using our Secret, finds the user in the database, and injects that user object directly into `req.user`.
    * If successful, it calls `next()` to pass control to the `logoutUser` controller.

4. The Logout Logic:
    * Now that `req.user` exists (thanks to the middleware), we query the DB to set their `refreshToken` to `undefined`.
    * Finally, we use `res.clearCookie()` to remove the tokens from the user's browser.
*/