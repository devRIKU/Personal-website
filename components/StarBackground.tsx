import React, { useEffect, useRef } from 'react';

const StarBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let stars: Array<{x: number, y: number, size: number, opacity: number, twinkleSpeed: number}> = [];

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initStars();
    };

    const initStars = () => {
      stars = [];
      const starCount = Math.floor((canvas.width * canvas.height) / 4000); // Adjust density
      for (let i = 0; i < starCount; i++) {
        stars.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 2 + 0.5, // Size between 0.5 and 2.5
          opacity: Math.random(),
          twinkleSpeed: (Math.random() * 0.02 + 0.005) * (Math.random() > 0.5 ? 1 : -1)
        });
      }
    };

    const draw = () => {
      const isDark = document.documentElement.classList.contains('dark');
      const scrollY = window.scrollY;
      
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Star color: White in dark mode, Dark Grey in light mode
      ctx.fillStyle = isDark ? '#ffffff' : '#1a1a1a';

      stars.forEach(star => {
        ctx.globalAlpha = isDark ? star.opacity * 0.8 : star.opacity * 0.4;
        
        // Parallax Logic:
        // Calculate speed based on star size (larger = closer = faster)
        // Base speed 0.05, max additional speed based on size
        const depthSpeed = 0.05 + (star.size / 2.5) * 0.25;
        
        // Calculate Y position based on scroll
        let y = (star.y - scrollY * depthSpeed);
        
        // Infinite wrap-around logic
        // We use % to wrap, and handle negative results for upward scrolling
        y = y % canvas.height;
        if (y < 0) y += canvas.height;

        ctx.beginPath();
        ctx.arc(star.x, y, star.size, 0, Math.PI * 2);
        ctx.fill();

        // Twinkle effect
        star.opacity += star.twinkleSpeed;
        if (star.opacity > 1 || star.opacity < 0.2) {
          star.twinkleSpeed = -star.twinkleSpeed;
        }
      });
      
      animationFrameId = requestAnimationFrame(draw);
    };

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();
    draw();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      className="fixed inset-0 z-0 pointer-events-none"
    />
  );
};

export default StarBackground;