import React, { useState, useEffect, useRef } from 'react';
import { Github, Youtube, User, Instagram, Hammer } from 'lucide-react';
import StatusLED from './tactile/StatusLED';

interface FriendNode {
  id: number;
  label: string;
  angle: number;
  distance: number;
  color: string;
  size: number;
  rotation: number;
  icon?: React.ReactNode;
  url?: string;
}

const friendsData: FriendNode[] = [
  { 
    id: 1, 
    label: "Instagram", 
    angle: 0, 
    distance: 35, 
    color: "bg-pink-600 text-white border-pink-700 shadow-md", 
    size: 75, 
    rotation: -10, 
    icon: <Instagram size={20} />, 
    url: "https://www.instagram.com/imsanniva/" 
  },
  { 
    id: 2, 
    label: "GitHub", 
    angle: 72, 
    distance: 30, 
    color: "bg-neutral-900 text-white border-neutral-950 shadow-md", 
    size: 70, 
    rotation: 5, 
    icon: <Github size={20} />, 
    url: "https://github.com/devriku" 
  },
  { 
    id: 3, 
    label: "School Crew", 
    angle: 144, 
    distance: 38, 
    color: "bg-emerald-600 text-white border-emerald-700 shadow-md", 
    size: 85, 
    rotation: 15, 
    icon: <User size={20} />,
    url: "https://blog-sanniva.vercel.app"
  },
  { 
    id: 4, 
    label: "YouTube", 
    angle: 216, 
    distance: 32, 
    color: "bg-rose-600 text-white border-rose-700 shadow-md", 
    size: 75, 
    rotation: -5, 
    icon: <Youtube size={20} />, 
    url: "https://www.youtube.com/@Rikudoestuff" 
  },
  { 
    id: 5, 
    label: "Under Dev", 
    angle: 288, 
    distance: 36, 
    color: "bg-amber-400 text-neutral-950 border-amber-600 shadow-md", 
    size: 80, 
    rotation: 8, 
    icon: <Hammer size={20} />,
    url: "#" 
  },
];

const Socials: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1000);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, label: string) => {
    if (label === "Under Dev") {
      e.preventDefault();
      setToastMessage("⚠️ UNDER CONSTRUCTION: Project pipeline is actively compiling. Check back soon!");
      setTimeout(() => setToastMessage(null), 3500);
    }
  };

  const isMobile = windowWidth < 768;
  const isSmallMobile = windowWidth < 400;

  // Adjust container height based on screen size
  const containerHeight = isMobile ? (isSmallMobile ? 350 : 400) : 650;
  
  // Scale factor for nodes
  const scaleFactor = isMobile ? (isSmallMobile ? 0.6 : 0.75) : 1;

  return (
    <section id="socials" ref={sectionRef} className={`py-16 md:py-24 bg-transparent relative overflow-hidden border-t-4 border-black dark:border-neo-dark-border transition-all duration-1000 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
      <div className="max-w-6xl mx-auto px-4 text-center mb-8 relative z-10">
         <div className="tactile-panel px-6 py-2.5 inline-flex items-center shadow-md">
           <h2 className="font-display text-2xl md:text-4xl font-black uppercase text-neutral-900 dark:text-white tracking-tight">The Inner Circle</h2>
        </div>
      </div>

      <div 
        className="relative w-full flex items-center justify-center transition-all duration-300"
        style={{ height: `${containerHeight}px` }}
      >
        <svg className="absolute inset-0 w-full h-full pointer-events-none z-0">
          {friendsData.map((friend) => {
             const rad = (friend.angle * Math.PI) / 180;
             const x = 50 + friend.distance * Math.cos(rad);
             const y = 50 + friend.distance * Math.sin(rad);
             return (
               <line 
                 key={friend.id}
                 x1="50%" 
                 y1="50%" 
                 x2={`${x}%`} 
                 y2={`${y}%`} 
                 className="stroke-neutral-400 dark:stroke-neutral-700 stroke-[2px] md:stroke-[3px] stroke-dashed"
               />
             );
          })}
        </svg>

        {/* Central Hub Node */}
        <div 
          className="absolute z-20 rounded-full tactile-panel p-1 border-4 border-neutral-900 dark:border-white overflow-hidden shadow-xl hover:scale-105 transition-transform duration-300"
          style={{
             width: isMobile ? '90px' : '176px',
             height: isMobile ? '90px' : '176px',
          }}
        >
           <img 
             src="https://github.com/devriku.png" 
             referrerPolicy="no-referrer" 
             alt="Sanniva" 
             onError={(e) => {
               e.currentTarget.src = "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=600&auto=format&fit=crop&q=80";
             }}
             className="w-full h-full object-cover rounded-full"
           />
        </div>

        {friendsData.map((friend) => {
           const rad = (friend.angle * Math.PI) / 180;
           const leftPos = 50 + (friend.distance * Math.cos(rad));
           const topPos = 50 + (friend.distance * Math.sin(rad));
           
           const currentSize = friend.size * scaleFactor;
           const sizePx = `${currentSize}px`;

           const baseClasses = `absolute z-10 flex flex-col items-center justify-center border-2 ${friend.color} rounded-full transition-all duration-300 hover:z-30 hover:scale-110 active:scale-95`;
           
           return (
             <a 
               key={friend.id}
               href={friend.url}
               target={friend.label === "Under Dev" ? "_self" : "_blank"}
               rel="noopener noreferrer"
               onClick={(e) => handleClick(e, friend.label)}
               className={`${baseClasses}`}
               style={{
                 width: sizePx,
                 height: sizePx,
                 left: `${leftPos}%`,
                 top: `${topPos}%`,
                 transform: `translate(-50%, -50%) rotate(${friend.rotation}deg)`,
               }}
             >
                <div className="text-white transform scale-75 md:scale-100 transition-transform">
                  {friend.icon}
                </div>
                {!isSmallMobile && (
                  <span className="font-ui font-black text-[8px] md:text-xs mt-1 bg-black/80 text-white px-1.5 py-0.5 rounded-[4px] uppercase tracking-tighter whitespace-nowrap">
                    {friend.label}
                  </span>
                )}
             </a>
           );
        })}
      </div>
      
      {toastMessage && (
        <div className="max-w-md mx-auto mb-4 px-4">
          <div className="tactile-panel p-3 bg-amber-100 dark:bg-amber-950/60 border-2 border-amber-600 text-amber-900 dark:text-amber-200 text-xs font-mono rounded-[8px] flex items-center justify-center text-center shadow-lg animate-in fade-in slide-in-from-bottom-2 duration-200">
            {toastMessage}
          </div>
        </div>
      )}

      <div className="text-center font-grotesk font-medium mt-4 md:mt-8 px-4 text-neutral-700 dark:text-neutral-300 text-sm md:text-base">
        <p>Connecting via cables, coffee, and code.</p>
      </div>
    </section>
  );
};

export default Socials;