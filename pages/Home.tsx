import React from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import Preferences from '../components/Preferences';
import Favorites from '../components/Favorites';
import Socials from '../components/Socials';
import Footer from '../components/Footer';
import FloatingAIButton from '../components/FloatingAIButton';
import SmoothScrollWrapper from '../components/SmoothScrollWrapper';

const Home: React.FC = () => {
  return (
    <>
      <Navbar />
      <SmoothScrollWrapper>
        <main>
          <Hero />
          <Preferences />
          <Favorites />
          <Socials />
        </main>
        <Footer />
      </SmoothScrollWrapper>
      
      {/* Fading Bottom Blur Overlay */}
      <div className="fixed bottom-0 left-0 w-full h-32 pointer-events-none z-40 
        bg-gradient-to-t from-[#f8f8f8] via-[#f8f8f8]/80 to-transparent 
        dark:from-[#141517] dark:via-[#141517]/80 dark:to-transparent 
        backdrop-blur-[2px]" 
      />
      
      <FloatingAIButton />
    </>
  );
};

export default Home;