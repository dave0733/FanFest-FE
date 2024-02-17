import React from 'react';
import ReactDOM from 'react-dom/client';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import theme from './theme.js';
import SignIn from './pages/login.jsx';
import SignUp from './pages/signup.jsx';
import { Toaster } from 'react-hot-toast';
import Game from './pages/game.jsx';
import { AuthProvider } from './context/Auth.jsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <SignIn />
  },
  {
    path: '/signup',
    element: <SignUp />
  },
  {
    path: '/game',
    element: <Game />
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <ThemeProvider theme={theme}>
    <AuthProvider>
      {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
      <CssBaseline />
      <Toaster position="top-right" reverseOrder={true} />
      <RouterProvider router={router} />
    </AuthProvider>
  </ThemeProvider>
);
