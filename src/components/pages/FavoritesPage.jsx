import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

const FavoritesPage = () => {
  const { user, favorites = [], removeFavorite, loading } = useAuth();
  const navigate = useNavigate();

  // Define colors at the component level so they can be used in the JSX
  const colors = {
    darkTeal: "#053742",
    blue: "#39A2DB",
    lightBlue: "#A2DBFA",
    paleBlue: "#E8F0F2",
  };

  useEffect(() => {
    if (!loading && !user) {
      navigate("/login");
    }
  }, [user, loading, navigate]);

  if (loading)
    return (
      <div
        className="flex justify-center items-center min-h-screen"
        style={{ backgroundColor: colors.paleBlue }}
      >
        <div
          className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2"
          style={{ borderColor: colors.darkTeal }}
        ></div>
      </div>
    );

  if (!user) return null;

  return (
    <div className="min-h-screen" style={{ backgroundColor: colors.paleBlue }}>
      {/* Header Section */}
      <div className="py-8 shadow-lg mb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1
            className="text-4xl font-bold text-center"
            style={{ color: colors.darkTeal }}
          >
            My Favorite Countries
          </h1>
        </div>
      </div>

      {/* Content Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        {favorites.length === 0 ? (
          <div
            className="bg-white rounded-lg shadow-lg p-10 text-center max-w-2xl mx-auto border-t-4"
            style={{ borderColor: colors.blue }}
          >
            <div className="mb-6" style={{ color: colors.darkTeal }}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-16 w-16 mx-auto"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                />
              </svg>
            </div>
            <h2
              className="text-2xl font-semibold mb-4"
              style={{ color: colors.darkTeal }}
            >
              No Favorites Yet
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              You haven't added any countries to your favorites collection yet.
            </p>
            <Link to="/home">
              <button
                className="px-8 py-3 text-white rounded-md transition duration-300 shadow-md font-medium hover:bg-opacity-90"
                style={{
                  backgroundColor: colors.blue,
                  hover: { backgroundColor: colors.darkTeal },
                }}
                onMouseOver={(e) =>
                  (e.currentTarget.style.backgroundColor = colors.darkTeal)
                }
                onMouseOut={(e) =>
                  (e.currentTarget.style.backgroundColor = colors.blue)
                }
              >
                Explore Countries
              </button>
            </Link>
          </div>
        ) : (
          <>
            <div className="mb-8 flex justify-between items-center">
              <h2
                className="text-xl font-medium"
                style={{ color: colors.darkTeal }}
              >
                {favorites.length}{" "}
                {favorites.length === 1 ? "Country" : "Countries"} in your
                collection
              </h2>
              <Link to="/home">
                <button
                  className="px-4 py-2 rounded-md transition duration-300 text-sm font-medium flex items-center"
                  style={{
                    backgroundColor: colors.lightBlue,
                    color: colors.darkTeal,
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.backgroundColor = colors.blue;
                    e.currentTarget.style.color = "white";
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.backgroundColor = colors.lightBlue;
                    e.currentTarget.style.color = colors.darkTeal;
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 mr-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                    />
                  </svg>
                  Add More
                </button>
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {favorites.map((country) => (
                <div
                  key={country.cca3}
                  className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition duration-300 border border-gray-200"
                >
                  <Link to={`/country/${country.cca3}`} className="block">
                    <div className="h-40 overflow-hidden relative">
                      <img
                        src={
                          country.flags?.svg ||
                          country.flags?.png ||
                          "/fallback-flag.png"
                        }
                        alt={`Flag of ${country.name?.common}`}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                      <div className="absolute bottom-0 left-0 right-0 p-3">
                        <h3 className="text-white font-bold text-lg drop-shadow-md">
                          {country.name?.common || "Unknown"}
                        </h3>
                      </div>
                    </div>
                  </Link>

                  <div className="p-4 flex justify-between items-center">
                    <div>
                      <p className="text-sm text-gray-600">
                        {country.region || "Unknown region"}
                      </p>
                    </div>
                    <button
                      onClick={() => removeFavorite(country.cca3)}
                      className="p-2 text-gray-500 hover:text-red-500 hover:bg-red-50 rounded-full transition duration-300"
                      aria-label="Remove from favorites"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default FavoritesPage;
