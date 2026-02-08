import React, { useEffect, useRef, useState } from 'react';
import { Book, Gamepad, Music, ExternalLink, Play, Library, Tv, Info, Disc, ArrowRight, X, Check, Film, Sparkles, Scroll, MessageCircle, Quote } from 'lucide-react';
import NeoModal from './NeoModal';

interface BookData {
  title: string;
  url: string;
  img: string;
  status: 'read' | 'reading' | 'unread';
  description: string;
  themeColor: string;
  myComment: string;
}

interface GameData {
  name: string;
  img: string;
  url: string;
  description: string;
  myComment: string;
}

const Favorites: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isBookPanelOpen, setIsBookPanelOpen] = useState(false);
  
  // New state for individual item modals
  const [selectedBook, setSelectedBook] = useState<BookData | null>(null);
  const [selectedGame, setSelectedGame] = useState<GameData | null>(null);
  
  const sectionRef = useRef<HTMLElement>(null);

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

    return () => {
      observer.disconnect();
    };
  }, []);

  // Manage body scroll for modals
  useEffect(() => {
    if (isBookPanelOpen || selectedBook || selectedGame) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; }
  }, [isBookPanelOpen, selectedBook, selectedGame]);

  const hpBooks: BookData[] = [
    { 
      title: "Philosopher's Stone", 
      url: "https://www.goodreads.com/book/show/72193.Harry_Potter_and_the_Philosopher_s_Stone", 
      img: "https://covers.openlibrary.org/b/isbn/9781408855652-L.jpg",
      status: 'read',
      description: "Harry discovers he is a wizard and begins his first year at Hogwarts School of Witchcraft and Wizardry.",
      themeColor: "bg-[#FF9F1C]",
      myComment: "The OG. Still waiting for my acceptance letter. Any day now..."
    },
    { 
      title: "Chamber of Secrets", 
      url: "https://www.goodreads.com/book/show/779610.Harry_Potter_and_the_Chamber_of_Secrets", 
      img: "https://covers.openlibrary.org/b/isbn/9781408855669-L.jpg",
      status: 'read',
      description: "Students are found petrified as a dark force reopens the Chamber of Secrets, unleashing a monster.",
      themeColor: "bg-[#2EC4B6]",
      myComment: "Giant snakes and flying cars. Basically my average Tuesday debugging session."
    },
    { 
      title: "Prisoner of Azkaban", 
      url: "https://www.goodreads.com/book/show/5.Harry_Potter_and_the_Prisoner_of_Azkaban", 
      img: "https://covers.openlibrary.org/b/isbn/9781408855676-L.jpg",
      status: 'read',
      description: "Escaped prisoner Sirius Black is rumored to be hunting Harry, while Dementors guard the school grounds.",
      themeColor: "bg-[#9D4EDD]",
      myComment: "Time travel logic usually hurts my brain, but this was a masterpiece."
    },
    { 
      title: "Goblet of Fire", 
      url: "https://www.goodreads.com/book/show/6.Harry_Potter_and_the_Goblet_of_Fire", 
      img: "https://covers.openlibrary.org/b/isbn/9781408855683-L.jpg",
      status: 'reading',
      description: "Harry is mysteriously entered into the dangerous Triwizard Tournament, facing dragons and dark wizards.",
      themeColor: "bg-[#4CC9F0]",
      myComment: "Triwizard Tournament? More like 'Try Not To Die' Tournament. Cedric deserved better."
    },
    { 
      title: "Order of the Phoenix", 
      url: "https://www.goodreads.com/book/show/2.Harry_Potter_and_the_Order_of_the_Phoenix", 
      img: "https://covers.openlibrary.org/b/isbn/9781408855690-L.jpg",
      status: 'unread',
      description: "Harry faces the return of Voldemort and a Ministry in denial, forming Dumbledore's Army to fight back.",
      themeColor: "bg-[#FF6B6B]",
      myComment: "Umbridge is the ultimate bug in the system. Needs immediate deletion."
    },
    { 
      title: "Half-Blood Prince", 
      url: "https://www.goodreads.com/book/show/1.Harry_Potter_and_the_Half_Blood_Prince", 
      img: "https://covers.openlibrary.org/b/isbn/9781408855706-L.jpg",
      status: 'unread',
      description: "Harry learns about Voldemort's past and the Horcruxes needed to defeat him, amidst romance and tragedy.",
      themeColor: "bg-[#80B918]",
      myComment: "Snape's textbook is basically the original Stack Overflow. Cheating or genius?"
    },
    { 
      title: "Deathly Hallows", 
      url: "https://www.goodreads.com/book/show/136251.Harry_Potter_and_the_Deathly_Hallows", 
      img: "https://covers.openlibrary.org/b/isbn/9781408855713-L.jpg",
      status: 'unread',
      description: "The final battle for Hogwarts and the wizarding world as Harry, Ron, and Hermione hunt the remaining Horcruxes.",
      themeColor: "bg-[#6C757D]",
      myComment: "The final commit. Pushing to production. No rollbacks allowed."
    }
  ];

  const games: GameData[] = [
    { 
      name: "Hollow Knight", 
      img: "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/367520/library_600x900.jpg", 
      url: "https://store.steampowered.com/app/367520/Hollow_Knight/",
      description: "Explore a ruined kingdom of insects and heroes.",
      myComment: "I have died more times in this game than I have lines of code. 10/10 would get lost again."
    },
    { 
      name: "Silksong", 
      img: "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/1030300/library_600x900.jpg", 
      url: "https://store.steampowered.com/app/1030300/Hollow_Knight_Silksong/",
      description: "The highly anticipated sequel starring Hornet.",
      myComment: "Is it out yet? No? Running script: check_steam_every_5_seconds.py"
    },
    { 
      name: "Minecraft", 
      img: "https://store-images.s-microsoft.com/image/apps.60323.13850085746326678.9b177d9c-8a22-4824-a744-84d411804c0d.85a97475-438e-4a8b-9005-4f4d23259021", 
      url: "https://www.minecraft.net/",
      description: "Build, explore, and survive in an infinite blocky world.",
      myComment: "Redstone engineering is just electrical engineering with better blocks and more zombies."
    },
    { 
      name: "Portal", 
      img: "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/400/library_600x900.jpg", 
      url: "https://store.steampowered.com/app/400/Portal/",
      description: "Solve mind-bending puzzles with a portal gun.",
      myComment: "The cake is a lie, but the physics engine is 100% real. Speedy thing goes in, speedy thing comes out."
    },
    { 
      name: "Portal 2", 
      img: "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/620/library_600x900.jpg", 
      url: "https://store.steampowered.com/app/620/Portal_2/",
      description: "Return to Aperture Science for more testing and GLaDOS.",
      myComment: "GLaDOS is the AI assistant I aspire to build. Minus the neurotoxin part, hopefully."
    }
  ];
  
  const wishlistGames = [
    {
      name: "Hogwarts Legacy",
      img: "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/990080/library_600x900.jpg",
      url: "https://store.steampowered.com/app/990080/Hogwarts_Legacy/"
    }
  ];

  const playlists = [
    { name: "Hummo", url: "https://music.youtube.com/playlist?list=PLYclxc99mpV64awQ3PLFg9ugq9yZr_PgG&si=4g0pTGB-o9xrOWKR" },
    { name: "Hummo Lofi", url: "https://music.youtube.com/playlist?list=PLYclxc99mpV6y5xuhybQXnvZndZWVsaLW&si=o_gZ0s8iR8oTZZzu" }
  ];

  const activeBook = hpBooks.find(b => b.status === 'reading');
  const sectionBgColor = activeBook ? activeBook.themeColor : 'bg-neo-warm-mustard';

  // Manual selection for shelf display to maintain aesthetic variety
  // Indices based on sorted array: 3 (Goblet), 0 (Philo), 1 (Chamber)
  const shelfBooks = [hpBooks[3], hpBooks[0], hpBooks[1]];

  return (
    <>
      <section id="favorites" ref={sectionRef} className="py-16 md:py-24 px-4 bg-transparent border-t-4 border-black dark:border-neo-dark-border overflow-hidden transition-colors duration-500">
        <div className="max-w-7xl mx-auto">
          <div className={`mb-12 md:mb-16 inline-block bg-neo-warm-coral dark:bg-neo-dark-surface border-4 border-black dark:border-neo-warm-coral p-4 shadow-neo transition-all duration-700 ease-out ${isVisible ? 'opacity-100 translate-y-0 -rotate-1' : 'opacity-0 translate-y-12 -rotate-6'}`}>
            <h2 className="font-editorial text-3xl md:text-5xl font-bold text-black dark:text-neo-warm-coral uppercase tracking-tighter">
              THE_COLLECTION_v5.4
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            
            {/* Books Shelf */}
            <div className={`lg:col-span-7 space-y-6 transition-all duration-700 delay-200 ease-out ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'}`}>
              <div className={`${sectionBgColor} border-4 border-black p-4 shadow-neo flex items-center justify-between transition-colors duration-500`}>
                <div className="flex items-center gap-3">
                  <Book size={28} className="text-black" />
                  <h3 className="font-editorial text-2xl font-bold text-black uppercase tracking-tighter">Readables</h3>
                </div>
                <div className="flex items-center gap-2 text-black/60 font-bold font-grotesk text-xs">
                   <span>3/7 READ</span>
                   <Library size={24} />
                </div>
              </div>
              
              <div className="relative pt-6 px-4 bg-neo-white/40 dark:bg-black/20 border-x-4 border-t-4 border-black/10 dark:border-white/5">
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 justify-items-center items-end">
                  {/* Selected Books for Shelf */}
                  {shelfBooks.map((book, index) => (
                    <div 
                      key={book.title} 
                      onClick={() => setSelectedBook(book)}
                      className={`block group relative transition-all duration-500 w-full max-w-[110px] cursor-pointer ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
                      style={{ transitionDelay: `${index * 150}ms` }}
                      title={book.title}
                    >
                      <div className="aspect-[2/3] bg-neo-black border-4 border-black shadow-neo-sm overflow-hidden relative transition-all duration-300 ease-out group-hover:shadow-neo group-hover:-translate-y-2 group-hover:rotate-2 group-hover:scale-105">
                        <img 
                          src={book.img} 
                          alt={book.title}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                          loading="lazy"
                        />
                        <div className={`absolute top-1 right-1 border-2 border-black rounded-full p-0.5 ${
                            book.status === 'reading' ? 'bg-yellow-400' : 'bg-green-500'
                        }`}>
                           {book.status === 'reading' ? (
                             <Sparkles size={10} className="text-black stroke-[3]" />
                           ) : (
                             <Check size={10} className="text-black stroke-[4]" />
                           )}
                        </div>
                      </div>
                      {/* Visual shelf shadow */}
                      <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-[85%] h-1 bg-black/20 blur-sm transition-opacity duration-300 group-hover:opacity-60"></div>
                    </div>
                  ))}

                  {/* See More / Progress Card */}
                  <div 
                    onClick={() => setIsBookPanelOpen(true)}
                    className={`block group relative transition-all duration-500 w-full max-w-[110px] cursor-pointer ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
                    style={{ transitionDelay: `${3 * 150}ms` }}
                  >
                    <div className="aspect-[2/3] bg-neo-black border-4 border-black shadow-neo-sm overflow-hidden relative transition-all duration-300 ease-out group-hover:shadow-neo group-hover:-translate-y-2 group-hover:-rotate-2 group-hover:scale-105 flex flex-col items-center justify-between p-3 bg-neo-white dark:bg-neo-dark-surface">
                      <div className="text-center w-full">
                         <span className="block font-black text-2xl md:text-3xl font-editorial">4</span>
                         <span className="block text-[8px] font-bold uppercase tracking-widest bg-neo-warm-mustard text-black px-1">Going...</span>
                      </div>
                      
                      <div className="text-center">
                         <Film size={16} className="mx-auto mb-1 text-neo-warm-coral" />
                         <span className="block text-[8px] font-bold uppercase leading-tight">Movies<br/>Complete</span>
                      </div>
                      
                      <div className="w-full flex justify-end">
                         <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                     {/* Visual shelf shadow */}
                     <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-[85%] h-1 bg-black/20 blur-sm transition-opacity duration-300 group-hover:opacity-60"></div>
                  </div>
                </div>
                {/* Physical Shelf */}
                <div className="mt-4 h-6 w-full bg-neo-warm-terracotta border-4 border-black shadow-neo-sm relative z-10 flex items-center justify-center">
                  <div className="w-full h-1 bg-black/10"></div>
                </div>
              </div>
            </div>

            {/* Gaming Hub */}
            <div className={`lg:col-span-5 space-y-6 transition-all duration-700 delay-400 ease-out ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'}`}>
              <div className="bg-neo-warm-sage border-4 border-black p-4 shadow-neo flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Gamepad size={28} className="text-black" />
                  <h3 className="font-editorial text-2xl font-bold text-black uppercase tracking-tighter">Playables</h3>
                </div>
                <Tv size={24} className="text-black opacity-30" />
              </div>

              <div className="grid grid-cols-3 sm:grid-cols-5 lg:grid-cols-3 gap-3">
                {games.map((game) => (
                  <div 
                    key={game.name} 
                    className="group relative cursor-pointer"
                    onClick={() => setSelectedGame(game)}
                  >
                    <div className="aspect-[3/4] bg-neo-black border-4 border-black shadow-neo-sm overflow-hidden hover:shadow-neo hover:-translate-y-1 transition-all relative">
                      <img 
                        src={game.img} 
                        alt={game.name} 
                        className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-300"
                        loading="lazy"
                      />
                      
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                          <div className="bg-neo-white p-2 rounded-full border-2 border-black shadow-neo-sm">
                              <Info size={20} className="text-black" />
                          </div>
                      </div>

                      <div className="absolute bottom-0 left-0 right-0 p-1 bg-neo-white/90 font-ui text-[8px] font-bold uppercase text-center border-t-2 border-black translate-y-full group-hover:translate-y-0 transition-transform">
                        {game.name}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Wishlist */}
              <div className="bg-neo-white dark:bg-neo-dark-surface border-4 border-black dark:border-neo-warm-terracotta p-4 shadow-neo relative overflow-hidden">
                 <div className="absolute top-0 right-0 p-2 opacity-10">
                   <Sparkles size={64} />
                 </div>
                 <div className="flex items-center gap-3 mb-3">
                    <h4 className="font-editorial text-xl font-bold uppercase">Wishlist</h4>
                    <span className="bg-neo-black text-white px-2 py-0.5 text-[10px] font-bold rounded-full">Coming Soon</span>
                 </div>
                 <div className="flex gap-4">
                    {wishlistGames.map(game => (
                        <div key={game.name} className="flex items-center gap-3 group cursor-pointer">
                            <div className="w-12 h-16 border-2 border-black bg-gray-200">
                                <img src={game.img} className="w-full h-full object-cover" />
                            </div>
                            <div>
                                <p className="font-bold text-sm leading-tight group-hover:underline">{game.name}</p>
                                <span className="text-[10px] text-gray-500 font-bold uppercase">Steam</span>
                            </div>
                        </div>
                    ))}
                 </div>
              </div>
            </div>

            {/* Music */}
            <div className={`lg:col-span-12 mt-4 transition-all duration-700 delay-500 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
                <div className="bg-neo-black dark:bg-neo-dark-surface p-6 border-4 border-black dark:border-neo-blue shadow-neo flex flex-col md:flex-row items-center justify-between gap-6">
                   <div className="flex items-center gap-4">
                      <div className="w-16 h-16 bg-neo-warm-coral rounded-full flex items-center justify-center border-4 border-white animate-spin-slow">
                          <Disc size={32} className="text-white" />
                      </div>
                      <div>
                        <h3 className="font-editorial text-2xl font-bold text-white uppercase tracking-wider">Soundwaves</h3>
                        <p className="font-grotesk text-gray-400 text-sm">What's spinning in my head.</p>
                      </div>
                   </div>
                   
                   <div className="flex flex-wrap gap-4">
                      {playlists.map(pl => (
                        <a 
                          key={pl.name}
                          href={pl.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 bg-white dark:bg-neo-dark-bg px-4 py-2 border-2 border-black hover:bg-neo-warm-mustard transition-colors font-bold text-sm shadow-[4px_4px_0px_0px_rgba(255,255,255,0.2)] dark:text-white dark:hover:text-black"
                        >
                           <Music size={16} />
                           {pl.name}
                        </a>
                      ))}
                   </div>
                </div>
            </div>
            
          </div>
        </div>

        {/* Book Drawer / Modal (List) */}
        <NeoModal 
          isOpen={isBookPanelOpen} 
          onClose={() => setIsBookPanelOpen(false)} 
          title="Harry Potter Progress"
        >
             <div className="space-y-6">
                <div className="flex items-center gap-4 bg-neo-bg-light p-4 border-2 border-black">
                   <div className={`${sectionBgColor} p-3 border-2 border-black rounded-full`}>
                      <Scroll size={24} className="text-black"/>
                   </div>
                   <div>
                      <h4 className="font-bold text-lg">Reading Challenge</h4>
                      <p className="text-sm">Re-reading the entire series because why not?</p>
                   </div>
                </div>

                {/* Currently Reading Section */}
                {activeBook && (
                    <div 
                      onClick={() => setSelectedBook(activeBook)}
                      className="cursor-pointer group relative bg-neo-white dark:bg-neo-dark-surface border-4 border-black dark:border-neo-warm-mustard p-4 shadow-neo hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all"
                    >
                        <div className="absolute top-0 right-0 bg-neo-warm-mustard text-black text-xs font-bold px-3 py-1 border-l-4 border-b-4 border-black uppercase tracking-wider z-10">
                            Now Reading
                        </div>
                        
                        <div className="flex gap-4 items-center">
                            <div className="w-20 shrink-0 aspect-[2/3] border-2 border-black shadow-sm group-hover:rotate-2 transition-transform duration-300">
                                <img src={activeBook.img} alt={activeBook.title} className="w-full h-full object-cover" />
                            </div>
                            <div className="flex-1">
                                <h3 className="font-editorial font-bold text-2xl mb-1 group-hover:text-neo-warm-terracotta transition-colors">{activeBook.title}</h3>
                                <p className="text-xs font-bold uppercase text-gray-500 mb-3">Book 4 of 7</p>
                                
                                <div className="space-y-1">
                                    <div className="flex justify-between text-[10px] font-bold uppercase">
                                        <span>Progress</span>
                                        <span>42%</span>
                                    </div>
                                    <div className="w-full h-3 border-2 border-black rounded-full overflow-hidden bg-white">
                                        <div className="h-full bg-neo-warm-mustard w-[42%] striped-bg"></div>
                                    </div>
                                </div>
                            </div>
                            <div className="hidden sm:flex items-center justify-center w-10 h-10 border-2 border-black rounded-full bg-neo-bg-light group-hover:bg-neo-warm-mustard transition-colors">
                                <ArrowRight size={20} />
                            </div>
                        </div>
                    </div>
                )}
                
                <div className="flex items-center gap-4 my-2">
                    <div className="h-1 flex-1 bg-black/10 dark:bg-white/10 rounded-full"></div>
                    <span className="text-xs font-bold uppercase text-gray-500">All Books</span>
                    <div className="h-1 flex-1 bg-black/10 dark:bg-white/10 rounded-full"></div>
                </div>

                <div className="grid grid-cols-1 gap-4">
                   {hpBooks.map((book, i) => (
                      <div 
                         key={book.title} 
                         className="flex items-center gap-4 p-3 border-b-2 border-gray-100 dark:border-gray-800 last:border-0 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors cursor-pointer group"
                         onClick={() => setSelectedBook(book)}
                      >
                         <span className={`font-editorial font-bold text-2xl w-8 ${book.status === 'reading' ? 'text-neo-warm-mustard' : 'text-gray-300'}`}>0{i+1}</span>
                         <img src={book.img} className="w-12 h-16 object-cover border border-black shadow-sm" />
                         <div className="flex-1">
                            <h5 className="font-bold group-hover:text-neo-warm-terracotta transition-colors">{book.title}</h5>
                            <p className="text-xs text-gray-600 dark:text-gray-400 mt-1 line-clamp-1 leading-snug">{book.description}</p>
                            <div className="mt-1">
                                <span className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded-full border border-black ${
                                    book.status === 'read' ? 'bg-green-400' : 
                                    book.status === 'reading' ? 'bg-yellow-400' : 'bg-gray-200'
                                }`}>
                                {book.status}
                                </span>
                            </div>
                         </div>
                         <div className="p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                            <ArrowRight size={16} />
                         </div>
                      </div>
                   ))}
                </div>
             </div>
        </NeoModal>

        {/* Individual Book Detail Modal */}
        <NeoModal
          isOpen={!!selectedBook}
          onClose={() => setSelectedBook(null)}
          title={selectedBook?.title || ''}
        >
          {selectedBook && (
            <div className="space-y-6">
               <div className="flex flex-col sm:flex-row gap-6">
                  <div className="w-full sm:w-1/3 shrink-0">
                      <div className="aspect-[2/3] border-4 border-black shadow-neo overflow-hidden bg-neo-black relative">
                          <img src={selectedBook.img} alt={selectedBook.title} className="w-full h-full object-cover" />
                          <div className={`absolute top-2 right-2 text-xs font-bold px-2 py-1 border border-black uppercase ${
                                    selectedBook.status === 'read' ? 'bg-green-400' : 
                                    selectedBook.status === 'reading' ? 'bg-yellow-400' : 'bg-gray-200'
                                }`}>
                                {selectedBook.status}
                          </div>
                      </div>
                  </div>
                  <div className="space-y-4">
                     <p className="font-grotesk text-lg leading-relaxed dark:text-gray-300">
                        {selectedBook.description}
                     </p>
                     
                     <div className="bg-neo-bg-light dark:bg-neo-dark-bg p-4 border-l-4 border-neo-warm-terracotta relative">
                        <Quote className="absolute top-2 right-2 text-black/10 dark:text-white/10" size={40} />
                        <h5 className="font-bold text-sm uppercase text-neo-warm-terracotta mb-1 flex items-center gap-2">
                           <MessageCircle size={14} /> My Take
                        </h5>
                        <p className="font-editorial italic font-medium text-black dark:text-white text-lg">
                           "{selectedBook.myComment}"
                        </p>
                     </div>

                     <a 
                       href={selectedBook.url} 
                       target="_blank" 
                       rel="noopener noreferrer"
                       className="inline-flex items-center gap-2 bg-black text-white px-6 py-3 border-4 border-transparent hover:border-black hover:bg-white hover:text-black transition-all shadow-neo hover:shadow-none font-bold w-full sm:w-auto justify-center"
                     >
                       View on Goodreads <ExternalLink size={16} />
                     </a>
                  </div>
               </div>
            </div>
          )}
        </NeoModal>

        {/* Individual Game Detail Modal */}
        <NeoModal
          isOpen={!!selectedGame}
          onClose={() => setSelectedGame(null)}
          title={selectedGame?.name || ''}
        >
          {selectedGame && (
            <div className="space-y-6">
               <div className="flex flex-col gap-6">
                  <div className="w-full aspect-video border-4 border-black shadow-neo overflow-hidden bg-neo-black">
                      <img src={selectedGame.img} alt={selectedGame.name} className="w-full h-full object-cover" />
                  </div>
                  
                  <div className="space-y-4">
                     <p className="font-grotesk text-lg leading-relaxed dark:text-gray-300">
                        {selectedGame.description}
                     </p>
                     
                     <div className="bg-neo-bg-light dark:bg-neo-dark-bg p-4 border-l-4 border-neo-warm-sage relative">
                        <Quote className="absolute top-2 right-2 text-black/10 dark:text-white/10" size={40} />
                        <h5 className="font-bold text-sm uppercase text-neo-warm-sage mb-1 flex items-center gap-2">
                           <MessageCircle size={14} /> Dev Note
                        </h5>
                        <p className="font-editorial italic font-medium text-black dark:text-white text-lg">
                           "{selectedGame.myComment}"
                        </p>
                     </div>

                     <a 
                       href={selectedGame.url} 
                       target="_blank" 
                       rel="noopener noreferrer"
                       className="inline-flex items-center gap-2 bg-neo-warm-mustard text-black px-6 py-3 border-4 border-black hover:bg-neo-white transition-all shadow-neo hover:shadow-none font-bold w-full justify-center"
                     >
                       <Play size={16} fill="black" /> Play / View Store
                     </a>
                  </div>
               </div>
            </div>
          )}
        </NeoModal>
      </section>
    </>
  );
};

export default Favorites;