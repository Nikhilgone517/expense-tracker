import Expense from '../models/Expense.js';

// @desc    Get all user expenses
// @route   GET /api/expenses
export const getExpenses = async (req, res) => {
    try {
        // Filter by the user ID attached by the 'protect' middleware
        const expenses = await Expense.find({ user: req.user._id }).sort({ date: -1 });
        res.status(200).json(expenses);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch expenses', error: error.message });
    }
};

// @desc    Create a new expense
// @route   POST /api/expenses
export const createExpense = async (req, res) => {
    const { description, amount, category, date } = req.body;

    if (!description || !amount) {
        return res.status(400).json({ message: 'Please include a description and amount' });
    }

    try {
        const newExpense = await Expense.create({
            user: req.user._id, // Set the user ID from the protected route
            description,
            amount,
            category: category || 'Uncategorized',
            date: date || Date.now(),
        });

        res.status(201).json(newExpense);
    } catch (error) {
        res.status(500).json({ message: 'Failed to create expense', error: error.message });
    }
};