/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { Container, Typography } from '@mui/material';
import { getAllBooks } from '../api'; // API call to get all books

const BooksList = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const fetchBooks = async () => {
      const booksData = await getAllBooks();
      setBooks(booksData);
    };

    fetchBooks();
  }, []);

  return (
    <Container>
      <Typography variant="h4" className="mt-4 text-center">Available Books</Typography>
      <ul className="mt-4">
        {books.map((book) => (
          <li key={book.id} className="mb-2">
            <strong>{book.title}</strong> by {book.author}
          </li>
        ))}
      </ul>
    </Container>
  );
};

export default BooksList;
