// src/charts/LineChart.tsx
import React from 'react';
import {
  LineChart as RechartsLineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';

interface LineChartProps {
  data: {
    month: string;
    amount: number;
  }[];
}

const LineChart: React.FC<LineChartProps> = ({ data }) => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <RechartsLineChart
        data={data}
        margin={{ top: 5, right: 20, left: 0, bottom: 5 }}
        aria-label="Monthly spending line chart"
      >
        <CartesianGrid 
          strokeDasharray="3 3" 
          stroke="#f0f0f0" 
          vertical={false} 
        />
        <XAxis 
          dataKey="month" 
          stroke="#6b7280" 
          tickLine={false}
          axisLine={{ stroke: '#e5e7eb' }}
        />
        <YAxis 
          stroke="#6b7280" 
          tickLine={false}
          axisLine={{ stroke: '#e5e7eb' }}
          tickFormatter={(value) => `$${value}`}
        />
        <Tooltip 
          contentStyle={{
            backgroundColor: '#fff',
            border: '1px solid #e5e7eb',
            borderRadius: '0.5rem',
            boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
          }}
          formatter={(value: number) => [`$${value.toLocaleString()}`, 'Amount']}
          labelFormatter={(label) => `Month: ${label}`}
        />
        <Line 
          type="monotone" 
          dataKey="amount" 
          stroke="#991b1b" 
          strokeWidth={2}
          dot={{ 
            fill: '#991b1b', 
            strokeWidth: 2, 
            r: 4,
            stroke: '#fff'
          }}
          activeDot={{ 
            r: 6, 
            stroke: '#991b1b', 
            strokeWidth: 2,
            fill: '#fff'
          }}
        />
      </RechartsLineChart>
    </ResponsiveContainer>
  );
};

export default LineChart;