import { Router } from 'express';
import {
    contactUs
} from '../controllers/contact';

const router = Router();

router.post('/', contactUs);


export default router; 