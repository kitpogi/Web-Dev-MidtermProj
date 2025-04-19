import React from 'react';
import Flag from './Flag';
import Borders from './Borders';

const CountryDetails = ({ country, borderCountries = [] }) => {
  if (!country) return <div>Loading...</div>;

  // Safely extract values with fallbacks
  const {
    name = 'Unknown',
    capital = 'N/A',
    region = 'N/A',
    subregion = 'N/A',
    population = 'N/A',
    area = 'N/A',
    coordinates = {},
    timezones = [],
    currency = 'N/A',
    languages = [],
    flag = ''
  } = country;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
      {/* Flag Column */}
      <div className="flex justify-center items-center h-48">
        <Flag flagUrl={flag} altText={`Flag of ${name}`} />
      </div>

      {/* Details Column */}
      <div className="text-white flex flex-col gap-4 break-words">
        <h2 className="text-xl font-bold text-center">{name}</h2>
        <div className="details-columns grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p><span className="detail-label">Capital:</span> {capital}</p>
            <p><span className="detail-label">Region:</span> {region}</p>
            <p><span className="detail-label">Subregion:</span> {subregion}</p>
            <p><span className="detail-label">Population:</span> 
              {typeof population === 'number' ? population.toLocaleString() : population}
            </p>
            <p><span className="detail-label">Area:</span> 
              {typeof area === 'number' ? area.toLocaleString() : area} km²
            </p>
          </div>
          
          <div>
            <p><span className="detail-label">Coordinates:</span> 
              {coordinates.latitude && coordinates.longitude 
                ? `${coordinates.latitude}, ${coordinates.longitude}` 
                : 'N/A'}
            </p>
            <p><span className="detail-label">Timezones:</span> 
              {timezones.length ? timezones.join(', ') : 'N/A'}
            </p>
            <p><span className="detail-label">Currency:</span> {currency}</p>
            <p><span className="detail-label">Languages:</span> 
              {languages.length ? languages.join(', ') : 'N/A'}
            </p>
          </div>
        </div>

        {/* Borders Section */}
        {borderCountries.length > 0 && (
          <div className="mt-8">
            <Borders borders={borderCountries} />
          </div>
        )}
      </div>
    </div>
  );
};

export default CountryDetails;