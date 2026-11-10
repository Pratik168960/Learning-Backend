// This class is used to create a standardized API response object that can be sent back to the client. It includes the HTTP status code, the data being returned, a message, and a success flag indicating whether the request was successful or not.

class ApiResponse {
    constructor(statusCode, data, message = "Success") {
        this.statusCode = statusCode
        this.data = data
        this.message = message
        // HTTP status codes below 400 are success codes (200, 201, etc.)
        this.success = statusCode < 400 
    }
}

export { ApiResponse }