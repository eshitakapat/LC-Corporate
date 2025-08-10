import logo from './logo.svg';
import './App.css';
import React from 'react';

import UrlShortner from './UrlShortner';
import AdminUrls from './AdminUrls';
function App() {
  return (
    <div
     style={{
        display: 'flex',
        alignItems: 'flex-start', // align to top
        gap: 32, // space between panels
        padding: 24,
        minHeight: '100vh',
        background: '#fafbfc',
      }}
    >
      <div style={{ flex: '0 0 400px' }}>
        <UrlShortner />
      </div>
      <div style={{ flex: 1 }}>
        <AdminUrls />
      </div>
    </div>
  );
}

export default App;
