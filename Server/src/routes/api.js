import { Router } from 'express';
import { registerMember } from '../controllers/member.controller.js';
import { initiateDonation } from '../controllers/donation.controller.js';

const router = Router();

// Routes Membres
router.post('/members/register', registerMember);

// Routes Dons
router.post('/donations/init', initiateDonation);

export default router;
