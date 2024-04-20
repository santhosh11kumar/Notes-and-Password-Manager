// Import required modules and models
import { asyncHandler } from "../utils/asyncHandler.js";
import { User } from "../models/user.model.js";
import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";
import jwt from "jsonwebtoken";
import { encrypt } from "cipher-guard";
import { Website } from "../models/website.model.js";

// Function to add website credentials
const addWebsiteCredentials = asyncHandler(async (req, res) => {
    const { websiteName, userName, password } = req.body;

    // Check required fields
    if (!websiteName || !userName || !password) {
        throw new ApiError(400, "Website name, username, and password are required.");
    }

    // Retrieve user ID from access token
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        throw new ApiError(401, 'Unauthorized');
    }
    const token = authHeader.split(' ')[1];
    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    const userId = decodedToken._id;

    try {
        // Find the user
        const user = await User.findById(userId);
        if (!user) {
            throw new ApiError(404, "User not found.");
        }

        let index = user._id;

        let existingWebsite = await Website.findOne({ websiteName });
        if (!existingWebsite || existingWebsite.idx !== user._id) {
            existingWebsite = new Website({ idx: index, websiteName, credentials: [] });
        }

        // Check if the username already exists for the website
        const existingCredential = existingWebsite.credentials.find(credential => credential.userName === userName);
        if (existingCredential && existingWebsite.idx === user._id) {
            throw new ApiError(409, "Username already exists for this website.");
        }

        // Encrypt password
        const encryptionKey = process.env.ENCRYPTION_SECERT_KEY;
        const salt = process.env.ENCRYPTION_SALT;
        const encryptedPassword = encrypt(password, encryptionKey, salt);


        // Push the new credential to the existing website
        existingWebsite.credentials.push({ userName, password: encryptedPassword });

        // Save changes to the user and existingWebsite
        await Promise.all([user.save(), existingWebsite.save()]);

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

// Function to retrieve all website details for the logged-in user
const retrieveWebsiteDetails = asyncHandler(async (req, res) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        throw new ApiError(401, 'Unauthorized');
    }

    const token = authHeader.split(' ')[1];

    try {
        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        const userId = decodedToken._id;

        // Find the user 
        const user = await User.findById(userId);
        if (!user) {
            throw new ApiError(404, "User not found.");
        }

        const websites = await Website.find();
        const websiteData = websites.flatMap(website => {
            if (website.idx.toString() === user._id.toString()) {
                // Map the website credentials to an array of objects
                return website.credentials.map(credential => ({
                    websiteName: website.websiteName,
                    userName: credential.userName,
                    updatedTime: website.updatedAt
                }));
            }
            return [];
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

// Function to retrieve website credentials for a specific website
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
            if (website.websiteName === requestedWebsiteDetails && website.idx === userId) {
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

// Export the functions
export {
    addWebsiteCredentials,
    retrieveWebsiteCredentials,
    retrieveWebsiteDetails
};
