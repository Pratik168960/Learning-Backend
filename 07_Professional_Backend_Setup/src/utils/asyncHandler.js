// PROMISE APPROACH (The one we will use)
const asyncHandler = (requestHandler) => {
    return (req, res, next) => {
        Promise.resolve(requestHandler(req, res, next)).catch((err) => next(err))
    } // return as a function so that we can use it as a middleware in our routes. This is a higher order function that takes a requestHandler (which is an async function) and returns a new function that wraps the requestHandler in a Promise. If the requestHandler throws an error, it will be caught and passed to the next middleware (which is usually an error handler).
}

export { asyncHandler }

/* 
// TRY/CATCH APPROACH (Hitesh Sir's first example, kept for reference)

// Step-by-step breakdown of how a higher order function works:
// const asyncHandler = () => {}
// const asyncHandler = (func) => () => {}
// const asyncHandler = (func) => async () => {}

const asyncHandler = (fn) => async (req, res, next) => {
    try {
        await fn(req, res, next)
    } catch (error) {
        res.status(error.code || 500).json({
            success: false,
            message: error.message
        })
    }
}
*/