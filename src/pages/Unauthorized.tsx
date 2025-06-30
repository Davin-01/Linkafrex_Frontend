// src/pages/Unauthorized.tsx
import React from 'react';
import { Link } from 'react-router-dom';

const Unauthorized = () => (
  <div className="text-center text-white mt-32">
    <h1 className="text-4xl font-bold text-red-500 mb-4">🚫 Access Denied</h1>
    <p className="text-gray-300 mb-6">You do not have permission to view this page.</p>
    <Link to="/" className="text-yellow-400 underline">Return to Home</Link>
  </div>
);

export default Unauthorized;
