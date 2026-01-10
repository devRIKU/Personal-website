import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer id="contact" className="bg-neo-black text-white py-12 px-4 border-t-8 border-neo-yellow">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="text-center md:text-left">
          <h2 className="font-editorial text-4xl font-bold mb-2">Sanniva C.</h2>
          <p className="font-grotesk text-gray-400">Just getting started.</p>
        </div>
        
        <div className="flex gap-4 font-ui font-bold">
           <a href="#" className="hover:text-neo-blue transition-colors underline decoration-2 decoration-neo-pink underline-offset-4">GITHUB</a>
           <a href="#" className="hover:text-neo-blue transition-colors underline decoration-2 decoration-neo-green underline-offset-4">TWITTER</a>
           <a href="#" className="hover:text-neo-blue transition-colors underline decoration-2 decoration-neo-yellow underline-offset-4">EMAIL</a>
        </div>
      </div>
      <div className="text-center mt-12 font-grotesk text-xs text-gray-500">
        © {new Date().getFullYear()} Sanniva Chatterjee. Built with React & Tailwind.
      </div>
    </footer>
  );
};

export default Footer;