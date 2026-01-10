import React from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import Preferences from '../components/Preferences';
import Footer from '../components/Footer';
import FloatingAIButton from '../components/FloatingAIButton';

const Home: React.FC = () => {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Preferences />
      </main>
      <Footer />
      <FloatingAIButton />
    </>
  );
};

export default Home;