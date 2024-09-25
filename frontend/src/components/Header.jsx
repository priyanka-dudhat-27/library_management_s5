/* eslint-disable no-unused-vars */
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../redux/authSlice';

const Header = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = useSelector((state) => state.auth.user);
    
    const handleLogout = () => {
        dispatch(logout());
        navigate('/login');
    };

    return (
        <header className="bg-blue-600 p-4">
            <div className="container mx-auto flex justify-between items-center">
                <h1 className="text-white text-2xl font-bold">Library Management</h1>
                <nav className="space-x-4">
                    <Link to="/" className="text-white hover:text-blue-300 transition duration-200">Home</Link>
                    {user ? (
                        <>
                            <Link to="/profile" className="text-white hover:text-blue-300 transition duration-200">Profile</Link>
                            {user.role === 'admin' && (
                                <>
                                    <Link to="/add-book" className="text-white hover:text-blue-300 transition duration-200">Add Book</Link>
                                    <Link to="/edit-book" className="text-white hover:text-blue-300 transition duration-200">Edit Book</Link>
                                    <Link to="/delete-book" className="text-white hover:text-blue-300 transition duration-200">Delete Book</Link>
                                </>
                            )}
                            <button onClick={handleLogout} className="text-white hover:text-blue-300 transition duration-200">Logout</button>
                        </>
                    ) : (
                        <>
                            <Link to="/login" className="text-white hover:text-blue-300 transition duration-200">Login</Link>
                            <Link to="/register" className="text-white hover:text-blue-300 transition duration-200">Register</Link>
                        </>
                    )}
                </nav>
            </div>
        </header>
    );
};

export default Header;
