/* LECTURE 17: ACCESS TOKEN AND REFRESH TOKEN IN BACKEND

THE GOAL:
- Create a dedicated endpoint (`/refresh-token`) to issue a new Access Token when the old one expires.
- Validate the incoming Refresh Token (from cookies or body).
- Cross-check the incoming token with the token saved in the database for security.
- Issue and return brand new Access and Refresh tokens to the user.

CORE CONCEPTS:
1. The Refresh Token Flow:
    * Access tokens are short-lived. When they expire, the frontend hits `/api/v1/users/refresh-token` and sends their current Refresh Token.
    * The backend verifies the signature using `jwt.verify` and `REFRESH_TOKEN_SECRET`.
    * We extract the `_id` from the decoded token to find the user in the database.
    * SECURITY CHECK: We must verify that the token sent by the user exactly matches the `refreshToken` stored in their database record. This prevents hijacked/old tokens from working.
    * If everything matches, we generate a new set of tokens, save the new refresh token in the DB, and send them back via cookies.

2. Error Handling in Promises:
    * Because `jwt.verify` can throw errors (like "jwt expired" or "invalid signature"), the decoding and database matching logic is wrapped inside a `try/catch` block.

3. Why No Middleware Here?
    * We don't use our `verifyJWT` middleware on this route because that middleware explicitly checks for a valid *Access Token*. The whole point of this route is to work when the Access Token is expired or missing. The controller itself acts as the verifier for the Refresh Token.
*/