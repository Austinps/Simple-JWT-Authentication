// middleware/auth.js
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

export const isAuthenticated = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res.redirect('/auth/login');
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    console.error(err);
    res.redirect('/auth/login');
  }
};

export const authenticate = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return next();
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.userId);
    if (!user) {
      return next();
    }
    res.locals.token = token;
    res.locals.user = user;
    req.user = decoded;
    next();
  } catch (err) {
    console.error(err);
    return next();
  }
};
