import React, { useEffect, useRef } from 'react';

const StarBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    let animationFrameId: number;
    let stars: Array<{x: number, y: number, size: number, opacity: number, twinkleSpeed: number}> = [];
    let isVisible = !document.hidden;

    const reducedMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    let prefersReducedMotion = reducedMotionQuery.matches;

    const handleReducedMotionChange = (e: MediaQueryListEvent) => {
      prefersReducedMotion = e.matches;
      if (prefersReducedMotion) {
        cancelAnimationFrame(animationFrameId);
        drawStatic();
      } else {
        startAnimation();
      }
    };
    reducedMotionQuery.addEventListener('change', handleReducedMotionChange);

    const resizeCanvas = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      canvas.width = Math.floor(window.innerWidth * dpr);
      canvas.height = Math.floor(window.innerHeight * dpr);
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      initStars();
    };

    const initStars = () => {
      stars = [];
      const isMobile = window.innerWidth < 768;
      const rawCount = Math.floor((window.innerWidth * window.innerHeight) / (isMobile ? 12000 : 7000));
      const starCount = Math.min(isMobile ? 35 : 85, Math.max(15, rawCount));

      for (let i = 0; i < starCount; i++) {
        stars.push({
          x: Math.random() * window.innerWidth,
          y: Math.random() * window.innerHeight,
          size: Math.random() * 1.8 + 0.6,
          opacity: Math.random() * 0.8 + 0.2,
          twinkleSpeed: (Math.random() * 0.015 + 0.005) * (Math.random() > 0.5 ? 1 : -1)
        });
      }
    };

    const drawStatic = () => {
      const isDark = document.documentElement.classList.contains('dark');
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
      ctx.fillStyle = isDark ? '#ffffff' : '#1a1a1a';
      stars.forEach(star => {
        ctx.globalAlpha = isDark ? star.opacity * 0.7 : star.opacity * 0.3;
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fill();
      });
    };

    const draw = () => {
      if (!isVisible || prefersReducedMotion) return;

      const isDark = document.documentElement.classList.contains('dark');
      const scrollY = window.scrollY;
      const width = window.innerWidth;
      const height = window.innerHeight;
      
      ctx.clearRect(0, 0, width, height);
      ctx.fillStyle = isDark ? '#ffffff' : '#1a1a1a';

      stars.forEach(star => {
        ctx.globalAlpha = isDark ? star.opacity * 0.75 : star.opacity * 0.35;
        
        const depthSpeed = 0.03 + (star.size / 2.5) * 0.12;
        let y = (star.y - scrollY * depthSpeed) % height;
        if (y < 0) y += height;

        ctx.beginPath();
        ctx.arc(star.x, y, star.size, 0, Math.PI * 2);
        ctx.fill();

        star.opacity += star.twinkleSpeed;
        if (star.opacity > 0.95 || star.opacity < 0.2) {
          star.twinkleSpeed = -star.twinkleSpeed;
        }
      });
      
      animationFrameId = requestAnimationFrame(draw);
    };

    const startAnimation = () => {
      cancelAnimationFrame(animationFrameId);
      if (!prefersReducedMotion && isVisible) {
        animationFrameId = requestAnimationFrame(draw);
      } else {
        drawStatic();
      }
    };

    const handleVisibilityChange = () => {
      isVisible = !document.hidden;
      if (isVisible) {
        startAnimation();
      } else {
        cancelAnimationFrame(animationFrameId);
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('resize', resizeCanvas, { passive: true });
    
    resizeCanvas();
    startAnimation();

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      reducedMotionQuery.removeEventListener('change', handleReducedMotionChange);
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden select-none">
      {/* Real Background Image Assets */}
      
      {/* Dark Mode High-Res Cosmic Asset Backdrop */}
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-0 dark:opacity-35 transition-opacity duration-700 ease-in-out mix-blend-screen scale-105"
        style={{ 
          backgroundImage: `url('https://images.unsplash.com/photo-1506703719100-a0f3a48c0f86?q=80&w=2400&auto=format&fit=crop')`,
          filter: 'contrast(120%) brightness(85%)'
        }}
      />

      {/* Light Mode Tactile Architectural Grain & Texture Asset Backdrop */}
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-25 dark:opacity-0 transition-opacity duration-700 ease-in-out mix-blend-multiply"
        style={{ 
          backgroundImage: `url('https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2400&auto=format&fit=crop')`,
          filter: 'grayscale(60%) opacity(35%)'
        }}
      />

      {/* Subtle Ambient Radial Gradients */}
      <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-neo-accent/5 dark:bg-neo-accent/8 rounded-full blur-[140px]" />
      <div className="absolute top-1/2 right-1/4 w-[500px] h-[500px] bg-neo-highlight/5 dark:bg-neo-highlight/6 rounded-full blur-[120px]" />

      {/* Real-time Dynamic Stars Canvas */}
      <canvas 
        ref={canvasRef} 
        className="absolute inset-0 w-full h-full"
      />
    </div>
  );
};

export default StarBackground;
