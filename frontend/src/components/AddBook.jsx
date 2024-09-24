/* eslint-disable no-unused-vars */
// src/components/AddBook.jsx
import React, { useState } from 'react';
import { TextField, Button, Typography } from '@mui/material';
import { toast } from 'react-toastify';
import { createBook } from '../api'; // Import the API function

const AddBook = () => {
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    description: '',
    image: null, // Add an image field to the form data
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, image: e.target.files[0] }); // Store the selected file in form data
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const data = new FormData(); // Create a new FormData object
    data.append('title', formData.title);
    data.append('author', formData.author);
    data.append('description', formData.description);
    data.append('image', formData.image); // Append the image file

    try {
      await createBook(data); // Send the FormData object to the API
      toast.success('Book created successfully');
    } catch (error) {
      toast.error('Failed to create book');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Typography variant="h4" className="mb-4">Add Book</Typography>
      <TextField
        label="Title"
        name="title"
        value={formData.title}
        onChange={handleChange}
        fullWidth
      />
      <TextField
        label="Author"
        name="author"
        value={formData.author}
        onChange={handleChange}
        fullWidth
      />
      <TextField
        label="Description"
        name="description"
        value={formData.description}
        onChange={handleChange}
        fullWidth
        multiline
        rows={4}
      />
      <input type="file" onChange={handleFileChange} />
      <Button type="submit" variant="contained" color="primary">
        Add Book
      </Button>
    </form>
  );
};

export default AddBook;
