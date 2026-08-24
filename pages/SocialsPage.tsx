import React from 'react';
import { ArrowLeft } from 'lucide-react';
import Navbar from '../components/Navbar';
import BeveledButton from '../components/tactile/BeveledButton';
import StatusLED from '../components/tactile/StatusLED';

const SocialsPage: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-amber-50 dark:bg-[#121316] text-neutral-900 dark:text-neutral-100">
      <Navbar />
      <div className="flex-1 flex flex-col items-center justify-center relative overflow-hidden py-12 px-4">
        
        <div className="absolute inset-0 opacity-10" style={{
            backgroundImage: 'radial-gradient(#000 1px, transparent 1px)',
            backgroundSize: '24px 24px'
        }}></div>

        <div className="relative w-full max-w-[600px] aspect-square flex items-center justify-center scale-90 md:scale-100">
             <svg className="absolute inset-0 w-full h-full z-0 pointer-events-none">
                <line x1="50%" y1="50%" x2="25%" y2="25%" className="stroke-neutral-400 dark:stroke-neutral-700 stroke-[2px]" strokeDasharray="4 4" />
                <line x1="50%" y1="50%" x2="75%" y2="20%" className="stroke-neutral-400 dark:stroke-neutral-700 stroke-[2px]" strokeDasharray="4 4" />
                <line x1="50%" y1="50%" x2="20%" y2="75%" className="stroke-neutral-400 dark:stroke-neutral-700 stroke-[2px]" strokeDasharray="4 4" />
                <line x1="50%" y1="50%" x2="80%" y2="80%" className="stroke-neutral-400 dark:stroke-neutral-700 stroke-[2px]" strokeDasharray="4 4" />
             </svg>

             <div className="absolute z-30 w-48 h-48 md:w-56 md:h-56 rounded-full tactile-panel p-1 border-4 border-neutral-900 dark:border-white overflow-hidden shadow-2xl hover:scale-105 transition-transform duration-500 group cursor-pointer">
                <img 
                    src="https://github.com/devriku.png" referrerPolicy="no-referrer" 
                    className="w-full h-full object-cover rounded-full" 
                    alt="Sanniva"
                />
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity">
                     <span className="bg-amber-400 text-neutral-950 px-3 py-1 font-mono font-bold text-sm tracking-wider uppercase rounded-[4px] border border-amber-600 shadow-md">SANNIVA • DEV</span>
                </div>
             </div>

             <div className="absolute top-[15%] left-[15%] w-28 h-28 md:w-32 md:h-32 rounded-full border-2 border-pink-700 bg-pink-600 text-white overflow-hidden z-20 hover:scale-110 transition-transform duration-300 shadow-md cursor-pointer flex items-center justify-center font-bold text-lg">
                FRIEND 1
             </div>

             <div className="absolute top-[10%] right-[15%] w-24 h-24 md:w-28 md:h-28 rounded-full border-2 border-sky-700 bg-sky-600 text-white overflow-hidden z-20 hover:scale-110 transition-transform duration-300 shadow-md cursor-pointer flex items-center justify-center font-bold text-lg">
                FRIEND 2
             </div>

             <div className="absolute bottom-[15%] left-[10%] w-32 h-32 md:w-36 md:h-36 rounded-full border-2 border-emerald-700 bg-emerald-600 text-white overflow-hidden z-20 hover:scale-110 transition-transform duration-300 shadow-md cursor-pointer flex items-center justify-center font-bold text-lg">
                FRIEND 3
             </div>

             <div className="absolute bottom-[10%] right-[10%] w-36 h-36 md:w-40 md:h-40 rounded-3xl border-2 border-amber-600 bg-amber-400 text-neutral-950 overflow-hidden z-20 hover:scale-110 transition-transform duration-300 shadow-md cursor-pointer flex items-center justify-center font-bold text-lg">
                FRIEND 4
             </div>
        </div>
        
        <div className="mt-8 text-center z-40 tactile-panel p-6 shadow-xl max-w-md w-full">
            <div className="inline-flex items-center gap-2 mb-2">
              <StatusLED status="green" label="LIVE SYNC" />
            </div>
            <h1 className="font-display text-3xl md:text-4xl text-neutral-900 dark:text-white font-black uppercase mb-1">The Inner Circle</h1>
            <p className="font-grotesk text-neutral-600 dark:text-neutral-300 text-sm">Collaborators, friends, mentors, and fellow builders.</p>
        </div>

        <div className="mt-6">
          <BeveledButton asAnchor href="/" variant="default" size="md" icon={<ArrowLeft size={16} />}>
            Return to Terminal / Home
          </BeveledButton>
        </div>
      </div>
    </div>
  );
};

export default SocialsPage;