import { createContext, useEffect, useState } from "react";
import { auth, googleProvider } from "../firebase";
import { signInWithPopup, signOut, onAuthStateChanged } from "firebase/auth";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Listen to Firebase auth state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        setUser(firebaseUser);
      } else {
        setUser(null);
        setFavorites([]);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const login = async () => {
    try {
      setError(null);
      await signInWithPopup(auth, googleProvider);
    } catch (err) {
      setError(err.message);
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
    } catch (err) {
      setError(err.message);
    }
  };

  const addFavorite = (country) => {
    if (!user) return;
    if (favorites.some((fav) => fav.cca3 === country.cca3)) return;

    setFavorites((prev) => [...prev, country]);
    setUser((prevUser) => ({
      ...prevUser,
      favorites: [...(prevUser?.favorites || []), country],
    }));
  };

  const removeFavorite = (countryCode) => {
    if (!user) return;
    setFavorites((prev) => prev.filter((c) => c.cca3 !== countryCode));
    setUser((prevUser) => ({
      ...prevUser,
      favorites: (prevUser?.favorites || []).filter(
        (c) => c.cca3 !== countryCode
      ),
    }));
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        favorites,
        login,
        logout,
        addFavorite,
        removeFavorite,
        loading,
        error,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
