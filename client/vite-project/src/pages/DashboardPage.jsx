import React from 'react';
import { useAuth } from '../context/AuthContext.jsx';
import ExpenseForm from '../components/ExpenseForm.jsx';
import ExpenseList from '../components/ExpenseList.jsx';
import ExpenseChart from '../components/ExpenseChart.jsx';    

const DashboardPage = () => {
    const { user, logout } = useAuth();

    if (!user) return null; 

    return (
        <div className="p-4 sm:p-8 max-w-7xl mx-auto">
            <header className="flex justify-between items-center pb-6 mb-8 border-b border-gray-300">
                <h1 className="text-3xl font-extrabold text-indigo-700">
                    Hello, {user.username}! 
                </h1>
                <button
                    onClick={logout}
                    className="px-4 py-2 bg-red-500 text-white font-medium rounded-lg hover:bg-red-600 transition shadow"
                >
                    Logout
                </button>
            </header>
            
            <main>
                <ExpenseForm />

                {/* VISUALIZATION SECTION */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
                    <ExpenseChart />
                    
                </div>

                <ExpenseList /> 
            </main>
            
            <footer className="mt-12 text-center text-gray-500 text-sm">
                Smart Expense Tracker | MVP Complete | Ready for Deployment
            </footer>
        </div>
    );
};

export default DashboardPage;