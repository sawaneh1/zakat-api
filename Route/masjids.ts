// yourMosqueRoutes.ts

import express from 'express';
import { createMasjid, deleteMasjid, getMasjid, getMasjids, updateMasjid } from '../Controller/MasjidController';


const router = express.Router();

router.post('/create', createMasjid);
router.get('/:mosqueId', getMasjid);
router.patch('/:mosqueId/update', updateMasjid);
router.delete('/:mosqueId/delete', deleteMasjid);
router.get('/', getMasjids);

export default router;
