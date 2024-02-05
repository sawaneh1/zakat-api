// yourNisabRoutes.ts

import express from 'express';
import {
  createNisab,
  getNisab,
  updateNisab,
  deleteNisab,
 
} from '../Controller/NisabController';

const router = express.Router();

router.post('/create', createNisab);
router.get('/:nisabId', getNisab);
router.patch('/:nisabId/update', updateNisab);
router.delete('/:nisabId/delete', deleteNisab);


export default router;
