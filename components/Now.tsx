import React, { useRef, useState, useEffect } from 'react';
import { BookOpen, MonitorPlay, Terminal, ArrowUpRight, Loader2 } from 'lucide-react';

export default function Now() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) setIsVisible(true);
    }, { threshold: 0.1 });
    
    if (sectionRef.current) observer.observe(sectionRef.current);
    
    return () => observer.disconnect();
  }, []);

  const items = [
    {
      category: 'READING',
      title: 'Goblet of Fire',
      subtitle: 'J.K. Rowling',
      status: 'The Yule Ball Drama',
      icon: <BookOpen size={18} />,
      color: 'bg-neo-warm-mustard',
      img: 'https://covers.openlibrary.org/b/isbn/9781408855683-L.jpg'
    },
    {
      category: 'WATCHING',
      title: 'Crimes of Grindelwald',
      subtitle: 'Fantastic Beasts',
      status: 'Wizarding World Weekend',
      icon: <MonitorPlay size={18} />,
      color: 'bg-neo-warm-coral',
      img: 'https://upload.wikimedia.org/wikipedia/en/3/3c/Fantastic_Beasts_-_The_Crimes_of_Grindelwald_poster.png'
    },
    {
      category: 'BUILDING',
      title: 'This Portfolio',
      subtitle: 'React & Tailwind',
      status: 'Adding a "Now" section',
      icon: <Terminal size={18} />,
      color: 'bg-neo-warm-sage',
      img: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=800&auto=format&fit=crop'
    }
  ];

  return (
    <section id="now" ref={sectionRef} className="py-12 bg-transparent border-t-4 border-black dark:border-neo-dark-border transition-colors duration-300">
       <div className="max-w-6xl mx-auto px-4">
          <div className={`mb-8 flex flex-col md:flex-row md:items-center gap-4 transition-all duration-700 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'}`}>
             <div className="inline-block bg-neo-black dark:bg-white text-white dark:text-black px-4 py-1 font-bold font-ui text-sm uppercase tracking-widest transform -rotate-1 shadow-neo-sm">
                Status Report
             </div>
             <div className="flex items-center gap-2">
                <h2 className="font-editorial text-4xl font-bold dark:text-white">NOW</h2>
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
                </span>
             </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
             {items.map((item, i) => (
                <div 
                  key={item.category}
                  className={`group relative bg-neo-white dark:bg-neo-dark-surface border-4 border-black dark:border-neo-dark-border p-0 shadow-neo dark:shadow-none hover:shadow-none hover:translate-x-[4px] hover:translate-y-[4px] transition-all duration-300 flex flex-col`}
                  style={{
                      opacity: isVisible ? 1 : 0,
                      transform: isVisible ? `translateY(0)` : `translateY(20px)`,
                      transitionDelay: `${i * 150}ms`
                  }}
                >
                   {/* Header */}
                   <div className={`${item.color} border-b-4 border-black dark:border-neo-dark-border p-3 flex justify-between items-center transition-colors`}>
                      <span className="font-black font-ui text-xs tracking-widest text-black flex items-center gap-2">
                         {item.icon} {item.category}
                      </span>
                      <ArrowUpRight size={18} className="text-black transition-transform group-hover:rotate-45" />
                   </div>
                   
                   {/* Body */}
                   <div className="p-4 flex gap-4 items-center h-full">
                      <div className="w-16 h-24 shrink-0 border-2 border-black dark:border-gray-600 bg-gray-200 overflow-hidden shadow-sm relative group-hover:scale-105 transition-transform duration-300">
                         <img src={item.img} alt={item.title} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-1 min-w-0 py-1">
                         <h3 className="font-editorial font-bold text-xl leading-tight truncate dark:text-white mb-1">{item.title}</h3>
                         <p className="font-grotesk text-sm font-medium text-gray-600 dark:text-gray-400 truncate mb-2">{item.subtitle}</p>
                         
                         <div className="inline-flex items-center gap-1.5 bg-black/5 dark:bg-white/10 px-2 py-1 rounded border border-black/10 dark:border-white/10">
                            {item.category === 'BUILDING' && <Loader2 size={10} className="animate-spin text-neo-black dark:text-white" />}
                            <span className="text-[10px] font-bold uppercase tracking-wide text-neo-black dark:text-gray-200 truncate max-w-[120px]">
                                {item.status}
                            </span>
                         </div>
                      </div>
                   </div>
                </div>
             ))}
          </div>
       </div>
    </section>
  )
}