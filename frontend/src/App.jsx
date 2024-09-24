/* eslint-disable no-unused-vars */
import React, { Profiler } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Header from './components/Header';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import AddBook from './components/AddBook';
import EditBook from './components/EditBook'; // Assuming you have a route for editing books
import BookList from './components/BookList';
import { AppBar, Tabs, Tab, Box } from '@mui/material';
import { useState } from 'react';
import BookDetails from './pages/BookDetails';
import Profile from './pages/Profile';

const App = () => {
  const user = useSelector(state => state.auth.user); // Get user from Redux store
  const [value, setValue] = useState(0); // State to control active tab

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Router>
      <Header />
      <main className="container mx-auto p-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/books" element={<BookList />} /> 
          <Route path="/books/:id" element={<BookDetails />} />
          <Route path="/profile" element={<Profile />} />

          {/* Conditional rendering for admin features */}
          {user && user.role === 'admin' && (
            <Box sx={{ width: '100%' }}>
              <AppBar position="static">
                <Tabs value={value} onChange={handleChange} aria-label="admin tabs">
                  <Tab label="Add Book" onClick={() => setValue(0)} />
                  <Tab label="Edit Book" onClick={() => setValue(1)} />
                  <Tab label="Delete Book" onClick={() => setValue(2)} />
                </Tabs>
              </AppBar>
              {value === 0 && <AddBook />} {/* Add Book Component */}
              {value === 1 && <EditBook />} {/* Edit Book Component */}
              {value === 2 && <BookList />} {/* Replace with actual DeleteBook component if created */}
            </Box>
          )}
        </Routes>
      </main>
    </Router>
  );
};

export default App;
