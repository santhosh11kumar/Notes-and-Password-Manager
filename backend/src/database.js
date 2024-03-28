const mongoose = require("mongoose");
const blog = require("../constant");
const DB_NAME = blog.DB_NAME;

require("dotenv").config();

const dbConnect = async () => {
    try {
        const connectionInstance = await mongoose.connect(`${process.env.DATABASE_URL}/${DB_NAME}`);
        console.log(`MongoDB connected to server ${connectionInstance.connection.host}`);
    } catch (error) {
        console.log("MongoDB not connected to server", error);
        process.exit(1);
    }
}

module.exports = dbConnect;
