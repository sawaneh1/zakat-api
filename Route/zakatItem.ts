

import express from 'express';
import { createZakatItem } from '../Controller/ZakatItemsController';


const router = express.Router();

router.post('/create', createZakatItem);


export default router;
