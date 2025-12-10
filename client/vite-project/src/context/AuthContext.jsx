import React, { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';

// 1. Create the Context
const AuthContext = createContext();

// Set up the API base URL (IMPORTANT: Change 5000 if your backend uses 5004)
const API_URL = 'https://expense-tracker-1-x0l9.onrender.com/api/auth/'; 

// 2. Create the Provider Component
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Load user from local storage on initial load
  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
    }
    setLoading(false);
  }, []);

  // Login function
  const login = async (username, password) => {
    try {
      const response = await axios.post(API_URL + 'login', { username, password });
      
      const userData = response.data;
      setUser(userData);
      localStorage.setItem('user', JSON.stringify(userData));
      
      return userData;
    } catch (error) {
      // Re-throw the error data for the component to handle
      throw error.response.data; 
    }
  };

  // Register function
  const register = async (username, password) => {
    try {
      const response = await axios.post(API_URL + 'signup', { username, password });
      
      const userData = response.data;
      setUser(userData);
      localStorage.setItem('user', JSON.stringify(userData));
      
      return userData;
    } catch (error) {
      // Re-throw the error data for the component to handle
      throw error.response.data; 
    }
  };

  // Logout function
  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  const contextData = {
    user,
    loading,
    login,
    register,
    logout,
  };

  return (
    <AuthContext.Provider value={contextData}>
      {loading ? <div className="text-center p-8">Loading...</div> : children}
    </AuthContext.Provider>
  );
};

// 3. Custom Hook to use Auth Context
export const useAuth = () => {
  return useContext(AuthContext);
};