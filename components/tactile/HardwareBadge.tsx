import React from 'react';

interface HardwareBadgeProps {
  label: string;
  telemetry?: string;
  variant?: 'neutral' | 'accent' | 'highlight' | 'support' | 'secondary' | 'info' | 'recessed';
  size?: 'sm' | 'md';
  icon?: React.ReactNode;
  className?: string;
}

export const HardwareBadge: React.FC<HardwareBadgeProps> = ({
  label,
  telemetry,
  variant = 'neutral',
  size = 'md',
  icon,
  className = '',
}) => {
  const getVariantStyles = () => {
    switch (variant) {
      case 'accent':
        return 'bg-amber-100 dark:bg-amber-950/50 border-amber-400/80 text-amber-950 dark:text-amber-300 font-bold';
      case 'highlight':
        return 'bg-rose-100 dark:bg-rose-950/50 border-rose-400/80 text-rose-950 dark:text-rose-300 font-bold';
      case 'support':
        return 'bg-emerald-100 dark:bg-emerald-950/50 border-emerald-400/80 text-emerald-950 dark:text-emerald-300 font-bold';
      case 'secondary':
        return 'bg-orange-100 dark:bg-orange-950/50 border-orange-400/80 text-orange-950 dark:text-orange-300 font-bold';
      case 'info':
        return 'bg-sky-100 dark:bg-sky-950/50 border-sky-400/80 text-sky-950 dark:text-sky-300 font-bold';
      case 'recessed':
        return 'tactile-well text-neutral-800 dark:text-neutral-300 font-medium';
      case 'neutral':
      default:
        return 'bg-neutral-100 dark:bg-neutral-800/90 border-neutral-300 dark:border-neutral-700 text-neutral-800 dark:text-neutral-200';
    }
  };

  const getSizeStyles = () => {
    return size === 'sm' ? 'px-2 py-0.5 text-[9px]' : 'px-2.5 py-1 text-[10px] md:text-xs';
  };

  return (
    <div 
      className={`inline-flex items-center gap-1.5 font-mono font-bold tracking-wider uppercase border rounded-[5px] shadow-[inset_0_1px_0_rgba(255,255,255,0.4)] dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.1)] ${getVariantStyles()} ${getSizeStyles()} ${className}`}
    >
      {icon && <span className="shrink-0 opacity-80">{icon}</span>}
      <span>{label}</span>
      {telemetry && (
        <span className="opacity-60 pl-1 border-l border-current">
          {telemetry}
        </span>
      )}
    </div>
  );
};

export default HardwareBadge;
