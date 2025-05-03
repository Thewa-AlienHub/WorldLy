import { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    // Initialize user state from local storage if available
    const [user, setUser] = useState(() => {
        const savedUser = localStorage.getItem('user');
        return savedUser ? JSON.parse(savedUser) : null;
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // Update local storage when user state changes
    useEffect(() => {
        if (user) {
            localStorage.setItem('user', JSON.stringify(user));
        } else {
            localStorage.removeItem('user');
        }
    }, [user]);

    // Mock login functionality
    const login = (email, password) => {
        setLoading(true);
        setError(null);

        // Simulate API call
        setTimeout(() => {
            try {
                // In a real app, you would validate with a backend
                if (email === 'user@example.com' && password === 'password') {
                    setUser({
                        id: '1',
                        name: 'Test User',
                        email,
                        favorites: []
                    });
                    setLoading(false);
                } else {
                    throw new Error('Invalid credentials');
                }
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        }, 1000);
    };

    // Logout function
    const logout = () => {
        setUser(null);
    };

    // Add country to user favorites
    const addFavorite = (country) => {
        if (!user) return;

        setUser(prev => {
            // Check if country is already in favorites
            const isAlreadyFavorite = prev.favorites.some(fav => fav.cca3 === country.cca3);
            if (isAlreadyFavorite) return prev;

            // Add to favorites
            return {
                ...prev,
                favorites: [...prev.favorites, {
                    cca3: country.cca3,
                    name: country.name.common,
                    flag: country.flags.svg
                }]
            };
        });
    };

    // Remove country from favorites
    const removeFavorite = (countryCode) => {
        if (!user) return;

        setUser(prev => ({
            ...prev,
            favorites: prev.favorites.filter(country => country.cca3 !== countryCode)
        }));
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                loading,
                error,
                login,
                logout,
                addFavorite,
                removeFavorite
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};