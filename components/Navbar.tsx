import React, { useState, useEffect } from 'react';
import { Menu, X, Sun, Moon } from 'lucide-react';

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    // Initial check
    const checkTheme = () => {
      if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
        document.documentElement.classList.add('dark');
        setIsDarkMode(true);
      } else {
        document.documentElement.classList.remove('dark');
        setIsDarkMode(false);
      }
    };

    checkTheme();

    // Listen for system changes if no preference is stored
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (e: MediaQueryListEvent) => {
      if (!('theme' in localStorage)) {
        if (e.matches) {
          document.documentElement.classList.add('dark');
          setIsDarkMode(true);
        } else {
          document.documentElement.classList.remove('dark');
          setIsDarkMode(false);
        }
      }
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
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

  const navItems = [
    { name: 'ABOUT', href: '#about' },
    { name: 'PREFS', href: '#preferences' },
    { name: 'LIKES', href: '#favorites' },
    { name: 'CIRCLE', href: '#socials' },
  ];

  return (
    <nav className="sticky top-0 z-[60] bg-neo-bg-light dark:bg-neo-dark-bg border-b-4 border-black dark:border-neo-dark-border py-4 px-6 transition-colors duration-300">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        <a href="#" className="font-editorial text-2xl md:text-3xl font-black tracking-tighter dark:text-white">
          SANNIVA<span className="text-neo-warm-coral">.DEV</span>
        </a>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <a 
              key={item.name}
              href={item.href}
              className="font-ui font-black text-sm tracking-widest hover:text-neo-warm-coral dark:text-gray-300 dark:hover:text-white transition-colors"
            >
              {item.name}
            </a>
          ))}
          <button 
            onClick={toggleTheme}
            className="p-2 border-2 border-black dark:border-white bg-neo-white dark:bg-neo-dark-surface shadow-neo-sm hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all"
            aria-label="Toggle Theme"
          >
            {isDarkMode ? <Sun size={20} className="text-neo-warm-mustard" /> : <Moon size={20} />}
          </button>
        </div>

        {/* Mobile Toggle */}
        <div className="flex md:hidden items-center gap-4">
          <button onClick={toggleTheme} className="p-2 border-2 border-black dark:border-white bg-neo-white dark:bg-neo-dark-surface" aria-label="Toggle Theme">
            {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="p-2 border-2 border-black dark:border-white bg-neo-white dark:bg-neo-dark-surface" aria-label="Menu">
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-neo-warm-mustard border-b-4 border-black p-6 space-y-4 shadow-xl animate-in slide-in-from-top duration-300">
          {navItems.map((item) => (
            <a 
              key={item.name}
              href={item.href}
              onClick={() => setIsMenuOpen(false)}
              className="block font-ui font-black text-2xl tracking-tighter text-black border-b-2 border-black/10 pb-2"
            >
              {item.name}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
};

export default Navbar;