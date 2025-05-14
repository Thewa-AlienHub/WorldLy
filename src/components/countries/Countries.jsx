import React, { useState, useEffect, useContext } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import SearchBox from "./SearchBox.jsx";
import FilterOptions from "./FilterOptions.jsx";
import Spinner from "../layout/Spinner.jsx";
import ScrollToTopButton from "../layout/ScrollToTopButton.jsx";
import { AuthContext } from "../../context/AuthContext";
import { Globe, Users, Landmark, Heart } from "lucide-react";

const Countries = ({ showAlert, showLoginModal }) => {
  const { user, favorites, addFavorite, removeFavorite } =
    useContext(AuthContext);
  // const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [countries, setCountries] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [region, setRegion] = useState("");
  const [language, setLanguage] = useState("");
  const [availableLanguages, setAvailableLanguages] = useState([]);

  // Professional color palette
  const colors = {
    darkTeal: "#053742",
    blue: "#39A2DB",
    lightBlue: "#A2DBFA",
    paleBlue: "#E8F0F2",
    red: "#FF0000",
  };



  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const res = await fetch("https://restcountries.com/v3.1/all");
        if (!res.ok) throw new Error(`Error: ${res.status}`);
        const data = await res.json();

        const allLanguages = new Set();
        data.forEach((country) => {
          if (country.languages) {
            Object.values(country.languages).forEach((lang) => {
              allLanguages.add(lang);
            });
          }
        });

        setAvailableLanguages(Array.from(allLanguages).sort());
        setCountries(data);
        setFilteredCountries(data);
        setTimeout(() => setLoading(false), 300);
      } catch (err) {
        // console.error(err);
        showAlert("Error fetching countries", "danger");
        setTimeout(() => setLoading(false), 300);
      }
    };

    fetchCountries();
  }, [showAlert]);

  useEffect(() => {
    if (!loading) {
      let results = countries;

      if (search) {
        const searchLower = search.toLowerCase();
        results = results.filter((country) =>
          country.name.common.toLowerCase().includes(searchLower)
        );
      }

      if (region) {
        results = results.filter((country) => country.region === region);
      }

      if (language) {
        results = results.filter((country) => {
          if (!country.languages) return false;
          return Object.values(country.languages).some(
            (lang) => lang.toLowerCase() === language.toLowerCase()
          );
        });
      }

      setFilteredCountries(results);
    }
  }, [search, region, language, countries, loading]);

  const toggleFavorite = (e, country) => {
    e.stopPropagation(); // Prevent navigation when clicking on the favorite icon

    if (!user) {
      showLoginModal();
      return;
    }

    if (favorites.some((fav) => fav.cca3 === country.cca3)) {
      removeFavorite(country.cca3);
    } else {
      addFavorite(country);
    }
  };

  const navigateToCountry = (country) => {
    navigate(`/country/${country.cca3}`);
  };

  // Country card component
  const CountryCard = ({ country, isFavorite }) => {
    return (
      <div
        className="bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1 cursor-pointer group"
        onClick={() => navigateToCountry(country)}
      >
        <div className="relative h-40 overflow-hidden">
          <img
            src={country.flags?.svg || country.flags?.png}
            alt={`Flag of ${country.name.common}`}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <button
            onClick={(e) => toggleFavorite(e, country)}
            className="absolute top-3 right-3 bg-white p-2 rounded-full shadow-md transition-colors duration-300 hover:bg-gray-100 z-10"
            aria-label={
              isFavorite ? "Remove from favorites" : "Add to favorites"
            }
          >
            <Heart
              className="h-5 w-5"
              fill={isFavorite ? colors.red : "none"}
              stroke={isFavorite ? colors.red : colors.darkTeal}
              strokeWidth={isFavorite ? 0 : 2}
            />
          </button>
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </div>

        <div className="p-4">
          <h3
            className="text-lg font-semibold mb-2 truncate"
            style={{ color: colors.darkTeal }}
          >
            {country.name.common}
          </h3>

          <div className="space-y-1">
            <p className="text-sm text-gray-600 flex items-center gap-2">
              <Globe className="h-4 w-4 text-[#147eb7]" />
              <span className="font-medium">Region:</span>
              <span>{country.region || "N/A"}</span>
            </p>

            <p className="text-sm text-gray-600 flex items-center gap-2">
              <Users className="h-4 w-4 text-[#147eb7]" />
              <span className="font-medium">Population:</span>
              <span>{country.population?.toLocaleString() || "N/A"}</span>
            </p>

            {country.capital && (
              <p className="text-sm text-gray-600 flex items-center gap-2 truncate">
                <Landmark className="h-4 w-4 text-[#147eb7]" />
                <span className="font-medium">Capital:</span>
                <span>{country.capital[0] || "N/A"}</span>
              </p>
            )}
          </div>
        </div>
      </div>
    );
  };

  if (loading) return <Spinner />;

  return (
    <div
      style={{ backgroundColor: colors.paleBlue }}
      className="min-h-screen px-9"
    >
      {/* Header Section */}
      <div className="w-full py-8 px-4 mb-6">
        <div className="container mx-auto">
          <h1 className="text-5xl md:text-4xl font-bold text-[#053742]">
            Explore the World
          </h1>
          <p className="text-xl text-gray-500 mt-2">
            Discover information about countries around the globe
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 pb-12 relative z-20">
        {/* Search and Filters Section */}
        <div
          className="bg-white rounded-xl shadow-md p-5 mb-8"
          style={{ borderLeft: `5px solid ${colors.blue}` }}
        >
          {/* Filters */}
          <FilterOptions
            region={region}
            setRegion={setRegion}
            language={language}
            setLanguage={setLanguage}
            availableLanguages={availableLanguages}
            colors={colors}
            search={search}
            setSearch={setSearch}
          />
        </div>

        {filteredCountries.length === 0 ? (
          <div
            className="bg-white rounded-xl shadow-lg p-10 text-center max-w-2xl mx-auto"
            style={{ borderTop: `4px solid ${colors.blue}` }}
          >
            <div className="mb-6" style={{ color: colors.darkTeal }}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-20 w-20 mx-auto"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9.172 16.172a4 4 0 015.656 0M12 14a3 3 0 100-6 3 3 0 000 6z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 12a9.005 9.005 0 00-9-9 9.005 9.005 0 00-9 9m18 0a9.005 9.005 0 01-9 9 9.005 9.005 0 01-9-9"
                />
              </svg>
            </div>
            <h2
              className="text-2xl font-bold mb-4"
              style={{ color: colors.darkTeal }}
            >
              No Countries Found
            </h2>
            <p className="text-lg text-gray-600 mb-6">
              We couldn't find any countries matching your search criteria.
            </p>
            <button
              onClick={() => {
                setSearch("");
                setRegion("");
                setLanguage("");
              }}
              className="px-8 py-3 text-white rounded-md transition duration-300 shadow-md font-medium"
              style={{ backgroundColor: colors.blue }}
              onMouseOver={(e) =>
                (e.currentTarget.style.backgroundColor = colors.darkTeal)
              }
              onMouseOut={(e) =>
                (e.currentTarget.style.backgroundColor = colors.blue)
              }
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredCountries.map((country) => (
              <CountryCard
                key={country.cca3}
                country={country}
                isFavorite={favorites.some((fav) => fav.cca3 === country.cca3)}
              />
            ))}
          </div>
        )}
      </div>
      <ScrollToTopButton colors={colors} />
    </div>
  );
};

export default Countries;