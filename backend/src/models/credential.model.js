import mongoose from "mongoose";

const credentialSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
            trim: true
        },
        password: {
            type: String,
            required: true
        }
    },
    {
        timestamps: true
    }
);

export const Credential = mongoose.model('Credential', credentialSchema);
