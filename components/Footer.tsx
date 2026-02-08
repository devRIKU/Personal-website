import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer id="contact" className="bg-neo-black dark:bg-neo-dark-surface text-white py-12 px-4 border-t-8 border-neo-yellow dark:border-neo-blue">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
        <div className="text-center md:text-left">
          <h2 className="font-editorial text-4xl font-bold mb-2">Sanniva C.</h2>
          <p className="font-grotesk text-gray-400">Creative Coder & Builder. Just getting started.</p>
        </div>
        
        <div className="flex flex-wrap justify-center gap-6 font-ui font-bold text-sm tracking-widest uppercase">
           <a 
            href="https://github.com/devriku" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="hover:text-neo-blue transition-colors underline decoration-2 decoration-neo-pink underline-offset-4"
           >
            GITHUB
           </a>
           <a 
            href="https://www.youtube.com/@Rikudoestuff" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="hover:text-neo-blue transition-colors underline decoration-2 decoration-neo-green underline-offset-4"
           >
            YOUTUBE
           </a>
           <a 
            href="https://sanniva-blog.framer.website/" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="hover:text-neo-blue transition-colors underline decoration-2 decoration-neo-yellow underline-offset-4"
           >
            BLOG
           </a>
           <a 
            href="mailto:sannivachatterjee25@gmail.com" 
            className="hover:text-neo-blue transition-colors underline decoration-2 decoration-white/20 underline-offset-4"
           >
            EMAIL
           </a>
        </div>
      </div>
      <div className="text-center mt-12 font-grotesk text-[10px] md:text-xs text-gray-500 uppercase tracking-[0.2em]">
        © {new Date().getFullYear()} Sanniva Chatterjee. Built with React, Tailwind & High Energy.
      </div>
    </footer>
  );
};

export default Footer;