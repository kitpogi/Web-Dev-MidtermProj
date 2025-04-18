import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { fetchCountryByName, fetchCountriesByNames } from '../services/api';
import CountryDetails from '../components/CountryDetails';
import LoadingSpinner from '../components/LoadingSpinner'; // Consider adding a spinner component

const CountryPage = () => {
  const { countryName } = useParams();
  const [country, setCountry] = useState(null);
  const [borderCountries, setBorderCountries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadCountryData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const countryData = await fetchCountryByName(countryName);
        if (!countryData) {
          throw new Error('Country not found');
        }
        
        setCountry(countryData);
        
        if (countryData.borders?.length > 0) {
          const borders = await fetchCountriesByNames(countryData.borders);
          setBorderCountries(borders);
        } else {
          setBorderCountries([]);
        }
      } catch (err) {
        setError(err.message);
        console.error('Error loading country:', err);
      } finally {
        setLoading(false);
      }
    };
    
    loadCountryData();
  }, [countryName]);

  if (loading) {
    return <LoadingSpinner />; // Or your current loading div
  }

  if (error) {
    return (
      <div className="text-center py-8 text-red-500">
        Error: {error}
        <button 
          onClick={() => window.location.reload()}
          className="ml-4 px-4 py-2 bg-blue-500 text-white rounded"
        >
          Retry
        </button>
      </div>
    );
  }

  if (!country) {
    return <div className="text-center py-8">Country not found</div>;
  }

  return (
    <div className="flex justify-center px-4 py-6">
      <div className="w-full max-w-5xl">
        <CountryDetails 
          country={country} 
          borderCountries={borderCountries.map(c => c.name)}
        />
      </div>
    </div>
  );
};

export default CountryPage;