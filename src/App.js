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
        {/* Background Video */}
        <div className="video-background">
          <video autoPlay loop muted>
            <source src="/videos/earth-bg.mp4" type="video/mp4" />
            Your browser does not support HTML5 video.
          </video>
          <div className="video-overlay"></div>
        </div>

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