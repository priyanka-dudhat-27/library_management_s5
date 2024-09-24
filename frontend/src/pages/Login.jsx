/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../redux/authSlice'; // Ensure this is correctly pointing to your auth slice
import { TextField, Button, Typography, Container } from '@mui/material';
import { toast } from 'react-toastify';
import { loginUser } from '../api';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Initialize navigate
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    if (!formData.email) newErrors.email = 'Email is required';
    if (!formData.password) newErrors.password = 'Password is required';
    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      try {
        // Call the API to login the user
        const response = await loginUser(formData);
        // Dispatch the login action with user info
        dispatch(login({ email: response.email })); // Ensure your API returns the email
        toast.success('Login successful!'); 

        // Navigate to the home page
        navigate('/'); // Replace with the route to your home page

        // Reset form
        setFormData({ email: '', password: '' });
        setErrors({});
      } catch (error) {
        toast.error(error.message); // Show error toast
      }
    }
  };

  return (
    <Container maxWidth="sm" className="mt-8">
      <Typography variant="h4" className="mb-4 text-center">Login</Typography>
      <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
        <TextField
          label="Email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          error={!!errors.email}
          helperText={errors.email}
          variant="outlined"
          fullWidth
        />
        <TextField
          label="Password"
          name="password"
          type="password"
          value={formData.password}
          onChange={handleChange}
          error={!!errors.password}
          helperText={errors.password}
          variant="outlined"
          fullWidth
        />
        <Button type="submit" variant="contained" color="primary" fullWidth>
          Login
        </Button>
      </form>
    </Container>
  );
};

export default Login;
