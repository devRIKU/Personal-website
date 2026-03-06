import React, { useEffect, useRef, useState } from 'react';

export default function CustomCursor() {
  const cursorDotRef = useRef<HTMLDivElement>(null);
  const cursorOutlineRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  // Mouse position
  const mouse = useRef({ x: 0, y: 0 });
  // Outline position (for lerping)
  const outline = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouse.current = { x: e.clientX, y: e.clientY };
      setIsVisible(true);
      
      // Move dot instantly
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

    // Animation loop for outline
    let animationFrameId: number;
    const render = () => {
      // Lerp
      outline.current.x += (mouse.current.x - outline.current.x) * 0.15;
      outline.current.y += (mouse.current.y - outline.current.y) * 0.15;

      if (cursorOutlineRef.current) {
        cursorOutlineRef.current.style.transform = `translate3d(${outline.current.x}px, ${outline.current.y}px, 0)`;
      }

      animationFrameId = requestAnimationFrame(render);
    };
    render();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      cancelAnimationFrame(animationFrameId);
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
        className={`fixed top-0 left-0 w-10 h-10 -ml-5 -mt-5 rounded-full border-2 border-neo-warm-terracotta dark:border-neo-warm-coral pointer-events-none z-[9998] transition-all duration-200 ${
          isHovering ? 'scale-[1.5] bg-neo-warm-terracotta/20 dark:bg-neo-warm-coral/20 border-neo-warm-terracotta/50 dark:border-neo-warm-coral/50' : 'scale-100'
        } ${isClicking ? 'scale-90 bg-neo-warm-terracotta/40 dark:bg-neo-warm-coral/40' : ''} ${
          isVisible ? 'opacity-100' : 'opacity-0'
        }`}
      />
    </>
  );
}
