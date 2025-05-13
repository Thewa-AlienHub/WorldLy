import React, { useState, useEffect } from 'react';
import CountryItem from './CountryItem.jsx';
import SearchBox from './SearchBox.jsx';
import FilterOptions from './FilterOptions.jsx';
import Spinner from '../layout/Spinner.jsx';
import ScrollToTopButton from '../layout/ScrollToTopButton.jsx';

// Define or import your colors
const colors = {
    lightBlue: '#93C5FD', // Tailwind lightBlue-300
    blue: '#3B82F6'       // Tailwind blue-500
};

const Countries = ({ showAlert }) => {
    const [countries, setCountries] = useState([]);
    const [filteredCountries, setFilteredCountries] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');
    const [region, setRegion] = useState('');
    const [language, setLanguage] = useState('');
    const [favorites, setFavorites] = useState(
        JSON.parse(localStorage.getItem('favorites')) || []
    );
    const [availableLanguages, setAvailableLanguages] = useState([]);

    useEffect(() => {
        const fetchCountries = async () => {
            try {
                const res = await fetch('https://restcountries.com/v3.1/all');
                if (!res) {
                    throw new Error("Network Error: Response is undefined");
                }
                if (!res.ok) throw new Error(`Error: ${res.status}`);
                const data = await res.json();

                const allLanguages = new Set();
                data.forEach(country => {
                    if (country.languages) {
                        Object.values(country.languages).forEach(lang => {
                            allLanguages.add(lang);
                        });
                    }
                });

                setAvailableLanguages(Array.from(allLanguages).sort());
                setCountries(data);
                setFilteredCountries(data);
                
            } catch (err) {
                // console.error(err);
                showAlert('Error fetching countries', 'danger');
                
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
                results = results.filter(country =>
                    country.name.common.toLowerCase().includes(searchLower)
                );
            }

            if (region) {
                results = results.filter(country => country.region === region);
            }

            if (language) {
                results = results.filter(country => {
                    if (!country.languages) return false;
                    return Object.values(country.languages).some(
                        lang => lang.toLowerCase() === language.toLowerCase()
                    );
                });
            }

            setFilteredCountries(results);
        }
    }, [search, region, language, countries, loading]);

    useEffect(() => {
        localStorage.setItem('favorites', JSON.stringify(favorites));
    }, [favorites]);

    const toggleFavorite = (countryCode) => {
        if (favorites.includes(countryCode)) {
            setFavorites(favorites.filter(code => code !== countryCode));
        } else {
            setFavorites([...favorites, countryCode]);
        }
    };

    if (loading) return <Spinner />;

    return (
        <div className='bg-gradient-to-r from-teal-100 via-blue-200 to-teal-300'>
            {/* Floating Decorative Elements */}
            <div className="hidden md:block absolute top-1/4 left-10 z-10">
                <div
                    className="w-20 h-20 rounded-full animate-float"
                    style={{ backgroundColor: colors.lightBlue, opacity: 0.8 }}
                ></div>
            </div>
            <div className="hidden md:block absolute bottom-1/4 right-10 z-10">
                <div
                    className="w-12 h-12 rounded-full animate-float animation-delay-2000"
                    style={{ backgroundColor: colors.blue, opacity: 0.2 }}
                ></div>
            </div>

            {/* Main Content */}
            <div className="container mx-auto px-4 py-6 flex-grow relative z-20">
                <div>
                    <div className='flex flex-col md:flex-row  items-center justify-between mb-8'> 
                        <h1 className="text-5xl font-bold text-center">Explore Countries</h1>

                        <div className="md:w-[25%]">
                            <SearchBox search={search} setSearch={setSearch} />
                        </div>
                    </div>

                    <div className="mb-8">
                        <FilterOptions
                            region={region}
                            setRegion={setRegion}
                            language={language}
                            setLanguage={setLanguage}
                            availableLanguages={availableLanguages}
                        />
                    </div>
                </div>

                {filteredCountries.length === 0 ? (
                    <p className="text-center text-xl">No countries found matching your criteria.</p>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {filteredCountries.map(country => (
                            <CountryItem
                                key={country.cca3}
                                country={country}
                                isFavorite={favorites.includes(country.cca3)}
                                toggleFavorite={toggleFavorite}
                            />
                        ))}
                    </div>
                )}
            </div>
            <ScrollToTopButton />
        </div>
    );
};

export default Countries;
