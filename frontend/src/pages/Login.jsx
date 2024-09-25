/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../redux/authSlice';
import { TextField, Button, Typography, Container } from '@mui/material';
import { toast } from 'react-toastify';
import { loginUser } from '../api';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({ email: '', password: '' });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await loginUser(formData);
            if (response && response.token) {
                localStorage.setItem('token', response.token);
                dispatch(login({
                    email: response.email,
                    name: response.name,
                    role: response.role,
                    token: response.token
                }));
                toast.success('Login successful!');
                navigate('/profile');
            } else {
                toast.error('Invalid login credentials');
            }
        } catch (error) {
            toast.error('Login failed, please try again.');
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
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    variant="outlined"
                    fullWidth
                />
                <TextField
                    label="Password"
                    name="password"
                    type="password"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
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
