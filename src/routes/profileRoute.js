import express from 'express';
import { authenticateToken } from '../middleware/authMiddleware.js';
import { 
    getUserData,
    updateUserData,
    findUserData,
    deleteUserData
} from '../controllers/signupController.js';

const router = express.Router();


router.get("/users", authenticateToken, getUserData);

router.put("/user/:fullname", updateUserData);

router.get("/user/:fullname", findUserData);

router.delete("/user/:fullname", deleteUserData);

export default router;