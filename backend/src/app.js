import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser"; // Import body-parser

const app = express();

// Configure middleware
app.use(cors());
app.use(express.json({ limit: "24kb" }));
app.use(express.urlencoded({ extended: true, limit: "24kb" }));
app.use(express.static("public"));
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));

// Define routes
import userRouter from "./routes/user.routes.js"; // Import userRouter

app.use("/user", userRouter); // Mount userRouter at /users

import passwordRouter from "./routes/password.route.js";
app.use("/v2", passwordRouter)

export { app };
