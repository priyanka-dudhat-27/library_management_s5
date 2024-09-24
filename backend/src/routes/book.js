import express from 'express';
import { getBooks,getBookById, addBook, updateBook, deleteBook, borrowBook, returnBook } from '../controllers/bookController.js';
import { protect, admin } from '../middlewares/authMiddlware.js';
import {upload} from "../utils/uploadImage.js"

const router = express.Router();

// Public routes
router.get('/getBooks/', getBooks);
router.get('/getBookById/:id', getBookById);

// Admin routes
router.post('/addBook',protect,upload.single('image'), addBook);
router.put('/updateBook/:id', protect, admin, updateBook);
router.delete('/deleteBook/:id', protect, admin, deleteBook);

// Borrowing and returning
router.post('/:id/borrow', protect, borrowBook);
router.post('/:id/return', protect, returnBook);

export default router;
