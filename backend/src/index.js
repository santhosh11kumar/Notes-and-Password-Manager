import dotenv from "dotenv";
import connectDB from "./database/index.js";
import { app } from './app.js'

dotenv.config({
    path: './.env'
})



connectDB()
    .then(() => {
        app.listen(process.env.PORT || 8001, () => {
            console.log(`⚙️ Server is running at port : ${process.env.PORT}`);
        })
    })
    .catch((err) => {
        console.log("MONGO db connection failed !!! ", err);
    })


// dotenv.config({
//     path: './'
// })

// const app = express();

// // ify statement
// (async () => {
//     try {
//         await mongoose.connect(`${process.env.MOGODB_URL}/${DB_NAME}`)
//         app.on("error", () => {
//             console.log("MongoDb URL Parmas Error ", error)
//         })
//         app.listen(process.env.PORT, () => {
//             console.log(`MogogDb Connected!! App(Server) is listening at Port No : ${process.env.PORT}`)
//         })
//     } catch (error) {
//         console.log("MongoDB Connection Failed", error)
//     }
// })()
