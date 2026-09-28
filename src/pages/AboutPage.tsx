import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

export const AboutPage: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div
      style={{
        background: '#ffffff',
        minHeight: '100vh',
        padding: '6rem 1.5rem 3rem',
        backgroundImage:
          'linear-gradient(#e5e7eb 1px, transparent 1px), linear-gradient(90deg, #e5e7eb 1px, transparent 1px)',
        backgroundSize: '44px 44px',
      }}
    >
      <div style={{ maxWidth: '900px', margin: '0 auto' }}>
        <button
          onClick={() => navigate(-1)}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.4rem',
            fontSize: '0.85rem',
            fontWeight: 800,
            color: '#141414',
            background: '#ffffff',
            border: '2.5px solid #141414',
            borderRadius: '999px',
            padding: '0.4rem 1.1rem',
            cursor: 'pointer',
            boxShadow: '3px 3px 0 #141414',
            marginBottom: '2rem',
          }}
        >
          <ArrowLeft className="w-4 h-4" /> Back
        </button>

        <div
          style={{
            background: '#ffffff',
            border: '3px solid #141414',
            boxShadow: '6px 6px 0 #141414',
            borderRadius: '16px',
            padding: '3rem 2.5rem',
            textAlign: 'center',
          }}
        >
          <span
            style={{
              fontSize: '0.75rem',
              fontWeight: 800,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: '#888',
            }}
          >
            About Me
          </span>
          <h1
            style={{
              fontSize: 'clamp(2rem, 4vw, 3rem)',
              fontWeight: 900,
              color: '#141414',
              margin: '0.5rem 0 1rem',
              letterSpacing: '-0.02em',
            }}
          >
            More Details
          </h1>
          <p style={{ color: '#666', fontSize: '1rem', maxWidth: '480px', margin: '0 auto' }}>
            This page will contain extended information about background, experience, and journey.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
