

import { addWebsiteCredentials, retrieveWebsiteCredentials, retrieveWebsiteDetails } from "../controllers/passwordManager.controller.js";
import { Router } from "express";
import { otpGeneration, otpVerification } from "../controllers/otp.controller.js"

const router = Router();
router.route("/AddPassword").post(addWebsiteCredentials);
router.route("/PasswordManager").get(retrieveWebsiteDetails);
router.get('/PasswordManager/:websiteName', retrieveWebsiteCredentials);
router.post('/generate-otp', otpGeneration);
router.post('/verify-otp', otpVerification);

export default router;


// Route to retrieve credentials data for a specific website