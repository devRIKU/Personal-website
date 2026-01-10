import React, { useState, useEffect } from 'react';
import Home from './pages/Home';
import SocialsPage from './pages/SocialsPage';

const App: React.FC = () => {
  // Helper to ensure paths like '/socials/' and '/socials' both match
  const getNormalizedPath = () => {
    const path = window.location.pathname;
    return path.length > 1 && path.endsWith('/') ? path.slice(0, -1) : path;
  };

  const [currentPath, setCurrentPath] = useState(getNormalizedPath());

  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(getNormalizedPath());
    };

    window.addEventListener('popstate', handlePopState);
    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, []);

  return (
    <div className="min-h-screen bg-[#f8f8f8] text-neo-black selection:bg-neo-black selection:text-neo-yellow font-ui">
      {currentPath === '/socials' ? <SocialsPage /> : <Home />}
    </div>
  );
};

export default App;