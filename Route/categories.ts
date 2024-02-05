

import express from 'express';
import {
  createCategory,
  getCategory,
  updateCategory,
  deleteCategory,
  getCategories,
} from '../Controller/CategoryController';

const router = express.Router();

router.post('/create', createCategory);
router.get('/:categoryId', getCategory);
router.patch('/:categoryId/update', updateCategory);
router.delete('/:categoryId/delete', deleteCategory);
router.get('/', getCategories);

export default router;
