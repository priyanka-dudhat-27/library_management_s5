/* eslint-disable no-unused-vars */
// src/pages/Home.jsx
import React, { useState, useEffect } from 'react';
import { getAllBooks } from '../api'; // Fetch all books
import BookCard from '../components/BookCard';

const Home = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const getBooks = async () => {
      try {
        const booksData = await getAllBooks(); // Fetch all books
        setBooks(booksData);
      } catch (error) {
        console.error('Error fetching books:', error);
      }
    };

    getBooks();
  }, []);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {books.map((book) => (
        <BookCard
          key={book._id}
          id={book._id} // Pass the book ID for navigation
          title={book.title}
          author={book.author}
          description={book.description}
          image={book.image} // Pass the image URL to the card
        />
      ))}
    </div>
  );
};

export default Home;
