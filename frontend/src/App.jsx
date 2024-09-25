/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Header from './components/Header';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import AddBook from './components/AddBook';
import EditBook from './components/EditBook'; // Assuming you have a route for editing books
import BookList from './components/BookList'; // Assuming this shows a list of books, including Delete functionality
import { AppBar, Tabs, Tab, Box } from '@mui/material';
import BookDetails from './pages/BookDetails';
import Profile from './pages/Profile';

const App = () => {
  const user = useSelector(state => state.auth.user); // Get user from Redux store
  const [value, setValue] = useState(0); // State to control active tab in admin panel

  // Handle changing between admin tabs
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Router>
      <Header /> {/* Persistent header */}
      
      <main className="container mx-auto p-4">
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/books" element={<BookList />} /> 
          <Route path="/books/:id" element={<BookDetails />} />
          <Route path="/profile" element={<Profile />} />

          {/* Conditional Routes for Admin */}
          {user && user.role === 'admin' && (
            <Route
              path="/admin"
              element={(
                <Box sx={{ width: '100%' }}>
                  <AppBar position="static">
                    <Tabs value={value} onChange={handleChange} aria-label="admin tabs">
                      <Tab label="Add Book" />
                      <Tab label="Edit Book" />
                      <Tab label="Delete Book" />
                    </Tabs>
                  </AppBar>
                  {value === 0 && <AddBook />} {/* Add Book Component */}
                  {value === 1 && <EditBook />} {/* Edit Book Component */}
                  {value === 2 && <BookList />} {/* Show BookList, assuming delete functionality is included */}
                </Box>
              )}
            />
          )}
        </Routes>
      </main>
    </Router>
  );
};

export default App;
