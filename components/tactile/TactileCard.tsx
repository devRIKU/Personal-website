import React from 'react';
import { motion, type HTMLMotionProps } from 'motion/react';

export interface TactileCardProps extends HTMLMotionProps<'div'> {
  children: React.ReactNode;
  variant?: 'elevated' | 'recessed' | 'panel';
  header?: React.ReactNode;
  interactive?: boolean;
  enableSpringHover?: boolean;
  className?: string;
}

export const TactileCard: React.FC<TactileCardProps> = ({
  children,
  variant = 'elevated',
  header,
  interactive = false,
  enableSpringHover = true,
  className = '',
  ...props
}) => {
  const getVariantClass = () => {
    switch (variant) {
      case 'panel':
        return 'tactile-panel';
      case 'recessed':
        return 'tactile-well rounded-[10px]';
      case 'elevated':
      default:
        return 'tactile-card';
    }
  };

  const springTransition = {
    type: 'spring',
    stiffness: 380,
    damping: 26,
    mass: 0.8,
  } as const;

  return (
    <motion.div 
      whileHover={
        enableSpringHover || interactive 
          ? { y: -3, scale: 1.005, transition: springTransition }
          : undefined
      }
      whileTap={
        interactive 
          ? { y: 1, scale: 0.995, transition: { type: 'spring', stiffness: 500, damping: 25 } }
          : undefined
      }
      className={`relative overflow-hidden ${getVariantClass()} ${className}`}
      {...props}
    >
      {header}
      {children}
    </motion.div>
  );
};

export default TactileCard;
