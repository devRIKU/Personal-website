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
    details: "I'm a beginner developer currently experimenting with Python, Web Development, and AI. I also have a huge passion for UI/UX design—making things look as good as they function. Every day is a new lesson in logic and creativity!",
    icon: 'code',
    color: 'neo-blue', // Map to terracotta
  },
  {
    id: '2',
    category: 'Playing Games',
    title: 'Keyboard > Controller',
    description: "I don’t just play games. I optimize. (And maybe rage a little.)",
    details: "I'm a competitive player who loves analyzing game mechanics and redstone engineering. Whether it's high-stakes FPS or building complex Minecraft systems, I'm always looking for the most efficient way to win.",
    icon: 'gamepad',
    color: 'neo-pink', // Map to coral
  },
  {
    id: '3',
    category: 'Knowing Things',
    title: 'Random Facts Unlocked',
    description: "Did I need to know how rockets work? No. Did I learn it anyway? Yes.",
    details: "I'm naturally curious and love diving into random topics like astrophysics or history. I enjoy collecting interesting facts—it helps me see the world from different perspectives and fuels my creativity.",
    icon: 'brain',
    color: 'neo-green', // Map to sage
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
      'neo-blue': 'bg-neo-warm-terracotta text-white border-black shadow-neo hover:bg-white hover:text-black dark:bg-neo-dark-surface dark:border-neo-warm-terracotta/40 dark:shadow-neo-dark',
      'neo-pink': 'bg-neo-warm-coral text-black border-black shadow-neo hover:bg-white dark:bg-neo-dark-surface dark:border-neo-warm-coral/40 dark:shadow-neo-dark',
      'neo-green': 'bg-neo-warm-sage text-black border-black shadow-neo hover:bg-white dark:bg-neo-dark-surface dark:border-neo-warm-sage/40 dark:shadow-neo-dark',
    };
    return colorMap[colorSuffix] || 'bg-white border-black shadow-neo';
  };

  return (
    <section id="preferences" ref={sectionRef} className="py-16 md:py-24 px-4 bg-neo-bg-light dark:bg-neo-dark-bg border-t-4 border-black dark:border-neo-dark-border transition-colors duration-300">
      <div className="max-w-6xl mx-auto">
        <div className={`mb-10 md:mb-16 inline-block bg-neo-black dark:bg-neo-dark-surface dark:border dark:border-neo-warm-coral/30 text-white dark:text-neo-warm-coral px-6 py-2 border-2 border-transparent shadow-neo transform -rotate-2 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
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
              <div className="bg-white dark:bg-neo-dark-bg border-2 border-black w-12 h-12 flex items-center justify-center mb-6 shadow-neo-sm dark:shadow-none transition-transform group-hover:rotate-12">
                <div className={`text-black dark:text-inherit`}>
                    {item.icon === 'code' && <Code size={24} />}
                    {item.icon === 'gamepad' && <Gamepad2 size={24} />}
                    {item.icon === 'brain' && <BrainCircuit size={24} />}
                </div>
              </div>
              
              <div className="mb-3 font-ui text-[10px] md:text-xs font-bold uppercase tracking-widest border-b-2 border-black pb-1 inline-block w-max text-inherit opacity-80">
                {item.category}
              </div>
              
              <h3 className="font-editorial text-2xl md:text-3xl font-bold mb-4 leading-tight">{item.title}</h3>
              
              <p className="font-grotesk font-medium text-lg leading-relaxed mb-8 flex-grow">
                {item.description}
              </p>

              <button 
                onClick={() => setSelectedItem(item)}
                className={`w-full mt-auto flex items-center justify-center gap-2 py-4 bg-black text-white dark:bg-neo-dark-bg dark:text-white dark:border-2 dark:border-white/10 font-bold hover:bg-neo-warm-mustard hover:text-black transition-all uppercase tracking-wider text-sm`}
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
               selectedItem?.color === 'neo-blue' ? 'bg-neo-warm-terracotta text-white' :
               selectedItem?.color === 'neo-pink' ? 'bg-neo-warm-coral text-black' : 'bg-neo-warm-sage text-black'
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