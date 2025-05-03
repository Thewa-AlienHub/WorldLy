// src/components/countries/FilterOptions.jsx
import React from 'react';

const FilterOptions = ({ region, setRegion, language, setLanguage, availableLanguages }) => {
    const regions = [
        'Africa',
        'Americas',
        'Asia',
        'Europe',
        'Oceania'
    ];

    return (
        <div className="flex flex-wrap gap-4">
            <div className="w-full md:w-auto flex-1">
                <label htmlFor="region-filter" className="block mb-2 font-medium">
                    Filter by Region
                </label>
                <select
                    id="region-filter"
                    value={region}
                    onChange={(e) => setRegion(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-full bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    <option value="">All Regions</option>
                    {regions.map(r => (
                        <option key={r} value={r}>{r}</option>
                    ))}
                </select>
            </div>

            <div className="w-full md:w-auto flex-1">
                <label htmlFor="language-filter" className="block mb-2 font-medium">
                    Filter by Language
                </label>
                <select
                    id="language-filter"
                    value={language}
                    onChange={(e) => setLanguage(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-full bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    <option value="">All Languages</option>
                    {availableLanguages.map(lang => (
                        <option key={lang} value={lang}>{lang}</option>
                    ))}
                </select>
            </div>

            <div className="w-full flex justify-end items-end">
                <button
                    onClick={() => {
                        setRegion('');
                        setLanguage('');
                    }}
                    className="px-4 py-2 bg-[#053742] text-white hover:text-[#053742] hover:bg-gray-300 rounded-full"
                >
                    Clear Filters
                </button>
            </div>
        </div>
    );
};

export default FilterOptions;