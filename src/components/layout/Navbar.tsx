import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (anchorId: string) => {
    setMobileMenuOpen(false);
    if (location.pathname !== '/') {
      navigate('/#' + anchorId);
    } else {
      const element = document.getElementById(anchorId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <>
      <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
        <div className="nav-inner">
          <Link to="/" className="logo">
            Melvin<span>.</span>
          </Link>
          <ul className="nav-links">
            <li><button onClick={() => handleNavClick('home')} className="bg-transparent border-0 cursor-pointer font-medium text-inherit p-0">Home</button></li>
            <li><button onClick={() => handleNavClick('about')} className="bg-transparent border-0 cursor-pointer font-medium text-inherit p-0">About</button></li>
            <li><button onClick={() => handleNavClick('stack')} className="bg-transparent border-0 cursor-pointer font-medium text-inherit p-0">Tech Stack</button></li>
            <li><button onClick={() => handleNavClick('projects')} className="bg-transparent border-0 cursor-pointer font-medium text-inherit p-0">Projects</button></li>
            <li><button onClick={() => handleNavClick('creative')} className="bg-transparent border-0 cursor-pointer font-medium text-inherit p-0">Creative</button></li>
            <li><button onClick={() => handleNavClick('certificates')} className="bg-transparent border-0 cursor-pointer font-medium text-inherit p-0">Certificates</button></li>
          </ul>
          <button onClick={() => handleNavClick('contact')} className="nav-cta cursor-pointer border-0">
            Contact
          </button>
          <button
            className={`hamburger ${mobileMenuOpen ? 'active' : ''}`}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
            aria-expanded={mobileMenuOpen}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </nav>

      {/* Mobile Drawer */}
      <div className={`mobile-menu ${mobileMenuOpen ? 'open' : ''}`}>
        <ul>
          <li><button onClick={() => handleNavClick('home')} className="bg-transparent border-0 cursor-pointer font-semibold text-[1.3rem] text-inherit">Home</button></li>
          <li><button onClick={() => handleNavClick('about')} className="bg-transparent border-0 cursor-pointer font-semibold text-[1.3rem] text-inherit">About</button></li>
          <li><button onClick={() => handleNavClick('stack')} className="bg-transparent border-0 cursor-pointer font-semibold text-[1.3rem] text-inherit">Tech Stack</button></li>
          <li><button onClick={() => handleNavClick('projects')} className="bg-transparent border-0 cursor-pointer font-semibold text-[1.3rem] text-inherit">Projects</button></li>
          <li><button onClick={() => handleNavClick('creative')} className="bg-transparent border-0 cursor-pointer font-semibold text-[1.3rem] text-inherit">Creative</button></li>
          <li><button onClick={() => handleNavClick('certificates')} className="bg-transparent border-0 cursor-pointer font-semibold text-[1.3rem] text-inherit">Certificates</button></li>
        </ul>
        <button onClick={() => handleNavClick('contact')} className="nav-cta cursor-pointer border-0 mt-2 text-base px-8 py-3">
          Contact
        </button>
      </div>
    </>
  );
};
