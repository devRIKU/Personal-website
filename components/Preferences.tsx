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
    details: "I'm competitive. Whether it's FPS or Strategy, I analyze the meta. Currently grinding Valorant and Minecraft (redstone engineering is life).",
    icon: 'gamepad',
    color: 'neo-pink',
  },
  {
    id: '3',
    category: 'Knowing Things',
    title: 'Random Facts Unlocked',
    description: "Did I need to know how rockets work? No. Did I learn it anyway? Yes.",
    details: "Did you know that honey never spoils? I collect these random nuggets of information. It makes me great at trivia nights.",
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
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const getCardClasses = (colorSuffix: string) => {
    const colorMap: Record<string, string> = {
      'neo-blue': 'bg-neo-blue border-black shadow-neo hover:shadow-neo-lg dark:bg-neo-dark-surface dark:border-neo-blue/40 dark:shadow-neo-dark',
      'neo-pink': 'bg-neo-pink border-black shadow-neo hover:shadow-neo-lg dark:bg-neo-dark-surface dark:border-neo-pink/40 dark:shadow-neo-dark',
      'neo-green': 'bg-neo-green border-black shadow-neo hover:shadow-neo-lg dark:bg-neo-dark-surface dark:border-neo-green/40 dark:shadow-neo-dark',
    };
    return colorMap[colorSuffix] || 'bg-white border-black shadow-neo';
  };

  return (
    <section id="preferences" ref={sectionRef} className="py-16 md:py-24 px-4 bg-white dark:bg-neo-dark-bg border-t-4 border-black dark:border-neo-dark-border transition-colors duration-300">
      <div className="max-w-6xl mx-auto">
        <div className={`mb-10 md:mb-16 inline-block bg-neo-black dark:bg-neo-dark-surface dark:border dark:border-neo-pink/30 text-white dark:text-neo-pink px-6 py-2 border-2 border-transparent shadow-neo dark:shadow-neo-dark transform -rotate-2 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
           <h2 className="font-editorial text-3xl md:text-5xl font-bold">My Preferences</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
          {preferencesData.map((item, index) => (
            <div 
              key={item.id} 
              className={`relative group border-4 p-6 md:p-8 ${getCardClasses(item.color)} hover:translate-x-[-4px] hover:translate-y-[-4px] transition-all duration-300 flex flex-col h-full`}
              style={{
                transitionDelay: `${index * 150}ms`,
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateY(0)' : 'translateY(30px)'
              }}
            >
              <div className="bg-white dark:bg-neo-dark-bg border-2 border-black dark:border-neo-dark-border w-12 h-12 flex items-center justify-center mb-6 shadow-neo-sm dark:shadow-none transition-transform group-hover:rotate-12">
                <div className={`text-black dark:text-current`}>
                    {item.icon === 'code' && <Code size={24} />}
                    {item.icon === 'gamepad' && <Gamepad2 size={24} />}
                    {item.icon === 'brain' && <BrainCircuit size={24} />}
                </div>
              </div>
              
              <div className="mb-3 font-ui text-[10px] md:text-xs font-bold uppercase tracking-widest border-b-2 border-black dark:border-neo-dark-border pb-1 inline-block w-max text-black dark:text-gray-400">
                {item.category}
              </div>
              
              <h3 className="font-editorial text-2xl md:text-3xl font-bold mb-4 text-black dark:text-white leading-tight">{item.title}</h3>
              
              <p className="font-grotesk font-medium text-lg leading-relaxed text-black/80 dark:text-gray-400 mb-8 flex-grow">
                {item.description}
              </p>

              <button 
                onClick={() => setSelectedItem(item)}
                className={`w-full mt-auto flex items-center justify-center gap-2 py-4 bg-black text-white dark:bg-neo-dark-bg dark:text-white dark:border-2 dark:border-white/10 font-bold hover:bg-white hover:text-black dark:hover:bg-white/5 transition-all uppercase tracking-wider text-sm`}
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
          <p className="text-xl font-medium leading-relaxed dark:text-white">
            {selectedItem?.description}
          </p>
          <hr className="border-black dark:border-neo-dark-border border-2" />
          <p className="text-lg text-gray-700 dark:text-gray-400">
            {selectedItem?.details}
          </p>
        </div>
      </NeoModal>
    </section>
  );
};

export default Preferences;