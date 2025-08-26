import express from 'express';
import bodyParser from 'body-parser';
import { signup, signin, logout, currentUser } from '../controller/authController.js';
import { gemini } from '../controller/geminiController.js';
import { authenticateToken } from '../middleware/authMiddleware.js';

const router = express.Router();
router.use(bodyParser.json());

router.post('/signup', signup);
router.post('/signin', signin);
router.get('/logout', logout);
router.get('/me', currentUser);
router.post('/gemini', authenticateToken, gemini);
export default router;
