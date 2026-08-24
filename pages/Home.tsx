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
      // Get the distance from the bottom of the document to the bottom of the viewport
      const distanceToBottom = document.documentElement.getBoundingClientRect().bottom - window.innerHeight;
      const fadeDistance = 800; // Start fading 800px from the bottom

      if (distanceToBottom <= 0) {
        setBlurOpacity(0);
      } else if (distanceToBottom > fadeDistance) {
        setBlurOpacity(1);
      } else {
        // Progressively reduce blur opacity as we reach the footer
        setBlurOpacity(distanceToBottom / fadeDistance);
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
      
      {/* Lightweight Ambient Bottom Edge Vignette - Hardware-Accelerated & Smooth */}
      <div 
        className="fixed bottom-0 left-0 w-full h-24 sm:h-32 pointer-events-none z-40 bg-gradient-to-t from-[#f8f8f8]/80 dark:from-[#0d0e12]/80 to-transparent transition-opacity duration-300"
        style={{ opacity: blurOpacity }}
      />
      
      <FloatingAIButton />
    </>
  );
};

export default Home;