import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import router from './router/auth-router.js';
import cookieParser from 'cookie-parser';
dotenv.config();

const app = express();
const port =process.env.PORT || 3000; 

app.use(express.json());
app.use(express.urlencoded({extended:true,limit:"16kb"}))
app.use(cookieParser())

connectDB();

const corsOption = {
  origin: process.env.CORS_ORIGIN,
  credentials:true
}
app.use(cors(corsOption));

app.get('/',(req,res)=>{
  res.send('hi')
})
app.use('/api/v1/user', router);

app.listen(port, () => {
  console.log(`Server is running on port http://localhost:${port}`)
});


