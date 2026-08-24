import React, { useEffect, useRef, useState } from 'react';

export default function CustomCursor() {
  const cursorDotRef = useRef<HTMLDivElement>(null);
  const cursorOutlineRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isFinePointer, setIsFinePointer] = useState(false);

  useEffect(() => {
    // Only enable if device supports fine pointer (mouse/trackpad, not touch)
    if (typeof window === 'undefined') return;
    const finePointerQuery = window.matchMedia('(pointer: fine)');
    
    const updatePointerType = () => {
      const hasFinePointer = finePointerQuery.matches;
      setIsFinePointer(hasFinePointer);
      if (!hasFinePointer) {
        document.documentElement.classList.remove('custom-cursor-enabled');
      }
    };

    updatePointerType();
    finePointerQuery.addEventListener('change', updatePointerType);

    if (!finePointerQuery.matches) {
      return () => finePointerQuery.removeEventListener('change', updatePointerType);
    }

    const handleMouseMove = (e: MouseEvent) => {
      setIsVisible(true);
      document.documentElement.classList.add('custom-cursor-enabled');
      
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
      if (!target) return;
      if (
        target.tagName.toLowerCase() === 'a' ||
        target.tagName.toLowerCase() === 'button' ||
        target.closest('a') ||
        target.closest('button') ||
        target.getAttribute('role') === 'button' ||
        window.getComputedStyle(target).cursor === 'pointer'
      ) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
      document.documentElement.classList.remove('custom-cursor-enabled');
    };
    
    const handleMouseEnter = () => {
      setIsVisible(true);
      document.documentElement.classList.add('custom-cursor-enabled');
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('mouseover', handleMouseOver);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      document.documentElement.classList.remove('custom-cursor-enabled');
      finePointerQuery.removeEventListener('change', updatePointerType);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, []);

  if (!isFinePointer) {
    return null;
  }

  return (
    <>
      {/* Precision Dot */}
      <div
        ref={cursorDotRef}
        className={`fixed top-0 left-0 w-2.5 h-2.5 -ml-[5px] -mt-[5px] rounded-full bg-neo-accent dark:bg-neo-highlight pointer-events-none z-[9999] transition-transform duration-75 ${
          isHovering ? 'scale-0' : 'scale-100'
        } ${isVisible ? 'opacity-100' : 'opacity-0'}`}
      />
      {/* Interactive Outer Target */}
      <div
        ref={cursorOutlineRef}
        className={`fixed top-0 left-0 w-7 h-7 -ml-[14px] -mt-[14px] pointer-events-none z-[9998] transition-all duration-150 ease-out ${
          isHovering ? 'scale-125' : 'scale-100'
        } ${isClicking ? 'scale-90' : ''} ${
          isVisible ? 'opacity-100' : 'opacity-0'
        }`}
      >
        {/* Contrast Ring */}
        <div className="absolute inset-0 rounded-full border-2 border-black dark:border-white mix-blend-difference" />
        {/* Coral Accent Aura */}
        <div className="absolute inset-0 rounded-full bg-neo-highlight/25 dark:bg-neo-accent/25" />
      </div>
    </>
  );
}
