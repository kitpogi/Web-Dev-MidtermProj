import React from 'react';

const CountryDetails = ({ country }) => {
  if (!country) return <div>Loading...</div>;

  return (
    <div className="p-6 rounded-lg shadow-md">
      <h2 className="text-2xl text-white font-bold mb-4">{country.name}</h2>
      
      <div className="grid grid-cols-1 text-white md:grid-cols-2 gap-4">
        <div>
          <p><span className="font-semibold">Capital:</span> {country.capital || 'N/A'}</p>
          <p><span className="font-semibold">Region:</span> {country.region || 'N/A'}</p>
          <p><span className="font-semibold">Subregion:</span> {country.subregion || 'N/A'}</p>
          <p><span className="font-semibold">Population:</span> {country.population?.toLocaleString() || 'N/A'}</p>
          <p><span className="font-semibold">Area:</span> {country.area?.toLocaleString() || 'N/A'} km²</p>
        </div>
        
        <div>
          <p><span className="font-semibold">Coordinates:</span> {country.latlng?.join(', ') || 'N/A'}</p>
          <p><span className="font-semibold">Timezones:</span> {country.timezones?.join(', ') || 'N/A'}</p>
          <p><span className="font-semibold">Currencies:</span> {country.currencies || 'N/A'}</p>
          <p><span className="font-semibold">Languages:</span> {country.languages || 'N/A'}</p>
        </div>
      </div>
    </div>
  );
};

export default CountryDetails;