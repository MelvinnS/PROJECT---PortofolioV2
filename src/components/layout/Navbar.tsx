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
          <Link to="/" className="logo" style={{ color: '#141414' }}>
            Melvin<span style={{ color: '#141414' }}>.</span>
          </Link>
          <ul className="nav-links">
            <li><button onClick={() => handleNavClick('home')} className="bg-transparent border-0 cursor-pointer font-medium text-inherit p-0" style={{ color: '#555' }}>Home</button></li>
            <li><button onClick={() => { setMobileMenuOpen(false); navigate('/about'); }} className="bg-transparent border-0 cursor-pointer font-medium text-inherit p-0" style={{ color: '#555' }}>About</button></li>
            <li><button onClick={() => { setMobileMenuOpen(false); navigate('/projects'); }} className="bg-transparent border-0 cursor-pointer font-medium text-inherit p-0" style={{ color: '#555' }}>Projects</button></li>
            <li><button onClick={() => handleNavClick('contact')} className="bg-transparent border-0 cursor-pointer font-medium text-inherit p-0" style={{ color: '#555' }}>Contact</button></li>
          </ul>
          <button
            onClick={() => handleNavClick('contact')}
            className="nav-cta cursor-pointer border-0"
            style={{ background: '#141414', color: '#fff' }}
          >
            Contact
          </button>
          <button
            className={`hamburger ${mobileMenuOpen ? 'active' : ''}`}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
            aria-expanded={mobileMenuOpen}
          >
            <span style={{ background: '#141414' }} />
            <span style={{ background: '#141414' }} />
            <span style={{ background: '#141414' }} />
          </button>
        </div>
      </nav>

      {/* Mobile Drawer */}
      <div className={`mobile-menu ${mobileMenuOpen ? 'open' : ''}`} style={{ background: '#fff', color: '#141414' }}>
        <ul>
          <li><button onClick={() => handleNavClick('home')} className="bg-transparent border-0 cursor-pointer font-semibold text-[1.3rem]" style={{ color: '#141414' }}>Home</button></li>
          <li><button onClick={() => { setMobileMenuOpen(false); navigate('/about'); }} className="bg-transparent border-0 cursor-pointer font-semibold text-[1.3rem]" style={{ color: '#141414' }}>About</button></li>
          <li><button onClick={() => { setMobileMenuOpen(false); navigate('/projects'); }} className="bg-transparent border-0 cursor-pointer font-semibold text-[1.3rem]" style={{ color: '#141414' }}>Projects</button></li>
          <li><button onClick={() => handleNavClick('contact')} className="bg-transparent border-0 cursor-pointer font-semibold text-[1.3rem]" style={{ color: '#141414' }}>Contact</button></li>
        </ul>
        <button
          onClick={() => handleNavClick('contact')}
          className="nav-cta cursor-pointer border-0 mt-2 text-base px-8 py-3"
          style={{ background: '#141414', color: '#fff' }}
        >
          Contact
        </button>
      </div>
    </>
  );
};
