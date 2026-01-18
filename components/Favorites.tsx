import React from 'react';
import { Book, Gamepad, Music, ExternalLink, Play, Library, Tv, Info, Disc } from 'lucide-react';

const Favorites: React.FC = () => {
  const books = [
    { 
      title: "HP & The Philosopher's Stone", 
      url: "https://www.goodreads.com/book/show/72193.Harry_Potter_and_the_Philosopher_s_Stone", 
      img: "https://images-na.ssl-images-amazon.com/images/I/81YOuOGFCJL.jpg" 
    },
    { 
      title: "HP & The Chamber of Secrets", 
      url: "https://www.goodreads.com/book/show/779610.Harry_Potter_and_the_Chamber_of_Secrets", 
      img: "https://images-na.ssl-images-amazon.com/images/I/81S0LnPGGUL.jpg" 
    },
    { 
      title: "HP & The Prisoner of Azkaban", 
      url: "https://www.goodreads.com/book/show/5.Harry_Potter_and_the_Prisoner_of_Azkaban", 
      img: "https://images-na.ssl-images-amazon.com/images/I/81f7bXC-tTL.jpg" 
    },
    { 
      title: "HP & The Goblet of Fire", 
      url: "https://www.goodreads.com/book/show/6.Harry_Potter_and_the_Goblet_of_Fire", 
      img: "https://images-na.ssl-images-amazon.com/images/I/810jKiNChxL.jpg" 
    },
    { 
      title: "What If?", 
      url: "https://www.goodreads.com/book/show/21413662-what-if", 
      img: "https://images-na.ssl-images-amazon.com/images/I/71PWDl-8aLL.jpg" 
    }
  ];

  const games = [
    { 
      name: "Hollow Knight", 
      img: "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/367520/library_600x900.jpg", 
      url: "https://store.steampowered.com/app/367520/Hollow_Knight/" 
    },
    { 
      name: "Silksong", 
      img: "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/1030300/library_600x900.jpg", 
      url: "https://store.steampowered.com/app/1030300/Hollow_Knight_Silksong/" 
    },
    { 
      name: "Minecraft", 
      img: "https://store-images.s-microsoft.com/image/apps.60323.13850085746326678.9b177d9c-8a22-4824-a744-84d411804c0d.85a97475-438e-4a8b-9005-4f4d23259021", 
      url: "https://www.minecraft.net/" 
    },
    { 
      name: "Portal", 
      img: "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/400/library_600x900.jpg", 
      url: "https://store.steampowered.com/app/400/Portal/" 
    },
    { 
      name: "Portal 2", 
      img: "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/620/library_600x900.jpg", 
      url: "https://store.steampowered.com/app/620/Portal_2/" 
    }
  ];

  const playlists = [
    { name: "Hummo", url: "https://music.youtube.com/playlist?list=PLYclxc99mpV64awQ3PLFg9ugq9yZr_PgG&si=4g0pTGB-o9xrOWKR" },
    { name: "Hummo Lofi", url: "https://music.youtube.com/playlist?list=PLYclxc99mpV6y5xuhybQXnvZndZWVsaLW&si=o_gZ0s8iR8oTZZzu" }
  ];

  return (
    <section id="favorites" className="py-16 md:py-24 px-4 bg-neo-bg-light dark:bg-neo-dark-bg border-t-4 border-black dark:border-neo-dark-border overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="mb-12 md:mb-16 inline-block bg-neo-warm-coral dark:bg-neo-dark-surface border-4 border-black dark:border-neo-warm-coral p-4 shadow-neo -rotate-1">
          <h2 className="font-editorial text-3xl md:text-5xl font-bold text-black dark:text-neo-warm-coral uppercase tracking-tighter">
            THE_COLLECTION_v5.4
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* Books Shelf */}
          <div className="lg:col-span-7 space-y-6">
            <div className="bg-neo-warm-mustard border-4 border-black p-4 shadow-neo flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Book size={28} className="text-black" />
                <h3 className="font-editorial text-2xl font-bold text-black uppercase tracking-tighter">Readables</h3>
              </div>
              <Library size={24} className="text-black opacity-30" />
            </div>
            
            <div className="relative pt-6 px-4 bg-white/40 dark:bg-black/20 border-x-4 border-t-4 border-black/10 dark:border-white/5">
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 justify-items-center">
                {books.map((book) => (
                  <a 
                    key={book.title} 
                    href={book.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="block group relative transition-all hover:-translate-y-4 w-full max-w-[110px] cursor-pointer"
                    title={book.title}
                  >
                    <div className="aspect-[2/3] bg-neo-black border-4 border-black shadow-neo-sm overflow-hidden relative group-hover:shadow-neo transition-all group-hover:rotate-1">
                      <img 
                        src={book.img} 
                        alt={book.title}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-neo-warm-coral/90 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity p-2 text-center">
                        <ExternalLink size={20} className="text-black" />
                      </div>
                    </div>
                    {/* Visual shelf shadow */}
                    <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-[85%] h-1 bg-black/20 blur-sm"></div>
                  </a>
                ))}
              </div>
              {/* Physical Shelf */}
              <div className="mt-4 h-6 w-full bg-neo-warm-terracotta border-4 border-black shadow-neo-sm relative z-10 flex items-center justify-center">
                <div className="w-full h-1 bg-black/10"></div>
              </div>
            </div>
          </div>

          {/* Gaming Hub */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-neo-warm-sage border-4 border-black p-4 shadow-neo flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Gamepad size={28} className="text-black" />
                <h3 className="font-editorial text-2xl font-bold text-black uppercase tracking-tighter">Playables</h3>
              </div>
              <Tv size={24} className="text-black opacity-30" />
            </div>

            <div className="grid grid-cols-3 sm:grid-cols-5 lg:grid-cols-3 gap-3">
              {games.map((game) => (
                <div key={game.name} className="group relative">
                  <div className="aspect-[3/4] bg-neo-black border-4 border-black shadow-neo-sm overflow-hidden hover:shadow-neo hover:-translate-y-1 transition-all relative">
                    <img 
                      src={game.img} 
                      alt={game.name} 
                      className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-300"
                      loading="lazy"
                    />
                    
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-all">
                      <a href={game.url} target="_blank" className="p-2 bg-white border-2 border-black shadow-neo-sm hover:scale-110">
                        <Play size={14} fill="black" />
                      </a>
                    </div>

                    <div className="absolute bottom-0 left-0 right-0 p-1 bg-white/95 border-t-2 border-black translate-y-full group-hover:translate-y-0 transition-transform">
                       <span className="block text-[7px] font-black uppercase text-black leading-none truncate text-center">{game.name}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="p-4 bg-white dark:bg-neo-dark-surface border-4 border-black border-dashed flex items-start gap-3">
              <Info size={16} className="text-neo-warm-coral shrink-0 mt-0.5" />
              <p className="font-ui text-[10px] leading-tight dark:text-gray-400">
                GDD analysis is my weekend hobby. Seeing how <strong>Team Cherry</strong> handles environmental storytelling is a masterclass.
              </p>
            </div>
          </div>

          {/* Playlists Footer */}
          <div className="lg:col-span-12 mt-8">
            <div className="bg-neo-warm-coral dark:bg-neo-dark-surface border-4 border-black dark:border-neo-warm-coral p-6 shadow-neo relative overflow-hidden group">
                {/* Decorative Pattern */}
                <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '10px 10px' }}></div>
                
                <div className="flex flex-col md:flex-row items-center gap-8 relative z-10">
                  {/* Spinning Vinyl Graphic */}
                  <div className="relative group-hover:scale-105 transition-transform duration-500">
                     <div className="w-24 h-24 shrink-0 bg-black rounded-full border-4 border-black flex items-center justify-center animate-[spin_4s_linear_infinite] shadow-neo-sm">
                        <div className="w-8 h-8 bg-neo-warm-mustard rounded-full border-2 border-white relative z-10"></div>
                        <div className="absolute w-20 h-20 rounded-full border border-white/20"></div>
                        <div className="absolute w-14 h-14 rounded-full border border-white/20"></div>
                     </div>
                     <Disc size={24} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white/50 z-20" />
                  </div>
                  
                  <div className="flex-1 text-center md:text-left">
                    <div className="flex items-center justify-center md:justify-start gap-3 mb-2">
                        <Music size={28} className="text-black dark:text-neo-warm-coral" />
                        <h3 className="font-editorial text-3xl font-bold text-black dark:text-neo-warm-coral uppercase tracking-tighter">Audio Waves</h3>
                    </div>
                    <p className="font-ui font-bold text-sm mb-4 dark:text-gray-300">Curated vibes for coding, gaming, and chaos.</p>
                    
                    <div className="flex flex-wrap justify-center md:justify-start gap-4">
                        {playlists.map((pl) => (
                          <a 
                            key={pl.name} 
                            href={pl.url} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="group/btn"
                          >
                            <div className="bg-black text-white dark:bg-white dark:text-black border-4 border-black p-3 shadow-neo-sm group-hover/btn:shadow-neo group-hover/btn:-translate-y-1 group-hover/btn:bg-white group-hover/btn:text-black dark:group-hover/btn:bg-neo-warm-mustard transition-all flex items-center gap-2">
                              <span className="font-grotesk font-bold text-xs uppercase tracking-tighter">{pl.name}</span>
                              <Play size={12} fill="currentColor" />
                            </div>
                          </a>
                        ))}
                    </div>
                  </div>

                  {/* Equalizer Visual */}
                  <div className="hidden md:flex gap-1.5 h-12 items-end opacity-60">
                      <div className="w-3 bg-black dark:bg-neo-warm-coral animate-[bounce_1s_infinite] h-[60%]"></div>
                      <div className="w-3 bg-black dark:bg-neo-warm-coral animate-[bounce_1.2s_infinite] h-[90%]"></div>
                      <div className="w-3 bg-black dark:bg-neo-warm-coral animate-[bounce_0.8s_infinite] h-[40%]"></div>
                      <div className="w-3 bg-black dark:bg-neo-warm-coral animate-[bounce_1.1s_infinite] h-[70%]"></div>
                      <div className="w-3 bg-black dark:bg-neo-warm-coral animate-[bounce_0.9s_infinite] h-[50%]"></div>
                  </div>
                </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Favorites;