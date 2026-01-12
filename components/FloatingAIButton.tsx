import React from 'react';
import { Bot, ArrowUpRight } from 'lucide-react';

const FloatingAIButton: React.FC = () => {
  return (
    <a 
      href="https://ai-sanniva.streamlit.app" 
      target="_blank" 
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 group"
    >
      <div className="flex items-center gap-2 bg-neo-yellow dark:bg-black border-4 border-black dark:border-neo-green p-3 shadow-neo-lg dark:shadow-none hover:bg-neo-pink dark:hover:bg-neo-green hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-neo dark:hover:shadow-none transition-all duration-200">
        <Bot size={24} className="text-black dark:text-neo-green dark:group-hover:text-black" />
        <span className="font-ui font-bold text-black dark:text-neo-green dark:group-hover:text-black hidden md:block">Chat with AI Sanniva</span>
        <ArrowUpRight size={20} className="text-black dark:text-neo-green dark:group-hover:text-black group-hover:rotate-45 transition-transform" />
      </div>
    </a>
  );
};

export default FloatingAIButton;