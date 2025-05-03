// src/components/countries/SearchBox.jsx
import React from 'react';
import { Search } from 'lucide-react';

const SearchBox = ({ search, setSearch }) => {
    return (
        <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <Search className="w-5 h-5 text-gray-500" />
            </div>
            <input
                type="text"
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-full bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Search for a country..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />
        </div>
    );
};

export default SearchBox;