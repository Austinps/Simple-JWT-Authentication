// middleware/errorHandler.js

import { encode } from 'html-entities';

export const authLinks = [
  { href: '/auth/login', text: 'Log in' },
  { href: '/auth/register', text: 'Sign up' },
];

export const userLinks = [
  { href: '/', text: 'Home' },
  { href: '/user/dashboard', text: 'Dashboard' },
  { href: '/user/profile', text: 'Profile' },
  { href: '/auth/logout', text: 'Log out' },
];

export const errorHandler = (err, req, res, next) => {
  // Log the error to the console
  console.error(err.stack);

  // Set the appropriate status code
  res.status(err.status || 500);

  // Sanitize user input to prevent XSS attacks
  const sanitizedError = encode(err.message);

  // Render the error page with links appropriate to the user's authentication status
  const token = req.cookies.token;
  if (token) {
    res.render('error', { error: sanitizedError, links: userLinks });
  } else {
    res.render('error', { error: sanitizedError, links: authLinks });
  }
};
