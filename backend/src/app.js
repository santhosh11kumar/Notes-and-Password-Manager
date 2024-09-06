import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser'; // Import body-parser

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

// Configure middleware
app.use(cors(corsOptions));
app.use(express.json({ limit: "24kb" }));
app.use(express.urlencoded({ extended: true, limit: "24kb" }));
app.use(express.static("public"));

// Your other routes and middleware here

// Start your server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
