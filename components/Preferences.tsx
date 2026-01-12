import React, { useEffect, useRef, useState } from 'react';
import { Code, Gamepad2, BrainCircuit, ArrowRight } from 'lucide-react';
import { PreferenceItem } from '../types';
import NeoModal from './NeoModal';

const preferencesData: PreferenceItem[] = [
  {
    id: '1',
    category: 'Building Stuff',
    title: 'Coding & Creating',
    description: "I love building websites, bots, or anything techy. It’s like Lego, but digital.",
    details: "My tech stack currently includes React, Tailwind CSS, and a bit of Python. I love turning empty text files into working applications. Next on my list? Mastering Three.js for 3D web experiences.",
    icon: 'code',
    color: 'neo-blue',
  },
  {
    id: '2',
    category: 'Playing Games',
    title: 'Keyboard > Controller',
    description: "I don’t just play games. I optimize. (And maybe rage a little.)",
    details: "I'm competitive. Whether it's FPS or Strategy, I analyze the meta. Currently grinding Valorant and Minecraft (redstone engineering is life). Don't ask me about my rank unless you want a 30-minute lecture on matchmaking algorithms.",
    icon: 'gamepad',
    color: 'neo-pink',
  },
  {
    id: '3',
    category: 'Knowing Things',
    title: 'Random Facts Unlocked',
    description: "Did I need to know how rockets work? No. Did I learn it anyway? Yes.",
    details: "Did you know that honey never spoils? Archaeologists have found pots of honey in ancient Egyptian tombs that are over 3,000 years old and still perfectly edible. I collect these random nuggets of information. It makes me great at trivia nights (if I was old enough to go to them).",
    icon: 'brain',
    color: 'neo-green',
  },
];

const Preferences: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState<PreferenceItem | null>(null);
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
    // We define precise shadows for dark mode to match the border color
    // Light mode: Solid pastel background, black border, black shadow
    // Dark mode: Dark surface background, Neon border, Neon shadow
    
    const colorMap: Record<string, string> = {
      'neo-blue': 'bg-neo-blue border-black shadow-neo hover:shadow-neo-lg dark:bg-neo-dark-surface dark:border-neo-blue dark:shadow-[8px_8px_0px_0px_#5CE1E6] dark:hover:shadow-[12px_12px_0px_0px_#5CE1E6]',
      'neo-pink': 'bg-neo-pink border-black shadow-neo hover:shadow-neo-lg dark:bg-neo-dark-surface dark:border-neo-pink dark:shadow-[8px_8px_0px_0px_#FF66C4] dark:hover:shadow-[12px_12px_0px_0px_#FF66C4]',
      'neo-green': 'bg-neo-green border-black shadow-neo hover:shadow-neo-lg dark:bg-neo-dark-surface dark:border-neo-green dark:shadow-[8px_8px_0px_0px_#7ED957] dark:hover:shadow-[12px_12px_0px_0px_#7ED957]',
    };
    return colorMap[colorSuffix] || 'bg-white border-black shadow-neo';
  };

  const getButtonHoverClass = (colorSuffix: string) => {
      // For dark mode hover effect on the button to match card theme
      const map: Record<string, string> = {
          'neo-blue': 'dark:hover:bg-neo-blue dark:hover:text-black dark:hover:border-neo-blue',
          'neo-pink': 'dark:hover:bg-neo-pink dark:hover:text-black dark:hover:border-neo-pink',
          'neo-green': 'dark:hover:bg-neo-green dark:hover:text-black dark:hover:border-neo-green'
      };
      return map[colorSuffix] || 'dark:hover:bg-white';
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
              className={`relative group border-4 p-6 ${getCardClasses(item.color)} hover:translate-x-[-4px] hover:translate-y-[-4px] transition-all duration-300 flex flex-col h-full`}
              style={{
                transitionDelay: `${index * 150}ms`,
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateY(0) rotate(0deg)' : 'translateY(30px) rotate(2deg)'
              }}
            >
              <div className="bg-white dark:bg-neo-dark-surface border-2 border-black dark:border-white w-12 h-12 flex items-center justify-center mb-4 shadow-neo-sm dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)] dark:text-white transition-transform group-hover:rotate-12">
                <div className={`text-black dark:text-${item.color}`}>
                    {item.icon === 'code' && <Code size={24} />}
                    {item.icon === 'gamepad' && <Gamepad2 size={24} />}
                    {item.icon === 'brain' && <BrainCircuit size={24} />}
                </div>
              </div>
              
              <div className="mb-2 font-ui text-xs font-bold uppercase tracking-widest border-b-2 border-black dark:border-white pb-1 inline-block w-max text-black dark:text-white">
                {item.category}
              </div>
              
              <h3 className="font-editorial text-2xl font-bold mb-3 text-black dark:text-white">{item.title}</h3>
              
              <p className="font-grotesk font-medium text-lg leading-relaxed text-black dark:text-gray-300 mb-6 flex-grow">
                {item.description}
              </p>

              <button 
                onClick={() => setSelectedItem(item)}
                className={`w-full mt-auto flex items-center justify-center gap-2 py-3 bg-black text-white dark:bg-white dark:text-black font-bold border-2 border-transparent dark:border-white hover:bg-white hover:text-black hover:border-black hover:shadow-neo dark:hover:shadow-none transition-all ${getButtonHoverClass(item.color)}`}
              >
                VIEW MORE <ArrowRight size={18} />
              </button>
            </div>
          ))}
        </div>
      </div>

      <NeoModal
        isOpen={!!selectedItem}
        onClose={() => setSelectedItem(null)}
        title={selectedItem?.title || ''}
      >
        <div className="space-y-4">
          <div className="flex items-center gap-2 mb-4">
             <span className={`px-3 py-1 text-xs font-bold border-2 border-black uppercase ${
               selectedItem?.color === 'neo-blue' ? 'bg-neo-blue' :
               selectedItem?.color === 'neo-pink' ? 'bg-neo-pink' : 'bg-neo-green'
             }`}>
               {selectedItem?.category}
             </span>
          </div>
          <p className="text-xl font-medium leading-relaxed">
            {selectedItem?.description}
          </p>
          <hr className="border-black dark:border-gray-700 border-2" />
          <p className="text-lg text-gray-700 dark:text-gray-300">
            {selectedItem?.details}
          </p>
        </div>
      </NeoModal>
    </section>
  );
};

export default Preferences;