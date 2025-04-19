import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Modal from '../components/modal';
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
import LoadingSpinner from '../components/LoadingSpinner';

const CountryView = () => {
  const [country, setCountry] = useState(null);
  const [borderCountries, setBorderCountries] = useState([]);
  const [regions] = useState(getAvailableRegions());
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
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
        setShowModal(true);
      } finally {
        setLoading(false);
      }
    };
    
    loadInitialData();
  }, []);

  useEffect(() => {
    console.log('Loading state:', loading);
  }, [loading]);

  const handleSearch = async (searchTerm) => {
    if (!searchTerm.trim()) {
      setError('Please enter a country name');
      setShowModal(true);
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
      setShowModal(true);
    } finally {
      setLoading(false);
    }
  };

  const handleFilter = async (region) => {
    try {
      setLoading(true);
      const countriesInRegion = await fetchCountriesByRegion(region);
      setFilteredCountries(countriesInRegion);
      setCountry(null); // Clear the currently selected country
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
      setShowModal(true);
    } finally {
      setLoading(false);
    }
  };

  const closeModal = () => {
    setShowModal(false);
    setError(null);
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="content-container">
      {showModal && (
        <Modal
          title="Error"
          message={error || 'An unexpected error occurred.'}
          onClose={closeModal}
        />
      )}
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
          <div className="country-card w-full max-w-4xl bg-transparent bg-opacity-10 p-6 rounded-lg shadow text-black">
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

      {/* 🔹 Filtered Countries Grid */}
      {filteredCountries.length > 0 && (
        <div className="region-filter-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredCountries.map((country, index) => (
            <div
              key={country.alpha3Code || `country-${index}`}
              className="country-card w-full max-w-sm bg-white bg-opacity-10 p-3 rounded-lg shadow text-white min-w-[180px] inline-block whitespace-nowrap"
            >
              {/* Flag Section */}
              <div className="flex justify-center items-center h-24 mb-3">
                <img
                  src={country.flag}
                  alt={`Flag of ${country.name}`}
                  className="w-full h-full object-contain max-h-20"
                />
              </div>

              {/* Country Details */}
              <h2 className="text-lg font-bold text-center">{country.name}</h2>
              <div className="flex flex-col gap-1 text-sm">
                <p className="flex justify-between">
                  <span className="detail-label font-bold">Capital:</span> <span>{country.capital || 'N/A'}</span>
                </p>
                <p className="flex justify-between">
                  <span className="detail-label font-bold">Region:</span> <span>{country.region || 'N/A'}</span>
                </p>
                <p className="flex justify-between">
                  <span className="detail-label font-bold">Population:</span> 
                  <span>{typeof country.population === 'number' ? country.population.toLocaleString() : 'N/A'}</span>
                </p>
                <p className="flex justify-between">
                  <span className="detail-label font-bold">Area:</span> 
                  <span>{typeof country.area === 'number' ? `${country.area.toLocaleString()} km²` : 'N/A'}</span>
                </p>
                <p className="flex justify-between">
                  <span className="detail-label font-bold">Coordinates:</span> 
                  <span>
                    {country.latlng && country.latlng.length === 2
                      ? `${country.latlng[0]}, ${country.latlng[1]}`
                      : 'N/A'}
                  </span>
                </p>
                <p className="flex justify-between">
                  <span className="detail-label font-bold">Timezones:</span> 
                  <span>{country.timezones ? country.timezones.join(', ') : 'N/A'}</span>
                </p>
                <p className="flex justify-between">
                  <span className="detail-label font-bold">Currency:</span> 
                  <span>{country.currencies ? Object.values(country.currencies).map(c => c.name).join(', ') : 'N/A'}</span>
                </p>
                <p className="flex justify-between">
                  <span className="detail-label font-bold">Languages:</span> 
                  <span>{country.languages ? Object.values(country.languages).join(', ') : 'N/A'}</span>
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}  

export default CountryView;
