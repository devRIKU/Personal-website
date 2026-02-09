import React from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import Now from '../components/Now';
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
          <Now />
          <Preferences />
          <Favorites />
          <Socials />
        </main>
        <Footer />
      </SmoothScrollWrapper>
      
      {/* Progressive Bottom Blur Overlay - Immersive & Smooth */}
      <div className="fixed bottom-0 left-0 w-full h-32 sm:h-40 md:h-64 pointer-events-none z-40">
        <div className="absolute inset-0 backdrop-blur-[0.5px] [mask-image:linear-gradient(to_bottom,transparent,black_20%)]"></div>
        <div className="absolute inset-0 backdrop-blur-[1px] [mask-image:linear-gradient(to_bottom,transparent,black_40%)]"></div>
        <div className="absolute inset-0 backdrop-blur-[2px] [mask-image:linear-gradient(to_bottom,transparent,black_60%)]"></div>
        <div className="absolute inset-0 backdrop-blur-[4px] [mask-image:linear-gradient(to_bottom,transparent,black_80%)]"></div>
        <div className="absolute inset-0 backdrop-blur-[8px] md:backdrop-blur-[12px] [mask-image:linear-gradient(to_bottom,transparent,black_100%)]"></div>
      </div>
      
      <FloatingAIButton />
    </>
  );
};

export default Home;