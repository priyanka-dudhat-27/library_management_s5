import Book from '../models/bookModel.js';
import BorrowTransaction from '../models/borrowTransactionModel.js';
import fs from 'fs';
import path from 'path';

// Get all books
export const getBooks = async (req, res) => {
    try {
        const books = await Book.find().populate('reviews').exec();
        res.json(books);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

// Add a new book (Admin only)
export const addBook = async (req, res) => {
    const { title, author, genre, publicationDate, description } = req.body;

    // If an image is uploaded, save the file path
    let imagePath = '';
    if (req.file) {
        const tempPath = req.file.path;
        const targetPath = path.join(__dirname, '../uploads', req.file.originalname);
        
        // Move the uploaded file to a permanent location
        fs.rename(tempPath, targetPath, (err) => {
            if (err) return res.status(500).json({ message: 'Error saving image' });
        });
        
        imagePath = `/uploads/${req.file.originalname}`;
    }

    const book = new Book({ title, author, genre, publicationDate, description, image: imagePath, available: true });
    try {
        await book.save();
        res.status(201).json(book);
    } catch (error) {
        res.status(400).json({ message: 'Error adding book' });
    }
};

// Update a book (Admin only)
export const updateBook = async (req, res) => {
    const { title, author, genre, publicationDate, description } = req.body;

    let imagePath = '';
    if (req.file) {
        const tempPath = req.file.path;
        const targetPath = path.join(__dirname, '../uploads', req.file.originalname);
        
        fs.rename(tempPath, targetPath, (err) => {
            if (err) return res.status(500).json({ message: 'Error saving image' });
        });

        imagePath = `/uploads/${req.file.originalname}`;
    }

    try {
        const book = await Book.findByIdAndUpdate(req.params.id, { title, author, genre, publicationDate, description, image: imagePath }, { new: true });
        if (!book) {
            return res.status(404).json({ message: 'Book not found' });
        }
        res.json(book);
    } catch (error) {
        res.status(400).json({ message: 'Error updating book' });
    }
};

// Delete a book (Admin only)
export const deleteBook = async (req, res) => {
    try {
        const book = await Book.findByIdAndDelete(req.params.id);
        if (!book) {
            return res.status(404).json({ message: 'Book not found' });
        }
        
        // Optionally, delete the image file if it exists
        const imageFilePath = path.join(__dirname, '../uploads', path.basename(book.image));
        if (fs.existsSync(imageFilePath)) {
            fs.unlinkSync(imageFilePath);
        }

        res.json({ message: 'Book deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

// Borrow a book
export const borrowBook = async (req, res) => {
    const book = await Book.findById(req.params.id);
    if (!book || !book.available) {
        return res.status(400).json({ message: 'Book not available' });
    }

    book.available = false;
    book.borrowedBy = req.user._id;

    // Create a borrow transaction
    const borrowTransaction = new BorrowTransaction({
        userId: req.user._id,
        bookId: book._id,
        dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) // 7 days from now
    });

    try {
        await borrowTransaction.save();
        await book.save();
        res.status(200).json(book);
    } catch (error) {
        res.status(500).json({ message: 'Error borrowing book' });
    }
};

// Return a book
export const returnBook = async (req, res) => {
    const book = await Book.findById(req.params.id);
    if (!book || book.available || book.borrowedBy.toString() !== req.user._id.toString()) {
        return res.status(400).json({ message: 'Invalid return request' });
    }

    book.available = true;
    book.borrowedBy = null;

    try {
        await book.save();
        await BorrowTransaction.deleteOne({ userId: req.user._id, bookId: book._id });
        res.status(200).json({ message: 'Book returned successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error returning book' });
    }
};
