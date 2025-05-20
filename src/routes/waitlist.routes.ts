import express, { Router } from 'express';
import * as waitlistController from '../controllers/waitlist.controller';

const router: Router = express.Router();

router.post('/', waitlistController.joinWaitlist);
router.get('/', waitlistController.getWaitlist);
router.put('/:id', waitlistController.updateWaitlistStatus);
router.delete('/:id', waitlistController.deleteWaitlistEntry);

export default router;