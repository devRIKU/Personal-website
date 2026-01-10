import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import SocialsPage from './pages/SocialsPage';

const App: React.FC = () => {
  return (
    <Router>
      <div className="min-h-screen bg-[#f8f8f8] text-neo-black selection:bg-neo-black selection:text-neo-yellow font-ui">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/socials" element={<SocialsPage />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;