import React from 'react';
import { Github, Twitter, User, Instagram, Code } from 'lucide-react';

interface FriendNode {
  id: number;
  label: string;
  angle: number; // in degrees
  distance: number; // percentage from center
  color: string;
  size: number; // in pixels
  rotation: number; // in degrees
  icon?: React.ReactNode;
  url?: string;
}

// In dark mode: black background, colored border, colored text/icon, no shadow.
const friends: FriendNode[] = [
  { id: 1, label: "Instagram", angle: 0, distance: 35, color: "bg-neo-pink dark:bg-black dark:border-neo-pink dark:text-neo-pink", size: 80, rotation: -10, icon: <Instagram />, url: "https://instagram.com" },
  { id: 2, label: "GitHub", angle: 72, distance: 30, color: "bg-neo-blue dark:bg-black dark:border-neo-blue dark:text-neo-blue", size: 70, rotation: 5, icon: <Github />, url: "https://github.com/devriku" },
  { id: 3, label: "School Crew", angle: 144, distance: 38, color: "bg-neo-green dark:bg-black dark:border-neo-green dark:text-neo-green", size: 90, rotation: 15, icon: <User /> },
  { id: 4, label: "Twitter", angle: 216, distance: 32, color: "bg-neo-yellow dark:bg-black dark:border-neo-yellow dark:text-neo-yellow", size: 75, rotation: -5, icon: <Twitter />, url: "https://twitter.com" },
  { id: 5, label: "Scratch", angle: 288, distance: 36, color: "bg-white dark:bg-black dark:border-white dark:text-white", size: 85, rotation: 8, icon: <Code />, url: "https://scratch.mit.edu" },
];

const Socials: React.FC = () => {
  return (
    <section id="socials" className="py-24 bg-[#f0f0f0] dark:bg-neo-dark-bg relative overflow-hidden border-t-4 border-black dark:border-neo-dark-surface transition-colors duration-300">
      <div className="max-w-6xl mx-auto px-4 text-center mb-12 relative z-10">
         <div className="inline-block bg-neo-black dark:bg-transparent dark:border-2 dark:border-neo-blue text-white dark:text-neo-blue px-6 py-2 border-2 border-transparent shadow-neo dark:shadow-none transform rotate-1">
           <h2 className="font-editorial text-4xl font-bold">My Circle & Socials</h2>
        </div>
      </div>

      <div className="relative w-full h-[600px] flex items-center justify-center">
        
        {/* SVG for connecting lines */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none z-0">
          {friends.map((friend) => {
             // Simple geometry to calculate line ends from center (50%, 50%) to nodes
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
                 className="stroke-black dark:stroke-gray-700 stroke-[3px]"
               />
             );
          })}
        </svg>

        {/* Central Node: Sanniva */}
        <div className="absolute z-20 w-32 h-32 md:w-40 md:h-40 rounded-full border-4 border-black dark:border-white bg-white dark:bg-neo-dark-surface overflow-hidden shadow-neo-lg dark:shadow-none hover:scale-110 transition-transform duration-300">
           <img 
             src="/socials-image.png" 
             alt="Sanniva" 
             className="w-full h-full object-cover"
           />
        </div>

        {/* Friend Nodes */}
        {friends.map((friend) => {
           // Calculate position styles
           const rad = (friend.angle * Math.PI) / 180;
           // Using percentage offsets for responsive layout
           const leftPos = 50 + (friend.distance * Math.cos(rad));
           const topPos = 50 + (friend.distance * Math.sin(rad));

           // Note: The color classes are now handling dark mode switches directly
           const baseClasses = `absolute z-10 flex flex-col items-center justify-center border-4 border-black dark:border-current ${friend.color} rounded-full shadow-neo dark:shadow-none transition-all duration-300 hover:z-30 hover:scale-110`;
           
           const style = {
             width: `${friend.size}px`,
             height: `${friend.size}px`,
             left: `${leftPos}%`,
             top: `${topPos}%`,
             transform: `translate(-50%, -50%) rotate(${friend.rotation}deg)`,
           };

           if (friend.url) {
             return (
               <a 
                 key={friend.id}
                 href={friend.url}
                 target="_blank"
                 rel="noopener noreferrer"
                 className={`${baseClasses} cursor-pointer`}
                 style={style}
               >
                  <div className="text-black dark:text-inherit">
                    {friend.icon}
                  </div>
                  <span className="font-ui font-bold text-xs mt-1 bg-black dark:bg-transparent dark:border dark:border-current text-white dark:text-inherit px-1">
                    {friend.label}
                  </span>
               </a>
             );
           }

           return (
             <div 
               key={friend.id}
               className={`${baseClasses} cursor-default`}
               style={style}
             >
                <div className="text-black dark:text-inherit">
                  {friend.icon}
                </div>
                <span className="font-ui font-bold text-xs mt-1 bg-black dark:bg-transparent dark:border dark:border-current text-white dark:text-inherit px-1">
                  {friend.label}
                </span>
             </div>
           );
        })}
      </div>
      
      <div className="text-center font-grotesk font-medium mt-8 dark:text-white">
        <p>Connected via wires, WiFi, and vibes.</p>
      </div>
    </section>
  );
};

export default Socials;