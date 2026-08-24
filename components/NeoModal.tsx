import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { X } from 'lucide-react';
import { motion, AnimatePresence } from "motion/react";

interface NeoModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  badge?: string;
  statusColor?: 'green' | 'amber' | 'coral' | 'blue';
  children: React.ReactNode;
}

const NeoModal: React.FC<NeoModalProps> = ({ 
  isOpen, 
  onClose, 
  title, 
  badge,
  statusColor = 'amber',
  children 
}) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  // Prevent scrolling when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!mounted) return null;

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-4">
          {/* Backdrop */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/75 backdrop-blur-md"
            onClick={onClose}
          />
          
          {/* Modal Chassis */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.94, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 12 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
            className="relative tactile-panel rounded-[12px] sm:rounded-[14px] w-full max-w-xl p-0 overflow-hidden text-neutral-900 dark:text-white shadow-2xl border border-black/30 dark:border-white/15"
          >
            {/* Skeuomorphic Hardware Header */}
            <div className="flex items-center justify-between px-3 sm:px-4 py-2.5 sm:py-3 bg-gradient-to-b from-neutral-100 to-neutral-200/90 dark:from-[#252830] dark:to-[#17191e] border-b border-black/15 dark:border-white/10 select-none">
              <div className="flex items-center gap-2 sm:gap-2.5 min-w-0 pr-2">
                <span className="hardware-screw shrink-0 hidden xs:inline-block" />
                
                {statusColor && (
                  <span 
                    className={`w-2 h-2 rounded-full shrink-0 ${
                      statusColor === 'green' ? 'led-indicator-green' :
                      statusColor === 'coral' ? 'led-indicator-coral' :
                      statusColor === 'blue' ? 'led-indicator-blue' : 'led-indicator-amber'
                    }`} 
                  />
                )}

                <h3 className="font-ui font-bold text-xs sm:text-sm tracking-wider sm:tracking-widest uppercase text-neutral-900 dark:text-neutral-100 truncate">
                  {title}
                </h3>

                {badge && (
                  <span className="hidden sm:inline-block font-mono text-[9px] font-bold px-1.5 py-0.5 rounded bg-neutral-300/80 dark:bg-black/40 text-neutral-700 dark:text-neutral-300 border border-neutral-400/40 dark:border-neutral-700 shrink-0">
                    {badge}
                  </span>
                )}
              </div>
              
              <div className="flex items-center gap-2 shrink-0">
                <button 
                  onClick={onClose}
                  className="tactile-button min-w-[36px] min-h-[36px] p-2 rounded-[6px] text-neutral-700 dark:text-neutral-300 hover:text-red-500 dark:hover:text-red-400 transition-colors flex items-center justify-center touch-manipulation"
                  aria-label="Close modal"
                >
                  <X size={16} />
                </button>
                <span className="hardware-screw shrink-0 hidden sm:inline-block" />
              </div>
            </div>
            
            {/* Body with smartphone friendly scroll and padding */}
            <div className="p-4 sm:p-6 font-grotesk max-h-[82vh] sm:max-h-[78vh] overflow-y-auto bg-transparent overscroll-contain">
              {children}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>,
    document.body
  );
};

export default NeoModal;