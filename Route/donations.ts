// yourDonationRoutes.ts

import express from 'express';
import { createDonation, getAllDonations, getDonation } from '../Controller/DonationsController';


const router = express.Router();

router.post('/create', createDonation);
router.get('/:donationId', getDonation);
// router.patch('/:donationId/update', updateDonation);
// router.delete('/:donationId/delete', deleteDonatin);
router.get('/', getAllDonations);

export default router;
