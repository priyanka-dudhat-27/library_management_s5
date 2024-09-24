/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getBook, borrowBook, returnBook } from '../api';
import { Button, Typography, Container, Card, CardContent, CardMedia } from '@mui/material';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux'; // Import useSelector to get the user state

const BookDetails = () => {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user); // Get user from Redux store

  useEffect(() => {
    const getBookDetails = async () => {
      try {
        const bookData = await getBook(id);
        console.log('Fetched Book Data:', bookData);
        setBook(bookData);
      } catch (error) {
        toast.error('Error fetching book details');
      }
    };

    getBookDetails();
  }, [id]);

  const handleBorrow = async () => {
    if (!user) {
      toast.warn('You need to log in to borrow a book.');
      navigate('/login'); // Redirect to login if the user is not authenticated
      return;
    }
    try {
      await borrowBook(id);
      toast.success('Book borrowed successfully');
      navigate('/');
    } catch (error) {
      toast.error('Failed to borrow the book');
    }
  };

  const handleReturn = async () => {
    if (!user) {
      toast.warn('You need to log in to return a book.');
      navigate('/login'); // Redirect to login if the user is not authenticated
      return;
    }
    try {
      await returnBook(id);
      toast.success('Book returned successfully');
      navigate('/');
    } catch (error) {
      toast.error('Failed to return the book');
    }
  };

  if (!book) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <Container maxWidth="md" sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: 2 }}>
      <Card sx={{ flexGrow: 1 }}>
        {book.image && (
          <CardMedia
            component="img"
            alt={book.title}
            sx={{
              height: 400,
              width: '100%',
              objectFit: 'cover',
            }}
            image={book.image} 
            title={book.title}
          />
        )}
        <CardContent>
          <Typography variant="h3" className="mb-4">{book.title}</Typography>
          <Typography variant="h6" className="text-gray-500 mb-4">by {book.author}</Typography>
          <Typography variant="body2" color="textSecondary" className="mb-4">
            Published: {new Date(book.publishedDate).toLocaleDateString()}
          </Typography>
          <Typography variant="body1" className="mb-6">{book.description}</Typography>
          {book.genre && (
            <Typography variant="body2" color="textSecondary" className="mb-4">
              Genre: {book.genre}
            </Typography>
          )}
          <div className="space-x-4">
            <Button variant="contained" color="primary" onClick={handleBorrow}>Borrow</Button>
            <Button variant="outlined" color="secondary" onClick={handleReturn}>Return</Button>
          </div>
        </CardContent>
      </Card>
    </Container>
  );
};

export default BookDetails;
