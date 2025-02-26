import express from 'express';
import bodyParser from 'body-parser';
import { signup, signin, logout, currentUser } from '../controller/authController.js';
import dotenv from 'dotenv';

const router = express.Router();
router.use(bodyParser.json());

router.post('/signup', signup);
router.post('/signin', signin);
router.get('/logout', logout);
router.get('/me', currentUser);

router.post('/gemini', async (req, res) => {
  const { prompt } = req.body;

  try {
    const response = await axios.
    post('https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=process.env.GEMINI_API_KEY', { prompt });
    res.json({ response: response.data });
  } catch (error) {
    console.error('Error fetching from Gemini API:', error);
    res.status(500).json({ error: 'Unable to get a response from the API' });
  }
});
export default router;
