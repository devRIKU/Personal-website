import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';

const SocialsPage: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-neo-black">
      <Navbar />
      <div className="flex-1 flex flex-col items-center justify-center relative overflow-hidden py-12">
        <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-gray-700 via-neo-black to-neo-black"></div>

        {/* Network Graph Container */}
        <div className="relative w-full max-w-[600px] aspect-square flex items-center justify-center scale-90 md:scale-100">
             
             {/* Lines (SVG Layer) */}
             <svg className="absolute inset-0 w-full h-full z-0 pointer-events-none">
                {/* Lines connecting center (50%, 50%) to nodes */}
                {/* To Top Left (20%, 20%) */}
                <line x1="50%" y1="50%" x2="25%" y2="25%" stroke="white" strokeWidth="2" strokeOpacity="0.4" />
                {/* To Top Right (80%, 25%) */}
                <line x1="50%" y1="50%" x2="75%" y2="20%" stroke="white" strokeWidth="2" strokeOpacity="0.4" />
                {/* To Bottom Left (25%, 80%) */}
                <line x1="50%" y1="50%" x2="20%" y2="75%" stroke="white" strokeWidth="2" strokeOpacity="0.4" />
                {/* To Bottom Right (80%, 80%) */}
                <line x1="50%" y1="50%" x2="80%" y2="80%" stroke="white" strokeWidth="2" strokeOpacity="0.4" />
             </svg>

             {/* Center Node (Me) */}
             <div className="absolute z-30 w-48 h-48 md:w-56 md:h-56 rounded-full border-[6px] border-white overflow-hidden shadow-[0_0_50px_rgba(255,255,255,0.15)] hover:scale-105 transition-transform duration-500 group cursor-pointer bg-gray-800">
                <img 
                    src="https://picsum.photos/seed/sanniva/500/500?grayscale" 
                    className="w-full h-full object-cover group-hover:grayscale-0 transition-all duration-500 opacity-80 group-hover:opacity-100" 
                    alt="Me"
                />
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                     <span className="font-editorial font-bold text-5xl md:text-6xl text-white drop-shadow-md -rotate-12 group-hover:rotate-0 transition-transform duration-300">Me</span>
                </div>
             </div>

             {/* Friend 1 (Top Left) */}
             <div className="absolute top-[15%] left-[15%] w-28 h-28 md:w-32 md:h-32 rounded-full border-4 border-neo-pink overflow-hidden z-20 hover:scale-110 transition-transform duration-300 rotate-6 hover:rotate-0 shadow-lg cursor-pointer bg-gray-700">
                 <img src="https://picsum.photos/seed/friend1/300/300" className="w-full h-full object-cover" alt="Friend 1" />
             </div>

             {/* Friend 2 (Top Right) */}
             <div className="absolute top-[10%] right-[15%] w-24 h-24 md:w-28 md:h-28 rounded-full border-4 border-neo-blue overflow-hidden z-20 hover:scale-110 transition-transform duration-300 -rotate-6 hover:rotate-0 shadow-lg cursor-pointer bg-gray-700">
                 <img src="https://picsum.photos/seed/friend2/300/300" className="w-full h-full object-cover" alt="Friend 2" />
             </div>

             {/* Friend 3 (Bottom Left) */}
             <div className="absolute bottom-[15%] left-[10%] w-32 h-32 md:w-36 md:h-36 rounded-full border-4 border-neo-green overflow-hidden z-20 hover:scale-110 transition-transform duration-300 -rotate-12 hover:rotate-0 shadow-lg cursor-pointer bg-gray-700">
                 <img src="https://picsum.photos/seed/friend3/300/300" className="w-full h-full object-cover" alt="Friend 3" />
             </div>

             {/* Friend 4 (Bottom Right) */}
             <div className="absolute bottom-[10%] right-[10%] w-36 h-36 md:w-40 md:h-40 rounded-3xl border-4 border-neo-yellow overflow-hidden z-20 hover:scale-110 transition-transform duration-300 rotate-12 hover:rotate-0 shadow-lg cursor-pointer bg-gray-700">
                 <img src="https://picsum.photos/seed/friend4/300/300" className="w-full h-full object-cover" alt="Friend 4" />
             </div>
        </div>
        
        <div className="mt-12 text-center z-40">
            <h1 className="font-editorial text-4xl md:text-5xl text-white font-bold mb-2">The Inner Circle</h1>
            <p className="font-grotesk text-gray-400">My squad, mentors, and fellow builders.</p>
        </div>

        <Link to="/" className="mt-8 flex items-center gap-2 text-white border-2 border-white px-6 py-2 rounded-full hover:bg-white hover:text-black transition-all">
            <ArrowLeft size={20} /> Back to Home
        </Link>
      </div>
    </div>
  )
}

export default SocialsPage;