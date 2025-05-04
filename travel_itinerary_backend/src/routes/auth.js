import express from 'express';
import { signup, login, getCurrentUser, updateProfile, updateNotifications, changePassword, updatePaymentMethod } from '../controllers/authController.js';
import { authMiddleware } from '../middleware/auth.js';

export const router = express.Router();

// Public routes
router.post('/signup', signup);
router.post('/login', login);

// Protected routes
router.get('/me', authMiddleware, getCurrentUser);
router.put('/profile', authMiddleware, updateProfile);
router.put('/change-password', authMiddleware, changePassword);
router.put('/notifications', authMiddleware, updateNotifications);
router.put('/payment-method', authMiddleware, updatePaymentMethod);

// Note: Using "export const router" instead of "export default router" 