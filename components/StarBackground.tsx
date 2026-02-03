import React, { useEffect, useRef } from 'react';

const StarBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let stars: Array<{x: number, y: number, size: number, opacity: number, speed: number}> = [];

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
          size: Math.random() * 2 + 0.5,
          opacity: Math.random(),
          speed: (Math.random() * 0.02 + 0.005) * (Math.random() > 0.5 ? 1 : -1)
        });
      }
    };

    const draw = () => {
      // Check for dark mode by looking for the class on html element
      const isDark = document.documentElement.classList.contains('dark');
      const scrollY = window.scrollY;
      
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Star color: White in dark mode, Dark Grey in light mode
      ctx.fillStyle = isDark ? '#ffffff' : '#1a1a1a';

      stars.forEach(star => {
        ctx.globalAlpha = isDark ? star.opacity * 0.8 : star.opacity * 0.4;
        
        // Parallax scroll effect
        // Larger stars (closer) move slightly faster than smaller stars (farther)
        const parallaxFactor = 0.1 + (star.size / 2.5) * 0.15; // Speed factor based on size
        let y = (star.y - scrollY * parallaxFactor);
        
        // Infinite wrap-around logic
        y = y % canvas.height;
        if (y < 0) y += canvas.height;

        ctx.beginPath();
        ctx.arc(star.x, y, star.size, 0, Math.PI * 2);
        ctx.fill();

        // Twinkle effect
        star.opacity += star.speed;
        if (star.opacity > 1 || star.opacity < 0.2) {
          star.speed = -star.speed;
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