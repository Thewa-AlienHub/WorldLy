import React, { useState } from "react";
import { X, Search, ChevronDown } from "lucide-react";

const FilterOptions = ({
  region,
  setRegion,
  language,
  setLanguage,
  availableLanguages,
  search,
  setSearch,
}) => {
  const regions = [
    "All Regions",
    "Africa",
    "Americas",
    "Asia",
    "Europe",
    "Oceania",
  ];
  const [hoveredRegion, setHoveredRegion] = useState(null);

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 space-y-4">
      {/* Row 1: Search + Language */}
      <div className="flex flex-col md:flex-row gap-4">
        {/* Search */}
        <div className="flex-1 relative">
          <label
            htmlFor="search"
            className="block text-sm font-medium text-slate-700 mb-1"
          >
            Search
          </label>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              id="search"
              type="text"
              className="w-full pl-9 pr-10 py-2.5 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              placeholder="Search countries..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            {search && (
              <button
                onClick={() => setSearch("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {/* Language */}
        <div className="flex-1 relative">
          <label
            htmlFor="language"
            className="block text-sm font-medium text-slate-700 mb-1"
          >
            Language
          </label>
          <div className="relative">
            <select
              id="language"
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="w-full appearance-none pl-4 pr-10 py-2.5 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            >
              <option value="">All Languages</option>
              {availableLanguages.map((lang) => (
                <option key={lang} value={lang}>
                  {lang}
                </option>
              ))}
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
          </div>
        </div>
      </div>

      {/* Row 2: Region + Reset */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="flex flex-wrap gap-2">
          {regions.map((r) => {
            const isActive =
              (r === "All Regions" && region === "") || r === region;
            const isHovered = hoveredRegion === r;

            return (
              <button
                key={r}
                onClick={() => setRegion(r === "All Regions" ? "" : r)}
                onMouseEnter={() => setHoveredRegion(r)}
                onMouseLeave={() => setHoveredRegion(null)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  isActive
                    ? "text-white bg-[#147eb7] shadow-sm"
                    : "text-slate-600 bg-white border border-slate-200 hover:border-blue-300"
                }`}
                style={{
                  transform:
                    isHovered && !isActive ? "translateY(-1px)" : "none",
                }}
              >
                {r}
              </button>
            );
          })}
        </div>

        <button
          onClick={() => {
            setRegion("");
            setLanguage("");
            setSearch("");
          }}
          disabled={
            region === "" && language === "" && (!search || search === "")
          }
          className="mt-2 md:mt-0 px-4 py-2.5 border border-slate-200 rounded-lg text-sm font-medium text-slate-600 hover:text-slate-800 hover:bg-slate-100 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <div className="flex items-center gap-2">
            <X className="w-4 h-4" />
            Reset Filters
          </div>
        </button>
      </div>
    </div>
  );
};

export default FilterOptions;