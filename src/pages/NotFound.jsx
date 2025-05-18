import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen text-center font-sans">
            <h1 className="text-6xl font-bold text-gray-800">404</h1>
            <p className="mt-4 text-lg text-gray-600">Oops! The page you're looking for doesn't exist.</p>
            <Link 
                to="/" 
                className="mt-6 text-blue-500 hover:underline text-base"
            >
                Go back to Home
            </Link>
        </div>
    );
};

export default NotFound;
