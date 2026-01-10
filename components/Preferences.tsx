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
    color: 'bg-neo-blue',
  },
  {
    id: '2',
    category: 'Playing Games',
    title: 'Keyboard > Controller',
    description: "I don’t just play games. I optimize. (And maybe rage a little.)",
    icon: 'gamepad',
    color: 'bg-neo-pink',
  },
  {
    id: '3',
    category: 'Knowing Things',
    title: 'Random Facts Unlocked',
    description: "Did I need to know how rockets work? No. Did I learn it anyway? Yes.",
    icon: 'brain',
    color: 'bg-neo-green',
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

  return (
    <section id="preferences" ref={sectionRef} className="py-20 px-4 bg-white border-t-4 border-black">
      <div className="max-w-6xl mx-auto">
        <div className={`mb-12 inline-block bg-neo-black text-white px-6 py-2 border-2 border-transparent shadow-neo transform -rotate-2 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
           <h2 className="font-editorial text-4xl font-bold">My Preferences</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {preferencesData.map((item, index) => (
            <div 
              key={item.id} 
              className={`relative group border-4 border-black p-6 ${item.color} shadow-neo hover:shadow-neo-lg hover:-translate-y-1 transition-all duration-500 flex flex-col h-full`}
              style={{
                transitionDelay: `${index * 150}ms`,
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateY(0) rotate(0deg)' : 'translateY(30px) rotate(2deg)'
              }}
            >
              <div className="bg-white border-2 border-black w-12 h-12 flex items-center justify-center mb-4 shadow-neo-sm">
                {item.icon === 'code' && <Code size={24} />}
                {item.icon === 'gamepad' && <Gamepad2 size={24} />}
                {item.icon === 'brain' && <BrainCircuit size={24} />}
              </div>
              
              <div className="mb-2 font-ui text-xs font-bold uppercase tracking-widest border-b-2 border-black pb-1 inline-block w-max">
                {item.category}
              </div>
              
              <h3 className="font-editorial text-2xl font-bold mb-3">{item.title}</h3>
              
              <p className="font-grotesk font-medium text-lg leading-relaxed">
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