import axios from 'axios';

const API_BASE_URL = 'https://countries-api-abhishek.vercel.app';

// Afghanistan fallback data
const afghanistanFallback = {
  name: 'Afghanistan',
  capital: 'Kabul',
  region: 'Asia',
  subregion: 'Southern Asia',
  population: 40218234,
  area: 652230,
  latlng: [33, 65],
  borders: ['Iran', 'Pakistan', 'Turkmenistan', 'Uzbekistan', 'Tajikistan', 'China'],
  timezones: ['UTC+04:30'],
  currencies: 'Afghan afghani (؋)',
  languages: 'Dari, Pashto, Turkmen',
  flag: 'https://flagcdn.com/w320/af.png'
};

// Create axios instance with default config
const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  }
});

// Fetch with retry logic
const fetchWithRetry = async (endpoint, retries = 3) => {
  try {
    const response = await api.get(endpoint);
    return response.data;
  } catch (error) {
    if (retries > 0) {
      console.log(`Retrying ${endpoint}... (${retries} attempts left)`);
      await new Promise(resolve => setTimeout(resolve, 1000));
      return fetchWithRetry(endpoint, retries - 1);
    }
    throw error;
  }
};

export const fetchFirstCountry = async () => {
  try {
    const response = await fetchWithRetry('/countries/Afghanistan');
    return response.data || afghanistanFallback;
  } catch (error) {
    console.error('Using fallback data for Afghanistan:', error.message);
    return afghanistanFallback;
  }
};

export const fetchCountryByName = async (name) => {
  try {
    const response = await fetchWithRetry(`/countries/${encodeURIComponent(name)}`);
    if (!response.data) {
      throw new Error('Country not found');
    }
    return response.data;
  } catch (error) {
    console.error(`Error fetching country ${name}:`, error.message);
    throw new Error(`Failed to fetch country: ${name}. ${error.response?.status === 404 ? 'Country not found' : 'Please try again later'}`);
  }
};

export const fetchCountriesByRegion = async (region) => {
  try {
    const response = await api.get('/countries');
    if (!response.data || !Array.isArray(response.data.data)) {
      throw new Error('Invalid response format');
    }
    return response.data.data.filter(country => country.region === region);
  } catch (error) {
    console.error(`Error fetching countries in ${region}:`, error.message);
    throw new Error(`Failed to fetch countries in region: ${region}`);
  }
};

export const fetchBorderCountries = async (borderNames) => {
  if (!borderNames || borderNames.length === 0) return [];
  try {
    const borderPromises = borderNames.map(name => 
      fetchWithRetry(`/countries/${encodeURIComponent(name)}`)
    );
    const responses = await Promise.all(borderPromises);
    return responses.map(response => response.data);
  } catch (error) {
    console.error('Error fetching border countries:', error.message);
    return [];
  }
};

const predefinedRegions = ['Africa', 'Americas', 'Asia', 'Europe', 'Oceania'];

export const getAvailableRegions = () => {
  return predefinedRegions;
};