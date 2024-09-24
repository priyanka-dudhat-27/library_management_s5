/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import PropTypes from 'prop-types'; // Import PropTypes
import { Button, Typography, Container } from '@mui/material';
import { toast } from 'react-toastify';
import { deleteBook } from '../api'; // Ensure your deleteBook function is defined

const DeleteBook = ({ bookId }) => {
  const [error, setError] = useState(''); // State to hold error messages

  const handleDelete = async () => {
    try {
      await deleteBook(bookId);
      toast.success('Book deleted successfully!');
    } catch (error) {
      setError('Failed to delete book.'); // Set error message
      toast.error('Failed to delete book: ' + error.message); // Notify the user
    }
  };

  return (
    <Container className="mt-8">
      <Typography variant="h4" className="mb-4 text-center">Delete Book</Typography>
      {error && <Typography color="error" className="text-center">{error}</Typography>} {/* Display error message */}
      <Button variant="contained" color="secondary" onClick={handleDelete}>
        Delete Book
      </Button>
    </Container>
  );
};

// Define PropTypes for the DeleteBook component
DeleteBook.propTypes = {
  bookId: PropTypes.string.isRequired, // bookId is required and should be a string
};

export default DeleteBook;
