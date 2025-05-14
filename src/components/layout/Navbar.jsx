import React, { useState, useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Globe, Menu, X, User, LogOut, Heart } from "lucide-react";
import WorldlyLogoNew from "../../assets/WorldlyLogoNew.png";
import { AuthContext } from "../../context/AuthContext";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, favorites, logout } = useContext(AuthContext);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/login");
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <nav className="sticky top-0 z-50 bg-[#053742] text-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-3">
          <Link to="/" className="flex items-center space-x-2">
            <img src={WorldlyLogoNew} alt="Logo" className="w-18 h-18 mr-2" />
            <span className="text-xl font-bold text-[#E8F0F2]">Worldly</span>
          </Link>

          <div className="hidden md:flex items-center space-x-6">
            <Link
              to="/home"
              className={`font-bold transition-colors duration-200 ${
                location.pathname === "/home"
                  ? "text-[#A2DBFA] border-b-2 border-[#A2DBFA]"
                  : "text-[#E8F0F2] hover:text-[#A2DBFA]"
              }`}
            >
              Home
            </Link>
            <Link
              to="/about"
              className={`font-bold transition-colors duration-200 ${
                location.pathname === "/about"
                  ? "text-[#A2DBFA] border-b-2 border-[#A2DBFA]"
                  : "text-[#E8F0F2] hover:text-[#A2DBFA]"
              }`}
            >
              About
            </Link>

            {user && (
              <Link
                to="/favorites"
                className="text-[#E8F0F2] hover:text-[#A2DBFA] transition-colors relative flex items-center"
                title="View Favorites"
              >
                <Heart className="w-5 h-5 mr-1 hover:text-red-500" />
                {favorites.length > 0 && (
                  <span className="ml-2 px-2 py-0.5 bg-red-500 text-white text-xs rounded-full">
                    {favorites.length}
                  </span>
                )}
              </Link>
            )}

            {user ? (
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <User className="w-4 h-4 text-[#A2DBFA]" />
                  <span className="text-[#E8F0F2] font-bold">
                    {user.displayName || user.email}
                  </span>
                </div>
                <button
                  onClick={handleLogout}
                  className="text-[#053742] flex items-center space-x-1 bg-[#E8F0F2] hover:bg-[#A2DBFA] px-3 py-1 rounded-md transition-colors duration-200"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Logout</span>
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Link
                  to="/login"
                  className={`transition-colors duration-200 ${
                    location.pathname === "/login"
                      ? "text-[#A2DBFA] font-bold border-b-2 border-[#A2DBFA]"
                      : "text-[#E8F0F2] hover:text-[#A2DBFA]"
                  }`}
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className={`px-4 py-2 rounded-md font-medium transition-colors duration-200 ${
                    location.pathname === "/register"
                      ? "bg-[#39A2DB] text-[#E8F0F2]"
                      : "bg-[#E8F0F2] text-[#053742] hover:bg-[#A2DBFA]"
                  }`}
                >
                  Register
                </Link>
              </div>
            )}
          </div>

          <button
            className="md:hidden text-[#E8F0F2] focus:outline-none"
            onClick={toggleMenu}
          >
            {isMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {isMenuOpen && (
          <div className="md:hidden py-3 px-2 space-y-3 border-t border-[#39A2DB]">
            <Link
              to="/home"
              className={`block py-2 px-2 rounded-md transition-colors duration-200 ${
                location.pathname === "/home"
                  ? "bg-[#39A2DB] font-bold text-[#E8F0F2]"
                  : "text-[#E8F0F2] hover:bg-[#39A2DB] hover:text-[#E8F0F2]"
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              to="/about"
              className={`block py-2 px-2 rounded-md transition-colors duration-200 ${
                location.pathname === "/about"
                  ? "bg-[#39A2DB] font-bold text-[#E8F0F2]"
                  : "text-[#E8F0F2] hover:bg-[#39A2DB] hover:text-[#E8F0F2]"
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              About
            </Link>
            {user && (
              <Link
                to="/favorites"
                className={`block py-2 px-2 rounded-md transition-colors duration-200 ${
                  location.pathname === "/favorites"
                    ? "bg-[#39A2DB] font-bold text-[#E8F0F2]"
                    : "text-[#E8F0F2] hover:bg-[#39A2DB]"
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                <div className="flex items-center space-x-2">
                  <Heart className="w-4 h-4" />
                  <span>Favorites</span>
                  {favorites.length > 0 && (
                    <span className="ml-auto px-2 py-0.5 bg-red-500 text-white text-xs rounded-full">
                      {favorites.length}
                    </span>
                  )}
                </div>
              </Link>
            )}
            {user ? (
              <>
                <div className="flex items-center py-2 px-2 space-x-2">
                  <User className="w-4 h-4 text-[#A2DBFA]" />
                  <span className="text-[#E8F0F2]">
                    {user.displayName || user.email}
                  </span>
                </div>
                <button
                  onClick={() => {
                    handleLogout();
                    setIsMenuOpen(false);
                  }}
                  className="flex items-center w-full py-2 px-2 space-x-2 bg-[#E8F0F2] text-[#053742] hover:bg-[#A2DBFA] rounded-md transition-colors duration-200"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Logout</span>
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className={`block py-2 px-2 rounded-md transition-colors duration-200 ${
                    location.pathname === "/login"
                      ? "bg-[#39A2DB] font-bold text-[#E8F0F2]"
                      : "text-[#E8F0F2] hover:bg-[#39A2DB]"
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className={`block py-2 px-2 rounded-md font-medium transition-colors duration-200 ${
                    location.pathname === "/register"
                      ? "bg-[#39A2DB] text-[#E8F0F2] font-bold"
                      : "bg-[#E8F0F2] text-[#053742] hover:bg-[#A2DBFA]"
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  Register
                </Link>
              </>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;