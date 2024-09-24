import express from 'express';
import { registerUser, loginUser, getUserProfile, updateUser, borrowBook, returnBook } from '../controllers/userController.js';
import { protect } from '../middlewares/authMiddlware.js'; 

const router = express.Router();

// User Registration
router.post('/register', registerUser);

// User Login
router.post('/login', loginUser);

// Get User Profile (protected)
router.get('/profile', protect, getUserProfile);

// Update User Information (protected)
router.put('/profile', protect, updateUser);

// Borrow a book (protected)
router.post('/borrow', protect, borrowBook);

// Return a book (protected)
router.post('/return', protect, returnBook);

export default router;
