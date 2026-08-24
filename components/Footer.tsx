import React from 'react';
import { Github, Youtube, BookOpen, Mail, Terminal, ExternalLink } from 'lucide-react';
import StatusLED from './tactile/StatusLED';
import HardwareBadge from './tactile/HardwareBadge';
import BeveledButton from './tactile/BeveledButton';
import TactileCard from './tactile/TactileCard';
import HardwareHeader from './tactile/HardwareHeader';

const Footer: React.FC = () => {
  return (
    <footer id="contact" className="py-12 md:py-16 px-4 border-t-4 border-black dark:border-neo-dark-border bg-transparent text-neutral-900 dark:text-white relative transition-colors duration-300">
      <div className="max-w-6xl mx-auto space-y-6">
        <TactileCard 
          variant="panel" 
          header={
            <HardwareHeader 
              title="CONNECT"
              statusColor="green"
            />
          }
          className="w-full"
        >
          <div className="p-6 md:p-8 flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="text-center md:text-left space-y-2.5">
              <h2 className="font-display text-3xl md:text-4xl font-black uppercase tracking-tight text-neutral-900 dark:text-white">
                SANNIVA <span className="text-neo-secondary">CHATTERJEE</span>
              </h2>
              <p className="font-grotesk text-sm text-neutral-600 dark:text-neutral-300 max-w-md">
                Systems Builder, Computer Science Student & Retro Tactile UI Enthusiast. Let's create impactful tools together.
              </p>
            </div>
            
            <div className="flex flex-wrap justify-center md:justify-end gap-3">
              <BeveledButton 
                asAnchor
                href="https://github.com/devriku" 
                target="_blank" 
                rel="noopener noreferrer" 
                variant="sky"
                size="sm"
                icon={<Github size={15} />}
              >
                GITHUB
              </BeveledButton>

              <BeveledButton 
                asAnchor
                href="https://www.youtube.com/@Rikudoestuff" 
                target="_blank" 
                rel="noopener noreferrer" 
                variant="highlight"
                size="sm"
                icon={<Youtube size={15} />}
              >
                YOUTUBE
              </BeveledButton>

              <BeveledButton 
                asAnchor
                href="https://blog-sanniva.vercel.app" 
                target="_blank" 
                rel="noopener noreferrer" 
                variant="support"
                size="sm"
                icon={<BookOpen size={15} />}
              >
                BLOG
              </BeveledButton>

              <BeveledButton 
                asAnchor
                href="mailto:sannivachatterjee25@gmail.com" 
                variant="accent"
                size="sm"
                icon={<Mail size={15} />}
              >
                EMAIL ME
              </BeveledButton>
            </div>
          </div>
        </TactileCard>

        {/* Tactile System Status Bar */}
        <div className="tactile-well p-3.5 rounded-[10px] flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left font-mono text-xs text-neutral-700 dark:text-neutral-300">
          <div className="flex items-center gap-2">
            <StatusLED status="green" pulse={true} label="BUILT WITH TS + REACT + TAILWIND" />
          </div>
          <div className="text-neutral-600 dark:text-neutral-400 font-medium">
            © {new Date().getFullYear()} Sanniva Chatterjee • Built with deterministic craftsmanship
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;