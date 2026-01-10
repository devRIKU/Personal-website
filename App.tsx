import React from 'react';
import Home from './pages/Home';

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#f8f8f8] text-neo-black selection:bg-neo-black selection:text-neo-yellow font-ui">
      <Home />
    </div>
  );
};

export default App;