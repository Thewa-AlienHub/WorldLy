import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Globe, Users, MapPin, Languages } from "lucide-react";
import Spinner from "../layout/Spinner.jsx";

const CountryDetail = ({ showAlert }) => {
  const { code } = useParams();
  const [country, setCountry] = useState(null);
  const [borderCountries, setBorderCountries] = useState([]);
  const [loading, setLoading] = useState(true);

  // Color scheme from the welcome page
  const colors = {
    darkTeal: "#053742",
    blue: "#39A2DB",
    lightBlue: "#A2DBFA",
    paleBlue: "#E8F0F2",
  };

  useEffect(() => {
    const fetchCountry = async () => {
      try {
        const res = await fetch(`https://restcountries.com/v3.1/alpha/${code}`);
        if (!res.ok) throw new Error(`Error: ${res.status}`);
        const data = await res.json();
        setCountry(data[0]);

        if (data[0].borders?.length > 0) {
          const borderCodes = data[0].borders.join(",");
          const borderRes = await fetch(
            `https://restcountries.com/v3.1/alpha?codes=${borderCodes}`
          );
          if (!borderRes.ok)
            throw new Error(
              `Error fetching border countries: ${borderRes.status}`
            );
          const borderData = await borderRes.json();
          setBorderCountries(borderData);
        }

        setTimeout(() => setLoading(false), 300);
      } catch (err) {
        console.error(err);
        showAlert("Error fetching country data", "danger");
        setTimeout(() => setLoading(false), 300);
      }
    };

    fetchCountry();
  }, [code, showAlert]);

  if (loading) return <Spinner />;

  if (!country) {
    return (
      <div className="text-center py-10">
        <h2
          className="text-3xl font-semibold"
          style={{ color: colors.darkTeal }}
        >
          Country not found
        </h2>
        <Link
          to="/home"
          className="flex items-center justify-center"
          style={{ color: colors.blue }}
        >
          <ArrowLeft className="mr-2" /> Back to Countries
        </Link>
      </div>
    );
  }

  const {
    name,
    flags,
    capital,
    region,
    subregion,
    population,
    languages,
    currencies,
    area,
    timezones,
    independent,
    unMember,
    startOfWeek,
    continents,
    maps,
  } = country;

  const formattedLanguages = languages
    ? Object.values(languages).join(", ")
    : "N/A";
  const formattedCurrencies = currencies
    ? Object.values(currencies)
        .map((currency) => `${currency.name} (${currency.symbol || "N/A"})`)
        .join(", ")
    : "N/A";

  return (
    <div className="bg-gradient-to-b from-white to-blue-50 min-h-screen w-full font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-6">
          <Link
            to="/home"
            className="inline-flex items-center transition font-semibold"
            style={{ color: colors.blue }}
          >
            <ArrowLeft className="mr-2" /> Back to Countries
          </Link>
        </div>

        <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-200">
          <div
            className="grid md:grid-cols-2 gap-8 p-6"
            style={{ backgroundColor: colors.paleBlue }}
          >
            <div>
              <img
                src={flags.svg || flags.png}
                alt={`Flag of ${name.common}`}
                className="w-full h-auto rounded-xl shadow-2xl hover:shadow-3xl transition"
              />
            </div>

            <div>
              <h1
                className="text-4xl font-bold mb-2"
                style={{ color: colors.darkTeal }}
              >
                {name.common}
              </h1>
              <p className="text-lg mb-6 italic text-gray-600">
                {name.official}
              </p>

              <div className="grid sm:grid-cols-2 gap-4 text-gray-800">
                <div className="flex items-center gap-2">
                  <MapPin style={{ color: colors.blue }} size={20} />
                  <span>
                    <strong>Capital:</strong>{" "}
                    {capital ? capital.join(", ") : "N/A"}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Globe style={{ color: colors.blue }} size={20} />
                  <span>
                    <strong>Region:</strong> {region} ({subregion || "N/A"})
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Users style={{ color: colors.blue }} size={20} />
                  <span>
                    <strong>Population:</strong> {population.toLocaleString()}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Languages style={{ color: colors.blue }} size={20} />
                  <span>
                    <strong>Languages:</strong> {formattedLanguages}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div
            style={{ backgroundColor: colors.paleBlue }}
            className="px-6 py-6 border-t border-gray-300"
          >
            <h2
              className="text-xl font-bold mb-4"
              style={{ color: colors.darkTeal }}
            >
              Additional Info
            </h2>
            <div className="grid sm:grid-cols-2 gap-y-3 gap-x-6 text-gray-800">
              <p>
                <strong>Currencies:</strong> {formattedCurrencies}
              </p>
              <p>
                <strong>Area:</strong>{" "}
                {area ? `${area.toLocaleString()} km²` : "N/A"}
              </p>
              <p>
                <strong>Timezones:</strong>{" "}
                {timezones ? timezones.join(", ") : "N/A"}
              </p>
              <p>
                <strong>Continent:</strong>{" "}
                {continents ? continents.join(", ") : "N/A"}
              </p>
              <p>
                <strong>Independent:</strong> {independent ? "Yes" : "No"}
              </p>
              <p>
                <strong>UN Member:</strong> {unMember ? "Yes" : "No"}
              </p>
              <p>
                <strong>Start of Week:</strong> {startOfWeek || "N/A"}
              </p>
            </div>
          </div>

          {borderCountries.length > 0 && (
            <div className="bg-white px-6 py-6 border-t border-gray-200">
              <h2
                className="text-xl font-bold mb-4"
                style={{ color: colors.blue }}
              >
                Border Countries
              </h2>
              <div className="flex flex-wrap gap-3">
                {borderCountries.map((border) => (
                  <Link
                    key={border.cca3}
                    to={`/country/${border.cca3}`}
                    className="px-4 py-2 rounded-full text-sm font-medium transition hover:shadow-md"
                    style={{
                      backgroundColor: colors.lightBlue,
                      color: colors.darkTeal,
                    }}
                  >
                    {border.name.common}
                  </Link>
                ))}
              </div>
            </div>
          )}

          {maps?.googleMaps && (
            <div
              style={{ backgroundColor: colors.paleBlue }}
              className="px-6 py-6 border-t border-gray-300 rounded-b-2xl"
            >
              <h2
                className="text-xl font-bold mb-4"
                style={{ color: colors.darkTeal }}
              >
                Map
              </h2>
              <a
                href={maps.googleMaps}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center hover:underline"
                style={{ color: colors.blue }}
              >
                <Globe className="mr-2" />
                View on Google Maps
              </a>
            </div>
          )}
        </div>
      </div>

      {/* Animation Styles (copied from welcome page) */}
      <style jsx global>{`
        @keyframes float {
          0% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-20px);
          }
          100% {
            transform: translateY(0px);
          }
        }

        @keyframes blob {
          0% {
            transform: scale(1);
          }
          33% {
            transform: scale(1.1);
          }
          66% {
            transform: scale(0.9);
          }
          100% {
            transform: scale(1);
          }
        }

        .animate-float {
          animation: float 6s ease-in-out infinite;
        }

        .animate-blob {
          animation: blob 7s infinite;
        }

        .animation-delay-2000 {
          animation-delay: 2s;
        }

        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  );
};

export default CountryDetail;
