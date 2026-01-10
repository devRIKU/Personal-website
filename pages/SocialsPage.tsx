import React from 'react';
import { ArrowLeft } from 'lucide-react';
import Navbar from '../components/Navbar';

const SocialsPage: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-neo-yellow">
      <Navbar />
      <div className="flex-1 flex flex-col items-center justify-center relative overflow-hidden py-12">
        
        {/* Decorative background grid */}
        <div className="absolute inset-0 opacity-10" style={{
            backgroundImage: 'radial-gradient(#000 1px, transparent 1px)',
            backgroundSize: '24px 24px'
        }}></div>

        {/* Network Graph Container */}
        <div className="relative w-full max-w-[600px] aspect-square flex items-center justify-center scale-90 md:scale-100">
             
             {/* Lines (SVG Layer) */}
             <svg className="absolute inset-0 w-full h-full z-0 pointer-events-none">
                {/* Connecting lines */}
                <line x1="50%" y1="50%" x2="25%" y2="25%" stroke="black" strokeWidth="3" />
                <line x1="50%" y1="50%" x2="75%" y2="20%" stroke="black" strokeWidth="3" />
                <line x1="50%" y1="50%" x2="20%" y2="75%" stroke="black" strokeWidth="3" />
                <line x1="50%" y1="50%" x2="80%" y2="80%" stroke="black" strokeWidth="3" />
             </svg>

             {/* Center Node (Me) */}
             <div className="absolute z-30 w-48 h-48 md:w-56 md:h-56 rounded-full border-4 border-black bg-white overflow-hidden shadow-neo-lg hover:scale-105 transition-transform duration-500 group cursor-pointer">
                <img 
                    src="https://picsum.photos/seed/sanniva/500/500?grayscale" 
                    className="w-full h-full object-cover group-hover:grayscale-0 transition-all duration-500" 
                    alt="Me"
                />
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                     <span className="bg-black text-white px-2 py-1 font-editorial font-bold text-3xl -rotate-12 group-hover:rotate-0 transition-transform duration-300">ME</span>
                </div>
             </div>

             {/* Friend 1 (Top Left) */}
             <div className="absolute top-[15%] left-[15%] w-28 h-28 md:w-32 md:h-32 rounded-full border-4 border-black bg-neo-pink overflow-hidden z-20 hover:scale-110 transition-transform duration-300 rotate-6 hover:rotate-0 shadow-neo cursor-pointer">
                 <div className="w-full h-full flex items-center justify-center font-bold text-xl">
                    FRIEND 1
                 </div>
             </div>

             {/* Friend 2 (Top Right) */}
             <div className="absolute top-[10%] right-[15%] w-24 h-24 md:w-28 md:h-28 rounded-full border-4 border-black bg-neo-blue overflow-hidden z-20 hover:scale-110 transition-transform duration-300 -rotate-6 hover:rotate-0 shadow-neo cursor-pointer">
                <div className="w-full h-full flex items-center justify-center font-bold text-xl">
                    FRIEND 2
                 </div>
             </div>

             {/* Friend 3 (Bottom Left) */}
             <div className="absolute bottom-[15%] left-[10%] w-32 h-32 md:w-36 md:h-36 rounded-full border-4 border-black bg-neo-green overflow-hidden z-20 hover:scale-110 transition-transform duration-300 -rotate-12 hover:rotate-0 shadow-neo cursor-pointer">
                <div className="w-full h-full flex items-center justify-center font-bold text-xl">
                    FRIEND 3
                 </div>
             </div>

             {/* Friend 4 (Bottom Right) */}
             <div className="absolute bottom-[10%] right-[10%] w-36 h-36 md:w-40 md:h-40 rounded-3xl border-4 border-black bg-white overflow-hidden z-20 hover:scale-110 transition-transform duration-300 rotate-12 hover:rotate-0 shadow-neo cursor-pointer">
                <div className="w-full h-full flex items-center justify-center font-bold text-xl">
                    FRIEND 4
                 </div>
             </div>
        </div>
        
        <div className="mt-12 text-center z-40 bg-white border-4 border-black p-6 shadow-neo transform -rotate-1">
            <h1 className="font-editorial text-4xl md:text-5xl text-black font-bold mb-2">The Inner Circle</h1>
            <p className="font-grotesk text-black font-medium">My squad, mentors, and fellow builders.</p>
        </div>

        <a href="/" className="mt-8 flex items-center gap-2 bg-black text-white border-4 border-black px-6 py-2 hover:bg-white hover:text-black shadow-neo hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all font-bold">
            <ArrowLeft size={20} /> Back to Home
        </a>
      </div>
    </div>
  )
}

export default SocialsPage;