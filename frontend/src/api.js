import axios from 'axios';

const BASE_URL = import.meta.env.VITE_BASE_URL; // Use the environment variable


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
