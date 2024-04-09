import mongoose from "mongoose";
import { Credential } from "./credential.model.js";

const websiteSchema = new mongoose.Schema(
    {
        websiteName: {
            type: String,
            required: true,
            trim: true
        },
        credentials: [Credential.schema]
    },
    {
        timestamps: true
    }
);

export const Website = mongoose.model('Website', websiteSchema);
