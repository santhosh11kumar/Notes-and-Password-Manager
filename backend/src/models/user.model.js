import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { Website } from "./website.model.js"

const userSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
            trim: true,
            unique: true
        },
        email: {
            type: String,
            required: true,
            unique: true
        },
        password: {
            type: String,
            required: true
        },
        mobile: {
            type: Number,
            required: true
        },
        refreshToken: {
            type: String,
        },
    },
    {
        timestamps: true
    }
);

// Other schema methods...


// before loading the password in db hash the password
userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();

    this.password = await bcrypt.hash(this.password, 8);
    next();
})

// method to check if the password is correct or not 
userSchema.methods.isPasswordCorrect = async function (password) {
    return await bcrypt.compare(password, this.password)
}

userSchema.methods.generateAccessToken = function () {
    const accessToken = jwt.sign(
        {
            _id: this._id, // generatd by db
            email: this.email,
            username: this.username
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY
        }
    );
    return accessToken;
};

userSchema.methods.generateRefreshToken = function () {
    return jwt.sign(
        {
            _id: this._id, // generatd by db
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY
        }
    );
};



export const User = mongoose.model('User', userSchema);
