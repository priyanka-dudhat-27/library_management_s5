/* eslint-disable no-unused-vars */
import axios from "axios";

const BASE_URL = import.meta.env.VITE_BASE_URL; // Use the environment variable

const token = localStorage.getItem("token"); // Example of getting a token from local storage

const axiosInstance = axios.create({
  baseURL: "/api", // Your API base URL
  headers: {
    Authorization: `Bearer ${token}`, // Include the token in headers
  },
});

export const registerUser = async (userData) => {
  try {
    const response = await axios.post(`${BASE_URL}/user/register`, userData);
    return response.data; // Return response data
  } catch (error) {
    throw error.response.data; // Throw error response
  }
};

export const loginUser = async (userData) => {
  try {
    const response = await axios.post(`${BASE_URL}/user/login`, userData);
    return response.data; // Return response data
  } catch (error) {
    throw error.response.data; // Throw error response
  }
};

//user profile
export const getUserProfile = async () => {
  const response = await axios.get(`${BASE_URL}/user/profile`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }); 
  return response.data;
};

// .>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>...

// book apis
export const getBook = async (bookId) => {
  const response = await axios.get(`${BASE_URL}/book/getBookById/${bookId}`);
  return response.data;
};

// Function to update a book
export const updateBook = async (bookId, bookData) => {
  const response = await axios.put(
    `${BASE_URL}/book/updateBook/${bookId}`,
    bookData
  );
  return response.data;
};

// Function to delete a book
export const deleteBook = async (bookId) => {
  const response = await axios.delete(`${BASE_URL}/book/deleteBook/${bookId}`);
  return response.data;
};

// Function to create a new book
export const createBook = async (formData) => {
  try {
    const response = await axios.post("/book/addBook", formData, {
      headers: {
        "Content-Type": "multipart/form-data", // Ensure form data is being sent properly
      },
    });
    return response.data;
  } catch (error) {
    throw new Error("Failed to create book");
  }
};

// Function to get all books
export const getAllBooks = async () => {
  const response = await axios.get(`${BASE_URL}/book/getBooks`);
  return response.data;
};

// Borrow a book
export const borrowBook = async (bookId) => {
  const response = await axiosInstance.post(`/book/${bookId}/borrow`);
  return response.data;
};
// Return a book
export const returnBook = async (id) => {
  const response = await axios.post(`/book/${id}/return`);
  return response.data;
};
