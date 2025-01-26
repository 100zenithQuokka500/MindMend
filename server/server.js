import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import router from './router/auth-router.js';
//import { getGeminiData } from './gemini.js';

dotenv.config();

const app = express();
const port = 3000;

connectDB();
app.use(cors());
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send('Hello World');
});

app.use("/api", router);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

app.post('/api/gemini', async (req, res) => {
  const { prompt } = req.body;
  try {
    const response = await getGeminiData(`generateContent?prompt=${encodeURIComponent(prompt)}`);
    res.json({ response: response });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Failed to get response from Gemini API' });
  }
});
