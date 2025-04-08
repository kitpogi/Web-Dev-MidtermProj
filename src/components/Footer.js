import React from 'react';

const Footer = () => {
  return (
    <footer className="text-white py-3 mt-20">
      <div className="container text-center">
        <p className="m-0">&copy; 2025 Keah Criselle B. Bareno. ITS 306 - B.</p>
        <div className="mt-2 d-flex justify-content-center gap-4">
          <a
            href="https://web.facebook.com/keahbareno8"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white text-decoration-none"
            title="Facebook"
          >
            <i className="fab fa-facebook fa-lg me-1"></i> Facebook
          </a>
          <a
            href="mailto:barenokcy@gmail.com"
            className="text-white text-decoration-none"
            title="Gmail"
          >
            <i className="fas fa-envelope fa-lg me-1"></i> Gmail
          </a>
          <a
            href="https://github.com/KeahB"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white text-decoration-none"
            title="GitHub"
          >
            <i className="fab fa-github fa-lg me-1"></i> GitHub
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
