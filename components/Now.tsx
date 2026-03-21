import React, { useState } from 'react';
import { BookOpen, MonitorPlay, Terminal, ArrowUpRight, Loader2, CheckCircle2, Circle, Quote, MessageCircle } from 'lucide-react';
import { motion } from 'motion/react';
import NeoModal from './NeoModal';

export default function Now() {
  const [isTimelineOpen, setIsTimelineOpen] = useState(false);
  const [isReadingOpen, setIsReadingOpen] = useState(false);

  const items = [
    {
      category: 'READING',
      title: 'Goblet of Fire',
      subtitle: 'J.K. Rowling',
      status: 'The Third Task',
      icon: <BookOpen size={18} />,
      color: 'bg-neo-warm-mustard',
      img: 'https://covers.openlibrary.org/b/isbn/9781408855683-L.jpg',
      onClick: () => setIsReadingOpen(true)
    },
    {
      category: 'WATCHING',
      title: 'Stranger Things',
      subtitle: 'Season 3 Episode 6',
      status: 'Click to view timeline',
      icon: <MonitorPlay size={18} />,
      color: 'bg-neo-warm-coral',
      img: 'https://image.tmdb.org/t/p/w500/x2LSRK2Cm7MZhjluni1msVJ3wDF.jpg',
      onClick: () => setIsTimelineOpen(true)
    },
    {
      category: 'BUILDING',
      title: 'This Portfolio',
      subtitle: 'React & Tailwind',
      status: 'Adding a "Now" section',
      icon: <Terminal size={18} />,
      color: 'bg-neo-warm-sage',
      img: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=800&auto=format&fit=crop',
      onClick: undefined
    }
  ];

  const timelineData = [
    { season: 1, episodes: 8, watched: 8 },
    { season: 2, episodes: 9, watched: 9 },
    { season: 3, episodes: 8, watched: 6 },
    { season: 4, episodes: 9, watched: 0 },
    { season: 5, episodes: 8, watched: 0 }
  ];

  return (
    <section id="now" className="py-12 bg-transparent border-t-4 border-black dark:border-neo-dark-border transition-colors duration-300">
       <div className="max-w-6xl mx-auto px-4">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="mb-8 flex flex-col md:flex-row md:items-center gap-4"
          >
             <div className="inline-block bg-neo-black dark:bg-white text-white dark:text-black px-4 py-1 font-bold font-ui text-sm uppercase tracking-widest transform -rotate-1 shadow-neo-sm">
                Status Report
             </div>
             <div className="flex items-center gap-2">
                <h2 className="font-display text-4xl font-bold dark:text-white uppercase">NOW</h2>
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
                </span>
             </div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
             {items.map((item, i) => (
                <motion.div 
                   key={item.category}
                   initial={{ opacity: 0, y: 30 }}
                   whileInView={{ opacity: 1, y: 0 }}
                   viewport={{ once: true, amount: 0.1 }}
                   transition={{ duration: 0.6, delay: i * 0.15, ease: "easeOut" }}
                >
                    <div 
                      onClick={item.onClick}
                      className={`group relative bg-neo-white dark:bg-neo-dark-surface border-4 border-black dark:border-neo-dark-border p-0 shadow-neo dark:shadow-none hover:shadow-neo-lg hover:-translate-x-1 hover:-translate-y-1 transition-all duration-300 flex flex-col h-full ${item.onClick ? 'cursor-pointer' : ''}`}
                    >
                       {/* Header */}
                       <div className={`${item.color} group-hover:bg-black border-b-4 border-black dark:border-neo-dark-border p-3 flex justify-between items-center transition-colors duration-300`}>
                          <span className="font-black font-ui text-xs tracking-widest text-black group-hover:text-white flex items-center gap-2 transition-colors duration-300">
                             {item.icon} {item.category}
                          </span>
                          <ArrowUpRight size={18} className="text-black group-hover:text-white transition-all duration-300 group-hover:rotate-45" />
                       </div>
                       
                       {/* Body */}
                       <div className="p-4 flex gap-4 items-center flex-1">
                          <div className="w-16 h-24 shrink-0 border-2 border-black dark:border-gray-600 bg-gray-200 overflow-hidden shadow-sm relative">
                             <img 
                               src={item.img} 
                               alt={item.title} 
                               className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3" 
                             />
                          </div>
                          <div className="flex-1 min-w-0 py-1">
                             <h3 className="font-editorial font-bold text-xl leading-tight truncate dark:text-white mb-1 group-hover:text-neo-warm-terracotta transition-colors">{item.title}</h3>
                             <p className="font-grotesk text-sm font-medium text-gray-600 dark:text-gray-400 truncate mb-2">{item.subtitle}</p>
                             
                             <div className="inline-flex items-center gap-1.5 bg-black/5 dark:bg-white/10 px-2 py-1 rounded border border-black/10 dark:border-white/10 group-hover:bg-neo-warm-mustard group-hover:border-black transition-colors">
                                {item.category === 'BUILDING' && <Loader2 size={10} className="animate-spin text-neo-black dark:text-white group-hover:text-black" />}
                                <span className="text-[10px] font-bold uppercase tracking-wide text-neo-black dark:text-gray-200 truncate max-w-[120px] group-hover:text-black">
                                    {item.status}
                                </span>
                             </div>
                          </div>
                       </div>
                    </div>
                </motion.div>
             ))}
          </div>
       </div>

       <NeoModal
         isOpen={isTimelineOpen}
         onClose={() => setIsTimelineOpen(false)}
         title="STRANGER THINGS TIMELINE"
       >
         <div className="space-y-6">
           {/* Hero Image */}
           <div className="w-full h-40 border-4 border-black shadow-neo overflow-hidden relative bg-neo-black">
             <img src="https://image.tmdb.org/t/p/w780/56v2KjBlU4XaOv9rVYEQypROD7P.jpg" alt="Stranger Things" className="w-full h-full object-cover opacity-80 hover:opacity-100 transition-opacity duration-500 hover:scale-105" />
             <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-transparent p-4 pt-12">
               <h3 className="font-editorial text-3xl font-bold text-white">Stranger Things</h3>
               <p className="font-mono text-xs text-red-400 font-bold tracking-widest">HAWKINS, INDIANA</p>
             </div>
           </div>

           {/* Character Notes */}
           <div className="bg-neo-warm-mustard dark:bg-[#2a2a2a] p-5 border-4 border-black dark:border-gray-600 shadow-neo-sm relative">
             <div className="absolute top-2 right-2 opacity-20">
               <Quote size={40} />
             </div>
             <h4 className="font-editorial text-xl font-bold mb-3 text-neo-black dark:text-white flex items-center gap-2">
               <MessageCircle size={18} /> Character Notes
             </h4>
              <div className="font-grotesk text-sm space-y-3 text-gray-800 dark:text-gray-300 leading-relaxed relative z-10">
                <p>
                  After watching up to <span className="font-bold text-black dark:text-white bg-white/50 dark:bg-black/50 px-1">S3 E6</span>, I like everyone in the OG group! Especially <span className="font-bold text-black dark:text-white bg-white/50 dark:bg-black/50 px-1">Mike</span>, <span className="font-bold text-black dark:text-white bg-white/50 dark:bg-black/50 px-1">Will</span>, and <span className="font-bold text-black dark:text-white bg-white/50 dark:bg-black/50 px-1">Eleven</span>.
                </p>
                <p>
                  <span className="font-bold text-black dark:text-white bg-white/50 dark:bg-black/50 px-1">Max</span>, <span className="font-bold text-black dark:text-white bg-white/50 dark:bg-black/50 px-1">Dustin</span>, and <span className="font-bold text-black dark:text-white bg-white/50 dark:bg-black/50 px-1">Lucas</span> are a close second. Also, <span className="font-bold text-black dark:text-white bg-white/50 dark:bg-black/50 px-1">Steve</span> totally redeemed himself with <span className="font-bold text-black dark:text-white bg-white/50 dark:bg-black/50 px-1">Robin</span>—that was fun!
                </p>
              </div>
           </div>

           {/* Mini Gallery */}
           <div className="grid grid-cols-2 gap-3">
              <div className="border-4 border-black dark:border-gray-600 overflow-hidden aspect-video shadow-neo-sm">
                 <img src="https://image.tmdb.org/t/p/w500/x2LSRK2Cm7MZhjluni1msVJ3wDF.jpg" className="w-full h-full object-cover hover:scale-110 transition-transform duration-500" />
              </div>
              <div className="border-4 border-black dark:border-gray-600 overflow-hidden aspect-video shadow-neo-sm">
                 <img src="https://image.tmdb.org/t/p/w500/2gvzcqEG3B1nw8kAJvBwG5XJ9Q.jpg" className="w-full h-full object-cover hover:scale-110 transition-transform duration-500" />
              </div>
           </div>

           <div className="bg-neo-bg-light dark:bg-[#222] p-4 border-2 border-dashed border-black dark:border-gray-500">
             <h3 className="font-editorial text-2xl font-bold mb-2 text-neo-black dark:text-white">Watch Progress</h3>
             <p className="font-grotesk text-sm text-gray-800 dark:text-gray-300 mb-6">
               Currently on Season 3, Episode 6. The Starcourt Mall is where it's at.
             </p>

             <div className="relative pl-4 sm:pl-6 border-l-4 border-black dark:border-gray-600 space-y-8 pb-4">
               {timelineData.map((season) => {
                 const isSeasonFullyWatched = season.watched === season.episodes;
                 const isSeasonPartiallyWatched = season.watched > 0 && season.watched < season.episodes;
                 const isSeasonUnwatched = season.watched === 0;
                 
                 return (
                   <div key={season.season} className="relative">
                     {/* Timeline Node */}
                     <div className={`absolute -left-[26px] sm:-left-[34px] w-6 h-6 sm:w-8 sm:h-8 rounded-full border-4 border-black dark:border-gray-600 flex items-center justify-center ${
                        isSeasonFullyWatched ? 'bg-black dark:bg-white' : 
                        isSeasonPartiallyWatched ? 'bg-neo-warm-mustard' : 
                        'bg-neo-bg-light dark:bg-[#222]'
                     }`}>
                        {isSeasonFullyWatched && <CheckCircle2 size={12} className="text-white dark:text-black" />}
                        {isSeasonPartiallyWatched && <div className="w-2 h-2 rounded-full bg-black animate-pulse"></div>}
                     </div>

                     <div className="pl-4">
                       <h4 className="font-mono font-bold text-lg mb-3 text-neo-black dark:text-white flex items-center gap-2">
                         SEASON {season.season}
                         {isSeasonPartiallyWatched && (
                           <span className="text-[10px] bg-red-500 text-white px-2 py-0.5 rounded-full animate-pulse">IN PROGRESS</span>
                         )}
                       </h4>
                       
                       <div className="grid grid-cols-5 sm:grid-cols-8 gap-2">
                         {Array.from({ length: season.episodes }).map((_, i) => {
                           const isWatched = i < season.watched;
                           const isCurrent = season.season === 3 && i === 5; // S3 E6 (0-indexed is 5)
                           
                           return (
                             <div 
                               key={i}
                               className={`flex items-center justify-center aspect-square border-2 ${
                                 isCurrent 
                                   ? 'border-red-500 bg-red-100 text-red-600 animate-pulse dark:bg-red-900/30 dark:text-red-400 shadow-[2px_2px_0px_0px_rgba(239,68,68,1)] -translate-y-1' 
                                   : isWatched 
                                     ? 'border-black bg-black text-white dark:border-white dark:bg-white dark:text-black' 
                                     : 'border-gray-400 bg-gray-100 text-gray-500 dark:border-gray-600 dark:bg-[#333] dark:text-gray-400'
                               } transition-all duration-300`}
                               title={`Episode ${i + 1}`}
                             >
                               <span className="font-mono text-xs font-bold">{i + 1}</span>
                             </div>
                           );
                         })}
                       </div>
                     </div>
                   </div>
                 );
               })}
             </div>
           </div>
         </div>
       </NeoModal>

       <NeoModal
         isOpen={isReadingOpen}
         onClose={() => setIsReadingOpen(false)}
         title="CURRENT READ"
       >
         <div className="space-y-6">
           {/* Hero Image */}
           <div className="w-full h-40 border-4 border-black shadow-neo overflow-hidden relative bg-neo-black flex items-center justify-center">
             <img src="https://covers.openlibrary.org/b/isbn/9781408855683-L.jpg" alt="Goblet of Fire" className="w-full h-full object-cover opacity-80 hover:opacity-100 transition-opacity duration-500 hover:scale-105" />
             <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-transparent p-4 pt-12">
               <h3 className="font-editorial text-3xl font-bold text-white">Goblet of Fire</h3>
               <p className="font-mono text-xs text-neo-warm-mustard font-bold tracking-widest">J.K. ROWLING</p>
             </div>
           </div>

           {/* Reader Notes */}
           <div className="bg-neo-warm-mustard dark:bg-[#2a2a2a] p-5 border-4 border-black dark:border-gray-600 shadow-neo-sm relative">
             <div className="absolute top-2 right-2 opacity-20">
               <Quote size={40} />
             </div>
             <h4 className="font-editorial text-xl font-bold mb-3 text-neo-black dark:text-white flex items-center gap-2">
               <MessageCircle size={18} /> Reader's Notes
             </h4>
             <div className="font-grotesk text-sm space-y-3 text-gray-800 dark:text-gray-300 leading-relaxed relative z-10">
                <p>
                  The <span className="font-bold text-black dark:text-white bg-white/50 dark:bg-black/50 px-1">Triwizard Tournament</span> is reaching its climax! The maze is terrifying and I'm stressed about what's waiting at the center.
                </p>
                <p>
                  <span className="font-bold text-black dark:text-white bg-white/50 dark:bg-black/50 px-1">Cedric</span> and Harry working together is great, but I have a bad feeling about this...
                </p>
             </div>
           </div>

           {/* Reading Progress */}
           <div className="bg-neo-bg-light dark:bg-[#222] p-4 border-2 border-dashed border-black dark:border-gray-500">
             <h3 className="font-editorial text-2xl font-bold mb-2 text-neo-black dark:text-white">Reading Progress</h3>
             <p className="font-grotesk text-sm text-gray-800 dark:text-gray-300 mb-6">
               Currently on The Third Task. The maze awaits.
             </p>

             <div className="space-y-2">
               <div className="flex justify-between text-xs font-bold uppercase text-neo-black dark:text-gray-300">
                   <span>Progress</span>
                   <span>88%</span>
               </div>
               <div className="w-full h-4 border-2 border-black rounded-full overflow-hidden bg-white dark:bg-gray-700">
                   <div className="h-full bg-neo-warm-mustard w-[88%] striped-bg"></div>
               </div>
             </div>
           </div>
         </div>
       </NeoModal>
    </section>
  )
}