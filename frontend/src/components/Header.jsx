/* eslint-disable no-unused-vars */
// src/components/Header.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="bg-blue-600 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-white text-2xl font-bold">Library Management</h1>
        <nav className="space-x-4">
          <Link to="/" className="text-white hover:text-blue-300 transition duration-200">
            Home
          </Link>
          <Link to="/login" className="text-white hover:text-blue-300 transition duration-200">
            Login
          </Link>
          <Link to="/register" className="text-white hover:text-blue-300 transition duration-200">
            Register
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
