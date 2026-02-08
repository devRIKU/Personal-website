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
      
      {/* Progressive Bottom Blur Overlay */}
      <div className="fixed bottom-0 left-0 w-full h-32 md:h-48 pointer-events-none z-40">
        <div className="absolute inset-0 backdrop-blur-[1px] [mask-image:linear-gradient(to_bottom,transparent,black)]"></div>
        <div className="absolute inset-0 backdrop-blur-[2px] [mask-image:linear-gradient(to_bottom,transparent_25%,black)]"></div>
        <div className="absolute inset-0 backdrop-blur-[4px] [mask-image:linear-gradient(to_bottom,transparent_50%,black)]"></div>
        <div className="absolute inset-0 backdrop-blur-[8px] [mask-image:linear-gradient(to_bottom,transparent_75%,black)]"></div>
        <div className="absolute inset-0 backdrop-blur-[12px] [mask-image:linear-gradient(to_bottom,transparent_90%,black)]"></div>
      </div>
      
      <FloatingAIButton />
    </>
  );
};

export default Home;