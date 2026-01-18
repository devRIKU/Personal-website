import React from 'react';
import Home from './pages/Home';

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#f8f8f8] dark:bg-neo-dark-bg text-neo-black dark:text-[#e5e5e5] selection:bg-neo-black selection:text-neo-yellow dark:selection:bg-neo-pink dark:selection:text-white font-ui transition-colors duration-300 relative">
      <Home />
      {/* Progressive Blur Overlay */}
      <div 
        className="fixed bottom-0 left-0 right-0 h-32 z-[100] pointer-events-none"
        style={{
          backdropFilter: 'blur(3px)',
          WebkitBackdropFilter: 'blur(3px)',
          maskImage: 'linear-gradient(to bottom, transparent, black)',
          WebkitMaskImage: 'linear-gradient(to bottom, transparent, black)'
        }}
      />
    </div>
  );
};

export default App;