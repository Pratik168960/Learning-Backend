class ApiError extends Error { // inheritance from the built-in Error class
    constructor( // constructor for the ApiError class
        statusCode,
        message = "Something went wrong",
        errors = [],
        stack = ""
    ) { //overriding the constructor of the Error class
        super(message)
        this.statusCode = statusCode
        this.data = null // data property is set to null for error responses
        this.message = message
        this.success = false
        this.errors = errors


        // If a stack trace is provided, use it; otherwise, capture the current stack trace
        if (stack) {
            this.stack = stack
        } else {
            Error.captureStackTrace(this, this.constructor)
        }
    }
}

export { ApiError }