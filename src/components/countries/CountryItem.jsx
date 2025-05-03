// src/components/countries/CountryItem.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { Heart } from 'lucide-react';

const CountryItem = ({ country, isFavorite, toggleFavorite }) => {
    const {
        name,
        flags,
        capital,
        population,
        region,
        cca3
    } = country;

    return (
        <div className="bg-[#E8F0F2] rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl duration-300 transform transition-all hover:scale-105 cursor-pointer">
            <div className="relative h-40">
                <img
                    src={flags.png}
                    alt={`Flag of ${name.common}`}
                    className="w-full h-full object-cover"
                />
                <button
                    onClick={() => toggleFavorite(cca3)}
                    className="absolute top-2 right-2 p-2 bg-white bg-opacity-80 rounded-full shadow-sm hover:scale-105 transition-transform"
                >
                    <Heart
                        size={20}
                        fill={isFavorite ? '#f43f5e' : 'none'}
                        color={isFavorite ? '#f43f5e' : '#053742'}
                        className={` rounded-full ${isFavorite ? 'bg-red-100' : 'bg-[#E8F0F2]'}`}
                    />
                </button>
            </div>

            <div className="p-4">
                <h2 className="text-2xl font-bold text-[#053742] mb-3 truncate">{name.common}</h2>

                <div className="text-sm text-[#053742] space-y-1 mb-5">
                    <p><span className="font-semibold text-[#39A2DB]">Capital:</span> {capital ? capital.join(', ') : 'N/A'}</p>
                    <p><span className="font-semibold text-[#39A2DB]">Region:</span> {region}</p>
                    <p><span className="font-semibold text-[#39A2DB]">Population:</span> {population.toLocaleString()}</p>
                </div>

                <Link
                    to={`/country/${cca3}`}
                    className="block text-center 
                                bg-[#053742] 
                                text-[#A2DBFA] 
                                hover:border-2 
                                py-2 px-4 
                                rounded-xl
                                font-semibold
                                transition-all duration-300 
                                hover:bg-[#E8F0F2] 
                                hover:text-[#053742] 
                                hover:border-[#053742]"
                >
                    More Details
                </Link>
            </div>
        </div>
    );
};

export default CountryItem;