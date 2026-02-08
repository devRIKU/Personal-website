import React, { useState, useEffect } from 'react';
import { Github, Youtube, User, Instagram, Hammer } from 'lucide-react';

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
    color: "bg-neo-pink dark:bg-black dark:border-neo-pink dark:text-neo-pink", 
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
    color: "bg-neo-blue dark:bg-black dark:border-neo-blue dark:text-neo-blue", 
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
    color: "bg-neo-green dark:bg-black dark:border-neo-green dark:text-neo-green", 
    size: 85, 
    rotation: 15, 
    icon: <User size={20} />,
    url: "https://sanniva-blog.framer.website/"
  },
  { 
    id: 4, 
    label: "YouTube", 
    angle: 216, 
    distance: 32, 
    color: "bg-red-500 dark:bg-black dark:border-red-500 dark:text-red-500", 
    size: 75, 
    rotation: -5, 
    icon: <Youtube size={20} />, 
    url: "https://youtube.com/@rikudoesstuff" 
  },
  { 
    id: 5, 
    label: "Under Dev", 
    angle: 288, 
    distance: 36, 
    color: "bg-neo-yellow dark:bg-black dark:border-neo-yellow dark:text-neo-yellow", 
    size: 80, 
    rotation: 8, 
    icon: <Hammer size={20} />,
    url: "#" 
  },
];

const Socials: React.FC = () => {
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1000);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, label: string) => {
    if (label === "Under Dev") {
      e.preventDefault();
      alert("⚠️ CAUTION: Heavy machinery in use! This project is currently a work in progress. Check back soon!");
    }
  };

  const isMobile = windowWidth < 768;
  const isSmallMobile = windowWidth < 400;

  // Adjust container height based on screen size
  const containerHeight = isMobile ? (isSmallMobile ? 350 : 400) : 650;
  
  // Scale factor for nodes
  const scaleFactor = isMobile ? (isSmallMobile ? 0.6 : 0.75) : 1;

  return (
    <section id="socials" className="py-16 md:py-24 bg-transparent relative overflow-hidden border-t-4 border-black dark:border-neo-dark-surface transition-colors duration-300">
      <div className="max-w-6xl mx-auto px-4 text-center mb-8 relative z-10">
         <div className="inline-block bg-neo-black dark:bg-transparent dark:border-2 dark:border-neo-blue text-white dark:text-neo-blue px-6 py-2 border-2 border-transparent shadow-neo transform rotate-1">
           <h2 className="font-editorial text-3xl md:text-5xl font-bold">The Inner Circle</h2>
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
                 className="stroke-black dark:stroke-gray-700 stroke-[2px] md:stroke-[3px]"
               />
             );
          })}
        </svg>

        {/* Central Hub Node */}
        <div 
          className="absolute z-20 rounded-full border-4 border-black dark:border-white bg-neo-white dark:bg-neo-dark-surface overflow-hidden shadow-neo-lg dark:shadow-none hover:scale-105 transition-transform duration-300"
          style={{
             width: isMobile ? '90px' : '176px', // 176px is approx 11rem (w-44)
             height: isMobile ? '90px' : '176px',
          }}
        >
           <img 
             src="https://github.com/devriku.png" 
             alt="Sanniva" 
             className="w-full h-full object-cover"
           />
        </div>

        {friendsData.map((friend) => {
           const rad = (friend.angle * Math.PI) / 180;
           const leftPos = 50 + (friend.distance * Math.cos(rad));
           const topPos = 50 + (friend.distance * Math.sin(rad));
           
           const currentSize = friend.size * scaleFactor;
           const sizePx = `${currentSize}px`;

           const baseClasses = `absolute z-10 flex flex-col items-center justify-center border-4 border-black dark:border-current ${friend.color} rounded-full shadow-neo dark:shadow-none transition-all duration-300 hover:z-30 hover:scale-110`;
           
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
                <div className="text-black dark:text-inherit transform scale-75 md:scale-100 transition-transform">
                  {friend.icon}
                </div>
                {!isSmallMobile && (
                  <span className="font-ui font-black text-[8px] md:text-xs mt-1 bg-black dark:bg-transparent dark:border dark:border-current text-white dark:text-inherit px-1 uppercase tracking-tighter whitespace-nowrap">
                    {friend.label}
                  </span>
                )}
             </a>
           );
        })}
      </div>
      
      <div className="text-center font-grotesk font-medium mt-4 md:mt-8 px-4 text-neo-black dark:text-white opacity-80 text-sm md:text-base">
        <p>Connecting via cables, coffee, and code.</p>
      </div>
    </section>
  );
};

export default Socials;