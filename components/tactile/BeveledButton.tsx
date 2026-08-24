import React from 'react';

interface BeveledButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'accent' | 'highlight' | 'support' | 'secondary' | 'sky' | 'neutral' | 'recessed';
  size?: 'sm' | 'md' | 'lg';
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  className?: string;
  asAnchor?: boolean;
  href?: string;
  target?: string;
  rel?: string;
}

export const BeveledButton: React.FC<BeveledButtonProps> = ({
  children,
  variant = 'default',
  size = 'md',
  icon,
  iconPosition = 'left',
  className = '',
  asAnchor = false,
  href,
  target,
  rel,
  ...props
}) => {
  const getVariantClass = () => {
    switch (variant) {
      case 'accent':
        return 'tactile-button-accent';
      case 'highlight':
        return 'tactile-button-highlight';
      case 'support':
        return 'tactile-button-support';
      case 'secondary':
        return 'tactile-button-secondary';
      case 'sky':
        return 'tactile-button-sky';
      case 'recessed':
        return 'tactile-well text-neutral-800 dark:text-neutral-200 hover:text-black dark:hover:text-white';
      case 'neutral':
      case 'default':
      default:
        return 'tactile-button';
    }
  };

  const getSizeClass = () => {
    switch (size) {
      case 'sm':
        return 'px-3 py-1.5 text-xs font-bold gap-1.5 rounded-[6px]';
      case 'lg':
        return 'px-7 py-3.5 text-sm md:text-base font-bold gap-2.5 rounded-[10px] tracking-wider';
      case 'md':
      default:
        return 'px-5 py-2.5 text-xs md:text-sm font-bold gap-2 rounded-[8px] tracking-wide';
    }
  };

  const combinedClass = `inline-flex items-center justify-center font-ui uppercase transition-all select-none ${getVariantClass()} ${getSizeClass()} ${className}`;

  if (asAnchor && href) {
    return (
      <a 
        href={href} 
        target={target} 
        rel={rel} 
        className={combinedClass}
      >
        {icon && iconPosition === 'left' && <span className="shrink-0">{icon}</span>}
        {children}
        {icon && iconPosition === 'right' && <span className="shrink-0">{icon}</span>}
      </a>
    );
  }

  return (
    <button 
      className={combinedClass}
      {...props}
    >
      {icon && iconPosition === 'left' && <span className="shrink-0">{icon}</span>}
      {children}
      {icon && iconPosition === 'right' && <span className="shrink-0">{icon}</span>}
    </button>
  );
};

export default BeveledButton;
