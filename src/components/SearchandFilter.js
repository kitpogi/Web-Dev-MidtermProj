import React, { useState } from 'react';

const SearchAndFilter = ({ onSearch, onFilter, regions }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    onSearch(searchTerm);
  };

  const handleFilterChange = (e) => {
    onFilter(e.target.value);
  };

  return (
    <div className="flex justify-center mt-0"> 
      <div className="w-full max-w-3xl bg-black/5 backdrop-blur-md rounded-2xl shadow-lg border border-black/10 p-4 flex flex-col sm:flex-row items-center sm:space-x-4 space-y-4 sm:space-y-0">
      
        {/* Search Input */}
        <form onSubmit={handleSearch} className="w-full sm:flex-1">
          <div className="flex w-full">
            <input
              type="text"
              placeholder="🔍 Search for a country..."
              className="w-full bg-black/20 text-white px-4 py-2 rounded-l-xl border border-black/20 focus:outline-none focus:ring-2 focus:ring-blue-400 backdrop-blur-sm placeholder-white/60"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 transition text-white px-4 py-2 rounded-r-xl font-medium"
            >
              Search
            </button>
          </div>
        </form>
    
        {/* Region Filter */}
        <div className="w-full sm:w-auto flex flex-col sm:flex-row items-center gap-2">
          <label htmlFor="region-filter" className="text-white text-sm font-medium whitespace-nowrap">
            🌍 Region:
          </label>
          <select
            id="region-filter"
            className="bg-white/20 text-white px-4 py-2 rounded-xl border border-white/20 focus:outline-none focus:ring-2 focus:ring-blue-400 backdrop-blur-sm hover:bg-white/30 transition"
            onChange={handleFilterChange}
            defaultValue="all"
          >
            <option value="all" className="text-black">All Regions</option>
            {regions.map((region) => (
              <option key={region} value={region} className="text-black">
                {region}
              </option>
            ))}
          </select>
        </div>
    
      </div>
    </div>
  );  
}

export default SearchAndFilter;
