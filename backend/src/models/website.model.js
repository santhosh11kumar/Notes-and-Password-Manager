import mongoose from "mongoose";

const websiteSchema = new mongoose.Schema({
    idx: {
        type: String,
    },
    websiteName: {
        type: String,
        required: true,
        trim: true
    },
    credentials: [{
        userName: {
            type: String,
            required: true,
            trim: true
        },
        password: {
            type: String,
            required: true
        },
    }],
    refreshToken: {
        type: String,
    }
}, {
    timestamps: true
});

export const Website = mongoose.model('Website', websiteSchema);
