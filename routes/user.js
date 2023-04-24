// routes/protected.js
import express from 'express';

const router = express.Router();

router.get('/dashboard');

router.get('/profile');

export default router;
