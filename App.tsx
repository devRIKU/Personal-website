import React, { useState, useEffect } from 'react';
import Home from './pages/Home';
import SocialsPage from './pages/SocialsPage';

const App: React.FC = () => {
  const [currentPath, setCurrentPath] = useState(window.location.pathname);

  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname);
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