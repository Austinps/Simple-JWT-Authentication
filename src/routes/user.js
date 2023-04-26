// routes/user.js
import express from 'express';
import {
  renderEditProfile,
  renderProfile,
} from '../controllers/viewController.js';
import {
  updateUserProfile,
  updateUserPassword,
} from '../controllers/userController.js';

const router = express.Router();

router.get('/profile', renderProfile);
router.get('/edit-profile', renderEditProfile);
router.post('/:userId/update-profile', updateUserProfile);
router.post('/:userId/update-password', updateUserPassword);

export default router;
