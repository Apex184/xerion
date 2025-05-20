import { Request, Response, Router } from 'express';
import mongoose from 'mongoose';

const router = Router();

router.get('/', (req: Request, res: Response) => {
    const healthcheck = {
        uptime: process.uptime(),
        message: 'OK',
        timestamp: Date.now(),
        mongodb: {
            status: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected',
            readyState: mongoose.connection.readyState
        }
    };

    try {
        res.status(200).json(healthcheck);
    } catch (error) {
        healthcheck.message = (error as Error).message;
        res.status(503).json(healthcheck);
    }
});

export default router;
