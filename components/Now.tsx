import React, { useState } from 'react';
import { BookOpen, MonitorPlay, Terminal, ArrowUpRight, Loader2, Quote, MessageCircle, Sparkles } from 'lucide-react';
import { motion } from 'motion/react';
import NeoModal from './NeoModal';
import TactileCard from './tactile/TactileCard';
import HardwareHeader from './tactile/HardwareHeader';
import StatusLED from './tactile/StatusLED';
import HardwareBadge from './tactile/HardwareBadge';
import BeveledButton from './tactile/BeveledButton';

export default function Now() {
  const [isTimelineOpen, setIsTimelineOpen] = useState(false);
  const [isReadingOpen, setIsReadingOpen] = useState(false);

  const items = [
    {
      category: 'READING',
      title: 'Order of the Phoenix',
      subtitle: 'J.K. Rowling',
      status: "Dumbledore's Army",
      icon: <BookOpen size={16} />,
      statusColor: 'green' as const,
      color: 'bg-neo-accent',
      img: 'https://covers.openlibrary.org/b/isbn/9780439358064-L.jpg',
      onClick: () => setIsReadingOpen(true)
    },
    {
      category: 'WATCHING',
      title: 'The Boy and the Heron',
      subtitle: 'Studio Ghibli',
      status: 'Active Watch',
      icon: <MonitorPlay size={16} />,
      statusColor: 'coral' as const,
      color: 'bg-neo-highlight',
      img: 'https://cdn.myanimelist.net/images/anime/1093/138133.jpg',
      onClick: () => setIsTimelineOpen(true)
    },
    {
      category: 'BUILDING',
      title: 'IndieTube',
      subtitle: 'React & Tailwind',
      status: 'Active Sprint',
      icon: <Terminal size={16} />,
      statusColor: 'amber' as const,
      color: 'bg-neo-support',
      img: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=800&auto=format&fit=crop',
      onClick: undefined
    }
  ];

  return (
    <section id="now" className="py-16 md:py-24 bg-transparent border-t-4 border-black dark:border-neo-dark-border transition-colors duration-300">
       <div className="max-w-6xl mx-auto px-4">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4 border-b-2 border-black/10 dark:border-white/10 pb-4"
          >
             <div>
               <h2 className="font-display text-3xl md:text-4xl font-black text-neutral-900 dark:text-white uppercase tracking-tight">
                 CURRENT FOCUS & LOGS
               </h2>
             </div>
             <p className="font-mono text-xs font-bold text-neutral-500 dark:text-neutral-400 uppercase tracking-wider md:pb-1">
               UPDATED • {new Date().toLocaleDateString('en-US', { month: 'short', year: 'numeric' }).toUpperCase()}
             </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
             {items.map((item, i) => (
                <motion.div 
                   key={item.category}
                   initial={{ opacity: 0, y: 20 }}
                   whileInView={{ opacity: 1, y: 0 }}
                   viewport={{ once: true, amount: 0.1 }}
                   transition={{ duration: 0.5, delay: i * 0.1, ease: "easeOut" }}
                >
                    <TactileCard
                      variant="panel"
                      interactive={Boolean(item.onClick)}
                      onClick={item.onClick}
                      header={
                        <HardwareHeader 
                          title={item.category}
                          statusColor={item.statusColor}
                          rightElement={
                            item.onClick ? (
                              <ArrowUpRight size={15} className="text-neutral-600 dark:text-neutral-300" />
                            ) : undefined
                          }
                        />
                      }
                      className="h-full flex flex-col justify-between"
                    >
                       {/* Content Body */}
                       <div className="p-5 flex gap-4 items-center flex-1">
                          <div className="w-16 h-24 shrink-0 rounded-[6px] overflow-hidden tactile-well relative p-0.5">
                             <img 
                               referrerPolicy="no-referrer" 
                               src={item.img} 
                               alt={item.title} 
                               onError={(e) => {
                                 e.currentTarget.src = "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=600&auto=format&fit=crop&q=80";
                               }}
                               className="w-full h-full object-cover rounded-[4px] transition-transform duration-300 group-hover:scale-105" 
                             />
                          </div>
                          <div className="flex-1 min-w-0 py-1 space-y-1">
                             <h3 className="font-display font-bold text-lg leading-tight truncate text-neutral-900 dark:text-white group-hover:text-neo-secondary transition-colors">
                               {item.title}
                             </h3>
                             <p className="font-grotesk text-xs font-medium text-neutral-600 dark:text-neutral-400 truncate">
                               {item.subtitle}
                             </p>
                             
                             <div className="pt-1">
                               <HardwareBadge 
                                 label={item.category === 'BUILDING' ? 'SPRINT' : 'STATUS'}
                                 telemetry={item.status}
                                 size="sm"
                                 variant={item.category === 'BUILDING' ? 'support' : 'neutral'}
                                 icon={item.category === 'BUILDING' ? <Loader2 size={10} className="animate-spin" /> : undefined}
                               />
                             </div>
                          </div>
                       </div>
                    </TactileCard>
                </motion.div>
             ))}
          </div>
       </div>

       {/* Watching Modal */}
       <NeoModal
         isOpen={isTimelineOpen}
         onClose={() => setIsTimelineOpen(false)}
         title="WATCHING LOG • STUDIO GHIBLI"
         badge="ANIMATION"
         statusColor="coral"
       >
         <div className="space-y-5">
           {/* Hero Image in Tactile Well */}
           <div className="w-full h-44 rounded-[10px] overflow-hidden tactile-well relative">
             <img referrerPolicy="no-referrer" src="https://upload.wikimedia.org/wikipedia/en/8/8f/The_Boy_and_the_Heron_poster.jpg" alt="The Boy and the Heron" className="w-full h-full object-cover opacity-85" />
             <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/95 to-transparent p-4 pt-12">
               <h3 className="font-display text-2xl font-bold text-white">The Boy and the Heron</h3>
               <p className="font-mono text-xs text-rose-400 font-bold tracking-widest uppercase">STUDIO GHIBLI • HAYAO MIYAZAKI</p>
             </div>
           </div>

           {/* Watch Notes */}
           <div className="tactile-well p-4 rounded-[10px] space-y-2">
             <h4 className="font-ui text-xs font-bold uppercase tracking-wider text-neutral-900 dark:text-neutral-100 flex items-center gap-2">
               <StatusLED status="coral" label="AESTHETIC ANALYSIS" />
             </h4>
             <p className="font-grotesk text-xs leading-relaxed text-neutral-700 dark:text-neutral-300">
               Watching <span className="font-bold bg-white/70 dark:bg-black/70 px-1.5 py-0.5 rounded">The Boy and the Heron</span>. The hand-drawn animation physics, fluid transitions, and tactile surrealism are pure visual mastery.
             </p>
           </div>

           <div className="tactile-panel p-4 rounded-[10px] space-y-3">
             <h3 className="font-display text-base font-bold text-neutral-900 dark:text-white uppercase tracking-tight">Favorites & Completed Anime</h3>
             
             <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {[
                  { title: "Your Name", desc: "Masterpiece visuals & soundtrack.", img: "https://image.tmdb.org/t/p/w500/q719jXXEzOoYaps6babgKnONONX.jpg" },
                  { title: "The Apothecary Diaries", desc: "Maomao is top tier!", img: "https://cdn.myanimelist.net/images/anime/1708/138033.jpg" },
                  { title: "Frieren", desc: "Refined pacing & direction.", img: "https://m.media-amazon.com/images/M/MV5BZTI4ZGMxN2UtODlkYS00MTBjLWE1YzctYzc3NDViMGI0ZmJmXkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg" },
                  { title: "Suzume", desc: "Emotional voyage across Japan.", img: "https://cdn.myanimelist.net/images/anime/1810/128608.jpg" },
                ].map(movie => (
                  <div key={movie.title} className="flex items-center gap-2.5 tactile-well p-2 rounded-[8px]">
                     <img referrerPolicy="no-referrer" src={movie.img} alt={movie.title} className="w-10 h-14 object-cover rounded-[4px] border border-black/20 shrink-0" />
                     <div className="min-w-0">
                       <h4 className="font-display font-bold text-xs truncate text-neutral-900 dark:text-white">{movie.title}</h4>
                       <p className="font-grotesk text-[10px] text-neutral-600 dark:text-neutral-300 line-clamp-2">{movie.desc}</p>
                     </div>
                  </div>
                ))}
             </div>
           </div>
         </div>
       </NeoModal>

       {/* Reading Modal */}
       <NeoModal
         isOpen={isReadingOpen}
         onClose={() => setIsReadingOpen(false)}
         title="CURRENT READ • BOOK 5"
         badge="CHAPTER 28"
         statusColor="green"
       >
         <div className="space-y-5">
           <div className="w-full h-44 rounded-[10px] overflow-hidden tactile-well relative bg-neutral-900 flex items-center justify-center">
             <img referrerPolicy="no-referrer" src="https://covers.openlibrary.org/b/isbn/9780439358064-L.jpg" alt="Order of the Phoenix" className="w-full h-full object-cover opacity-85" />
             <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/95 to-transparent p-4 pt-12">
               <h3 className="font-display text-2xl font-bold text-white">Order of the Phoenix</h3>
               <p className="font-mono text-xs text-amber-400 font-bold tracking-widest uppercase">J.K. ROWLING • CHAPTER 28</p>
             </div>
           </div>

           <div className="tactile-well p-4 rounded-[10px] space-y-2">
             <h4 className="font-ui text-xs font-bold uppercase tracking-wider text-neutral-900 dark:text-neutral-100 flex items-center gap-2">
               <StatusLED status="green" label="READER'S LOG" />
             </h4>
             <p className="font-grotesk text-xs leading-relaxed text-neutral-700 dark:text-neutral-300">
               <span className="font-bold bg-white/70 dark:bg-black/70 px-1.5 py-0.5 rounded">Dumbledore's Army</span> secret lessons in the Room of Requirement. The resistance tension is at its peak!
             </p>
           </div>

           <div className="tactile-panel p-4 rounded-[10px] space-y-2">
             <div className="flex justify-between text-xs font-mono font-bold uppercase text-neutral-900 dark:text-white">
                 <span>READING PROGRESS</span>
                 <span>40% (PG. 348 / 870)</span>
             </div>
             <div className="w-full h-3 rounded-full tactile-well overflow-hidden p-0.5">
                 <div className="h-full bg-gradient-to-r from-amber-400 to-amber-500 rounded-full w-[40%] shadow-inner"></div>
             </div>
           </div>
         </div>
       </NeoModal>
    </section>
  );
}
