import React from 'react';
import { Bot } from 'lucide-react';
import { motion } from 'motion/react';

const FloatingAIButton: React.FC = () => {
  return (
    <motion.a 
      href="https://ai-sanniva.streamlit.app" 
      target="_blank" 
      rel="noopener noreferrer"
      className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 group select-none block touch-manipulation"
      aria-label="Talk to AI Sanniva Bot (Streamlit)"
      title="AI Sanniva Chatbot"
      initial={{ opacity: 0, scale: 0.8, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 400, damping: 25, delay: 0.2 }}
      whileHover={{ scale: 1.08, y: -2 }}
      whileTap={{ scale: 0.92, y: 1 }}
    >
      <div className="relative p-[2px] rounded-full bg-gradient-to-b from-amber-300 via-amber-400 to-amber-600 dark:from-neutral-600 dark:via-neutral-700 dark:to-neutral-900 shadow-[0_6px_16px_rgba(0,0,0,0.28),inset_0_1px_0_rgba(255,255,255,0.6)]">
        <div className="tactile-button-accent w-11 h-11 sm:w-12 sm:h-12 rounded-full flex items-center justify-center border border-black/20 text-neutral-900">
          <Bot size={20} className="text-neutral-950 transition-transform duration-200 group-hover:scale-110" />
        </div>
      </div>
    </motion.a>
  );
};

export default FloatingAIButton;
