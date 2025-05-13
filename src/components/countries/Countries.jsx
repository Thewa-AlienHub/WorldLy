import React, { useState, useEffect, useContext } from "react";
import { useSearchParams } from "react-router-dom";
import CountryItem from "./CountryItem.jsx";
import SearchBox from "./SearchBox.jsx";
import FilterOptions from "./FilterOptions.jsx";
import Spinner from "../layout/Spinner.jsx";
import ScrollToTopButton from "../layout/ScrollToTopButton.jsx";
import { AuthContext } from "../../context/AuthContext";

const Countries = ({ showAlert, showLoginModal }) => {
  const { user, favorites, addFavorite, removeFavorite } =
    useContext(AuthContext);
  const [searchParams] = useSearchParams();
  const [countries, setCountries] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [region, setRegion] = useState("");
  const [language, setLanguage] = useState("");
  const [availableLanguages, setAvailableLanguages] = useState([]);

  const colors = {
    darkTeal: "#053742",
    blue: "#39A2DB",
    lightBlue: "#A2DBFA",
    paleBlue: "#E8F0F2",
  };

  useEffect(() => {
    const initialSearch = searchParams.get("search");
    if (initialSearch) setSearch(initialSearch);
  }, [searchParams]);

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const res = await fetch("https://restcountries.com/v3.1/all");
                if (!res) {
                    throw new Error("Network Error: Response is undefined");
                }
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
        
      } catch (err) {
        // console.error(err);
        showAlert("Error fetching countries", "danger");
                
            }finally {
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

  const toggleFavorite = (country) => {
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

  if (loading) return <Spinner />;

  return (
    <>
      {/* Main Content */}
      <div className="container mx-auto px-4 py-6 relative z-20">
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          {/* Header + Search */}
          <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
            <h2
              className="text-5xl font-bold"
              style={{ color: colors.darkTeal }}
            >
              Explore Countries
            </h2>
            <div className="w-full md:w-1/2 lg:w-1/3">
              <SearchBox search={search} setSearch={setSearch} />
            </div>
          </div>

          {/* Filters centered below */}
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mb-4">
            <div className="w-full">
              <FilterOptions
                region={region}
                setRegion={setRegion}
                language={language}
                setLanguage={setLanguage}
                availableLanguages={availableLanguages}
                type="region"
              />
            </div>
          </div>

          {/* Stats */}
          <div className="text-left mt-2">
            <p
              className="text-md sm:text-base font-semibold"
              style={{ color: colors.darkTeal }}
            >
              <span className="font-semibold">{filteredCountries.length}</span>{" "}
              countries found
            </p>
          </div>
        </div>

        {filteredCountries.length === 0 ? (
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
              className="text-2xl font-semibold mb-4"
              style={{ color: colors.darkTeal }}
            >
              No Countries Found
            </h2>
            <p className="text-lg text-gray-600 mb-4">
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
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredCountries.map((country) => (
              <CountryItem
                key={country.cca3}
                country={country}
                isFavorite={favorites.some((fav) => fav.cca3 === country.cca3)}
                toggleFavorite={() => toggleFavorite(country)}
              />
            ))}
          </div>
        )}
      </div>
      <ScrollToTopButton />
    </>
  );
};

export default Countries;
