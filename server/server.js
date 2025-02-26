import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import router from './router/auth-router.js';
import cookieParser from 'cookie-parser';
dotenv.config();

const app = express();
const port =process.env.PORT || 3000; 
app.use(express.json());
connectDB();
const allowedOrigins = ["http://localhost:5173"];
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
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors(corsOption));

app.get('/', (req, res) => {
  res.send('hi');
});

app.use('/api/v1/user', router);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});


