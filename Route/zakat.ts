// yourCategoryRoutes.ts

import express from 'express';
import { ZakatPayable, createZakat } from '../Controller/ZakatController';


const router = express.Router();

router.post('/create', createZakat);
router.post('/calcullate_zakat', ZakatPayable);


export default router;
