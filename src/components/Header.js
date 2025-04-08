import React from 'react';
import { Link } from 'react-router-dom';


const Header = () => {
  return (
    <header className="bg-black  text-white py-3">
      <div className="container d-flex justify-content-between align-items-center">
        {/* Title */}
        <h1 className="m-0 fs-4">
          <Link to="/" className="text-white text-decoration-none">
            Keah Nation Node
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
