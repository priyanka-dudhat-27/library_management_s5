/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../redux/authSlice';
import { TextField, Button, Typography, Container, MenuItem, Select, FormControl, InputLabel } from '@mui/material';
import { toast } from 'react-toastify';
import { registerUser } from '../api'; // Import the API function

const Register = () => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: '', // Added role field
  });

  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = 'Name is required';
    if (!formData.email) newErrors.email = 'Email is required';
    if (!formData.password) newErrors.password = 'Password is required';
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    if (!formData.role) newErrors.role = 'Role is required'; // Validate role
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
        // Call the API to register the user
        const response = await registerUser(formData);
        dispatch(login({ email: response.email })); // Assuming the API response contains the email
        toast.success('Registration successful!');
        setFormData({ name: '', email: '', password: '', confirmPassword: '', role: '' }); // Reset form
        setErrors({});
      } catch (error) {
        toast.error(error.message); // Show error toast
      }
    }
  };

  return (
    <Container maxWidth="sm" className="mt-8">
      <Typography variant="h4" className="mb-4 text-center">Register</Typography>
      <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
        <TextField
          label="Name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          error={!!errors.name}
          helperText={errors.name}
          variant="outlined"
          fullWidth
        />
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
        <TextField
          label="Confirm Password"
          name="confirmPassword"
          type="password"
          value={formData.confirmPassword}
          onChange={handleChange}
          error={!!errors.confirmPassword}
          helperText={errors.confirmPassword}
          variant="outlined"
          fullWidth
        />
        
        {/* Role selection dropdown */}
        <FormControl variant="outlined" fullWidth error={!!errors.role}>
          <InputLabel>Role</InputLabel>
          <Select
            name="role"
            value={formData.role}
            onChange={handleChange}
            label="Role"
          >
            <MenuItem value="user">User</MenuItem>
            <MenuItem value="admin">Admin</MenuItem>
          </Select>
          {errors.role && <p className="text-red-600">{errors.role}</p>}
        </FormControl>
        
        <Button type="submit" variant="contained" color="primary" fullWidth>
          Register
        </Button>
      </form>
    </Container>
  );
};

export default Register;
