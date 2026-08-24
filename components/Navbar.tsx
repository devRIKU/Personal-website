import React, { useState, useEffect, useRef } from 'react';
import { Menu, X, Sun, Moon, Lock, Unlock, Sparkles, Terminal, Gamepad2 } from 'lucide-react';
import NeoModal from './NeoModal';
import SecretArcade from './SecretArcade';
import StatusLED from './tactile/StatusLED';
import BeveledButton from './tactile/BeveledButton';

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  
  // Easter Egg States
  const [showPinModal, setShowPinModal] = useState(false);
  const [showSecretModal, setShowSecretModal] = useState(false);
  const [pin, setPin] = useState(['', '', '', '']);
  const [pinError, setPinError] = useState(false);
  const [secretHintToast, setSecretHintToast] = useState<string | null>(null);
  const [logoClickCount, setLogoClickCount] = useState(0);

  const [isArcadeUnlocked, setIsArcadeUnlocked] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('arcade_unlocked') === 'true';
    }
    return false;
  });

  // Konami Code Easter Egg Listener
  const konamiSequence = useRef<string[]>([]);
  const konamiCode = [
    'ArrowUp', 'ArrowUp', 
    'ArrowDown', 'ArrowDown', 
    'ArrowLeft', 'ArrowRight', 
    'ArrowLeft', 'ArrowRight', 
    'b', 'a'
  ];

  useEffect(() => {
    const handleGlobalKeyDown = (e: KeyboardEvent) => {
      // Check active input to avoid interfering with normal text inputs
      if (['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement)?.tagName)) {
        return;
      }

      const key = e.key.length === 1 ? e.key.toLowerCase() : e.key;
      const expectedKey = konamiCode[konamiSequence.current.length].length === 1 
        ? konamiCode[konamiSequence.current.length].toLowerCase() 
        : konamiCode[konamiSequence.current.length];

      if (key === expectedKey) {
        konamiSequence.current.push(e.key);
        if (konamiSequence.current.length === konamiCode.length) {
          // Konami Code Triggered!
          setIsArcadeUnlocked(true);
          if (typeof window !== 'undefined') {
            localStorage.setItem('arcade_unlocked', 'true');
          }
          setShowSecretModal(true);
          setShowPinModal(false);
          konamiSequence.current = [];
          setSecretHintToast('🎮 KONAMI CODE ACCEPTED! ARCADE UNLOCKED!');
          setTimeout(() => setSecretHintToast(null), 3500);
        }
      } else {
        konamiSequence.current = key === konamiCode[0] ? [e.key] : [];
      }
    };

    window.addEventListener('keydown', handleGlobalKeyDown);
    return () => window.removeEventListener('keydown', handleGlobalKeyDown);
  }, []);

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

  const [activeSection, setActiveSection] = useState<string>('about');

  const navItems = [
    { name: 'ABOUT', href: '#about', id: 'about' },
    { name: 'NOW', href: '#now', id: 'now' },
    { name: 'LAB', href: '#lab', id: 'lab' },
    { name: 'PREFS', href: '#preferences', id: 'preferences' },
    { name: 'LIKES', href: '#favorites', id: 'favorites' },
    { name: 'PLAY', href: '#play', id: 'play' },
    { name: 'CIRCLE', href: '#socials', id: 'socials' },
  ];

  // High-Performance Scroll Spy (Navigation Spy Telemetry)
  useEffect(() => {
    const sectionIds = ['about', 'now', 'lab', 'preferences', 'favorites', 'socials'];
    let ticking = false;

    const handleScrollSpy = () => {
      if (ticking) return;
      ticking = true;

      window.requestAnimationFrame(() => {
        const scrollY = window.scrollY;
        const windowHeight = window.innerHeight;
        const documentHeight = document.documentElement.scrollHeight;

        // Bottom of page check
        if (scrollY + windowHeight >= documentHeight - 60) {
          setActiveSection('socials');
          ticking = false;
          return;
        }

        // Top of page check
        if (scrollY < 120) {
          setActiveSection('about');
          ticking = false;
          return;
        }

        const scrollCenter = scrollY + 160;
        let currentActive = 'about';

        for (const id of sectionIds) {
          const el = document.getElementById(id);
          if (el) {
            const top = el.offsetTop;
            const height = el.offsetHeight;
            if (scrollCenter >= top && scrollCenter < top + height) {
              currentActive = id;
              break;
            }
          }
        }

        setActiveSection(currentActive);
        ticking = false;
      });
    };

    window.addEventListener('scroll', handleScrollSpy, { passive: true });
    handleScrollSpy();

    return () => window.removeEventListener('scroll', handleScrollSpy);
  }, []);

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, href: string, id: string) => {
    if (id === 'play') {
      e.preventDefault();
      if (isArcadeUnlocked) {
        setShowSecretModal(true);
      } else {
        setShowPinModal(true);
      }
      return;
    }

    e.preventDefault();
    const targetElement = document.getElementById(id);
    if (targetElement) {
      const navOffset = 80;
      const elementPosition = targetElement.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
      setActiveSection(id);
      setIsMenuOpen(false);
    }
  };

  // Easter Egg Logic
  const handlePinChange = (index: number, value: string) => {
    const cleanValue = value.replace(/\D/g, '');
    
    // Check if pasted full code
    if (cleanValue.length >= 4) {
      const digits = cleanValue.slice(0, 4).split('');
      setPin(digits);
      if (cleanValue.slice(0, 4) === '2510') {
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
        setTimeout(() => setPin(['', '', '', '']), 600);
      }
      return;
    }

    if (value.length > 1) return; // Only allow 1 digit
    
    const newPin = [...pin];
    newPin[index] = cleanValue;
    setPin(newPin);
    setPinError(false);

    // Auto-focus next input
    if (cleanValue && index < 3) {
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
        setTimeout(() => setPin(['', '', '', '']), 600);
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

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').replace(/\D/g, '');
    if (pastedData.length >= 4) {
      const digits = pastedData.slice(0, 4).split('');
      setPin(digits);
      if (pastedData.slice(0, 4) === '2510') {
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
        setTimeout(() => setPin(['', '', '', '']), 600);
      }
    }
  };

  const handleLogoClick = (e: React.MouseEvent) => {
    const nextCount = logoClickCount + 1;
    setLogoClickCount(nextCount);
    if (nextCount === 3) {
      if (!isArcadeUnlocked) {
        setShowPinModal(true);
        setSecretHintToast('🎂 Hint: Enter birthday 2510 or Konami Code!');
        setTimeout(() => setSecretHintToast(null), 3000);
      } else {
        setShowSecretModal(true);
      }
      setLogoClickCount(0);
    }
  };

  return (
    <>
      <header className="fixed top-0 left-0 w-full z-[60] px-3 sm:px-6 py-3 transition-colors duration-300">
        <nav className="max-w-6xl mx-auto tactile-panel backdrop-blur-md bg-white/90 dark:bg-[#15171c]/90 px-4 py-2.5 flex items-center justify-between shadow-lg">
          {/* Logo with Hardware Status */}
          <div className="flex items-center gap-3">
            <a 
              href="#" 
              onClick={handleLogoClick}
              className="font-display text-xl md:text-2xl font-black tracking-tight text-neutral-900 dark:text-white flex items-center gap-1.5 group select-none"
              title="Click for portfolio home / Triple click for secret arcade"
            >
              <span>SANNIVA</span>
              <span className="bg-neo-secondary text-white dark:bg-neo-secondary dark:text-white font-black px-1.5 py-0.5 rounded-[4px] border border-[#c2593f] text-xs md:text-sm tracking-wider group-hover:scale-105 transition-all shadow-sm">
                .DEV
              </span>
            </a>

            <div className="hidden lg:flex items-center gap-2 pl-3 border-l border-black/10 dark:border-white/10">
              <StatusLED status="green" label="ONLINE" />
            </div>
          </div>

          {/* Desktop Recessed Track / Segmented Dock */}
          <div className="hidden md:flex items-center gap-1.5 tactile-well p-1.5 rounded-[10px]">
            {navItems.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <a 
                  key={item.name}
                  href={item.href}
                  onClick={(e) => scrollToSection(e, item.href, item.id)}
                  className={`font-ui font-bold text-xs tracking-wider px-3 py-1.5 rounded-[6px] transition-all select-none relative ${
                    item.name === 'PLAY' && isArcadeUnlocked
                      ? 'bg-emerald-500 text-white font-extrabold shadow-sm border border-emerald-600'
                      : isActive
                      ? 'bg-neo-secondary text-white font-extrabold shadow-sm border border-[#c2593f] dark:bg-neutral-800 dark:text-neo-secondary dark:border-neo-secondary/50'
                      : 'text-neutral-700 dark:text-neutral-300 hover:text-black dark:hover:text-white hover:bg-black/5 dark:hover:bg-neutral-800/50'
                  }`}
                >
                  <span className="flex items-center gap-1.5">
                    {isActive && item.name !== 'PLAY' && (
                      <span className="w-1.5 h-1.5 rounded-full bg-white dark:bg-neo-secondary inline-block animate-pulse" />
                    )}
                    {item.name}
                  </span>
                </a>
              );
            })}
          </div>

          {/* Right Action Keycaps */}
          <div className="flex items-center gap-2">
            <button 
              onClick={toggleTheme}
              className="tactile-button p-2 text-neutral-800 dark:text-neutral-200 rounded-[8px]"
              aria-label="Toggle Theme"
              title="Toggle Light/Dark Theme"
            >
              {isDarkMode ? <Sun size={17} className="text-neo-accent" /> : <Moon size={17} />}
            </button>

            {/* Mobile Menu Toggle */}
            <div className="flex md:hidden">
              <button 
                onClick={() => setIsMenuOpen(!isMenuOpen)} 
                className="tactile-button p-2 text-neutral-800 dark:text-neutral-200 rounded-[8px]" 
                aria-label="Menu"
              >
                {isMenuOpen ? <X size={19} /> : <Menu size={19} />}
              </button>
            </div>
          </div>
        </nav>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-2 max-w-6xl mx-auto tactile-panel p-4 space-y-2 shadow-2xl animate-in slide-in-from-top duration-200">
            {navItems.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <a 
                  key={item.name}
                  href={item.href}
                  onClick={(e) => scrollToSection(e, item.href, item.id)}
                  className={`block font-ui font-bold text-sm tracking-wider p-2.5 rounded-[8px] transition-colors flex items-center justify-between ${
                    isActive && item.name !== 'PLAY'
                      ? 'bg-black/10 dark:bg-white/10 text-black dark:text-white border-l-4 border-neo-secondary dark:border-neo-secondary'
                      : 'text-neutral-800 dark:text-neutral-200 hover:bg-black/5 dark:hover:bg-white/5'
                  }`}
                >
                  <span className="flex items-center gap-2">
                    {isActive && item.name !== 'PLAY' && (
                      <span className="w-2 h-2 rounded-full bg-neo-secondary dark:bg-neo-secondary inline-block" />
                    )}
                    {item.name}
                  </span>
                  {item.name === 'PLAY' && (
                    <span className="font-mono text-[10px] bg-neo-accent/20 text-black dark:text-neo-accent px-2 py-0.5 rounded flex items-center gap-1">
                      <Gamepad2 size={12} />
                      {isArcadeUnlocked ? 'UNLOCKED' : 'PIN REQUIRED'}
                    </span>
                  )}
                </a>
              );
            })}
          </div>
        )}
      </header>

      {/* Secret Toast Notification */}
      {secretHintToast && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 z-[80] tactile-panel bg-neutral-900 text-white px-4 py-2 rounded-[8px] font-mono text-xs shadow-2xl border border-neo-accent/50 animate-in fade-in slide-in-from-top-2 duration-200 flex items-center gap-2">
          <Sparkles size={16} className="text-neo-accent" />
          <span>{secretHintToast}</span>
        </div>
      )}

      {/* PIN Modal */}
      <NeoModal
        isOpen={showPinModal}
        onClose={() => setShowPinModal(false)}
        title="SECURITY PIN VERIFICATION"
        badge="RESTRICTED"
        statusColor={pinError ? 'coral' : 'amber'}
      >
        <div className="flex flex-col items-center py-3 space-y-5">
          <div className="tactile-panel p-3.5 flex items-center justify-center">
            <Lock size={26} className="text-amber-500 dark:text-amber-400" />
          </div>
          
          <div className="text-center space-y-2 max-w-xs">
            <h4 className="font-display font-bold text-lg text-neutral-900 dark:text-white uppercase tracking-tight">Enter Access Code</h4>
            <div className="tactile-well p-2.5 rounded-[8px] text-xs font-mono text-neutral-700 dark:text-neutral-300">
              CLUE: My birthday is on <kbd className="px-1 py-0.5 bg-black/10 dark:bg-white/10 rounded font-bold">25/10</kbd> 🎂
            </div>
          </div>

          <div className="flex gap-2.5" onPaste={handlePaste}>
            {pin.map((digit, index) => (
              <input
                key={index}
                id={`pin-${index}`}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={digit}
                onChange={(e) => handlePinChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                className={`w-11 h-13 text-center text-xl font-mono font-bold outline-none transition-all rounded-[8px] ${
                  pinError 
                    ? 'border-2 border-red-500 bg-red-500/10 text-red-500' 
                    : 'tactile-well text-neutral-900 dark:text-neutral-100 focus:border-amber-400 focus:ring-2 focus:ring-amber-400/30'
                }`}
                autoComplete="off"
              />
            ))}
          </div>
          
          {pinError ? (
            <p className="text-rose-500 font-mono font-bold text-xs uppercase tracking-wider flex items-center gap-1.5">
              <StatusLED status="coral" pulse={false} label="ACCESS DENIED. RETRY (2510)" />
            </p>
          ) : (
            <p className="font-mono text-[10px] text-neutral-500 dark:text-neutral-400 uppercase tracking-widest flex items-center gap-1.5">
              <StatusLED status="amber" pulse={true} label="WAITING FOR 4-DIGIT PIN" />
            </p>
          )}

          <div className="pt-2 text-center">
            <p className="font-mono text-[10px] text-neutral-500 dark:text-neutral-400">
              PRO-TIP: Or type the classic Konami Code <kbd>↑↑↓↓←→←→BA</kbd> on your keyboard!
            </p>
          </div>
        </div>
      </NeoModal>

      {/* Success Modal */}
      <NeoModal 
        isOpen={showSecretModal} 
        onClose={() => setShowSecretModal(false)} 
        title="SECRET ARCADE UNLOCKED"
        badge="ARCADE LEVEL 1"
        statusColor="green"
      >
        <SecretArcade />
      </NeoModal>
    </>
  );
};

export default Navbar;
