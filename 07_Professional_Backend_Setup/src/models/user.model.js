import mongoose, {Schema} from "mongoose";
import jwt from "jsonwebtoken" // it helps you generate access token and refresh token
import bcrypt from "bcrypt" // it helps you hash passwords, our challenge was that no clear text password if password getting encrypt then it should decrypt and then compare 

const userSchema = new Schema( // Define the User schema with fields for username, email, fullName, avatar, coverImage, watchHistory, password, and refreshToken
    {
        username: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true, 
            index: true // Enables highly optimized searching in the DB
        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true, 
        },
        fullName: {
            type: String,
            required: true,
            trim: true, 
            index: true
        },
        avatar: {
            type: String, // cloudinary url
            required: true,
        },
        coverImage: {
            type: String, // cloudinary url
        },
        watchHistory: [
            {
                type: Schema.Types.ObjectId,
                ref: "Video"
            }
        ],
        password: {
            type: String, 
            required: [true, 'Password is required']
        },
        refreshToken: {
            type: String
        }
    },
    {
        timestamps: true // we will get createdAt updatedAt
    }
)

// Pre-save hook to hash the password before saving it to the database
// Note: In Mongoose v7+, if we use an async function, it returns a Promise. 
// Mongoose automatically waits for the Promise to resolve. 
// Do NOT pass or call a `next()` callback inside an async hook, as it will cause a "next is not a function" TypeError in postman.
userSchema.pre("save", async function () 
    {
    // If password is not modified (e.g., just updating avatar), skip hashing
    if(!this.isModified("password")) return;

    this.password = await bcrypt.hash(this.password, 10) // Hash the password with a salt round of 10
})
userSchema.pre("save", async function () {
    // If password is not modified (e.g., just updating avatar), skip hashing
    if(!this.isModified("password")) return;

    this.password = await bcrypt.hash(this.password, 10) // Hash the password with a salt round of 10
})

// Custom method to compare the clear text password with the encrypted hash
userSchema.methods.isPasswordCorrect = async function(password){
    return await bcrypt.compare(password, this.password) // Compare the provided password with the hashed password stored in the database
}



// Custom method to generate an Access Token (short lived, holds more user data)
userSchema.methods.generateAccessToken = function(){
    return jwt.sign( //.sign() method is used to generate a JWT (JSON Web Token) with the provided payload, secret key, and options.
        {
            // payload
            _id: this._id,
            email: this.email,
            username: this.username,
            fullName: this.fullName
        },
        process.env.ACCESS_TOKEN_SECRET, // secret key used to sign the token, stored in environment variables for security
        { // expiresIn option specifies the token's expiration time, also stored in environment variables
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY
        }
    )
}

// Custom method to generate a Refresh Token (long lived, holds only ID)
userSchema.methods.generateRefreshToken = function(){
    return jwt.sign(
        {
            _id: this._id,
            
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY
        }
    )
}


// Inject the pagination plugin so we can write advanced aggregation queries 
export const User = mongoose.model("User", userSchema)
// in mongodb it will store as "users" collection (plural of "User")