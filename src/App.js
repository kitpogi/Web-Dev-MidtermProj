import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import CountryView from './pages/CountryView';
import './App.css';

function App() {
  return (
    <Router>
      <div className="app-container relative">
        <div className="video-background">
          <video autoPlay loop muted>
            <source src="/videos/earth-bg.mp4" type="video/mp4" />
            Your browser does not support HTML5 video.
          </video>
        </div>

        <div className="content-container min-h-screen flex flex-col relative z-10 pt-[calc(60px)] pb-[calc(60px)]">
          <Header />
          <main className="flex-grow p-4 relative z-10">
            <Routes>
              <Route path="/" element={<CountryView />} />
              <Route path="/country/:countryName" element={<CountryView />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </div>
    </Router>
  );
}

export default App;
