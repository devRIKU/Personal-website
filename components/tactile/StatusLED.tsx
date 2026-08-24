import React from 'react';

interface StatusLEDProps {
  status?: 'green' | 'amber' | 'coral' | 'blue' | 'red' | 'off';
  pulse?: boolean;
  label?: string;
  className?: string;
}

export const StatusLED: React.FC<StatusLEDProps> = ({
  status = 'green',
  pulse = true,
  label,
  className = '',
}) => {
  const getLEDClass = () => {
    switch (status) {
      case 'amber':
        return 'led-indicator-amber';
      case 'coral':
        return 'led-indicator-coral';
      case 'blue':
        return 'led-indicator-blue';
      case 'red':
        return 'led-indicator-red';
      case 'off':
        return 'led-indicator-off';
      case 'green':
      default:
        return 'led-indicator-green';
    }
  };

  const isPulsing = pulse && status !== 'off';

  return (
    <span className={`inline-flex items-center gap-2 ${className}`}>
      <span className="relative flex items-center justify-center">
        {isPulsing && (
          <span 
            className={`absolute inline-flex h-full w-full rounded-full opacity-60 animate-ping ${
              status === 'green' ? 'bg-green-500' :
              status === 'amber' ? 'bg-amber-500' :
              status === 'coral' ? 'bg-rose-400' :
              status === 'blue' ? 'bg-sky-400' : 'bg-red-500'
            }`} 
          />
        )}
        <span className={`${getLEDClass()} relative shrink-0`} />
      </span>
      {label && (
        <span className="font-mono text-[10px] tracking-wider uppercase text-neutral-700 dark:text-neutral-300 font-semibold select-none">
          {label}
        </span>
      )}
    </span>
  );
};

export default StatusLED;
