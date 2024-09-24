import Book from '../models/bookModel.js';
import BorrowTransaction from '../models/borrowTransactionModel.js';
import Review from '../models/reviewModel.js';  // Ensure this path points to where you defined the reviewModel
import fs from 'fs';
import path from 'path';

// Get all books
export const getBooks = async (req, res) => {
    try {
        const books = await Book.find().populate('reviews').exec();
        res.json(books);
    } catch (error) {
        console.error('Error fetching books:', error); // Log the error for debugging
        res.status(500).json({ message: 'Server error', error: error.message }); // Include error message in response for debugging
    }
};


// Add a new book (Admin only)
export const addBook = async (req, res) => {
    const { title, author, genre, publicationDate, description, image } = req.body;

    // Validate publication date
    const pubDate = new Date(publicationDate);
    if (isNaN(pubDate.getTime())) {
        return res.status(400).json({ message: 'Invalid publication date' });
    }

    const book = new Book({
        title,
        author,
        genre,
        publicationDate: pubDate,
        description,
        image,
        available: true
    });

    try {
        await book.save();
        res.status(201).json(book);
    } catch (error) {
        console.error(error); // Log the error for debugging
        res.status(400).json({ message: error.message }); // Return the error message
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


export const getBookById = async (req, res) => {
    const { id } = req.params; // Extract the ID from the request parameters

    try {
        // Find the book by ID and populate reviews if necessary
        const book = await Book.findById(id).populate('reviews.user'); // Populate reviews with user details
        
        // If the book is not found, return a 404 error
        if (!book) {
            return res.status(404).json({ message: 'Book not found' });
        }
        
        // Return the found book with all details
        res.status(200).json(book);
    } catch (error) {
        console.error(error); // Log the error for debugging
        res.status(500).json({ message: 'Error retrieving book' });
    }
};
//review

// Example function to create a review
export const createReview = async (req, res) => {
  try {
    const { bookId, userId, rating, comment } = req.body;

    // Create a new review
    const review = new Review({
      book: bookId,
      user: userId,
      rating,
      comment
    });

    await review.save();  // Save the review in the database

    res.status(201).json({ message: 'Review created successfully', review });
  } catch (error) {
    res.status(500).json({ error: 'Failed to create review' });
  }
};
