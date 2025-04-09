import React from 'react';

const CountryDetails = ({ country }) => {
  if (!country) return <div>Loading...</div>;

  return (
    <div className="details-grid">
      <h2 className="country-name">{country.name}</h2>
      
      <div className="details-columns">
        <div>
          <p><span className="detail-label">Capital:</span> {country.capital || 'N/A'}</p>
          <p><span className="detail-label">Region:</span> {country.region || 'N/A'}</p>
          <p><span className="detail-label">Subregion:</span> {country.subregion || 'N/A'}</p>
          <p><span className="detail-label">Population:</span> {country.population?.toLocaleString() || 'N/A'}</p>
          <p><span className="detail-label">Area:</span> {country.area?.toLocaleString() || 'N/A'} km²</p>
        </div>
        
        <div>
          <p><span className="detail-label">Coordinates:</span> {country.latlng?.join(', ') || 'N/A'}</p>
          <p><span className="detail-label">Timezones:</span> {country.timezones?.join(', ') || 'N/A'}</p>
          <p><span className="detail-label">Currencies:</span> {country.currencies || 'N/A'}</p>
          <p><span className="detail-label">Languages:</span> {country.languages || 'N/A'}</p>
        </div>
      </div>
    </div>
  );
};

export default CountryDetails;
