import express from 'express';
import bodyParser from 'body-parser';
import { signup, signin, logout, currentUser } from '../controller/authController.js';
import dotenv from 'dotenv';
import { gemini } from '../controller/geminiController.js';

const router = express.Router();
router.use(bodyParser.json());

router.post('/signup', signup);
router.post('/signin', signin);
router.get('/logout', logout);
router.get('/me', currentUser);
router.post('/gemini', gemini);
export default router;
