import { io } from 'socket.io-client';

// "undefined" means the URL will be computed from the `window.location` object
const URL =
  process.env.NODE_ENV === 'production' ? undefined : 'http://localhost:3000';

let socket;

export const getSocket = (token) => {
  if (!token) return;

  socket =
    socket ||
    io(URL, {
      extraHeaders: {
        access_token: token
      }
    });

  return socket;
};
