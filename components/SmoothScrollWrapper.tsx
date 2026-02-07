import React, { useEffect, useRef, useState } from 'react';

const SmoothScrollWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const contentRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(true); // Default to true to prevent flash of wrong layout
  
  // Physics state
  const state = useRef({
    current: 0,
    target: 0,
    skew: 0
  });
  
  const requestRef = useRef<number>(null);
  const [contentHeight, setContentHeight] = useState(0);

  // Check for mobile/touch device
  useEffect(() => {
    const checkMobile = () => {
      // Check for touch capability or small screen width
      const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
      const isSmall = window.innerWidth < 768;
      setIsMobile(isTouch || isSmall);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Measure content height (Only for Desktop)
  useEffect(() => {
    if (isMobile) return;

    const resizeObserver = new ResizeObserver((entries) => {
      for (let entry of entries) {
        setContentHeight(entry.contentRect.height);
      }
    });
    
    if (contentRef.current) {
      resizeObserver.observe(contentRef.current);
    }
    
    return () => resizeObserver.disconnect();
  }, [isMobile]);

  // Sync body height (Only for Desktop)
  useEffect(() => {
    if (isMobile) {
      document.body.style.height = '';
      return;
    }
    document.body.style.height = `${contentHeight}px`;
  }, [contentHeight, isMobile]);

  // Initial scroll position sync
  useEffect(() => {
    if (isMobile) return;
    state.current.current = window.scrollY;
    state.current.target = window.scrollY;
  }, [isMobile]);

  const animate = () => {
    if (isMobile) return;

    state.current.target = window.scrollY;
    
    // Lerp factor: 0.075 is smooth but responsive
    const ease = 0.075;
    const diff = state.current.target - state.current.current;
    
    // Snap to target if extremely close to ensure we hit exactly 0 (top) or the target pixel
    if (Math.abs(diff) < 0.1) {
      state.current.current = state.current.target;
      state.current.skew = 0;
    } else {
      // Apply interpolation
      state.current.current += diff * ease;
      
      // Calculate Skew
      const velocity = diff * ease;
      state.current.skew = velocity * 0.5;
    }

    // Clamp skew to +/- 2 degrees
    const clampedSkew = Math.max(Math.min(state.current.skew, 2), -2);
    
    const y = Math.round(state.current.current * 100) / 100;
    const s = Math.round(clampedSkew * 100) / 100;

    if (contentRef.current) {
      const viewportCenterY = y + window.innerHeight / 2;
      contentRef.current.style.transformOrigin = `50% ${viewportCenterY}px`;
      contentRef.current.style.transform = `translate3d(0, -${y}px, 0) skewY(${s}deg)`;
    }

    requestRef.current = requestAnimationFrame(animate);
  };

  useEffect(() => {
    if (!isMobile) {
      requestRef.current = requestAnimationFrame(animate);
    }
    return () => {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
      document.body.style.height = '';
    };
  }, [isMobile]);

  // Render native scrolling for mobile
  if (isMobile) {
    return <>{children}</>;
  }

  return (
    <div 
      ref={contentRef} 
      className="fixed top-0 left-0 w-full z-10 will-change-transform backface-hidden"
      style={{
        transformStyle: 'preserve-3d',
      }}
    >
      {children}
    </div>
  );
};

export default SmoothScrollWrapper;