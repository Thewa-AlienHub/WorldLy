import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  ArrowLeft, Globe, Users, Flag, MapPin, Languages
} from 'lucide-react';
import Spinner from '../layout/Spinner.jsx';

const CountryDetail = ({ showAlert }) => {
  const { code } = useParams();
  const [country, setCountry] = useState(null);
  const [borderCountries, setBorderCountries] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCountry = async () => {
      try {
        const res = await fetch(`https://restcountries.com/v3.1/alpha/${code}`);
        if (!res.ok) throw new Error(`Error: ${res.status}`);
        const data = await res.json();
        setCountry(data[0]);

        if (data[0].borders?.length > 0) {
          const borderCodes = data[0].borders.join(',');
          const borderRes = await fetch(`https://restcountries.com/v3.1/alpha?codes=${borderCodes}`);
          if (!borderRes.ok) throw new Error(`Error fetching border countries: ${borderRes.status}`);
          const borderData = await borderRes.json();
          setBorderCountries(borderData);
        }

        setTimeout(() => setLoading(false), 300);
      } catch (err) {
        console.error(err);
        showAlert('Error fetching country data', 'danger');
        setTimeout(() => setLoading(false), 300);
      }
    };

    fetchCountry();
  }, [code, showAlert]);

  if (loading) return <Spinner />;

  if (!country) {
    return (
      <div className="text-center py-10">
        <h2 className="text-3xl font-semibold text-red-600 mb-4">Country not found</h2>
        <Link to="/" className="text-blue-600 hover:underline flex items-center justify-center">
          <ArrowLeft className="mr-2" /> Back to Countries
        </Link>
      </div>
    );
  }

  const {
    name, flags, capital, region, subregion, population, languages,
    currencies, borders, maps, area, timezones, independent, unMember,
    startOfWeek, continents,
  } = country;

  const formattedLanguages = languages ? Object.values(languages).join(', ') : 'N/A';
  const formattedCurrencies = currencies
    ? Object.values(currencies).map(currency => `${currency.name} (${currency.symbol || 'N/A'})`).join(', ')
    : 'N/A';

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-6">
        <Link to="/" className="inline-flex items-center text-blue-600 hover:text-blue-800 transition font-semibold">
          <ArrowLeft className="mr-2" /> Back to Countries
        </Link>
      </div>

      <div className="bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-200">
        <div className="grid md:grid-cols-2 gap-8 p-6 bg-indigo-50">
          <div>
            <img
              src={flags.svg || flags.png}
              alt={`Flag of ${name.common}`}
              className="w-full h-auto rounded-xl shadow-2xl hover:shadow-3xl transition"
            />
          </div>

          <div>
            <h1 className="text-4xl font-bold text-blue-700 mb-2">{name.common}</h1>
            <p className="text-lg text-gray-600 mb-6 italic">{name.official}</p>

            <div className="grid sm:grid-cols-2 gap-4 text-gray-800">
              <div className="flex items-center gap-2">
                <MapPin className="text-blue-500" size={20} />
                <span><strong>Capital:</strong> {capital ? capital.join(', ') : 'N/A'}</span>
              </div>
              <div className="flex items-center gap-2">
                <Globe className="text-green-500" size={20} />
                <span><strong>Region:</strong> {region} ({subregion || 'N/A'})</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="text-purple-500" size={20} />
                <span><strong>Population:</strong> {population.toLocaleString()}</span>
              </div>
              <div className="flex items-center gap-2">
                <Languages className="text-pink-500" size={20} />
                <span><strong>Languages:</strong> {formattedLanguages}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-indigo-100 px-6 py-6 border-t border-gray-300">
          <h2 className="text-xl font-bold text-indigo-700 mb-4">Additional Info</h2>
          <div className="grid sm:grid-cols-2 gap-y-3 gap-x-6 text-gray-800">
            <p><strong>Currencies:</strong> {formattedCurrencies}</p>
            <p><strong>Area:</strong> {area ? `${area.toLocaleString()} km²` : 'N/A'}</p>
            <p><strong>Timezones:</strong> {timezones ? timezones.join(', ') : 'N/A'}</p>
            <p><strong>Continent:</strong> {continents ? continents.join(', ') : 'N/A'}</p>
            <p><strong>Independent:</strong> {independent ? 'Yes' : 'No'}</p>
            <p><strong>UN Member:</strong> {unMember ? 'Yes' : 'No'}</p>
            <p><strong>Start of Week:</strong> {startOfWeek || 'N/A'}</p>
          </div>
        </div>

        {borderCountries.length > 0 && (
          <div className="bg-white px-6 py-6 border-t border-gray-200">
            <h2 className="text-xl font-bold text-blue-700 mb-4">Border Countries</h2>
            <div className="flex flex-wrap gap-3">
              {borderCountries.map(border => (
                <Link
                  key={border.cca3}
                  to={`/country/${border.cca3}`}
                  className="px-4 py-2 rounded-full bg-blue-100 text-blue-800 hover:bg-blue-200 text-sm font-medium transition"
                >
                  {border.name.common}
                </Link>
              ))}
            </div>
          </div>
        )}

        {maps?.googleMaps && (
          <div className="bg-indigo-50 px-6 py-6 border-t border-gray-300 rounded-b-2xl">
            <h2 className="text-xl font-bold text-indigo-700 mb-4">Map</h2>
            <a
              href={maps.googleMaps}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-800 flex items-center"
            >
              <Globe className="mr-2" />
              View on Google Maps
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

export default CountryDetail;
