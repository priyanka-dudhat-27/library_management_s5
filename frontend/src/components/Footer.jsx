/* eslint-disable no-unused-vars */
import React from 'react';
import { Container, Typography } from '@mui/material';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-4">
      <Container>
        <Typography variant="body1" align="center">
          &copy; {new Date().getFullYear()} Library Management. All rights reserved.
        </Typography>
      </Container>
    </footer>
  );
};

export default Footer;
