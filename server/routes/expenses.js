import express from 'express';
import { getExpenses, createExpense } from '../controllers/expenseController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// The 'protect' middleware runs first, verifying the JWT
router.route('/')
    .get(protect, getExpenses)
    .post(protect, createExpense);

export default router;