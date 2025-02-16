import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import router from './router/auth-router.js';
dotenv.config();

const app = express();
const port =process.env.PORT || 3000; 
app.use(express.json());
connectDB();
app.use(cors());
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send('hi');
});

app.use('/api', router);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});


