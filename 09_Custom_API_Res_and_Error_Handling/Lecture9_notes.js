/* LECTURE 9: CUSTOM API RESPONSE AND ERROR HANDLING

THE GOAL:
- Standardize how our API sends responses (success and error) so the frontend team always knows exactly what JSON structure to expect.
- Eliminate repetitive try/catch blocks in our controllers using a Higher Order Function wrapper.

CORE CONCEPTS:
1. The Problem with Default Errors:
    * Node.js has a built-in `Error` class, but it's very generic.
    * In a production API, we need to send specific HTTP status codes (e.g., 400, 404, 500) and structured messages.

2. Extending the Error Class (ApiError.js):
    * We create a custom `ApiError` class that inherits from Node's built-in `Error` class.
    * We add properties like `statusCode`, `success: false`, and an `errors` array to standardize every failure.
    * We also capture the `stack` trace (which file/line caused the error) to make debugging easier.

3. Standardizing Success (ApiResponse.js):
    * We create a class to format successful responses.
    * Every success will now have a `statusCode`, `data` (the actual payload), and `message`.
    * We explicitly set `success: statusCode < 400` because HTTP codes below 400 indicate success.

4. The Async Handler Wrapper (asyncHandler.js):
    * Talking to a database is always async. This means every controller needs a `try/catch` or `.catch()`.
    * To avoid writing `try/catch` 100 times, we create a wrapper function.
    * It takes a function as an argument, executes it, and automatically catches any errors, passing them to Express's `next` middleware.
*/