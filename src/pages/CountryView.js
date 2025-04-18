import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  fetchFirstCountry, 
  fetchCountryByName, 
  fetchCountriesByRegion,
  fetchBorderCountries,
  getAvailableRegions
} from '../services/api';
import CountryDetails from '../components/CountryDetails';
import Borders from '../components/Borders';
import SearchAndFilter from '../components/SearchandFilter';

const CountryView = () => {
  const [country, setCountry] = useState(null);
  const [borderCountries, setBorderCountries] = useState([]);
  const [regions] = useState(getAvailableRegions());
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const loadInitialData = async () => {
      try {
        setLoading(true);
        const afghanistan = await fetchFirstCountry();
        setCountry(afghanistan);
        
        if (afghanistan.borders && afghanistan.borders.length > 0) {
          const borders = await fetchBorderCountries(afghanistan.borders);
          setBorderCountries(borders);
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    
    loadInitialData();
  }, []);

  const handleSearch = async (searchTerm) => {
    if (!searchTerm.trim()) {
      setError('Please enter a country name');
      return;
    }

    try {
      setLoading(true);
      setError(null);
      
      const foundCountry = await fetchCountryByName(searchTerm);
      setCountry(foundCountry);
      
      if (foundCountry.borders?.length > 0) {
        const borders = await fetchBorderCountries(foundCountry.borders);
        setBorderCountries(borders);
      } else {
        setBorderCountries([]);
      }
      
      navigate(`/country/${searchTerm}`);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleFilter = async (region) => {
    if (!region || region === 'all') return;
    try {
      setLoading(true);
      setError(null);
      const countriesInRegion = await fetchCountriesByRegion(region);
      if (countriesInRegion.length > 0) {
        setCountry(countriesInRegion[0]);
        
        if (countriesInRegion[0].borders?.length > 0) {
          const borders = await fetchBorderCountries(countriesInRegion[0].borders);
          setBorderCountries(borders);
        } else {
          setBorderCountries([]);
        }
        
        navigate(`/country/${countriesInRegion[0].name}`);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleBorderClick = async (borderCountryName) => {
    try {
      setLoading(true);
      setError(null);
      const borderCountry = await fetchCountryByName(borderCountryName);
      setCountry(borderCountry);
      
      if (borderCountry.borders?.length > 0) {
        const borders = await fetchBorderCountries(borderCountry.borders);
        setBorderCountries(borders);
      } else {
        setBorderCountries([]);
      }
      
      navigate(`/country/${borderCountryName}`);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="text-center text-white py-8">
        Loading country data...
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-8">
        <p className="text-red-500 mb-4">{error}</p>
        <button 
          onClick={() => window.location.reload()}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="content-container">
      {/* 🔹 Search and Filter (centered at top) */}
      <div className="search-filter-wrapper">
        <SearchAndFilter 
          onSearch={handleSearch} 
          onFilter={handleFilter} 
          regions={regions} 
        />
      </div>
  
      {/* 🔹 Country Card (centered below search) */}
      {country && (
        <div className="mt-8 w-full flex justify-center">
          <div className="country-card w-full max-w-4xl bg-white bg-opacity-10 p-6 rounded shadow text-white">
            {/* Details Section */}
            <div className="details-section mt-4">
              <CountryDetails country={country} />
              <Borders 
                borders={borderCountries} 
                onBorderClick={handleBorderClick} 
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}  

export default CountryView;
