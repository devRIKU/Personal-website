import React, { useEffect, useRef, useState } from 'react';

export default function CustomCursor() {
  const cursorDotRef = useRef<HTMLDivElement>(null);
  const cursorOutlineRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  // Mouse position
  const mouse = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouse.current = { x: e.clientX, y: e.clientY };
      setIsVisible(true);
      
      if (cursorOutlineRef.current) {
        cursorOutlineRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
      }
      if (cursorDotRef.current) {
        cursorDotRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
      }
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName.toLowerCase() === 'a' ||
        target.tagName.toLowerCase() === 'button' ||
        target.closest('a') ||
        target.closest('button') ||
        window.getComputedStyle(target).cursor === 'pointer'
      ) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('mouseover', handleMouseOver);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, []);

  if (typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches) {
    // Don't render custom cursor on touch devices
    return null;
  }

  return (
    <>
      {/* Dot */}
      <div
        ref={cursorDotRef}
        className={`fixed top-0 left-0 w-3 h-3 -ml-1.5 -mt-1.5 rounded-full bg-neo-warm-terracotta dark:bg-neo-warm-coral pointer-events-none z-[9999] transition-transform duration-100 ${
          isHovering ? 'scale-0' : 'scale-100'
        } ${isVisible ? 'opacity-100' : 'opacity-0'}`}
      />
      {/* Outline */}
      <div
        ref={cursorOutlineRef}
        className={`fixed top-0 left-0 w-6 h-6 -ml-3 -mt-3 sm:w-8 sm:h-8 sm:-ml-4 sm:-mt-4 pointer-events-none z-[9998] transition-all duration-200 ${
          isHovering ? 'scale-[1.5]' : 'scale-100'
        } ${isClicking ? 'scale-90' : ''} ${
          isVisible ? 'opacity-100' : 'opacity-0'
        }`}
      >
        {/* 90% Negative Effect Layer */}
        <div className="absolute inset-0 rounded-full bg-white/90 mix-blend-difference" />
        {/* Red Tint Layer */}
        <div className="absolute inset-0 rounded-full bg-neo-warm-terracotta/30 dark:bg-neo-warm-coral/30 border-2 border-neo-warm-terracotta/50 dark:border-neo-warm-coral/50" />
      </div>
    </>
  );
}
