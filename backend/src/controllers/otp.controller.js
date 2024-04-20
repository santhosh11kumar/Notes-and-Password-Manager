import jwt from "jsonwebtoken";
import emailSender from "../utils/email.util.js";
import { OTP } from "../models/otp.model.js"; // Import the OTP model
import { Website } from "../models/website.model.js";
import { decrypt } from "cipher-guard";
// Function to generate a random 6-digit OTP
const generateOTP = () => {
    const digits = '0123456789';
    let OTP = '';
    for (let i = 0; i < 6; i++) {
        OTP += digits[Math.floor(Math.random() * 10)];
    }
    return OTP;
};

const otpGeneration = async (req, res) => {
    const authHeader = req.body.headers.Authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    const token = authHeader.split(' ')[1];
    try {
        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        const emailToSend = decodedToken.email;


        // Generate a 6-digit OTP
        const otp = generateOTP();

        // Save the OTP in the database
        const otpDocument = new OTP({ email: emailToSend, otp });
        await otpDocument.save();

        // Send the OTP via email
        const response = await emailSender({ emailToSend: emailToSend, otp });

        if (response === 200) {
            res.status(200).json({ message: 'OTP generated successfully' });
        } else {
            res.status(409).json({ message: 'Unable to send OTP' });
        }
    } catch (error) {
        console.error('Error generating OTP:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};
function decryptPassword(encryptedPassword) {
    try {
        // Decrypt password
        const encryptionKey = process.env.ENCRYPTION_SECERT_KEY;
        const salt = process.env.ENCRYPTION_SALT;
        const password = decrypt(encryptedPassword, encryptionKey, salt);
        return password;
    } catch (error) {
        // Handle decryption errors
        console.error('Error decrypting password:', error);
        throw new Error('Failed to decrypt password');
    }
}

const otpVerification = async (req, res) => {
    const authHeader = req.body.headers.Authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    const token = authHeader.split(' ')[1];
    try {
        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        const emailToSend = decodedToken.email;

        const { otp, websiteToFind, userName } = req.body;

        // Check if the OTP exists in the database
        const otpDocument = await OTP.findOne({ otp });

        if (otpDocument) {
            let password = '';
            const websites = await Website.find({ websiteName: websiteToFind });
            const websiteData = websites.flatMap(website => {
                if (website.websiteName === websiteToFind) {
                    website.credentials.forEach(credential => {
                        if (userName === credential.userName) {
                            // Decrypt the password before sending it back
                            password = decryptPassword(credential.password);
                        }
                    });
                }
            });

            // Delete the OTP document
            await OTP.deleteOne({ email: emailToSend, otp });
            res.status(200).json({ message: 'OTP verified successfully', password });
        } else {
            res.status(401).json({ message: 'Invalid OTP' });
        }
    } catch (error) {
        console.error('Error verifying OTP:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};



export { otpGeneration, otpVerification };