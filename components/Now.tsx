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
      title: 'Order of the Phoenix',
      subtitle: 'J.K. Rowling',
      status: "Dumbledore's Army",
      icon: <BookOpen size={18} />,
      color: 'bg-neo-warm-mustard',
      img: 'https://covers.openlibrary.org/b/isbn/9780439358064-L.jpg',
      onClick: () => setIsReadingOpen(true)
    },
    {
      category: 'WATCHING',
      title: 'The Boy and the Heron',
      subtitle: 'Studio Ghibli',
      status: 'Watching',
      icon: <MonitorPlay size={18} />,
      color: 'bg-neo-warm-coral',
      img: 'https://cdn.myanimelist.net/images/anime/1093/138133.jpg',
      onClick: () => setIsTimelineOpen(true)
    },
    {
      category: 'BUILDING',
      title: 'IndieTube',
      subtitle: 'React & Tailwind',
      status: 'Working on features',
      icon: <Terminal size={18} />,
      color: 'bg-neo-warm-sage',
      img: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=800&auto=format&fit=crop',
      onClick: undefined
    }
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
                          {item.onClick && (
                            <ArrowUpRight size={18} className="text-black group-hover:text-white transition-all duration-300 group-hover:rotate-45" />
                          )}
                       </div>
                       
                       {/* Body */}
                       <div className="p-4 flex gap-4 items-center flex-1">
                          <div className="w-16 h-24 shrink-0 border-2 border-black dark:border-gray-600 bg-gray-200 overflow-hidden shadow-sm relative">
                             <img referrerPolicy="no-referrer" 
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
         title="WATCHING & WATCHED"
       >
         <div className="space-y-6">
           {/* Hero Image */}
           <div className="w-full h-40 border-4 border-black shadow-neo overflow-hidden relative bg-neo-black">
             <img referrerPolicy="no-referrer" src="https://upload.wikimedia.org/wikipedia/en/8/8f/The_Boy_and_the_Heron_poster.jpg" alt="The Boy and the Heron" className="w-full h-full object-cover opacity-80 hover:opacity-100 transition-opacity duration-500 hover:scale-105" />
             <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-transparent p-4 pt-12">
               <h3 className="font-editorial text-3xl font-bold text-white">The Boy and the Heron</h3>
               <p className="font-mono text-xs text-red-400 font-bold tracking-widest">STUDIO GHIBLI</p>
             </div>
           </div>

           {/* Watch Notes */}
           <div className="bg-neo-warm-mustard dark:bg-[#2a2a2a] p-5 border-4 border-black dark:border-gray-600 shadow-neo-sm relative">
             <div className="absolute top-2 right-2 opacity-20">
               <Quote size={40} />
             </div>
             <h4 className="font-editorial text-xl font-bold mb-3 text-neo-black dark:text-white flex items-center gap-2">
               <MessageCircle size={18} /> Watch Notes
             </h4>
              <div className="font-grotesk text-sm space-y-3 text-gray-800 dark:text-gray-300 leading-relaxed relative z-10">
                <p>
                  Watching <span className="font-bold text-black dark:text-white bg-white/50 dark:bg-black/50 px-1">The Boy and the Heron</span> by Studio Ghibli. The hand-drawn animation, the music, and the whimsical, dreamlike fantasy elements are absolutely magical.
                </p>
              </div>
           </div>

           <div className="bg-neo-bg-light dark:bg-[#222] p-4 border-2 border-dashed border-black dark:border-gray-500">
             <h3 className="font-editorial text-2xl font-bold mb-4 text-neo-black dark:text-white">Recently Watched & Completed</h3>
             
             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center gap-4 bg-white dark:bg-[#1a1a1a] p-3 border-2 border-black dark:border-gray-600">
                   <img referrerPolicy="no-referrer" src="https://image.tmdb.org/t/p/w500/q719jXXEzOoYaps6babgKnONONX.jpg" alt="Your Name" className="w-16 h-24 object-cover border-2 border-black shrink-0" />
                   <div>
                     <h4 className="font-bold text-xl dark:text-white font-editorial">Your Name</h4>
                     <p className="font-grotesk text-sm text-gray-600 dark:text-gray-400">Masterpiece. The visuals and soundtrack are unmatched.</p>
                   </div>
                </div>
                <div className="flex items-center gap-4 bg-white dark:bg-[#1a1a1a] p-3 border-2 border-black dark:border-gray-600">
                   <img referrerPolicy="no-referrer" src="https://cdn.myanimelist.net/images/anime/1708/138033.jpg" alt="The Apothecary Diaries" className="w-16 h-24 object-cover border-2 border-black shrink-0" />
                   <div>
                     <h4 className="font-bold text-xl dark:text-white font-editorial">The Apothecary Diaries</h4>
                     <p className="font-grotesk text-sm text-gray-600 dark:text-gray-400">Maomao is the best protagonist!</p>
                   </div>
                </div>
                <div className="flex items-center gap-4 bg-white dark:bg-[#1a1a1a] p-3 border-2 border-black dark:border-gray-600">
                   <img referrerPolicy="no-referrer" src="https://m.media-amazon.com/images/M/MV5BZTI4ZGMxN2UtODlkYS00MTBjLWE1YzctYzc3NDViMGI0ZmJmXkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg" alt="Frieren: Beyond Journey's End" className="w-16 h-24 object-cover border-2 border-black shrink-0" />
                   <div>
                     <h4 className="font-bold text-xl dark:text-white font-editorial">Frieren</h4>
                     <p className="font-grotesk text-sm text-gray-600 dark:text-gray-400">Beautiful storytelling and world-building.</p>
                    </div>
                 </div>
                 <div className="flex items-center gap-4 bg-white dark:bg-[#1a1a1a] p-3 border-2 border-black dark:border-gray-600">
                    <img referrerPolicy="no-referrer" src="https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx113415-bbBWj4pEFseh.jpg" alt="Jujutsu Kaisen" className="w-16 h-24 object-cover border-2 border-black shrink-0" />
                    <div>
                      <h4 className="font-bold text-xl dark:text-white font-editorial">Jujutsu Kaisen</h4>
                      <p className="font-grotesk text-sm text-gray-600 dark:text-gray-400">Completed the series! Outstanding fights and dynamic animation.</p>
                    </div>
                 </div>
                 <div className="flex items-center gap-4 bg-white dark:bg-[#1a1a1a] p-3 border-2 border-black dark:border-gray-600">
                    <img referrerPolicy="no-referrer" src="https://cdn.myanimelist.net/images/anime/1423/119934.jpg" alt="Jujutsu Kaisen 0" className="w-16 h-24 object-cover border-2 border-black shrink-0" />
                    <div>
                      <h4 className="font-bold text-xl dark:text-white font-editorial">Jujutsu Kaisen 0</h4>
                      <p className="font-grotesk text-sm text-gray-600 dark:text-gray-400">The prequel movie. Yuta's story is incredible.</p>
                    </div>
                 </div>
                 <div className="flex items-center gap-4 bg-white dark:bg-[#1a1a1a] p-3 border-2 border-black dark:border-gray-600">
                    <img referrerPolicy="no-referrer" src="https://upload.wikimedia.org/wikipedia/en/6/66/Weathering_with_You_Poster.jpg" alt="Weathering with You" className="w-16 h-24 object-cover border-2 border-black shrink-0" />
                    <div>
                      <h4 className="font-bold text-xl dark:text-white font-editorial">Weathering with You</h4>
                      <p className="font-grotesk text-sm text-gray-600 dark:text-gray-400">A visually breathtaking film by Makoto Shinkai about love and weather.</p>
                    </div>
                 </div>
                 <div className="flex items-center gap-4 bg-white dark:bg-[#1a1a1a] p-3 border-2 border-black dark:border-gray-600">
                    <img referrerPolicy="no-referrer" src="https://cdn.myanimelist.net/images/anime/1810/128608.jpg" alt="Suzume" className="w-16 h-24 object-cover border-2 border-black shrink-0" />
                    <div>
                      <h4 className="font-bold text-xl dark:text-white font-editorial">Suzume</h4>
                      <p className="font-grotesk text-sm text-gray-600 dark:text-gray-400">An emotional adventure across Japan. Beautiful music and art.</p>
                    </div>
                 </div>
                 <div className="flex items-center gap-4 bg-white dark:bg-[#1a1a1a] p-3 border-2 border-black dark:border-gray-600">
                    <img referrerPolicy="no-referrer" src="https://cdn.myanimelist.net/images/anime/1585/123303.jpg" alt="Drifting Home" className="w-16 h-24 object-cover border-2 border-black shrink-0" />
                    <div>
                      <h4 className="font-bold text-xl dark:text-white font-editorial">Drifting Home</h4>
                      <p className="font-grotesk text-sm text-gray-600 dark:text-gray-400">A nostalgic and emotional ride about letting go of the past.</p>
                    </div>
                   </div>
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
             <img referrerPolicy="no-referrer" src="https://covers.openlibrary.org/b/isbn/9780439358064-L.jpg" alt="Order of the Phoenix" className="w-full h-full object-cover opacity-80 hover:opacity-100 transition-opacity duration-500 hover:scale-105" />
             <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-transparent p-4 pt-12">
               <h3 className="font-editorial text-3xl font-bold text-white">Order of the Phoenix</h3>
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
                  <span className="font-bold text-black dark:text-white bg-white/50 dark:bg-black/50 px-1">Dumbledore's Army</span> is forming and Umbridge is the worst! I can't wait for them to fight back.
                </p>
             </div>
           </div>

           {/* Reading Progress */}
           <div className="bg-neo-bg-light dark:bg-[#222] p-4 border-2 border-dashed border-black dark:border-gray-500">
             <h3 className="font-editorial text-2xl font-bold mb-2 text-neo-black dark:text-white">Reading Progress</h3>
             <p className="font-grotesk text-sm text-gray-800 dark:text-gray-300 mb-6">
               Currently reading about the D.A. meetings.
             </p>

             <div className="space-y-2">
               <div className="flex justify-between text-xs font-bold uppercase text-neo-black dark:text-gray-300">
                   <span>Progress</span>
                   <span>40%</span>
               </div>
               <div className="w-full h-4 border-2 border-black rounded-full overflow-hidden bg-white dark:bg-gray-700">
                   <div className="h-full bg-neo-warm-mustard w-[40%] striped-bg"></div>
               </div>
             </div>
           </div>
         </div>
       </NeoModal>
    </section>
  )
}
