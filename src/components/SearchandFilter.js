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
    <div className="absolute top-4 right-4 mb-6 p-4 rounded-lg shadow-md w-full max-w-md">
      <form onSubmit={handleSearch} className="mb-4 flex justify-between">
        <div className="flex items-center w-full">
          <input
            type="text"
            placeholder="Search for a country..."
            className="p-2 border border-gray-300 rounded-l focus:outline-none focus:ring-2 focus:ring-blue-500 w-full sm:w-64"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button
            type="submit"
            className="bg-black text-white px-4 py-2 rounded-r hover:bg-blue-700"
          >
            Search
          </button>
        </div>
      </form>

      <div className="flex justify-between">
        <label htmlFor="region-filter" className="text-white block font-semibold mb-2">
          Filter by Region:
        </label>
        <select
          id="region-filter"
          className="p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          onChange={handleFilterChange}
          defaultValue="all"
        >
          <option value="all">All Regions</option>
          {regions.map((region) => (
            <option key={region} value={region}>
              {region}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default SearchAndFilter;
