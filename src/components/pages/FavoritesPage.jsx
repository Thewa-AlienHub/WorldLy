import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

const FavoritesPage = () => {
    const { user, removeFavorite } = useAuth();
    const navigate = useNavigate();

    // Redirect if not logged in
    useEffect(() => {
        if (!user) {
            navigate('/login');
        }
    }, [user, navigate]);

    if (!user) {
        return null; // Prevent rendering while redirecting
    }

    const { favorites = [] } = user;

    return (
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-6 sm:mb-8 text-center sm:text-left">
                    Favorite Countries
                </h1>

                {favorites.length === 0 ? (
                    <div className="text-center py-8 sm:py-12 bg-[#ECEFCA]/20 dark:bg-[#213448] rounded-lg shadow-light-shadow dark:shadow-dark-shadow mx-4 sm:mx-0">
                        <p className="text-[#213448] dark:text-[#ECEFCA] mb-4 px-4">
                            You haven't added any countries to your favorites yet.
                        </p>
                        <Link to="/home">
                            <button variant="primary">Explore Countries</button>
                        </Link>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
                        {favorites.map(country => (
                            <div
                                key={country.cca3}
                                className="bg-[#ECEFCA]/20 dark:bg-[#213448] rounded-lg overflow-hidden shadow-light-shadow dark:shadow-dark-shadow hover:shadow-lg transition-shadow"
                            >
                                <Link to={`/country/${country.cca3}`} className="block h-full">
                                    <div className="h-32 sm:h-40 overflow-hidden">
                                        <img
                                            src={country.flag}
                                            alt={`Flag of ${country.name}`}
                                            className="w-full h-full object-cover"
                                            loading="lazy"
                                        />
                                    </div>

                                    <div className="p-3 sm:p-4">
                                        <div className="flex justify-between items-start">
                                            <h3 className="text-base sm:text-lg font-semibold text-[#213448] dark:text-[#ECEFCA] truncate flex-1 pr-2">
                                                {country.name}
                                            </h3>

                                            <button
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    e.stopPropagation();
                                                    removeFavorite(country.cca3);
                                                }}
                                                className="text-[#547792] hover:text-red-500 dark:text-[#94B4C1] dark:hover:text-red-400 flex-shrink-0"
                                                aria-label="Remove from favorites"
                                            >
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                                                </svg>
                                            </button>
                                        </div>
                                    </div>
                                </Link>
                            </div>
                        ))}
                    </div>
                )}
            </div>
    );
};

export default FavoritesPage;