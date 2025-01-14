import express from 'express';
import { verifyEmail } from '../controllers/emailVerificationController.js';

const router = express.Router();

router.get("/verify-email", verifyEmail);