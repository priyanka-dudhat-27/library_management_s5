/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { getAllBooks } from '../api'; // Ensure your getAllBooks function is defined
import { Typography, Container, Button } from '@mui/material';

const AllBooks = () => {
  const [books, setBooks] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const data = await getAllBooks();
        setBooks(data);
      } catch (error) {
        setError('Failed to fetch books.');
      }
    };

    fetchBooks();
  }, []);

  return (
    <Container className="mt-8">
      <Typography variant="h4" className="mb-4 text-center">All Books</Typography>
      {error && <Typography color="error" className="text-center">{error}</Typography>}
      <div className="grid grid-cols-1 gap-4">
        {books.map((book) => (
          <div key={book.id} className="p-4 border border-gray-300 rounded">
            <Typography variant="h6">{book.title}</Typography>
            <Typography variant="body1">Author: {book.author}</Typography>
            <Typography variant="body2">ISBN: {book.isbn}</Typography>
            <Typography variant="body2">{book.description}</Typography>
            <Button variant="outlined" color="primary">Edit</Button>
            <Button variant="outlined" color="secondary" className="ml-2">Delete</Button>
          </div>
        ))}
      </div>
    </Container>
  );
};

export default AllBooks;
