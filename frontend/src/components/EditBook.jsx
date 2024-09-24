/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types'; // Import PropTypes
import { TextField, Button, Typography, Container } from '@mui/material';
import { toast } from 'react-toastify';
import { getBook, updateBook } from '../api'; // Ensure these API functions are defined

const EditBook = ({ bookId }) => {
  const [bookData, setBookData] = useState({
    title: '',
    author: '',
    description: '',
    isbn: '',
  });
  
  const [error, setError] = useState(''); // State to hold error messages

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const book = await getBook(bookId);
        setBookData(book);
      } catch (error) {
        setError('Failed to fetch book details.');
        toast.error('Failed to fetch book details.'); // Notify the user
      }
    };

    fetchBook();
  }, [bookId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBookData({ ...bookData, [name]: value });
    setError(''); // Reset error when user changes input
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateBook(bookId, bookData);
      toast.success('Book updated successfully!');
    } catch (error) {
      setError('Failed to update book.'); // Set error message
      toast.error('Failed to update book: ' + error.message); // Notify the user
    }
  };

  return (
    <Container maxWidth="sm" className="mt-8">
      <Typography variant="h4" className="mb-4 text-center">Edit Book</Typography>
      {error && <Typography color="error" className="text-center">{error}</Typography>} {/* Display error message */}
      <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
        <TextField label="Title" name="title" value={bookData.title} onChange={handleChange} fullWidth required />
        <TextField label="Author" name="author" value={bookData.author} onChange={handleChange} fullWidth required />
        <TextField label="Description" name="description" value={bookData.description} onChange={handleChange} fullWidth required />
        <TextField label="ISBN" name="isbn" value={bookData.isbn} onChange={handleChange} fullWidth required />
        <Button type="submit" variant="contained" color="primary" fullWidth>
          Update Book
        </Button>
      </form>
    </Container>
  );
};

// Define PropTypes for the EditBook component
EditBook.propTypes = {
  bookId: PropTypes.string.isRequired, // bookId is required and should be a string
};

export default EditBook;
