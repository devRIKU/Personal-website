import React, { useEffect, useRef, useState } from 'react';

const SmoothScrollWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const contentRef = useRef<HTMLDivElement>(null);
  
  // Physics state
  const state = useRef({
    current: 0,
    target: 0,
    skew: 0
  });
  
  const requestRef = useRef<number>(null);
  const [contentHeight, setContentHeight] = useState(0);

  // Measure content height
  useEffect(() => {
    const resizeObserver = new ResizeObserver((entries) => {
      for (let entry of entries) {
        setContentHeight(entry.contentRect.height);
      }
    });
    
    if (contentRef.current) {
      resizeObserver.observe(contentRef.current);
    }
    
    return () => resizeObserver.disconnect();
  }, []);

  // Sync body height
  useEffect(() => {
    document.body.style.height = `${contentHeight}px`;
  }, [contentHeight]);

  const animate = () => {
    state.current.target = window.scrollY;
    
    // Lerp factor: 0.075 is smooth but responsive
    const ease = 0.075;
    const diff = state.current.target - state.current.current;
    
    // Apply interpolation
    state.current.current += diff * ease;
    
    // Calculate Skew
    // Sensitivity: 0.075 * velocity
    // This gives a nice organic feel without being too rubbery
    const velocity = diff * ease;
    state.current.skew = velocity * 0.5;

    // Clamp skew to +/- 2 degrees to strictly prevent motion sickness
    // This provides the "3D" feel without the "funhouse mirror" effect
    const clampedSkew = Math.max(Math.min(state.current.skew, 2), -2);
    
    // Round to 2 decimal places for subpixel rendering consistency
    const y = Math.round(state.current.current * 100) / 100;
    const s = Math.round(clampedSkew * 100) / 100;

    if (contentRef.current) {
      // Fix for "vertical centered big" (skew swing bug):
      // By default, transform-origin is 50% 50% (center of the tall content).
      // This causes massive horizontal swings at the top/bottom of long pages when skewed.
      // We dynamically set the origin to the vertical center of the current viewport.
      const viewportCenterY = y + window.innerHeight / 2;
      contentRef.current.style.transformOrigin = `50% ${viewportCenterY}px`;

      // translate3d enables GPU acceleration
      contentRef.current.style.transform = `translate3d(0, -${y}px, 0) skewY(${s}deg)`;
    }

    requestRef.current = requestAnimationFrame(animate);
  };

  useEffect(() => {
    requestRef.current = requestAnimationFrame(animate);
    return () => {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
      document.body.style.height = '';
    };
  }, []);

  return (
    <div 
      ref={contentRef} 
      className="fixed top-0 left-0 w-full z-10 will-change-transform backface-hidden"
      style={{
        // Ensure child elements don't blur too much during transform
        transformStyle: 'preserve-3d',
      }}
    >
      {children}
    </div>
  );
};

export default SmoothScrollWrapper;