import dotenv from "dotenv";
import mongoose from "mongoose";
import { DB_NAME } from "./constants";
import express from "express";

dotenv.config({
    path: './'
})

const app = express();

// ify statement
(async () => {
    try {
        await mongoose.connect(`${process.env.MOGODB_URL}/${DB_NAME}`)
        app.on("error", () => {
            console.log(error)
        })
        app.listen(process.env.PORT, () => {
            console.log(`App is listening at Port No : ${process.env.PORT}`)
        })
    } catch (error) {
        console.log(error)
    }
})()
