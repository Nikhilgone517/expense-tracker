import React, { useState } from 'react';
import { useExpenses } from '../context/ExpenseContext.jsx';
import { FaPlus } from 'react-icons/fa'; // Requires: npm install react-icons

const ExpenseForm = () => {
  const { addExpense } = useExpenses();
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('Food'); 
  const [submissionError, setSubmissionError] = useState('');

  const categories = ['Food', 'Transport', 'Bills', 'Entertainment', 'Other'];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmissionError('');

    if (!description || !amount) {
      setSubmissionError('All fields are required.');
      return;
    }

    try {
      await addExpense({ 
          description, 
          amount: parseFloat(amount), 
          category 
      });
      // Reset form on success
      setDescription('');
      setAmount('');
      setCategory('Food');
    } catch (err) {
      setSubmissionError(err || 'Failed to save expense. Please try again.');
    }
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow-md border border-gray-100">
      <h3 className="text-xl font-semibold mb-4 text-indigo-700">Add New Expense</h3>
      {submissionError && <p className="text-red-500 mb-4">{submissionError}</p>}
      
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <input
          type="text"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="col-span-1 md:col-span-2 p-2 border border-gray-300 rounded focus:ring-indigo-500 focus:border-indigo-500"
          required
        />
        <input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="p-2 border border-gray-300 rounded focus:ring-indigo-500 focus:border-indigo-500"
          step="100"
          required
        />
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="p-2 border border-gray-300 rounded focus:ring-indigo-500 focus:border-indigo-500"
        >
          {categories.map(cat => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
        <button
          type="submit"
          className="w-full flex items-center justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-500 hover:bg-green-600 transition"
        >
          <FaPlus className="mr-2"  /> Add
        </button>
      </form>
    </div>
  );
};

export default ExpenseForm;