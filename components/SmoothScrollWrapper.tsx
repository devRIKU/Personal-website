import React, { useEffect, useRef, useState } from 'react';

const SmoothScrollWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const contentRef = useRef<HTMLDivElement>(null);
  
  // State for Linear Interpolation (Lerp)
  // We removed the spring physics to eliminate the "elastic" bounce.
  const scroll = useRef({
    current: 0,
    target: 0,
  });
  
  const requestRef = useRef<number>(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    const resizeObserver = new ResizeObserver((entries) => {
      for (let entry of entries) {
        setHeight(entry.contentRect.height);
      }
    });
    if (contentRef.current) resizeObserver.observe(contentRef.current);
    return () => resizeObserver.disconnect();
  }, []);

  useEffect(() => {
    // Sync body height to allow native scrolling
    document.body.style.height = `${height}px`;
  }, [height]);

  const animate = () => {
    if (!contentRef.current) return;

    scroll.current.target = window.scrollY;
    
    // Linear Interpolation (Lerp)
    // Formula: current = current + (target - current) * ease
    // Ease factor 0.075 provides a heavy, smooth feel without bouncing.
    const ease = 0.075; 
    const diff = scroll.current.target - scroll.current.current;
    
    scroll.current.current += diff * ease;
    
    // 3D Skew Effect
    // Re-implemented standard 3D skew based on velocity.
    // The skew visually distorts the plane based on speed.
    const skew = diff * 0.15; 
    const clampedSkew = Math.max(Math.min(skew, 5), -5); // Clamp to +/- 5 deg to reduce motion sickness risk

    // Apply transform with translate3d and skewY
    const y = Math.round(scroll.current.current * 100) / 100;
    const s = Math.round(clampedSkew * 100) / 100;

    contentRef.current.style.transform = `translate3d(0, -${y}px, 0) skewY(${s}deg)`;
    
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
      className="fixed top-0 left-0 w-full z-10 will-change-transform pt-24"
      style={{ 
        transformStyle: 'preserve-3d',
        backfaceVisibility: 'hidden'
      }}
    >
      {children}
    </div>
  );
};

export default SmoothScrollWrapper;