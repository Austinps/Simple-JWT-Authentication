// routes/protected.js
import express from 'express';
import {
  renderDashboard,
  renderProfile,
} from '../controllers/viewController.js';

const router = express.Router();

router.get('/dashboard', renderDashboard);
router.get('/profile', renderProfile);

export default router;
