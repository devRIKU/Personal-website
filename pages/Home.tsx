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
      <FloatingAIButton />
    </>
  );
};

export default Home;