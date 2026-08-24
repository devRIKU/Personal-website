import React, { useEffect, useState } from 'react';
import { 
  Book, 
  Gamepad, 
  Music, 
  ExternalLink, 
  Play, 
  Tv, 
  Info, 
  Disc, 
  ArrowRight, 
  Check, 
  Film, 
  Sparkles, 
  Scroll, 
  MessageCircle, 
  Quote,
  Flame,
  Radio,
  Layers
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import NeoModal from './NeoModal';
import TactileCard from './tactile/TactileCard';
import HardwareHeader from './tactile/HardwareHeader';
import StatusLED from './tactile/StatusLED';
import HardwareBadge from './tactile/HardwareBadge';
import BeveledButton from './tactile/BeveledButton';

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

type TabType = 'all' | 'books' | 'games' | 'music';

const Favorites: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabType>('all');
  const [isBookPanelOpen, setIsBookPanelOpen] = useState(false);
  
  // State for individual item modals
  const [selectedBook, setSelectedBook] = useState<BookData | null>(null);
  const [selectedGame, setSelectedGame] = useState<GameData | null>(null);

  // Manage body scroll for modals
  useEffect(() => {
    if (isBookPanelOpen || selectedBook || selectedGame) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [isBookPanelOpen, selectedBook, selectedGame]);

  const harryPotterBooks: BookData[] = [
    { 
      title: "Philosopher's Stone", 
      url: "https://www.goodreads.com/book/show/72193.Harry_Potter_and_the_Philosopher_s_Stone", 
      img: "https://covers.openlibrary.org/b/isbn/9781408855652-L.jpg",
      status: 'read',
      description: "Harry discovers he is a wizard and begins his first year at Hogwarts School of Witchcraft and Wizardry.",
      themeColor: "bg-neo-accent",
      myComment: "The OG. Still waiting for my acceptance letter. Any day now..."
    },
    { 
      title: "Chamber of Secrets", 
      url: "https://www.goodreads.com/book/show/779610.Harry_Potter_and_the_Chamber_of_Secrets", 
      img: "https://covers.openlibrary.org/b/isbn/9781408855669-L.jpg",
      status: 'read',
      description: "Students are found petrified as a dark force reopens the Chamber of Secrets, unleashing a monster.",
      themeColor: "bg-neo-highlight",
      myComment: "Giant snakes and flying cars. Basically my average Tuesday debugging session."
    },
    { 
      title: "Prisoner of Azkaban", 
      url: "https://www.goodreads.com/book/show/5.Harry_Potter_and_the_Prisoner_of_Azkaban", 
      img: "https://covers.openlibrary.org/b/isbn/9781408855676-L.jpg",
      status: 'read',
      description: "Escaped prisoner Sirius Black is rumored to be hunting Harry, while Dementors guard the school grounds.",
      themeColor: "bg-neo-support",
      myComment: "Time travel logic usually hurts my brain, but this was a masterpiece."
    },
    { 
      title: "Goblet of Fire", 
      url: "https://www.goodreads.com/book/show/6.Harry_Potter_and_the_Goblet_of_Fire", 
      img: "https://covers.openlibrary.org/b/isbn/9781408855683-L.jpg",
      status: 'read',
      description: "Harry is mysteriously entered into the dangerous Triwizard Tournament, facing dragons and dark wizards.",
      themeColor: "bg-neo-accent",
      myComment: "Triwizard Tournament? More like 'Try Not To Die' Tournament. Cedric deserved better."
    },
    { 
      title: "Order of the Phoenix", 
      url: "https://www.goodreads.com/book/show/2.Harry_Potter_and_the_Order_of_the_Phoenix", 
      img: "https://covers.openlibrary.org/b/isbn/9781408855690-L.jpg",
      status: 'reading',
      description: "Harry faces the return of Voldemort and a Ministry in denial, forming Dumbledore's Army to fight back.",
      themeColor: "bg-neo-highlight",
      myComment: "Umbridge is the ultimate bug in the system. Needs immediate deletion."
    },
    { 
      title: "Half-Blood Prince", 
      url: "https://www.goodreads.com/book/show/1.Harry_Potter_and_the_Half_Blood_Prince", 
      img: "https://covers.openlibrary.org/b/isbn/9781408855706-L.jpg",
      status: 'unread',
      description: "Harry learns about Voldemort's past and the Horcruxes needed to defeat him, amidst romance and tragedy.",
      themeColor: "bg-neo-secondary",
      myComment: "Snape's textbook is basically the original Stack Overflow. Cheating or genius?"
    },
    { 
      title: "Deathly Hallows", 
      url: "https://www.goodreads.com/book/show/136251.Harry_Potter_and_the_Deathly_Hallows", 
      img: "https://covers.openlibrary.org/b/isbn/9781408855713-L.jpg",
      status: 'unread',
      description: "The final battle for Hogwarts and the wizarding world as Harry, Ron, and Hermione hunt the remaining Horcruxes.",
      themeColor: "bg-neo-surface-muted",
      myComment: "The final commit. Pushing to production. No rollbacks allowed."
    }
  ];

  const otherBooks: BookData[] = [
    {
      title: "What If?",
      url: "https://www.goodreads.com/book/show/21413662-what-if",
      img: "https://covers.openlibrary.org/b/isbn/9780544272996-L.jpg",
      status: 'read',
      description: "Serious Scientific Answers to Absurd Hypothetical Questions by Randall Munroe.",
      themeColor: "bg-neo-accent",
      myComment: "Finally, someone answered what happens if you throw a baseball at light speed. Spoiler: It doesn't end well."
    }
  ];

  const books = [...harryPotterBooks, ...otherBooks];

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
      img: "https://images.unsplash.com/photo-1627856013091-fed6e4e30025?w=800&auto=format&fit=crop&q=80", 
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
    { name: "Hummo Main", desc: "Flow state & heavy coding jams", url: "https://music.youtube.com/playlist?list=PLYclxc99mpV64awQ3PLFg9ugq9yZr_PgG&si=4g0pTGB-o9xrOWKR", tracks: "45+ Tracks" },
    { name: "Hummo Lofi Beats", desc: "Chill lofi beats for late nights", url: "https://music.youtube.com/playlist?list=PLYclxc99mpV6y5xuhybQXnvZndZWVsaLW&si=o_gZ0s8iR8oTZZzu", tracks: "60+ Tracks" }
  ];

  const activeBook = books.find(b => b.status === 'reading');
  const shelfBooks = [books[3], books[0], books[1], books[7]];

  const tabOptions = [
    { id: 'all' as TabType, label: 'COMPACT HUB', icon: <Layers size={14} />, badge: 'ALL' },
    { id: 'books' as TabType, label: 'BOOKS', icon: <Book size={14} />, badge: `${books.length}` },
    { id: 'games' as TabType, label: 'GAMES', icon: <Gamepad size={14} />, badge: `${games.length}` },
    { id: 'music' as TabType, label: 'PLAYLISTS', icon: <Music size={14} />, badge: '2' },
  ];

  return (
    <>
      <section id="favorites" className="py-14 md:py-20 px-4 bg-transparent border-t-4 border-black dark:border-neo-dark-border overflow-hidden transition-colors duration-300">
        <div className="max-w-6xl mx-auto space-y-6">
          
          {/* Section Header with Tactile Spring Mode Switcher */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ type: "spring", stiffness: 350, damping: 25 }}
            className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4 border-b-2 border-black/10 dark:border-white/10 pb-4"
          >
            <div className="flex items-center gap-2.5 sm:gap-3">
              <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-black uppercase tracking-tight text-neutral-900 dark:text-white truncate">
                MEDIA & RECREATION
              </h2>
            </div>

            {/* Skeuomorphic Spring Tab Controller with horizontal touch scroll */}
            <div className="tactile-well p-1 rounded-[10px] flex items-center gap-1 overflow-x-auto no-scrollbar max-w-full overscroll-contain">
              {tabOptions.map(tab => {
                const isActive = activeTab === tab.id;
                return (
                  <motion.button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ type: "spring", stiffness: 450, damping: 25 }}
                    className={`relative px-2.5 sm:px-3 py-1.5 rounded-[7px] font-mono text-xs font-bold uppercase transition-colors flex items-center gap-1.5 select-none shrink-0 touch-manipulation ${
                      isActive 
                        ? 'text-neutral-950 dark:text-neutral-950 font-black' 
                        : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white'
                    }`}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="activeTabIndicator"
                        className="absolute inset-0 bg-gradient-to-b from-amber-300 via-amber-400 to-amber-500 rounded-[7px] shadow-sm border border-amber-600/40"
                        transition={{ type: "spring", stiffness: 500, damping: 30 }}
                      />
                    )}
                    <span className="relative z-10 flex items-center gap-1.5 whitespace-nowrap">
                      {tab.icon}
                      <span>{tab.label}</span>
                      <span className={`text-[9px] px-1 py-0.2 rounded font-mono ${
                        isActive ? 'bg-black/15 text-black' : 'bg-black/10 dark:bg-white/10 text-neutral-500'
                      }`}>
                        {tab.badge}
                      </span>
                    </span>
                  </motion.button>
                );
              })}
            </div>
          </motion.div>

          {/* Unified Compact Main Card with Spring Transitions */}
          <AnimatePresence mode="wait">
            {activeTab === 'all' && (
              <motion.div
                key="all"
                initial={{ opacity: 0, y: 15, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -15, scale: 0.98 }}
                transition={{ type: "spring", stiffness: 350, damping: 26 }}
                className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-5"
              >
                {/* Compact Books Module */}
                <div className="lg:col-span-4 flex">
                  <TactileCard
                    variant="panel"
                    header={
                      <HardwareHeader 
                        title="BOOKS" 
                        statusColor="amber"
                        badge={`${books.filter(b => b.status === 'read').length}/${books.length} READ`}
                      />
                    }
                    className="w-full flex flex-col justify-between p-3.5 sm:p-4 space-y-3.5 sm:space-y-4"
                  >
                    <div className="space-y-3">
                      {/* Compact Shelf Display */}
                      <div className="tactile-well p-2.5 sm:p-3 rounded-[8px]">
                        <div className="grid grid-cols-4 gap-2 justify-items-center items-end">
                          {shelfBooks.map((book, idx) => (
                            <motion.div
                              key={book.title}
                              onClick={() => setSelectedBook(book)}
                              whileHover={{ y: -6, scale: 1.06 }}
                              whileTap={{ scale: 0.94 }}
                              transition={{ type: "spring", stiffness: 400, damping: 18 }}
                              className="cursor-pointer group relative w-full aspect-[2/3] tactile-well rounded-[5px] overflow-hidden p-0.5"
                              title={book.title}
                            >
                              <img 
                                src={book.img} 
                                alt={book.title}
                                onError={(e) => {
                                  e.currentTarget.src = "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=600&auto=format&fit=crop&q=80";
                                }}
                                className="w-full h-full object-cover rounded-[3px]"
                                loading="lazy"
                                referrerPolicy="no-referrer"
                              />
                              <div className={`absolute top-1 right-1 rounded-full p-0.5 shadow-sm ${
                                book.status === 'reading' ? 'bg-amber-400 text-black' : 'bg-green-500 text-white'
                              }`}>
                                {book.status === 'reading' ? (
                                  <Sparkles size={8} className="stroke-[3]" />
                                ) : (
                                  <Check size={8} className="stroke-[3]" />
                                )}
                              </div>
                            </motion.div>
                          ))}
                        </div>
                      </div>

                      {/* Active Reading Callout */}
                      {activeBook && (
                        <motion.div 
                          onClick={() => setSelectedBook(activeBook)}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          transition={{ type: "spring", stiffness: 400, damping: 20 }}
                          className="tactile-panel p-2.5 rounded-[8px] flex items-center gap-2.5 sm:gap-3 cursor-pointer group"
                        >
                          <img 
                            src={activeBook.img} 
                            alt={activeBook.title} 
                            onError={(e) => {
                              e.currentTarget.src = "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=600&auto=format&fit=crop&q=80";
                            }}
                            className="w-8 sm:w-9 h-11 sm:h-12 object-cover rounded-[4px] border border-black/15 shrink-0" 
                            referrerPolicy="no-referrer" 
                          />
                          <div className="min-w-0 flex-1">
                            <span className="font-mono text-[9px] font-bold uppercase text-amber-600 dark:text-amber-400 flex items-center gap-1">
                              <Sparkles size={10} /> CURRENT READ
                            </span>
                            <h4 className="font-display font-bold text-xs truncate text-neutral-900 dark:text-white group-hover:text-amber-500 transition-colors">
                              {activeBook.title}
                            </h4>
                          </div>
                          <ArrowRight size={14} className="text-neutral-400 group-hover:text-neutral-800 dark:group-hover:text-white transition-colors shrink-0" />
                        </motion.div>
                      )}
                    </div>

                    <BeveledButton
                      onClick={() => setIsBookPanelOpen(true)}
                      variant="accent"
                      size="sm"
                      className="w-full justify-between"
                      icon={<ArrowRight size={13} />}
                      iconPosition="right"
                    >
                      Open Reading Catalog ({books.length})
                    </BeveledButton>
                  </TactileCard>
                </div>

                {/* Compact Games Module */}
                <div className="lg:col-span-4 flex">
                  <TactileCard
                    variant="panel"
                    header={
                      <HardwareHeader 
                        title="GAMES" 
                        statusColor="coral"
                        badge="STEAM"
                      />
                    }
                    className="w-full flex flex-col justify-between p-3.5 sm:p-4 space-y-3.5 sm:space-y-4"
                  >
                    <div className="space-y-3">
                      {/* Compact Games Mini-Grid */}
                      <div className="grid grid-cols-3 gap-1.5 sm:gap-2">
                        {games.slice(0, 3).map(game => (
                          <motion.div
                            key={game.name}
                            onClick={() => setSelectedGame(game)}
                            whileHover={{ y: -5, scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            transition={{ type: "spring", stiffness: 400, damping: 18 }}
                            className="cursor-pointer group relative aspect-[3/4] tactile-well rounded-[6px] overflow-hidden p-0.5"
                            title={game.name}
                          >
                            <img 
                              src={game.img} 
                              alt={game.name} 
                              className="w-full h-full object-cover rounded-[4px]"
                              loading="lazy"
                              referrerPolicy="no-referrer"
                            />
                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center rounded-[4px]">
                              <Info size={12} className="text-white" />
                            </div>
                            <div className="absolute bottom-0 left-0 right-0 p-0.5 bg-black/80 backdrop-blur-xs font-mono text-[8px] font-bold uppercase text-center text-white truncate rounded-b-[4px]">
                              {game.name}
                            </div>
                          </motion.div>
                        ))}
                      </div>

                      {/* Wishlist compact item */}
                      <div className="tactile-well p-2 rounded-[8px] flex items-center justify-between gap-2">
                        <div className="flex items-center gap-2 min-w-0">
                          <img src={wishlistGames[0].img} className="w-7 h-9 object-cover rounded-[3px] border border-black/10 shrink-0" referrerPolicy="no-referrer" />
                          <div className="min-w-0">
                            <span className="text-[8px] font-mono uppercase text-neutral-500 block">Wishlist</span>
                            <span className="font-display font-bold text-xs truncate block text-neutral-900 dark:text-white">{wishlistGames[0].name}</span>
                          </div>
                        </div>
                        <HardwareBadge label="STEAM" size="sm" variant="neutral" />
                      </div>
                    </div>

                    <BeveledButton
                      onClick={() => setActiveTab('games')}
                      variant="highlight"
                      size="sm"
                      className="w-full justify-between"
                      icon={<ArrowRight size={13} />}
                      iconPosition="right"
                    >
                      View All Games ({games.length})
                    </BeveledButton>
                  </TactileCard>
                </div>

                {/* Compact Soundtracks Module */}
                <div className="lg:col-span-4 flex">
                  <TactileCard
                    variant="panel"
                    header={
                      <HardwareHeader 
                        title="PLAYLISTS" 
                        statusColor="green"
                        badge="YT MUSIC"
                      />
                    }
                    className="w-full flex flex-col justify-between p-3.5 sm:p-4 space-y-3.5 sm:space-y-4"
                  >
                    <div className="space-y-2">
                      {playlists.map((pl, idx) => (
                        <motion.a
                          key={pl.name}
                          href={pl.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          whileHover={{ y: -3, scale: 1.02 }}
                          whileTap={{ scale: 0.97 }}
                          transition={{ type: "spring", stiffness: 450, damping: 20 }}
                          className="tactile-well p-2 sm:p-2.5 rounded-[8px] flex items-center justify-between group cursor-pointer block"
                        >
                          <div className="flex items-center gap-2 sm:gap-2.5 min-w-0">
                            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full tactile-panel flex items-center justify-center shrink-0">
                              <Disc size={16} className={`text-neo-highlight transition-transform group-hover:rotate-180 duration-500`} />
                            </div>
                            <div className="min-w-0">
                              <h4 className="font-display font-bold text-xs text-neutral-900 dark:text-white truncate group-hover:text-sky-600 dark:group-hover:text-sky-400 transition-colors">
                                {pl.name}
                              </h4>
                              <span className="font-grotesk text-[10px] text-neutral-500 dark:text-neutral-400 block truncate">
                                {pl.desc}
                              </span>
                            </div>
                          </div>
                          <ExternalLink size={13} className="text-neutral-400 group-hover:text-neutral-900 dark:group-hover:text-white shrink-0 ml-1" />
                        </motion.a>
                      ))}
                    </div>

                    <BeveledButton
                      asAnchor
                      href={playlists[0].url}
                      target="_blank"
                      rel="noopener noreferrer"
                      variant="sky"
                      size="sm"
                      className="w-full justify-between"
                      icon={<Music size={13} />}
                      iconPosition="right"
                    >
                      Stream Main Mix
                    </BeveledButton>
                  </TactileCard>
                </div>
              </motion.div>
            )}

            {/* Drilldown: Books View */}
            {activeTab === 'books' && (
              <motion.div
                key="books-view"
                initial={{ opacity: 0, y: 15, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -15, scale: 0.98 }}
                transition={{ type: "spring", stiffness: 350, damping: 26 }}
              >
                <TactileCard
                  variant="panel"
                  header={
                    <HardwareHeader 
                      title="BOOKSHELF & READING LOG" 
                      statusColor="amber"
                      badge={`${books.length} VOLUMES`}
                    />
                  }
                  className="p-3.5 sm:p-5 space-y-4 sm:space-y-5"
                >
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 border-b border-black/10 dark:border-white/10 pb-2">
                    <span className="font-mono text-[11px] sm:text-xs font-bold text-neutral-700 dark:text-neutral-300">
                      Harry Potter Series & Scientific Absurdities
                    </span>
                    <BeveledButton onClick={() => setIsBookPanelOpen(true)} variant="accent" size="sm" className="w-full sm:w-auto">
                      Open Full Catalog List
                    </BeveledButton>
                  </div>

                  {/* Visual Bookshelf with responsive grid */}
                  <div className="tactile-well p-3 sm:p-4 rounded-[10px]">
                    <div className="grid grid-cols-3 xs:grid-cols-4 sm:grid-cols-4 md:grid-cols-8 gap-2 sm:gap-3 justify-items-center items-end">
                      {books.map((book, idx) => (
                        <motion.div
                          key={book.title}
                          onClick={() => setSelectedBook(book)}
                          whileHover={{ y: -8, scale: 1.08 }}
                          whileTap={{ scale: 0.92 }}
                          transition={{ type: "spring", stiffness: 450, damping: 17 }}
                          className="cursor-pointer group relative w-full aspect-[2/3] tactile-well rounded-[6px] overflow-hidden p-0.5"
                          title={book.title}
                        >
                          <img 
                            src={book.img} 
                            alt={book.title}
                            onError={(e) => {
                              e.currentTarget.src = "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=600&auto=format&fit=crop&q=80";
                            }}
                            className="w-full h-full object-cover rounded-[4px]"
                            loading="lazy"
                            referrerPolicy="no-referrer"
                          />
                          <div className={`absolute top-1 right-1 rounded-full p-0.5 shadow-sm ${
                            book.status === 'reading' ? 'bg-amber-400 text-black' : 'bg-green-500 text-white'
                          }`}>
                            {book.status === 'reading' ? (
                              <Sparkles size={8} className="stroke-[3]" />
                            ) : (
                              <Check size={8} className="stroke-[3]" />
                            )}
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </TactileCard>
              </motion.div>
            )}

            {/* Drilldown: Games View */}
            {activeTab === 'games' && (
              <motion.div
                key="games-view"
                initial={{ opacity: 0, y: 15, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -15, scale: 0.98 }}
                transition={{ type: "spring", stiffness: 350, damping: 26 }}
              >
                <TactileCard
                  variant="panel"
                  header={
                    <HardwareHeader 
                      title="GAMES & SYSTEM SANDBOXES" 
                      statusColor="coral"
                      badge="5 TITLES"
                    />
                  }
                  className="p-3.5 sm:p-5 space-y-4 sm:space-y-5"
                >
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2.5 sm:gap-3">
                    {games.map(game => (
                      <motion.div
                        key={game.name}
                        onClick={() => setSelectedGame(game)}
                        whileHover={{ y: -6, scale: 1.05 }}
                        whileTap={{ scale: 0.94 }}
                        transition={{ type: "spring", stiffness: 450, damping: 18 }}
                        className="cursor-pointer group relative aspect-[3/4] tactile-well rounded-[8px] overflow-hidden p-0.5"
                      >
                        <img 
                          src={game.img} 
                          alt={game.name} 
                          onError={(e) => {
                            e.currentTarget.src = "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=600&auto=format&fit=crop&q=80";
                          }}
                          className="w-full h-full object-cover rounded-[6px]"
                          loading="lazy"
                          referrerPolicy="no-referrer"
                        />
                        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center rounded-[6px]">
                          <div className="tactile-button p-2 text-neutral-900">
                            <Info size={14} />
                          </div>
                        </div>
                        <div className="absolute bottom-0 left-0 right-0 p-1 bg-black/85 backdrop-blur-xs font-mono text-[8px] sm:text-[9px] font-bold uppercase text-center text-white truncate rounded-b-[6px]">
                          {game.name}
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  {/* Wishlist */}
                  <div className="tactile-well p-3 rounded-[8px] flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2.5">
                    <div className="flex items-center gap-2.5 sm:gap-3">
                      <img 
                        src={wishlistGames[0].img} 
                        alt={wishlistGames[0].name}
                        onError={(e) => {
                          e.currentTarget.src = "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=600&auto=format&fit=crop&q=80";
                        }}
                        className="w-9 sm:w-10 h-12 sm:h-14 object-cover rounded-[4px] border border-black/15 shrink-0" 
                        referrerPolicy="no-referrer" 
                      />
                      <div>
                        <span className="font-mono text-[9px] uppercase text-neutral-500">Upcoming / Wishlist</span>
                        <h4 className="font-display font-bold text-xs sm:text-sm text-neutral-900 dark:text-white">{wishlistGames[0].name}</h4>
                      </div>
                    </div>
                    <BeveledButton asAnchor href={wishlistGames[0].url} target="_blank" rel="noopener noreferrer" variant="highlight" size="sm" className="w-full sm:w-auto">
                      Steam Page
                    </BeveledButton>
                  </div>
                </TactileCard>
              </motion.div>
            )}

            {/* Drilldown: Music View */}
            {activeTab === 'music' && (
              <motion.div
                key="music-view"
                initial={{ opacity: 0, y: 15, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -15, scale: 0.98 }}
                transition={{ type: "spring", stiffness: 350, damping: 26 }}
              >
                <TactileCard
                  variant="panel"
                  header={
                    <HardwareHeader 
                      title="CURATED SOUNDTRACKS & CODING FLOW" 
                      statusColor="green"
                      badge="YT MUSIC"
                    />
                  }
                  className="p-3.5 sm:p-6 space-y-4 sm:space-y-6"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
                    {playlists.map((pl, idx) => (
                      <motion.div
                        key={pl.name}
                        whileHover={{ y: -4, scale: 1.02 }}
                        whileTap={{ scale: 0.97 }}
                        transition={{ type: "spring", stiffness: 450, damping: 20 }}
                        className="tactile-well p-3 sm:p-4 rounded-[10px] flex items-center justify-between gap-2"
                      >
                        <div className="flex items-center gap-2.5 sm:gap-3.5 min-w-0">
                          <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full tactile-panel flex items-center justify-center shrink-0">
                            <Disc size={20} className="text-neo-highlight animate-spin-slow" />
                          </div>
                          <div className="min-w-0">
                            <h4 className="font-display font-bold text-sm sm:text-base text-neutral-900 dark:text-white truncate">
                              {pl.name}
                            </h4>
                            <p className="font-grotesk text-[11px] sm:text-xs text-neutral-600 dark:text-neutral-400 truncate">
                              {pl.desc}
                            </p>
                          </div>
                        </div>

                        <BeveledButton
                          asAnchor
                          href={pl.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          variant={idx === 0 ? "sky" : "support"}
                          size="sm"
                          icon={<Music size={13} />}
                          className="shrink-0"
                        >
                          Play
                        </BeveledButton>
                      </motion.div>
                    ))}
                  </div>
                </TactileCard>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Book Drawer / Modal (List) */}
        <NeoModal 
          isOpen={isBookPanelOpen} 
          onClose={() => setIsBookPanelOpen(false)} 
          title="READING CATALOG"
          badge="7 VOLUMES"
          statusColor="amber"
        >
          <div className="space-y-4 sm:space-y-5">
            <div className="flex items-center gap-2.5 sm:gap-3 tactile-panel p-3 sm:p-4 rounded-[10px]">
              <div className="p-2 rounded-full tactile-well shrink-0">
                <Scroll size={18} className="text-amber-500"/>
              </div>
              <div className="min-w-0">
                <h4 className="font-display font-bold text-sm sm:text-base text-neutral-900 dark:text-white truncate">Literary Archive</h4>
                <p className="text-[11px] sm:text-xs text-neutral-600 dark:text-neutral-300">Chronological collection of completed and active books.</p>
              </div>
            </div>

            {/* Currently Reading Section */}
            {activeBook && (
              <motion.div 
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setSelectedBook(activeBook)}
                className="cursor-pointer group relative tactile-well p-3 sm:p-4 rounded-[10px] transition-all"
              >
                <div className="flex gap-3 sm:gap-4 items-center">
                  <div className="w-12 sm:w-16 shrink-0 aspect-[2/3] rounded-[4px] overflow-hidden border border-black/20">
                    <img 
                      src={activeBook.img} 
                      alt={activeBook.title} 
                      onError={(e) => {
                        e.currentTarget.src = "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=600&auto=format&fit=crop&q=80";
                      }}
                      className="w-full h-full object-cover" 
                      referrerPolicy="no-referrer" 
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <span className="font-mono text-[10px] font-bold px-2 py-0.5 rounded-[4px] bg-amber-400 text-black inline-block">
                      CURRENT READ
                    </span>
                    <h3 className="font-display font-bold text-sm sm:text-lg text-neutral-900 dark:text-white group-hover:text-amber-600 transition-colors truncate mt-1">
                      {activeBook.title}
                    </h3>
                    
                    <div className="space-y-1 mt-1.5 sm:mt-2">
                      <div className="flex justify-between text-[9px] sm:text-[10px] font-mono font-bold uppercase text-neutral-700 dark:text-neutral-300">
                        <span>Progress</span>
                        <span>40%</span>
                      </div>
                      <div className="w-full h-1.5 sm:h-2 rounded-full tactile-well overflow-hidden p-0.5">
                        <div className="h-full bg-amber-400 rounded-full w-[40%]"></div>
                      </div>
                    </div>
                  </div>
                  <div className="hidden sm:flex items-center justify-center w-8 h-8 rounded-full tactile-panel text-neutral-700 dark:text-neutral-300 shrink-0">
                    <ArrowRight size={14} />
                  </div>
                </div>
              </motion.div>
            )}
            
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs font-mono text-neutral-600 dark:text-neutral-400 uppercase px-1">
                <span>Harry Potter Series</span>
                <span>Complete Set</span>
              </div>

              <div className="space-y-1.5 sm:space-y-2">
                {harryPotterBooks.map((book, i) => (
                  <motion.div 
                    key={book.title} 
                    whileHover={{ scale: 1.01, x: 2 }}
                    whileTap={{ scale: 0.99 }}
                    className="flex items-center gap-2 sm:gap-3 p-2 sm:p-2.5 rounded-[8px] tactile-panel cursor-pointer group"
                    onClick={() => setSelectedBook(book)}
                  >
                    <span className="font-mono font-bold text-[11px] sm:text-xs w-4 sm:w-6 text-neutral-500 dark:text-neutral-400 shrink-0">0{i+1}</span>
                    <img 
                      src={book.img} 
                      alt={book.title}
                      onError={(e) => {
                        e.currentTarget.src = "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=600&auto=format&fit=crop&q=80";
                      }}
                      className="w-8 sm:w-10 h-11 sm:h-14 object-cover rounded-[3px] border border-black/10 shrink-0" 
                      referrerPolicy="no-referrer" 
                    />
                    <div className="flex-1 min-w-0">
                      <h5 className="font-display font-bold text-xs sm:text-sm text-neutral-900 dark:text-white group-hover:text-amber-600 transition-colors truncate">{book.title}</h5>
                      <p className="text-[10px] sm:text-[11px] text-neutral-600 dark:text-neutral-300 truncate mt-0.5">{book.description}</p>
                    </div>
                    <span className={`font-mono text-[10px] font-bold px-2 py-0.5 rounded-[4px] uppercase ${
                      book.status === 'read' ? 'bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300' :
                      book.status === 'reading' ? 'bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300' :
                      'bg-neutral-200 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300'
                    }`}>
                      {book.status}
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </NeoModal>

        {/* Individual Book Detail Modal */}
        <NeoModal
          isOpen={!!selectedBook}
          onClose={() => setSelectedBook(null)}
          title={selectedBook?.title || 'BOOK DETAILS'}
          badge={selectedBook?.status.toUpperCase() || 'BOOK'}
          statusColor={selectedBook?.status === 'reading' ? 'amber' : 'green'}
        >
          {selectedBook && (
            <div className="space-y-4 sm:space-y-5">
              <div className="flex flex-col sm:flex-row gap-4 sm:gap-5 items-center sm:items-start">
                <div className="w-28 xs:w-32 sm:w-1/3 shrink-0 mx-auto sm:mx-0">
                  <div className="aspect-[2/3] rounded-[8px] tactile-well p-1 overflow-hidden relative">
                    <img 
                      src={selectedBook.img} 
                      alt={selectedBook.title} 
                      onError={(e) => {
                        e.currentTarget.src = "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=600&auto=format&fit=crop&q=80";
                      }}
                      className="w-full h-full object-cover rounded-[6px]" 
                      referrerPolicy="no-referrer" 
                    />
                  </div>
                </div>
                <div className="space-y-3.5 sm:space-y-4 flex-1 w-full">
                  <p className="font-grotesk text-sm sm:text-base leading-relaxed text-neutral-800 dark:text-neutral-200">
                    {selectedBook.description}
                  </p>
                  
                  <div className="tactile-well p-3 sm:p-3.5 rounded-[8px] relative">
                    <Quote className="absolute top-2 right-2 text-black/5 dark:text-white/5" size={28} />
                    <h5 className="font-mono font-bold text-[11px] sm:text-xs uppercase text-amber-600 dark:text-amber-400 mb-1 flex items-center gap-1.5">
                      <MessageCircle size={13} /> Reader's Note
                    </h5>
                    <p className="font-editorial italic font-medium text-neutral-900 dark:text-white text-sm sm:text-base">
                      "{selectedBook.myComment}"
                    </p>
                  </div>

                  <BeveledButton 
                    asAnchor
                    href={selectedBook.url} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    variant="sky"
                    className="w-full sm:w-auto"
                    icon={<ExternalLink size={14} />}
                  >
                    View on Goodreads
                  </BeveledButton>
                </div>
              </div>
            </div>
          )}
        </NeoModal>

        {/* Individual Game Detail Modal */}
        <NeoModal
          isOpen={!!selectedGame}
          onClose={() => setSelectedGame(null)}
          title={selectedGame?.name || 'GAME ARCHIVE'}
          badge="STEAM"
          statusColor="coral"
        >
          {selectedGame && (
            <div className="space-y-4 sm:space-y-5">
              <div className="flex flex-col gap-4 sm:gap-5">
                <div className="w-full aspect-video rounded-[8px] tactile-well p-1 overflow-hidden">
                  <img 
                    src={selectedGame.img} 
                    alt={selectedGame.name} 
                    onError={(e) => {
                      e.currentTarget.src = "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=600&auto=format&fit=crop&q=80";
                    }}
                    className="w-full h-full object-cover rounded-[6px]" 
                    referrerPolicy="no-referrer" 
                  />
                </div>
                
                <div className="space-y-3.5 sm:space-y-4">
                  <p className="font-grotesk text-sm sm:text-base leading-relaxed text-neutral-800 dark:text-neutral-200">
                    {selectedGame.description}
                  </p>
                  
                  <div className="tactile-well p-3 sm:p-3.5 rounded-[8px] relative">
                    <Quote className="absolute top-2 right-2 text-black/5 dark:text-white/5" size={28} />
                    <h5 className="font-mono font-bold text-[11px] sm:text-xs uppercase text-rose-600 dark:text-rose-400 mb-1 flex items-center gap-1.5">
                      <MessageCircle size={13} /> Architecture & Gameplay Note
                    </h5>
                    <p className="font-editorial italic font-medium text-neutral-900 dark:text-white text-sm sm:text-base">
                      "{selectedGame.myComment}"
                    </p>
                  </div>

                  <BeveledButton 
                    asAnchor
                    href={selectedGame.url} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    variant="highlight"
                    className="w-full justify-center"
                    icon={<Play size={14} fill="currentColor" />}
                  >
                    Play / View on Steam
                  </BeveledButton>
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
