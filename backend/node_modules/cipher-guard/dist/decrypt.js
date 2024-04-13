"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.decrypt = void 0;
const encrypt_1 = require("./encrypt");
/**
 * Applies the Caesar cipher to a given text.
 * @param text - The input text.
 * @param key - The key for the Caesar cipher.
 * @returns The encrypted text using the Caesar cipher.
 */
const caesarDecipher = (text, key) => {
    key = key % 128;
    return text
        .split("")
        .map((char) => {
        const code = char.charCodeAt(0);
        if (code >= 0 && code <= 127) {
            return String.fromCharCode((code - key + 128) % 128);
        }
        return char;
    })
        .join("");
};
/**
 * Decrypts a text that was encrypted using a Caesar cipher and Base64 encoding.
 * @param encryptedText - The encrypted text.
 * @param ckey - The key for the Caesar cipher.
 * @param salt - The salt added to the text before encryption.
 * @returns The decrypted text.
 */
const decrypt = (encryptedText, ckey, salt) => {
    try {
        const base64Buffer = Buffer.from(encryptedText, "base64");
        const base64Decrypted = base64Buffer.toString("binary");
        const XORDecrypted = (0, encrypt_1.XORCipher)(base64Decrypted, salt);
        const caesarDecrypted = caesarDecipher(XORDecrypted, ckey);
        const sugaredText = caesarDecrypted.slice(0, caesarDecrypted.length - salt.length);
        return sugaredText;
    }
    catch (error) {
        throw new Error("Invalid type of input! Make sure you are passing an appropriate encrypted string.");
    }
};
exports.decrypt = decrypt;
