import { Router } from 'express';
import {
    joinWaitlist,
    getWaitlist,
    updateWaitlistStatus,
    deleteWaitlistEntry,
} from '../controllers/waitlist';

const router = Router();

// Join waitlist
router.post('/', joinWaitlist);

// Get all waitlist entries
router.get('/', getWaitlist);

// Update waitlist status
router.patch('/:id', updateWaitlistStatus);

// Delete waitlist entry
router.delete('/:id', deleteWaitlistEntry);

export default router; 