// src/App.js
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/layout/Navbar.jsx';
import Countries from './components/countries/Countries.jsx';
import CountryDetail from './components/countries/CountryDetail.jsx';
import Login from './components/auth/./Login.jsx';
import Register from './components/auth/Register.jsx';
import Alert from './components/layout/Alert.jsx';
import Footer from './components/layout/Footer.jsx';
import About from './components/pages/About.jsx';
import NotFound from './components/pages/NotFound.jsx';
import PrivateRoute from './components/routing/PrivateRoute.jsx';
import './App.css';
import Spinner from "./components/layout/Spinner.jsx";
import WelcomePage from './components/pages/WelcomePage.jsx';
import FavoritesPage from './components/pages/FavoritesPage.jsx';
import { AuthProvider } from './context/AuthContext.jsx';

const App = () => {
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')) || null);
    const [isLoading, setIsLoading] = useState(true);
    const [alert, setAlert] = useState(null);

    // Check if user is logged in
    useEffect(() => {
        setIsLoading(false);
    }, []);

    // Login user
    const login = (userData) => {
        // In a real app, this would involve API calls
        localStorage.setItem('user', JSON.stringify(userData));
        setUser(userData);
    };

    // Logout user
    const logout = () => {
        localStorage.removeItem('user');
        setUser(null);
    };

    // Show alert
    const showAlert = (msg, type, timeout = 5000) => {
        setAlert({ msg, type });

        setTimeout(() => setAlert(null), timeout);
    };

    return (
        <AuthProvider >
        <Router>
            <div className="flex flex-col min-h-screen">
                <Navbar user={user} logout={logout} />
                <Alert alert={alert} />
                <main>
                    <Routes>
                        <Route path="/home" element={<Countries showAlert={showAlert} />} />
                        <Route path="/country/:code" element={<CountryDetail showAlert={showAlert} />} />
                        <Route
                            path="/login"
                            element={user ? <Navigate to="/" /> : <Login login={login} showAlert={showAlert} />}
                        />
                        <Route
                            path="/register"
                            element={user ? <Navigate to="/" /> : <Register login={login} showAlert={showAlert} />}
                        />
                        <Route path="/about" element={<About />} />
                        <Route path="*" element={<NotFound />} />
                        <Route path="/" element={<WelcomePage />} />
                        <Route path="/favorites" element={<FavoritesPage />} />
                    </Routes>
                </main>
                <Footer />
            </div>
        </Router>
        </AuthProvider>
    );
};

export default App;