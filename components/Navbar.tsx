import React, { useState, useEffect } from 'react';
import { Menu, X, Sun, Moon, Lock, Unlock } from 'lucide-react';
import NeoModal from './NeoModal';
import SecretArcade from './SecretArcade';

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  
  // Easter Egg States
  const [showPinModal, setShowPinModal] = useState(false);
  const [showSecretModal, setShowSecretModal] = useState(false);
  const [pin, setPin] = useState(['', '', '', '']);
  const [pinError, setPinError] = useState(false);
  const [isArcadeUnlocked, setIsArcadeUnlocked] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('arcade_unlocked') === 'true';
    }
    return false;
  });

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
    { name: 'NOW', href: '#now' },
    { name: 'LAB', href: '#lab' },
    { name: 'PREFS', href: '#preferences' },
    { name: 'LIKES', href: '#favorites' },
    { name: 'PLAY', href: '#play' },
    { name: 'CIRCLE', href: '#socials' },
  ];

  // Easter Egg Logic
  const handlePinChange = (index: number, value: string) => {
    if (value.length > 1) return; // Only allow 1 digit
    
    const newPin = [...pin];
    newPin[index] = value;
    setPin(newPin);
    setPinError(false);

    // Auto-focus next input
    if (value && index < 3) {
      const nextInput = document.getElementById(`pin-${index + 1}`);
      nextInput?.focus();
    }

    // Check code when full
    if (newPin.every(digit => digit !== '')) {
      const code = newPin.join('');
      if (code === '2510') {
        setTimeout(() => {
          setShowPinModal(false);
          setShowSecretModal(true);
          setIsArcadeUnlocked(true);
          if (typeof window !== 'undefined') {
            localStorage.setItem('arcade_unlocked', 'true');
          }
          setPin(['', '', '', '']);
        }, 300);
      } else {
        setPinError(true);
        setTimeout(() => setPin(['', '', '', '']), 500);
        // Focus back to first
        document.getElementById('pin-0')?.focus();
      }
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && !pin[index] && index > 0) {
      const prevInput = document.getElementById(`pin-${index - 1}`);
      prevInput?.focus();
    }
  };

  return (
    <>
      <nav className="fixed top-0 left-0 w-full z-[60] bg-neo-bg-light dark:bg-neo-dark-bg border-b-4 border-black dark:border-neo-dark-border py-4 px-6 transition-colors duration-300">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <a href="#" className="font-display text-2xl md:text-3xl font-black tracking-tighter dark:text-white">
            SANNIVA
            <span 
              onClick={(e) => { e.preventDefault(); setShowPinModal(true); }}
              className="text-neo-warm-coral cursor-pointer hover:underline decoration-wavy"
            >
              .DEV
            </span>
          </a>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-6 lg:gap-8">
            {navItems.map((item) => (
              <a 
                key={item.name}
                href={item.href}
                onClick={(e) => {
                  if (item.name === 'PLAY') {
                    e.preventDefault();
                    if (isArcadeUnlocked) {
                      setShowSecretModal(true);
                    } else {
                      setShowPinModal(true);
                    }
                  }
                }}
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
                onClick={(e) => {
                  setIsMenuOpen(false);
                  if (item.name === 'PLAY') {
                    e.preventDefault();
                    if (isArcadeUnlocked) {
                      setShowSecretModal(true);
                    } else {
                      setShowPinModal(true);
                    }
                  }
                }}
                className="block font-ui font-black text-2xl tracking-tighter text-black border-b-2 border-black/10 pb-2"
              >
                {item.name}
              </a>
            ))}
          </div>
        )}
      </nav>

      {/* PIN Modal */}
      <NeoModal
        isOpen={showPinModal}
        onClose={() => setShowPinModal(false)}
        title="SECURITY CHECK"
      >
        <div className="flex flex-col items-center py-6 space-y-6">
          <div className="bg-neo-warm-mustard p-3 border-2 border-black rounded-full">
            <Lock size={32} className="text-black" />
          </div>
          
          <div className="text-center space-y-2">
            <h4 className="font-bold text-xl text-neo-black dark:text-white">Enter Access Code</h4>
            <p className="text-sm font-mono bg-gray-100 dark:bg-gray-800 p-2 border border-gray-300 dark:border-gray-600 rounded text-neo-black dark:text-gray-200">
              CLUE: My birthday is on 25/10 🎂
            </p>
          </div>

          <div className="flex gap-3">
            {pin.map((digit, index) => (
              <input
                key={index}
                id={`pin-${index}`}
                type="text"
                maxLength={1}
                value={digit}
                onChange={(e) => handlePinChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                className={`w-12 h-16 text-center text-2xl font-bold border-4 outline-none transition-all text-black dark:bg-white ${
                  pinError 
                    ? 'border-red-500 bg-red-50 animate-shake dark:bg-red-100' 
                    : 'border-black focus:border-neo-warm-coral focus:-translate-y-1'
                }`}
                autoComplete="off"
              />
            ))}
          </div>
          
          {pinError && (
             <p className="text-red-600 dark:text-red-400 font-bold text-sm">ACCESS DENIED. TRY AGAIN.</p>
          )}
        </div>
      </NeoModal>

      {/* Success Modal */}
      <NeoModal 
        isOpen={showSecretModal} 
        onClose={() => setShowSecretModal(false)} 
        title="SECRET UNLOCKED 🔓"
      >
        <SecretArcade />
      </NeoModal>
    </>
  );
};

export default Navbar;