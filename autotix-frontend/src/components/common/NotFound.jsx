import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      background: '#f8f9fa',
      padding: '20px'
    }}>
      <div style={{ textAlign: 'center' }}>
        <h1 style={{ fontSize: '120px', margin: '0', color: '#264653' }}>404</h1>
        <h2 style={{ fontSize: '32px', margin: '20px 0', color: '#6c757d' }}>
          Page Not Found
        </h2>
        <p style={{ fontSize: '16px', color: '#6c757d', marginBottom: '30px' }}>
          The page you're looking for doesn't exist.
        </p>
        <Link
          to="/dashboard"
          style={{
            display: 'inline-block',
            padding: '12px 24px',
            background: '#2A9D8F',
            color: 'white',
            textDecoration: 'none',
            borderRadius: '8px',
            fontWeight: '600'
          }}
        >
          Go to Dashboard
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
