import React from 'react';
import { Link } from 'react-router-dom';

const NotFound: React.FC = () => {
  return (
    <div className="min-h-screen bg-black text-gold-100 flex flex-col justify-center items-center px-6 text-center">
      <h1 className="text-6xl font-bold text-gold-400 mb-4">404</h1>
      <p className="text-xl mb-6">Oops! The page you're looking for doesn't exist.</p>
      <Link
        to="/"
        className="bg-gold-400 text-black font-semibold px-6 py-2 rounded hover:bg-gold-500 transition"
      >
        Go Back Home
      </Link>
    </div>
  );
};

export default NotFound;
