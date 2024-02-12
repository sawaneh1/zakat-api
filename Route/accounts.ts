
import express from 'express';

import { createAccount } from '../Controller/AccountsControllers';

const router = express.Router();

router.post('/create', createAccount);

export default router;
