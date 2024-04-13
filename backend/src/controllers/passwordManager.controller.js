import { asyncHandler } from "../utils/asyncHandler.js";
import { User } from "../models/user.model.js";
import { Website } from "../models/website.model.js";
import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";
import jwt from "jsonwebtoken";
import { encrypt } from "cipher-guard";

const addWebsiteCredentials = asyncHandler(async (req, res) => {
    const { websiteName, userName, password } = req.body;

    // Check required fields
    if (!websiteName || !userName || !password) {
        throw new ApiError(400, "Website name, username, and password are required.");
    }

    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        throw new ApiError(401, 'Unauthorized');
    }

    const token = authHeader.split(' ')[1];

    try {
        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        const userId = decodedToken._id;
        const user = await User.findById(userId);
        if (!user) {
            throw new ApiError(404, "User not found.");
        }

        const encryptionKey = process.env.ENCRYPTION_SECERT_KEY; // Fetch encryption key from environment variables
        const salt = process.env.ENCRYPTION_SALT; // Define salt length
        const encryptedPassword = encrypt(password, encryptionKey, salt); // Encrypt password

        let website = await Website.findOne({ websiteName });
        if (!website) {
            website = new Website({ websiteName, credentials: [] });
        }
        const existingCredential = website.credentials.find(credential => credential.userName === userName);
        if (existingCredential) {
            throw new ApiError(409, "Username already exists for this website.");
        }

        website.credentials.push({ userName, password: encryptedPassword });
        await website.save();

        return res.status(200).json(new ApiResponse(200, null, "Website credentials added successfully."));
    } catch (error) {
        console.error('Error adding credentials:', error.message);
        if (error instanceof ApiError) {
            throw error;
        } else {
            throw new ApiError(500, "Internal server error");
        }
    }
});


const retrieveWebsiteDetails = asyncHandler(async (req, res) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        throw new ApiError(401, 'Unauthorized');
    }

    const token = authHeader.split(' ')[1];

    try {
        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        const userId = decodedToken._id;

        const user = await User.findById(userId);
        if (!user) {
            throw new ApiError(404, "User not found.");
        }

        const websites = await Website.find();
        const websiteData = websites.flatMap(website => {
            return website.credentials.map(credential => ({
                websiteName: website.websiteName,
                userName: credential.userName,
                updatedTime: website.updatedAt
            }));
        });

        return res.status(200).json(websiteData);
    } catch (error) {
        console.error('Error retrieving credentials:', error.message);
        if (error instanceof ApiError) {
            throw error;
        } else {
            throw new ApiError(500, "Internal server error");
        }
    }
});

const retrieveWebsiteCredentials = asyncHandler(async (req, res) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        throw new ApiError(401, 'Unauthorized');
    }

    const requestedWebsiteDetails = req.params.websiteName;
    const token = authHeader.split(' ')[1];

    try {
        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        const userId = decodedToken._id;

        const user = await User.findById(userId);
        if (!user) {
            throw new ApiError(404, "User not found.");
        }

        const websites = await Website.find();
        const websiteData = websites.flatMap(website => {
            if (website.websiteName === requestedWebsiteDetails) {
                return website.credentials.map(credential => ({
                    websiteName: website.websiteName,
                    userName: credential.userName,
                    updatedTime: website.updatedAt
                }));
            }
            return [];
        });

        return res.status(200).json({ credentials: websiteData });
    } catch (error) {
        console.error('Error retrieving website credentials:', error.message);
        if (error instanceof ApiError) {
            throw error;
        } else {
            throw new ApiError(500, "Internal server error");
        }
    }
});

export {
    addWebsiteCredentials,
    retrieveWebsiteCredentials,
    retrieveWebsiteDetails
};


