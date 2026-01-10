import React from 'react';
import { Menu } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const Navbar: React.FC = () => {
  const location = useLocation();
  const isHome = location.pathname === '/';

  const getLinkHref = (item: string) => {
    const lowerItem = item.toLowerCase();
    if (lowerItem === 'socials') return '/socials';
    
    // For scroll links
    if (isHome) return `#${lowerItem}`;
    return `/#${lowerItem}`;
  };

  return (
    <nav className="w-full border-b-4 border-black bg-white p-4 sticky top-0 z-50">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        <Link to="/" className="flex items-center gap-2 group cursor-pointer">
          <div className="w-8 h-8 bg-neo-black text-white flex items-center justify-center font-editorial font-bold text-xl group-hover:bg-neo-pink transition-colors">
            S
          </div>
          <span className="font-editorial font-bold text-2xl tracking-tighter hover:text-neo-pink transition-colors">
            Sanniva.
          </span>
        </Link>
        
        <div className="hidden md:flex gap-8 font-ui font-medium text-sm tracking-wide">
          {['ABOUT', 'PREFERENCES', 'SOCIALS', 'CONTACT'].map((item) => {
             const isRoute = item === 'SOCIALS';
             if (isRoute) {
               return (
                 <Link 
                   key={item}
                   to="/socials"
                   className="relative after:content-[''] after:absolute after:w-full after:scale-x-0 after:h-0.5 after:bottom-0 after:left-0 after:bg-black after:origin-bottom-right after:transition-transform after:duration-300 hover:after:scale-x-100 hover:after:origin-bottom-left"
                 >
                   {item}
                 </Link>
               );
             }
             return (
               <a 
                 key={item} 
                 href={getLinkHref(item)} 
                 className="relative after:content-[''] after:absolute after:w-full after:scale-x-0 after:h-0.5 after:bottom-0 after:left-0 after:bg-black after:origin-bottom-right after:transition-transform after:duration-300 hover:after:scale-x-100 hover:after:origin-bottom-left"
               >
                 {item}
               </a>
             );
          })}
        </div>

        <button className="md:hidden border-2 border-black p-1 hover:bg-neo-yellow active:shadow-none shadow-neo-sm transition-all">
          <Menu size={24} />
        </button>
      </div>
    </nav>
  );
};

export default Navbar;