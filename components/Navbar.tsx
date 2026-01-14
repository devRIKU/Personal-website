import React, { useState, useEffect } from 'react';
import { Menu, X, Sun, Moon } from 'lucide-react';

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    // Check initial theme preference
    if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      document.documentElement.classList.add('dark');
      setIsDarkMode(true);
    } else {
      document.documentElement.classList.remove('dark');
      setIsDarkMode(false);
    }
  }, []);

  const toggleTheme = () => {
    if (isDarkMode) {
      document.documentElement.classList.remove('dark');
      localStorage.theme = 'light';
      setIsDarkMode(false);
    } else {
      document.documentElement.classList.add('dark');
      localStorage.theme = 'dark';
      setIsDarkMode(true);
    }
  };

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  const navItems = ['ABOUT', 'PREFERENCES', 'SOCIALS', 'CONTACT'];

  return (
    <nav className="w-full border-b-4 border-black dark:border-neo-dark-surface bg-white dark:bg-neo-dark-bg p-4 sticky top-0 z-50 transition-colors duration-300">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        <a href="#" className="flex items-center gap-2 group cursor-pointer">
          <div className="w-8 h-8 bg-neo-black dark:bg-transparent dark:border-2 dark:border-neo-warm-coral text-white dark:text-neo-warm-coral flex items-center justify-center font-editorial font-bold text-xl group-hover:bg-neo-warm-coral dark:group-hover:bg-neo-warm-coral dark:group-hover:text-black transition-colors">
            S
          </div>
          <span className="font-editorial font-bold text-2xl tracking-tighter hover:text-neo-warm-coral dark:hover:text-neo-warm-coral transition-colors dark:text-white">
            Sanniva.
          </span>
        </a>
        
        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8 font-ui font-medium text-sm tracking-wide">
          {navItems.map((item) => (
             <a 
               key={item} 
               href={`#${item.toLowerCase()}`}
               className="relative after:content-[''] after:absolute after:w-full after:scale-x-0 after:h-0.5 after:bottom-0 after:left-0 after:bg-black dark:after:bg-neo-warm-terracotta after:origin-bottom-right after:transition-transform after:duration-300 hover:after:scale-x-100 hover:after:origin-bottom-left dark:text-gray-300 hover:text-black dark:hover:text-neo-warm-terracotta transition-colors"
             >
               {item}
             </a>
          ))}
          
          <button 
            onClick={toggleTheme}
            className="p-2 border-2 border-black dark:border-neo-warm-sage text-black dark:text-neo-warm-sage hover:bg-black hover:text-white dark:hover:bg-neo-warm-sage dark:hover:text-black transition-all rounded-full shadow-neo-sm dark:shadow-none hover:translate-y-1 hover:shadow-none"
            aria-label="Toggle Dark Mode"
          >
            {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
          </button>
        </div>

        {/* Mobile Buttons */}
        <div className="flex items-center gap-4 md:hidden">
          <button 
              onClick={toggleTheme}
              className="p-2 border-2 border-black dark:border-neo-warm-sage dark:text-neo-warm-sage hover:bg-neo-warm-mustard dark:hover:bg-neo-warm-sage dark:hover:text-black transition-all active:translate-y-1 active:shadow-none shadow-neo-sm dark:shadow-none"
            >
              {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>
          
          <button 
            onClick={toggleMenu}
            className="border-2 border-black dark:border-neo-warm-terracotta dark:text-neo-warm-terracotta p-1 hover:bg-neo-warm-mustard dark:hover:bg-neo-warm-terracotta dark:hover:text-black active:shadow-none shadow-neo-sm dark:shadow-none transition-all"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-white dark:bg-neo-dark-bg border-b-4 border-black dark:border-neo-dark-surface p-6 flex flex-col gap-6 shadow-neo-lg dark:shadow-none animate-in slide-in-from-top-2">
            {navItems.map((item) => (
             <a
               key={item}
               href={`#${item.toLowerCase()}`}
               onClick={closeMenu}
               className="font-editorial font-bold text-3xl hover:text-neo-warm-coral dark:hover:text-neo-warm-coral hover:translate-x-2 transition-all dark:text-white"
             >
               {item}
             </a>
          ))}
        </div>
      )}
    </nav>
  );
};

export default Navbar;