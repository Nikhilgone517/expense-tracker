import React, { useMemo } from 'react';
import { useExpenses } from '../context/ExpenseContext.jsx';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';

// Color palette for chart categories
const COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#ff8042', '#0088FE', '#00C49F'];

const ExpenseChart = () => {
  const { expenses } = useExpenses();

  // Memoize the data processing to run only when expenses change
  const data = useMemo(() => {
    // 1. Group expenses by category and calculate total spent in each
    const categoryMap = expenses.reduce((acc, expense) => {
      const category = expense.category || 'Other';
      acc[category] = (acc[category] || 0) + expense.amount;
      return acc;
    }, {});

    // 2. Convert the map into the array format required by Recharts
    return Object.keys(categoryMap).map(category => ({
      name: category,
      value: parseFloat(categoryMap[category].toFixed(2)),
    }));
  }, [expenses]);

  if (expenses.length === 0) {
    return null;
  }

  // Custom label for the chart slices
  const renderCustomizedLabel = ({ name, percent }) => {
    return `${name} (${(percent * 100).toFixed(0)}%)`;
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow-md border border-gray-100 mt-8">
      <h3 className="text-xl font-semibold mb-4 text-indigo-700">Spending Breakdown</h3>
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={100}
              fill="#8884d8"
              dataKey="value"
              labelLine={false}
              label={renderCustomizedLabel}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip 
                formatter={(value) => [`$${value.toFixed(2)}`, 'Total Spent']}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ExpenseChart;