import mongoose from "mongoose";

const otpSchema = new mongoose.Schema({
    usernameidx: {
        type: String,
    },
    email: {
        type: String,
        required: true,
    },
    otp: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
        expires: 60 * 60,
    },
});

export const OTP = mongoose.model('OTP', otpSchema);
