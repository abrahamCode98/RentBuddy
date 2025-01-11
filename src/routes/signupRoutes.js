import express from 'express';
import { formValidator } from '../middleware/formValidation.js';
import { createNewUsers } from '../controllers/signupController.js';
import { verifyEmail } from '../controllers/emailVerificationController.js';


const router = express.Router();

router.post("/signup", formValidator, createNewUsers);

router.get("/verify-email/:token", verifyEmail);


export default router;
