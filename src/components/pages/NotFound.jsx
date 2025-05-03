// src/components/pages/NotFound.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { Home } from 'lucide-react';

const NotFound = () => {
    return (
        <div className="max-w-md mx-auto text-center py-16">
            <h1 className="text-6xl font-bold text-gray-800 mb-4">404</h1>
            <h2 className="text-2xl font-bold text-gray-700 mb-6">Page Not Found</h2>
            <p className="text-gray-600 mb-8">
                The page you're looking for doesn't exist or has been moved.
            </p>
            <Link
                to="/"
                className="inline-flex items-center px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors duration-300"
            >
                <Home className="mr-2" />
                Back to Home
            </Link>
        </div>
    );
};

export default NotFound;