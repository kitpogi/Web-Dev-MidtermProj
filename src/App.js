import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import CountryView from './pages/CountryView';
import './App.css';

function App() {
  return (
    <Router>
      <div className="app-container">
        {/* Fixed Header */}  
        <Header />
          {/* Spacer to offset the fixed header */}
          <div style={{ height: '25px' }}></div>  {/* Adjust height as needed */}

        {/* Main Content */}
        <main className="content-container">
          <div>
          <Routes>
            <Route path="/" element={<CountryView />} />
            <Route path="/country/:countryName" element={<CountryView />} />
          </Routes>
          </div>
        </main>

        {/* Fixed Footer */}
        <Footer />
      </div>
    </Router>
  );
}

export default App;