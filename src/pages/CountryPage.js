import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { fetchCountryByName, fetchCountriesByNames } from '../services/api';
import CountryDetails from '../components/CountryDetails';
import Flag from '../components/Flag';
import Borders from '../components/Borders';

const CountryPage = () => {
  const { countryName } = useParams();
  const [country, setCountry] = useState(null);
  const [borderCountries, setBorderCountries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadCountryData = async () => {
      try {
        const countryData = await fetchCountryByName(countryName);
        setCountry(countryData);
        
        if (countryData.borders && countryData.borders.length > 0) {
          const borders = await fetchCountriesByNames(countryData.borders);
          setBorderCountries(borders);
        } else {
          setBorderCountries([]);
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    
    loadCountryData();
  }, [countryName]);

  if (loading) {
    return <div className="text-center py-8">Loading country data...</div>;
  }

  if (error) {
    return <div className="text-center py-8 text-red-500">{error}</div>;
  }

  if (!country) {
    return <div className="text-center py-8">Country not found</div>;
  }

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div>
          <Flag flagUrl={country.flag} altText={`Flag of ${country.name}`} />
        </div>
        <div>
          <CountryDetails country={country} />
          <Borders borders={borderCountries.map(c => c.name)} />
        </div>
      </div>
    </div>
  );
};

export default CountryPage;