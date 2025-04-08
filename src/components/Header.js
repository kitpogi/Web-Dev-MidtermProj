import React from 'react';
import { Link } from 'react-router-dom';
import { FaGlobe } from 'react-icons/fa'; // Importing the Earth icon from React Icons

const Header = () => {
  return (
    <header className="text-white py-3">
      <div className="container d-flex justify-content-between align-items-center">
        {/* Title with Earth Icon */}
        <h1 className="m-0 fs-5 flex items-center gap-2">
          <FaGlobe className="text-white" /> {/* Earth icon */}
          <Link to="/" className="text-white text-decoration-none">
            Keah Nation
          </Link>
        </h1>

        {/* Navigation */}
        <nav className="d-flex gap-4">
          <Link to="/" className="text-white text-decoration-none nav-hover">
            Home
          </Link>
          <Link to="/" className="text-white text-decoration-none nav-hover">
            Countries
          </Link>
          <a
            href="https://countries-api-abhishek.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white text-decoration-none nav-hover"
          >
            API
          </a>
        </nav>
      </div>
    </header>
  );
};

export default Header;
