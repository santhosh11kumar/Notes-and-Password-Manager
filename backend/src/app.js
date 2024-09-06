import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser"; // Import body-parser

const app = express();

// Define allowed origins (if needed)
const allowedOrigins = [
  'https://notes-and-password-manager.vercel.app',
  'https://notes-and-password-manager-9i7j.onrender.com'
];

// Configure CORS
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

// Configure middleware
app.use(express.json({ limit: "24kb" }));
app.use(express.urlencoded({ extended: true, limit: "24kb" }));
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

// Define routes
import userRouter from "./routes/user.routes.js"; // Import userRouter
import passwordRouter from "./routes/password.route.js"; // Import passwordRouter

app.use("/user", userRouter); // Mount userRouter at /user
app.use("/v2", passwordRouter); // Mount passwordRouter at /v2

export { app };
