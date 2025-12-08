import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import { FaUserPlus, FaSignInAlt } from 'react-icons/fa'; // Requires react-icons

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLogin, setIsLogin] = useState(true);
  const [error, setError] = useState('');
  const { login, register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      if (isLogin) {
        await login(username, password);
      } else {
        await register(username, password);
      }
      // Navigate to the protected dashboard on success
      navigate('/dashboard');
    } catch (err) {
      // API error response structure may vary, use generic message if path fails
      setError(err?.message || 'Authentication failed. Please check credentials.');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-2xl border border-gray-200">
        <h2 className="text-3xl font-bold text-center text-indigo-600 mb-6">
          {isLogin ? 'Welcome Back!' : 'Create Account'}
        </h2>
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4 text-sm" role="alert">
            {error}
          </div>
        )}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700">Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 transition duration-150"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 transition duration-150"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full flex items-center justify-center py-2 px-4 border border-transparent rounded-md shadow-lg text-lg font-medium text-white bg-indigo-600 hover:bg-indigo-700 transition duration-150 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            {isLogin ? (<><FaSignInAlt className="mr-2" /> Log In</>) : (<><FaUserPlus className="mr-2" /> Sign Up</>)}
          </button>
        </form>
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            {isLogin ? "Don't have an account?" : "Already have an account?"}{' '}
            <button
              onClick={() => {
                  setIsLogin(!isLogin);
                  setError(''); 
              }}
              className="font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none"
            >
              {isLogin ? 'Sign Up here' : 'Log In here'}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;