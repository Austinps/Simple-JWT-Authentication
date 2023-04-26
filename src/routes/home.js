// routes/home.js
import { Router } from 'express';
import { homeHandler } from '../controllers/homeController.js';

const router = Router();

router.get('/', homeHandler);

export default router;
