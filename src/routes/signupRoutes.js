import express from 'express';
import { formValidator } from '../middleware/formValidation.js';
import { createNewUsers } from '../controllers/signupController.js';


const router = express.Router();

router.post("/signup", formValidator, createNewUsers);


export default router;
