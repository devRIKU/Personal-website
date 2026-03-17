import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import Now from '../components/Now';
import TheLab from '../components/TheLab';
import Preferences from '../components/Preferences';
import Favorites from '../components/Favorites';
import Socials from '../components/Socials';
import Footer from '../components/Footer';
import FloatingAIButton from '../components/FloatingAIButton';
import SmoothScrollWrapper from '../components/SmoothScrollWrapper';

const Home: React.FC = () => {
  const [blurOpacity, setBlurOpacity] = useState(1);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const scrollHeight = Math.max(
        document.body.scrollHeight, 
        document.documentElement.scrollHeight
      );
      const maxScroll = scrollHeight - window.innerHeight;
      
      if (maxScroll <= 0) {
        setBlurOpacity(1);
        return;
      }

      const distanceToBottom = maxScroll - scrollY;
      const fadeDistance = Math.min(800, maxScroll); // Start fading 800px from the bottom

      if (distanceToBottom > fadeDistance) {
        setBlurOpacity(1);
      } else {
        // Progressively reduce blur opacity as we reach the footer
        setBlurOpacity(Math.max(0, distanceToBottom / fadeDistance));
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    // Initial call
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <Navbar />
      <SmoothScrollWrapper>
        <main>
          <Hero />
          <Now />
          <TheLab />
          <Preferences />
          <Favorites />
          <Socials />
        </main>
        <Footer />
      </SmoothScrollWrapper>
      
      {/* Progressive Bottom Blur Overlay - Immersive & Smooth */}
      <div 
        className="fixed bottom-0 left-0 w-full h-28 sm:h-36 md:h-56 pointer-events-none z-40"
        style={{ opacity: blurOpacity }}
      >
        <div className="absolute inset-0 backdrop-blur-[0.2px] [mask-image:linear-gradient(to_bottom,transparent,black_20%)]"></div>
        <div className="absolute inset-0 backdrop-blur-[0.5px] [mask-image:linear-gradient(to_bottom,transparent,black_40%)]"></div>
        <div className="absolute inset-0 backdrop-blur-[1px] [mask-image:linear-gradient(to_bottom,transparent,black_60%)]"></div>
        <div className="absolute inset-0 backdrop-blur-[2px] [mask-image:linear-gradient(to_bottom,transparent,black_80%)]"></div>
        <div className="absolute inset-0 backdrop-blur-[3px] md:backdrop-blur-[7px] [mask-image:linear-gradient(to_bottom,transparent,black_100%)]"></div>
      </div>
      
      <FloatingAIButton />
    </>
  );
};

export default Home;