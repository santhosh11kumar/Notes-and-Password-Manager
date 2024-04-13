import { Router } from "express";

import { verifyJWT } from "../middlewares/auth.middleware.js";
import {
    registerUser,
    loginUser,
    logoutUser,
    refreshAccessToken

} from "../controllers/user.controller.js";

const router = Router();

router.post("/register", registerUser); // Define route for user registration

router.route("/login").post(loginUser);



//secured routes
router.route("/logout").post(verifyJWT, logoutUser)

router.route("/refresh-token").post(refreshAccessToken)

export default router;
