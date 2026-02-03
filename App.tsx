import React from 'react';
import Home from './pages/Home';
import StarBackground from './components/StarBackground';

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#f8f8f8] dark:bg-neo-dark-bg text-neo-black dark:text-[#e5e5e5] selection:bg-neo-black selection:text-neo-yellow dark:selection:bg-neo-pink dark:selection:text-white font-ui transition-colors duration-300 relative">
      <StarBackground />
      <div className="relative z-10">
        <Home />
      </div>
    </div>
  );
};

export default App;