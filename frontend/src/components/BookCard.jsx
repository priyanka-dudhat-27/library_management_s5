/* eslint-disable no-unused-vars */
import React from 'react';
import PropTypes from 'prop-types';
import { Card, CardMedia, CardContent, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const BookCard = ({ id, title, author, description, image }) => {
  const navigate = useNavigate();

  const handleViewDetails = () => {
    navigate(`/books/${id}`); // Navigate to the book details page
  };

  return (
    <Card className="mb-4">
      {image && <CardMedia component="img" height="200" image={image} alt={title} />}
      <CardContent>
        <Typography variant="h5" component="div">
          {title}
        </Typography>
        <Typography variant="subtitle1" color="text.secondary">
          by {author}
        </Typography>
        <Typography variant="body2">
          {description.length > 100 ? `${description.substring(0, 100)}...` : description}
        </Typography>
        <Button
          variant="contained"
          color="primary"
          className="mt-4"
          onClick={handleViewDetails}
        >
          View Details
        </Button>
      </CardContent>
    </Card>
  );
};

BookCard.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  image: PropTypes.string, // Image URL can be optional
};

export default BookCard;
