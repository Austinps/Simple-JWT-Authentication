// routes/auth.js
import express from 'express';
import { login, register } from '../controllers/authController.js';
import { renderLogin, renderRegister } from '../controllers/viewController.js';

const router = express.Router();

router.get('/login', renderLogin);
router.get('/register', renderRegister);
router.post('/login', login);
router.post('/register', register);

router.get('/logout', (req, res) => {
  res.clearCookie('token');
  req.user = null;
  res.redirect('/');
});

export default router;
