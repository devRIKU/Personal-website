import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  const navItems = ['ABOUT', 'PREFERENCES', 'SOCIALS', 'CONTACT'];

  return (
    <nav className="w-full border-b-4 border-black bg-white p-4 sticky top-0 z-50">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        <a href="#" className="flex items-center gap-2 group cursor-pointer">
          <div className="w-8 h-8 bg-neo-black text-white flex items-center justify-center font-editorial font-bold text-xl group-hover:bg-neo-pink transition-colors">
            S
          </div>
          <span className="font-editorial font-bold text-2xl tracking-tighter hover:text-neo-pink transition-colors">
            Sanniva.
          </span>
        </a>
        
        {/* Desktop Navigation */}
        <div className="hidden md:flex gap-8 font-ui font-medium text-sm tracking-wide">
          {navItems.map((item) => (
             <a 
               key={item} 
               href={`#${item.toLowerCase()}`}
               className="relative after:content-[''] after:absolute after:w-full after:scale-x-0 after:h-0.5 after:bottom-0 after:left-0 after:bg-black after:origin-bottom-right after:transition-transform after:duration-300 hover:after:scale-x-100 hover:after:origin-bottom-left"
             >
               {item}
             </a>
          ))}
        </div>

        {/* Mobile Menu Button */}
        <button 
          onClick={toggleMenu}
          className="md:hidden border-2 border-black p-1 hover:bg-neo-yellow active:shadow-none shadow-neo-sm transition-all"
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-white border-b-4 border-black p-6 flex flex-col gap-6 shadow-neo-lg animate-in slide-in-from-top-2">
            {navItems.map((item) => (
             <a
               key={item}
               href={`#${item.toLowerCase()}`}
               onClick={closeMenu}
               className="font-editorial font-bold text-3xl hover:text-neo-pink hover:translate-x-2 transition-all"
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