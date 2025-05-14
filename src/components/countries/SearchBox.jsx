import React from "react";

const SearchBox = ({ search, setSearch, colors }) => {
  return (
    <div className="relative w-full">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          style={{ color: colors.blue }}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      </div>
      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search for countries..."
        className="pl-10 pr-4 py-3 w-full rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:border-transparent transition-shadow duration-200"
        style={{
          borderColor: colors.lightBlue,
          boxShadow: "0 1px 3px rgba(0, 0, 0, 0.05)",
        }}
      />
      {search && (
        <button
          onClick={() => setSearch("")}
          className="absolute inset-y-0 right-0 pr-3 flex items-center"
          aria-label="Clear search"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 text-gray-400 hover:text-gray-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      )}
    </div>
  );
};

export default SearchBox;