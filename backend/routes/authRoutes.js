import express from 'express';
import { loginLimiter } from '../middlewares/rateLimiter.js';
import * as authController from '../controllers/authController.js';

const router = express.Router();

// Routes
router.post('/register', authController.register);
router.post('/login',loginLimiter, authController.login);

export default router;
