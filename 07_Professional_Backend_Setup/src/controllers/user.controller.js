import { asyncHandler } from "../utils/asyncHandler.js"; // if we export asynchandler as default then we can import it with any name but if we export it as named export then we have to import it with the same name. and curly braces are required

// Wrap the controller logic in asyncHandler to avoid repetitive try/catch blocks
const registerUser = asyncHandler( async (req, res) => { // method to register a user asynchandler is a higher order function. there are 4 parameters in the function req, res, next, error. 
    res.status(200).json({ // send a 200 OK response with a JSON body
        message: "ok"
    })
} )

export { registerUser }