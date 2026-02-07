import React, { useEffect } from 'react';
import Lenis from 'lenis';

const SmoothScrollWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  useEffect(() => {
    // Initialize Lenis for premium smooth scrolling
    // Maintaining the "OpenClaw" style feel (momentum, damping) without the skew distortion
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Exponential easing for "gliding" stop
      direction: 'vertical',
      gestureDirection: 'vertical',
      smooth: true,
      mouseMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    const rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);

  return (
    <div className="w-full min-h-screen pt-24">
      {children}
    </div>
  );
};

export default SmoothScrollWrapper;