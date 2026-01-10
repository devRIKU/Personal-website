import React from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import Preferences from '../components/Preferences';
import Socials from '../components/Socials';
import Footer from '../components/Footer';
import FloatingAIButton from '../components/FloatingAIButton';

const Home: React.FC = () => {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Preferences />
        <Socials />
      </main>
      <Footer />
      <FloatingAIButton />
    </>
  );
};

export default Home;