import React, { useEffect } from 'react';
import { useExpenses } from '../context/ExpenseContext.jsx';
import { FaSpinner, FaTag, FaDollarSign } from 'react-icons/fa';

const ExpenseList = () => {
  const { expenses, loading, error, fetchExpenses } = useExpenses();

  useEffect(() => {
    fetchExpenses();
  }, []); // Run only on component mount

  if (loading) {
    return (
      <div className="flex justify-center items-center h-40">
        <FaSpinner className="animate-spin text-indigo-500 text-3xl" />
        <p className="ml-3 text-lg text-gray-600">Loading transactions...</p>
      </div>
    );
  }

  if (error) {
    return <div className="p-4 bg-red-100 text-red-700 rounded">{error}</div>;
  }

  if (expenses.length === 0) {
    return (
      <div className="p-6 bg-yellow-100 text-yellow-700 rounded border-l-4 border-yellow-500">
        No expenses recorded yet. Add one above!
      </div>
    );
  }
  
  // Helper to format date nicely
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  return (
    <div className="mt-8">
      <h3 className="text-2xl font-semibold mb-4 text-gray-700">Recent Transactions</h3>
      <div className="space-y-3">
        {expenses.map((expense) => (
          <div 
            key={expense._id} 
            className="flex justify-between items-center p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition duration-150 border border-gray-200"
          >
            {/* Description and Date */}
            <div className="grow">
              <p className="text-lg font-medium text-gray-800">{expense.description}</p>
              <div className="flex items-center text-sm text-gray-500 mt-1">
                <FaTag className="mr-2 text-indigo-400" />
                <span className="font-semibold mr-3">{expense.category}</span> 
                | {formatDate(expense.date)}
              </div>
            </div>

            {/* Amount */}
            <div className="text-right">
              <p className="text-xl font-bold text-red-600 flex items-center">
                <FaDollarSign className="text-lg mr-1"/>
                
                {expense.amount.toFixed(2)}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExpenseList;