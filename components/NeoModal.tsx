import React, { useEffect } from 'react';
import { X } from 'lucide-react';

interface NeoModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

const NeoModal: React.FC<NeoModalProps> = ({ isOpen, onClose, title, children }) => {
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

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      ></div>
      
      {/* Modal Content */}
      <div className="relative bg-neo-white dark:bg-neo-dark-surface border-4 border-black dark:border-neo-warm-coral shadow-neo-lg dark:shadow-none w-full max-w-lg p-0 animate-in zoom-in-95 duration-200 overflow-hidden">
        {/* Header */}
        <div className="flex justify-between items-center p-4 bg-neo-warm-mustard dark:bg-neo-warm-coral border-b-4 border-black dark:border-neo-warm-coral">
          <h3 className="font-editorial text-2xl font-bold truncate pr-4 text-black">{title}</h3>
          <button 
            onClick={onClose}
            className="bg-white p-1 border-2 border-black hover:bg-black hover:text-white transition-colors shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:translate-y-[2px] active:translate-x-[2px] active:shadow-none text-black"
          >
            <X size={20} />
          </button>
        </div>
        
        {/* Body */}
        <div className="p-6 font-grotesk bg-neo-white dark:bg-neo-dark-surface dark:text-white max-h-[70vh] overflow-y-auto">
          {children}
        </div>
      </div>
    </div>
  );
};

export default NeoModal;