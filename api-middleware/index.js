import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import roleRoute from './routes/role.js';
import authRoute from './routes/auth.js';
import userRoute from './routes/user.js';
import jobOfferRoute from './routes/jobOffer.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';
//import { dropUserIdIndex } from './models/JobOffer.js';

const app = express();
dotenv.config();

const corsOptions = {
    origin: 'http://localhost:4200', // frontend URL
    credentials: true,
  };
  
app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());

app.use("/api/role", roleRoute);
app.use("/api/auth", authRoute);
app.use("/api/user", userRoute);
app.use("/api/jobOffer", jobOfferRoute);

//Response Handler Middleware
app.use((obj, req, res, next)=>{
    const statusCode = obj.status || 200;
    const message = obj.message || "Something went wrong!";
    return res.status(statusCode).json({
        success: [200,201,204].some(a=>a === obj.status) ? true : false,
        status: statusCode,
        message: message,
        data: obj.data
    });
});

//DB Connection
const connectMongoDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL, {
            // useNewUrlParser: true, // Optional but recommended for compatibility
            // useUnifiedTopology: true // Optional but recommended for compatibility
        });
        console.log("Connected to Database!");
        //await dropUserIdIndex();
        
    } catch (error) {
        console.error("Could not connect to MongoDB. Exiting now...", error);
        process.exit(1); // Exit the process with an error code
    }
}

// Define a route handler for the default home page
app.get('/', (req, res) => {
    res.send('Hello, World!');
  });


app.listen(8800, () => {
    connectMongoDB();
    console.log("Connected to backend!!");
});
