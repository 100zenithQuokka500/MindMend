import express from 'express';
import bodyParser from 'body-parser';
import { signup, signin } from '../controller/authController.js';

const router = express.Router();
router.use(bodyParser.json());

router.post('/signup', signup);
router.post('/signin', signin);
router.post('/chat', (req, res) => {
  res.status(200).send('Chat');
});

export default router;
