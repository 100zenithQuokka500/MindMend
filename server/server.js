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

const allowedOrigins = ["http://localhost:5174" , ""];
const corsOption = {
    origin:function(origin , callback){
        if(!origin || allowedOrigins.includes(origin)){
            callback(null , true);
        }
        else{
            console.log("blocked by origin: " , origin)
        }
    },
    credentials:true,
    optionsSuccessStatus: 200
};

app.use(cors(corsOption));

app.get('/',(req,res)=>{
  res.send('hi')
})
app.use('/api/v1/user', router);

app.listen(port, () => {
  console.log(`Server is running`)
});


