import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser"; // Import body-parser

const app = express();
// Define allowed origins
const allowedOrigins = [
  'https://notes-and-password-manager.vercel.app',
  'https://notes-and-password-manager-9i7j.onrender.com'
];

// Create CORS options with dynamic origin checking
const corsOptions = {
  origin: function (origin, callback) {
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
};

app.use(cors(corsOptions));
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
