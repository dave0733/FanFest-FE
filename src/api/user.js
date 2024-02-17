import axios from 'axios';

const baseUrl = 'http://localhost:3000';

export const signUp = async (username, password) => {
  return await axios.post(`${baseUrl}/api/auth/signup`, {
    username,
    password
  });
};

export const signIn = async (username, password) => {
  return await axios.post(`${baseUrl}/api/auth/login`, {
    username,
    password
  });
};
