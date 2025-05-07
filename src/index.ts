import express, { Express } from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import waitlistRoutes from './routes/waitlist.routes';

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 5000;
app.use(cors());
app.use(express.json());


app.use('/api/waitlist', waitlistRoutes);


mongoose
    .connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/xerion')
    .then(() => {
        console.log('Connected to MongoDB');
        app.listen(port, () => {
            console.log(`Server is running on port ${port}`);
        });
    })
    .catch((error) => {
        console.error('MongoDB connection error:', error);
    }); 