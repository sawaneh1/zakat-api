

import express from 'express';
import {
  createHelpRequest,
  getHelpRequest,
  updateHelpRequest,
  deleteHelpRequest,
  getHelpRequests,
} from '../Controller/RequestController';

const router = express.Router();

router.post('/create', createHelpRequest);
router.get('/:helpRequestId', getHelpRequest);
router.patch('/:helpRequestId/update', updateHelpRequest);
router.delete('/:helpRequestId/delete', deleteHelpRequest);
router.get('/', getHelpRequests);

export default router;
