import mongoose from "mongoose";

const expenseSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    }, category: {
        type: String,
        required: true,
        default: 'Other'
    }
});

export default mongoose.model('Expense', expenseSchema);