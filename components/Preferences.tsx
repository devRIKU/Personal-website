import React, { useState } from 'react';
import { Code, Gamepad2, BrainCircuit, ArrowRight, Sparkles } from 'lucide-react';
import { motion } from 'motion/react';
import { PreferenceItem } from '../types';
import NeoModal from './NeoModal';
import TactileCard from './tactile/TactileCard';
import HardwareHeader from './tactile/HardwareHeader';
import StatusLED from './tactile/StatusLED';
import HardwareBadge from './tactile/HardwareBadge';
import BeveledButton from './tactile/BeveledButton';

const preferencesData: PreferenceItem[] = [
  {
    id: '1',
    category: 'BUILDING STUFF',
    title: 'Coding & Crafting',
    description: "I love building software tools, compilers, and interactive web canvases. Like Lego, but powered by deterministic logic.",
    details: "I'm deeply interested in TypeScript, React, systems architecture, and intelligent interfaces. I strive to make software feel energetic and responsive while maintaining strict architectural craftsmanship.",
    icon: 'code',
    color: 'neo-accent',
  },
  {
    id: '2',
    category: 'PLAYING GAMES',
    title: 'Precision & Strategy',
    description: "I don’t just play games. I analyze mechanics, route optimizations, and test physical system limits.",
    details: "I'm fascinated by game mechanics, speedrunning logic, and engineering inside sandboxes (like Minecraft Redstone or puzzle platformers like Portal & Hollow Knight).",
    icon: 'gamepad',
    color: 'neo-highlight',
  },
  {
    id: '3',
    category: 'CURIOSITY & LORE',
    title: 'Deep-Dive Synthesis',
    description: "Curious about everything from astrophysics and compilers to fictional world-building and lore.",
    details: "I enjoy collecting conceptual patterns across unrelated domains. Whether dissecting how rendering pipelines work or exploring intricate studio animation techniques, curiosity drives my code.",
    icon: 'brain',
    color: 'neo-support',
  },
];

const Preferences: React.FC = () => {
  const [selectedItem, setSelectedItem] = useState<PreferenceItem | null>(null);

  const getStatusColor = (id: string): 'green' | 'amber' | 'coral' => {
    switch (id) {
      case '1': return 'amber';
      case '2': return 'coral';
      case '3': return 'green';
      default: return 'amber';
    }
  };

  return (
    <section id="preferences" className="py-16 md:py-24 px-4 bg-transparent border-t-4 border-black dark:border-neo-dark-border transition-colors duration-300">
      <div className="max-w-6xl mx-auto">
        
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="mb-12 flex flex-col md:flex-row md:items-end justify-between border-b-4 border-black dark:border-neo-dark-border pb-6 gap-4"
        >
          <div>
            <h2 className="font-display text-4xl md:text-5xl font-black text-neutral-900 dark:text-white uppercase tracking-tight">
              PREFERENCES <span className="text-neo-secondary">&</span> FOCUS
            </h2>
          </div>
          <p className="font-grotesk text-sm text-neutral-600 dark:text-neutral-300 max-w-sm">
            What drives my engineering decisions, gameplay systems, and creative exploration.
          </p>
        </motion.div>

        {/* 3-Column Tactile Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {preferencesData.map((item, index) => {
            const statusCol = getStatusColor(item.id);
            const btnVariant = item.id === '1' ? 'accent' : item.id === '2' ? 'highlight' : 'support';

            return (
              <motion.div 
                key={item.id} 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{ duration: 0.5, delay: index * 0.1, ease: "easeOut" }}
                className="h-full flex"
              >
                <TactileCard
                  variant="panel"
                  header={
                    <HardwareHeader 
                      title={item.category}
                      statusColor={statusCol}
                      rightElement={
                        <div className="p-1 rounded-[4px] tactile-well text-neutral-800 dark:text-neutral-200">
                          {item.icon === 'code' && <Code size={14} />}
                          {item.icon === 'gamepad' && <Gamepad2 size={14} />}
                          {item.icon === 'brain' && <BrainCircuit size={14} />}
                        </div>
                      }
                    />
                  }
                  className="flex flex-col justify-between w-full"
                >
                  <div className="p-6">
                    <h3 className="font-display text-2xl font-bold mb-3 text-neutral-900 dark:text-white group-hover:text-neo-secondary transition-colors leading-tight">
                      {item.title}
                    </h3>
                    
                    <p className="font-grotesk text-sm text-neutral-600 dark:text-neutral-300 leading-relaxed">
                      {item.description}
                    </p>
                  </div>

                  {/* Footer Action */}
                  <div className="p-6 pt-0">
                    <BeveledButton
                      onClick={() => setSelectedItem(item)}
                      variant={btnVariant}
                      size="md"
                      className="w-full justify-between"
                      icon={<ArrowRight size={14} />}
                    >
                      Read Analysis
                    </BeveledButton>
                  </div>
                </TactileCard>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Detail Modal */}
      <NeoModal
        isOpen={!!selectedItem}
        onClose={() => setSelectedItem(null)}
        title={selectedItem?.title || 'FOCUS AREA'}
        badge={selectedItem?.category}
        statusColor={selectedItem?.id === '1' ? 'amber' : selectedItem?.id === '2' ? 'coral' : 'green'}
      >
        {selectedItem && (
          <div className="space-y-4">
            <p className="font-grotesk text-base leading-relaxed text-neutral-800 dark:text-neutral-200">
              {selectedItem.description}
            </p>

            <div className="tactile-well p-4 rounded-[10px] space-y-2">
              <span className="font-mono text-xs font-bold uppercase text-neutral-500 dark:text-neutral-400 block">
                Reflection & Philosophy
              </span>
              <p className="font-grotesk text-sm sm:text-base text-neutral-700 dark:text-neutral-300 leading-relaxed">
                {selectedItem.details}
              </p>
            </div>

            <BeveledButton
              onClick={() => setSelectedItem(null)}
              variant="default"
              className="w-full"
            >
              Close
            </BeveledButton>
          </div>
        )}
      </NeoModal>
    </section>
  );
};

export default Preferences;