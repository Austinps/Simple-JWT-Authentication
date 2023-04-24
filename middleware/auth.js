// middleware/auth.js
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const decodeToken = async (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return null;
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.userId);
    if (!user) {
      return null;
    }
    return { decoded, user };
  } catch (err) {
    console.error(err);
    return null;
  }
};

export const isAuthenticated = async (req, res, next) => {
  const decodedUser = await decodeToken(req, res, next);
  if (!decodedUser) {
    return res.redirect('/auth/login');
  }
  req.user = decodedUser.user;
  next();
};

export const authenticate = async (req, res, next) => {
  const decodedUser = await decodeToken(req, res, next);
  if (decodedUser) {
    res.locals.token = req.cookies.token;
    res.locals.user = decodedUser.user;
  }
  next();
};
