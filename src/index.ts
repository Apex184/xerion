import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import waitlistRoutes from './routes/waitlist';
import healthRoutes from './routes/health';
import contactRoutes from './routes/contact-us';

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;


const allowedOrigins = [
    'http://localhost:5173',
    'https://www.x-autocal.store',
    'https://x-autocal.store'
];

app.use(cors({
    origin: (origin, callback) => {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true
}));

app.use(express.json());

// Routes
app.use('/api/waitlist', waitlistRoutes);
app.use('/api/contact', contactRoutes);
app.use('/health', healthRoutes);

// MongoDB Connection
mongoose
    .connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/xerion')
    .then(() => {
        console.log('✅ Connected to MongoDB');
        app.listen(port, () => {
            console.log(`🚀 Server running on port ${port}`);
        });
    })
    .catch((error) => {
        console.error('❌ MongoDB connection error:', error);
    });
