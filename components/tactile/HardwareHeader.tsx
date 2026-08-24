import React from 'react';

interface HardwareHeaderProps {
  title: string;
  subtitle?: string;
  badge?: string;
  statusColor?: 'green' | 'amber' | 'coral' | 'blue';
  showScrews?: boolean;
  className?: string;
  rightElement?: React.ReactNode;
}

export const HardwareHeader: React.FC<HardwareHeaderProps> = ({
  title,
  subtitle,
  badge,
  statusColor,
  showScrews = true,
  className = '',
  rightElement,
}) => {
  return (
    <div className={`flex items-center justify-between px-4 py-2.5 bg-gradient-to-b from-neutral-100 to-neutral-200/80 dark:from-[#23262d] dark:to-[#17191e] border-b border-black/10 dark:border-white/10 rounded-t-[9px] select-none ${className}`}>
      <div className="flex items-center gap-2.5">
        {showScrews && <span className="hardware-screw shrink-0" />}
        
        {statusColor && (
          <span 
            className={`w-2 h-2 rounded-full ${
              statusColor === 'green' ? 'led-indicator-green' :
              statusColor === 'amber' ? 'led-indicator-amber' :
              statusColor === 'coral' ? 'led-indicator-coral' : 'led-indicator-blue'
            }`} 
          />
        )}

        <span className="font-ui font-bold text-xs md:text-sm tracking-widest uppercase text-neutral-900 dark:text-neutral-100 flex items-center gap-2">
          {title}
        </span>

        {subtitle && (
          <span className="hidden sm:inline-block font-mono text-[10px] text-neutral-500 dark:text-neutral-400 border-l border-neutral-300 dark:border-neutral-700 pl-2">
            {subtitle}
          </span>
        )}
      </div>

      <div className="flex items-center gap-3">
        {badge && (
          <span className="font-mono text-[9px] font-bold px-1.5 py-0.5 rounded bg-neutral-200 dark:bg-[#111215] text-neutral-700 dark:text-neutral-300 border border-neutral-300 dark:border-neutral-700 shadow-inner">
            {badge}
          </span>
        )}
        
        {rightElement}

        {showScrews && <span className="hardware-screw shrink-0 hidden sm:inline-block" />}
      </div>
    </div>
  );
};

export default HardwareHeader;
