import React, { useEffect, useRef, useState } from 'react';
import { Code, Gamepad2, BrainCircuit } from 'lucide-react';
import { PreferenceItem } from '../types';

const preferencesData: PreferenceItem[] = [
  {
    id: '1',
    category: 'Building Stuff',
    title: 'Coding & Creating',
    description: "I love building websites, bots, or anything techy. It’s like Lego, but digital.",
    icon: 'code',
    color: 'neo-blue', // Store just the color name suffix for logic
  },
  {
    id: '2',
    category: 'Playing Games',
    title: 'Keyboard > Controller',
    description: "I don’t just play games. I optimize. (And maybe rage a little.)",
    icon: 'gamepad',
    color: 'neo-pink',
  },
  {
    id: '3',
    category: 'Knowing Things',
    title: 'Random Facts Unlocked',
    description: "Did I need to know how rockets work? No. Did I learn it anyway? Yes.",
    icon: 'brain',
    color: 'neo-green',
  },
];

const Preferences: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

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

  // Helper to generate classes based on theme
  const getCardClasses = (colorSuffix: string) => {
    // Light mode: bg-[color] border-black shadow-neo
    // Dark mode: bg-neo-dark-surface border-[color] NO shadow
    const colorMap: Record<string, string> = {
      'neo-blue': 'bg-neo-blue border-black shadow-neo dark:bg-neo-dark-surface dark:border-neo-blue dark:shadow-none',
      'neo-pink': 'bg-neo-pink border-black shadow-neo dark:bg-neo-dark-surface dark:border-neo-pink dark:shadow-none',
      'neo-green': 'bg-neo-green border-black shadow-neo dark:bg-neo-dark-surface dark:border-neo-green dark:shadow-none',
    };
    return colorMap[colorSuffix] || 'bg-white';
  };

  return (
    <section id="preferences" ref={sectionRef} className="py-12 md:py-20 px-4 bg-white dark:bg-neo-dark-bg border-t-4 border-black dark:border-neo-dark-surface transition-colors duration-300">
      <div className="max-w-6xl mx-auto">
        <div className={`mb-8 md:mb-12 inline-block bg-neo-black dark:bg-transparent dark:border-2 dark:border-neo-pink text-white dark:text-neo-pink px-6 py-2 border-2 border-transparent shadow-neo dark:shadow-none transform -rotate-2 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
           <h2 className="font-editorial text-3xl md:text-4xl font-bold">My Preferences</h2>
        </div>

        {/* Updated Grid: 1 col mobile, 2 cols tablet, 3 cols desktop */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {preferencesData.map((item, index) => (
            <div 
              key={item.id} 
              className={`relative group border-4 border-black dark:border-opacity-100 p-6 ${getCardClasses(item.color)} hover:shadow-neo-lg dark:hover:shadow-none hover:-translate-y-1 transition-all duration-500 flex flex-col h-full`}
              style={{
                transitionDelay: `${index * 150}ms`,
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateY(0) rotate(0deg)' : 'translateY(30px) rotate(2deg)'
              }}
            >
              <div className="bg-white dark:bg-black border-2 border-black dark:border-current w-12 h-12 flex items-center justify-center mb-4 shadow-neo-sm dark:shadow-none dark:text-white">
                <div className={`text-black dark:text-${item.color}`}>
                    {item.icon === 'code' && <Code size={24} />}
                    {item.icon === 'gamepad' && <Gamepad2 size={24} />}
                    {item.icon === 'brain' && <BrainCircuit size={24} />}
                </div>
              </div>
              
              <div className="mb-2 font-ui text-xs font-bold uppercase tracking-widest border-b-2 border-black dark:border-gray-700 pb-1 inline-block w-max text-black dark:text-gray-400">
                {item.category}
              </div>
              
              <h3 className="font-editorial text-2xl font-bold mb-3 text-black dark:text-white">{item.title}</h3>
              
              <p className="font-grotesk font-medium text-lg leading-relaxed text-black dark:text-gray-300">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Preferences;