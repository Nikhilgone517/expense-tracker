import express from 'express';
import { loginUser, registerUser } from '../controllers/authController.js';
const router = express.Router();

// Register route
router.post('/signup', registerUser); 

// Login route
router.post('/login', loginUser); 

export default router;
