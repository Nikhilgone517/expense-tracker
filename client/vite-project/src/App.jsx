import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext.jsx';

import LoginPage from './pages/LoginPage.jsx';
import DashboardPage from './pages/DashboardPage.jsx';

/**
 * Component to protect routes.
 * It checks if a user token exists in context. If not, it redirects to the login page.
 */
const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();
  
  // 1. Show a simple loading state while checking user status from local storage
  if (loading) {
      return (
        <div className="flex justify-center items-center min-h-screen text-2xl text-indigo-600">
          Loading application...
        </div>
      );
  }
  
  // 2. If user is logged in, show the child component (Dashboard)
  // 3. If no user, redirect to the root path (LoginPage)
  return user ? children : <Navigate to="/" />;
};

function App() {
  return (
    <Routes>
      {/* Public route for Login/Signup.
        This is the default path (/)
      */}
      <Route path="/" element={<LoginPage />} />

      {/* Protected route for the main application.
        The PrivateRoute wrapper ensures this page is inaccessible without a valid token.
      */}
      <Route 
        path="/dashboard" 
        element={
          <PrivateRoute>
            <DashboardPage />
          </PrivateRoute>
        } 
      />
      {/* Fallback for unknown URLs */}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

export default App;