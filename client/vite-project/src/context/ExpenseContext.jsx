import React, { createContext, useState, useContext } from 'react';
import axios from 'axios';
import { useAuth } from './AuthContext.jsx'; 


const ExpenseContext = createContext();

const API_BASE_URL = 'http://localhost:5004/api/expenses'; 

export const ExpenseProvider = ({ children }) => {
  const { user, logout } = useAuth(); // We need the user and token
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Helper function to get the authorization header
  const getConfig = () => ({
    headers: {
      Authorization: `Bearer ${user?.token}`, // Use optional chaining to be safe
    },
  });

  // 1. Fetch Expenses (Read Operation)
  const fetchExpenses = async () => {
    if (!user) return; 

    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(API_BASE_URL, getConfig());
      setExpenses(response.data);
    } catch (err) {
      console.error("Error fetching expenses:", err);
      setError(err.response?.data?.message || 'Failed to fetch expenses.');
      // Handle 401 Unauthorized errors (token expired)
      if (err.response?.status === 401) {
          logout();
      }
    } finally {
      setLoading(false);
    }
  };

  // 2. Add New Expense (Create Operation)
  const addExpense = async (expenseData) => {
    if (!user) return; 

    setError(null);
    try {
      const response = await axios.post(API_BASE_URL, expenseData, getConfig());
      
      // Add the new expense to the start of the list
      setExpenses(prevExpenses => [response.data, ...prevExpenses]);
      
      return response.data;
    } catch (err) {
      console.error("Error adding expense:", err);
      setError(err.response?.data?.message || 'Failed to add expense.');
      throw err.response?.data?.message;
    }
  };

  const contextData = {
    expenses,
    loading,
    error,
    fetchExpenses,
    addExpense,
  };

  return (
    <ExpenseContext.Provider value={contextData}>
      {children}
    </ExpenseContext.Provider>
  );
};

export const useExpenses = () => {
  return useContext(ExpenseContext);
}; 
