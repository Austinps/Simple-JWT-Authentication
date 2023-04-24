// routes/auth.js
import express from 'express';
import { login, register } from '../controllers/authController.js';
import { renderLogin, renderRegister } from '../controllers/viewController.js';

const router = express.Router();

router.get('/login', renderLogin);
router.get('/register', renderRegister);
router.post('/login', login);
router.post('/register', register);

router.post('/logout', (req, res) => {
  res.clearCookie('token');
  res.redirect('/auth/login');
});

export default router;
