import React, { useEffect, useRef, useState } from 'react';
import { Github, Instagram, Youtube, Mail, ExternalLink, Star, Loader2, Copy, Check, Terminal } from 'lucide-react';
import { motion } from 'motion/react';
import NeoModal from './NeoModal';
import TactileCard from './tactile/TactileCard';
import HardwareHeader from './tactile/HardwareHeader';
import BeveledButton from './tactile/BeveledButton';
import StatusLED from './tactile/StatusLED';
import HardwareBadge from './tactile/HardwareBadge';

interface RepoData {
  name: string;
  description: string;
  html_url: string;
  stargazers_count: number;
  language: string;
  updated_at: string;
}

export default function Hero() {
  const [showWorkModal, setShowWorkModal] = useState(false);
  const [showContactModal, setShowContactModal] = useState(false);
  
  const [repoData, setRepoData] = useState<RepoData | null>(null);
  const [loadingRepo, setLoadingRepo] = useState(false);
  const [errorRepo, setErrorRepo] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);

  // Dynamic Grade based on 1 April Academic Promotion
  const [gradeLabel, setGradeLabel] = useState<string>(() => {
    const date = new Date();
    const currentYear = date.getFullYear();
    const isPastAprilFirst = date.getMonth() > 3 || (date.getMonth() === 3 && date.getDate() >= 1);
    const sessionStartYear = isPastAprilFirst ? currentYear : currentYear - 1;
    const baseSessionYear = 2026;
    const baseGrade = 8;
    const calculatedGrade = Math.min(12, Math.max(8, baseGrade + (sessionStartYear - baseSessionYear)));
    return `${calculatedGrade}th Grader`;
  });

  // Animation State
  const [prefixText, setPrefixText] = useState("Hi!, I'm ");
  const [nameText, setNameText] = useState("Sanniva.");
  
  // Target states for layout stabilization
  const [targetPrefix, setTargetPrefix] = useState("Hi!, I'm ");
  const [targetName, setTargetName] = useState("Sanniva.");

  const [isBengali, setIsBengali] = useState(false);
  
  const prefixIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const nameIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Fetch verified academic grade from server
  useEffect(() => {
    const fetchGrade = async () => {
      try {
        const res = await fetch('/api/grade');
        if (res.ok) {
          const data = await res.json();
          if (data.label) {
            setGradeLabel(data.label);
          }
        }
      } catch (err) {
        // Fallback to local calculation
      }
    };

    fetchGrade();
  }, []);

  // Trigger initial animation on mount
  useEffect(() => {
    triggerAnimation(false);
  }, []);

  const scramble = (finalText: string, setText: React.Dispatch<React.SetStateAction<string>>, intervalRef: React.MutableRefObject<ReturnType<typeof setInterval> | null>, isTargetBengali: boolean) => {
    const latinChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+[]{}|;:,.<>?/~`";
    const bengaliChars = "অআইঈউঊঋএঐওঔকখগঘঙচছজঝঞটঠডঢণতথদধনপফবভমযরলশষসহ০১২৩৪৫৬৭৮৯";
    const chars = isTargetBengali ? bengaliChars : latinChars;
    const graphemes = Array.from(finalText);
    let iterations = 0;
    
    if (intervalRef.current) clearInterval(intervalRef.current);

    intervalRef.current = setInterval(() => {
      setText(() => 
        graphemes.map((char, index) => {
          if (index < iterations) {
            return char;
          }
          return chars[Math.floor(Math.random() * chars.length)];
        }).join("")
      );

      if (iterations >= graphemes.length) {
        if (intervalRef.current) clearInterval(intervalRef.current);
      }

      iterations += 1 / 2.5;
    }, 25);
  };

  const triggerAnimation = (targetIsBengali: boolean) => {
    const newPrefix = targetIsBengali ? "হাই! আমি " : "Hi!, I'm ";
    const newName = targetIsBengali ? "সানিভ" : "Sanniva.";
    
    setTargetPrefix(newPrefix);
    setTargetName(newName);

    scramble(newPrefix, setPrefixText, prefixIntervalRef, targetIsBengali);
    scramble(newName, setNameText, nameIntervalRef, targetIsBengali);
  };

  const handleNameClick = () => {
    const nextIsBengali = !isBengali;
    setIsBengali(nextIsBengali);
    triggerAnimation(nextIsBengali);
  };

  const fetchLatestRepo = async () => {
    setShowWorkModal(true);
    if (repoData) return;

    setLoadingRepo(true);
    setErrorRepo(false);
    try {
      const response = await fetch('https://api.github.com/users/devriku/repos?sort=updated&direction=desc');
      if (!response.ok) throw new Error('Failed to fetch');
      
      const data = await response.json();
      const latest = data.find((repo: any) => 
        repo.name.toLowerCase() !== 'personal-website' && 
        repo.name.toLowerCase() !== 'sanniva-portfolio'
      );
      
      if (latest) {
        setRepoData(latest);
      } else {
        setErrorRepo(true);
      }
    } catch (err) {
      console.error(err);
      setErrorRepo(true);
    } finally {
      setLoadingRepo(false);
    }
  };

  const copyEmail = () => {
    navigator.clipboard.writeText('sannivachatterjee25@gmail.com');
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const contacts = [
    { name: 'GitHub', icon: <Github size={18} />, url: 'https://github.com/devriku' },
    { name: 'YouTube', icon: <Youtube size={18} />, url: 'https://www.youtube.com/@Rikudoestuff' },
    { name: 'Instagram', icon: <Instagram size={18} />, url: 'https://www.instagram.com/imsanniva/' },
  ];

  return (
    <section 
      id="about" 
      className="min-h-[85svh] flex items-center justify-center px-4 pt-24 pb-12 md:py-16 relative overflow-hidden transition-colors duration-300 bg-transparent"
    >
      <div className="max-w-6xl w-full mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 items-center">
        
        {/* Left Column: Bio & Headline */}
        <div className="lg:col-span-7 space-y-6 md:space-y-8 text-center lg:text-left order-2 lg:order-1">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="space-y-2"
          >
             <h1 className="font-display text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tight text-neutral-900 dark:text-white leading-[1.08] select-none break-words">
              {/* Layout Stabilizer for Prefix */}
              <span className={`relative inline-block ${isBengali ? 'font-bengali font-bold' : ''}`}>
                <span className="opacity-0">{targetPrefix}</span>
                <span className="absolute inset-0">{prefixText}</span>
              </span>
              
              {/* Interactive Name Switcher */}
              <span 
                  onClick={handleNameClick}
                  className={`relative inline-block text-neo-secondary dark:text-neo-accent cursor-pointer hover:bg-neutral-900 hover:text-white dark:hover:bg-white dark:hover:text-black px-1.5 sm:px-2 -mr-1 sm:-mr-2 ml-1 transition-all rounded-[6px] select-none ${
                    isBengali ? 'font-bengali font-bold not-italic' : 'font-cursive italic font-medium'
                  }`}
                  title="Click to toggle English / Bengali script"
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') handleNameClick(); }}
                  aria-label="Toggle Bengali name pronunciation"
              >
                 <span className="opacity-0">{targetName}</span>
                 <span className="absolute inset-0 left-1.5 sm:left-2 flex items-center">{nameText}</span>
              </span>
             </h1>
          </motion.div>

          {/* Tactile Profile Card */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.6, delay: 0.15, ease: "easeOut" }}
          >
            <TactileCard 
              variant="panel"
              header={
                <HardwareHeader 
                  title="PROFILE" 
                  subtitle="SYSTEMS & INTERFACES" 
                />
              }
              className="p-0 shadow-lg"
            >
              <div className="p-4 sm:p-6 md:p-8 space-y-3.5 sm:space-y-4">
                <p className="font-grotesk text-sm sm:text-base md:text-lg leading-relaxed text-neutral-900 dark:text-neutral-100 text-left">
                  Hey there! I’m an{' '}
                  <span className="font-bold bg-amber-100 dark:bg-amber-950/60 text-amber-950 dark:text-amber-300 px-2 py-0.5 border border-amber-300 dark:border-amber-700/60 rounded-[6px] transition-transform hover:scale-105 inline-block cursor-default">
                    {gradeLabel}
                  </span>{' '}
                  passionate about programming, web development, and tech.
                </p>

                <p className="font-grotesk text-sm sm:text-base md:text-lg leading-relaxed text-neutral-700 dark:text-neutral-300 text-left">
                  When I’m not coding, you can find me reading books, listening to music, or playing video games.
                </p>
                
                <div className="pt-2 flex flex-wrap items-center gap-2 border-t border-black/10 dark:border-white/10 font-mono text-[11px] text-neutral-600 dark:text-neutral-400">
                  <span className="font-semibold text-neutral-800 dark:text-neutral-200">React • TypeScript • Tailwind</span>
                  <span className="text-neutral-400 dark:text-neutral-600">•</span>
                  <span>UI Architecture</span>
                </div>
              </div>
            </TactileCard>
          </motion.div>

          {/* Action Buttons */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
            className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start pt-2 w-full"
          >
             <BeveledButton 
                onClick={fetchLatestRepo}
                variant="accent"
                size="lg"
                icon={<Terminal size={18} />}
                className="w-full sm:w-auto"
             >
                VIEW WORK
             </BeveledButton>
             
             <BeveledButton 
                onClick={() => setShowContactModal(true)}
                variant="support"
                size="lg"
                icon={<Mail size={18} />}
                className="w-full sm:w-auto"
             >
                CONTACT ME
             </BeveledButton>
          </motion.div>
        </div>

        {/* Right Column: Hero Visual Frame */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
          className="lg:col-span-5 flex justify-center relative order-1 lg:order-2"
        >
          <div className="relative w-56 h-56 sm:w-72 sm:h-72 md:w-80 md:h-80 group">
            {/* Secondary Accent Offset Plate with Tactile Chamfers */}
            <div className="absolute inset-0 translate-x-3 translate-y-3 md:translate-x-4 md:translate-y-4 bg-gradient-to-br from-neo-secondary to-[#c25e44] border border-black/30 dark:border-white/10 rounded-[14px] shadow-lg"></div>
            
            {/* Main Picture Frame */}
            <div className="absolute inset-0 tactile-panel p-2 z-10 overflow-hidden rounded-[14px] shadow-2xl">
              <div className="w-full h-full rounded-[10px] overflow-hidden tactile-well relative">
                <img 
                  src="https://github.com/devriku.png" 
                  referrerPolicy="no-referrer"
                  alt="Sanniva Chatterjee" 
                  onError={(e) => {
                    e.currentTarget.src = "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=600&auto=format&fit=crop&q=80";
                  }}
                  className="w-full h-full object-cover transition-all duration-300 group-hover:scale-105"
                />
              </div>
            </div>

            {/* Floating Badge */}
            <div className="absolute -bottom-2 md:-bottom-3 -right-2 md:-right-3 z-20 tactile-panel px-3 py-1 font-mono font-bold text-xs text-neutral-900 dark:text-white rounded-[6px] shadow-lg border border-black/10 dark:border-white/15">
              <span>SANNIVA CHATTERJEE</span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Github Latest Repo Modal */}
      <NeoModal 
        isOpen={showWorkModal} 
        onClose={() => setShowWorkModal(false)} 
        title="LATEST REPOSITORY"
        statusColor={loadingRepo ? 'amber' : errorRepo ? 'coral' : 'green'}
        badge="GITHUB"
      >
        {loadingRepo ? (
          <div className="flex flex-col items-center justify-center py-12">
            <Loader2 className="animate-spin mb-4 text-neo-secondary" size={36} />
            <p className="font-mono font-bold text-xs tracking-wider uppercase text-neutral-700 dark:text-neutral-300">Connecting to GitHub...</p>
          </div>
        ) : errorRepo ? (
           <div className="text-center py-6 space-y-4">
             <p className="font-mono font-bold text-red-600 dark:text-red-400 text-xs">COULD NOT FETCH REPOSITORY DATA</p>
             <BeveledButton 
                asAnchor
                href="https://github.com/devriku" 
                target="_blank" 
                rel="noopener noreferrer"
                variant="accent"
                icon={<ExternalLink size={14} />}
                iconPosition="right"
             >
               Visit GitHub Profile
             </BeveledButton>
           </div>
        ) : repoData ? (
          <div className="space-y-4">
            <div className="tactile-well p-4 rounded-[10px] space-y-3">
              <div className="flex justify-between items-start">
                 <h4 className="font-display font-bold text-lg text-neutral-900 dark:text-white">{repoData.name}</h4>
                 <div className="tactile-panel px-2 py-0.5 flex items-center gap-1 text-xs font-bold text-amber-600 dark:text-amber-400">
                    <Star size={12} fill="currentColor" /> {repoData.stargazers_count}
                 </div>
              </div>
              <p className="text-neutral-700 dark:text-neutral-300 leading-relaxed font-grotesk text-sm">{repoData.description || "No description provided for this project."}</p>
              
              <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-black/10 dark:border-white/10 text-xs font-mono text-neutral-600 dark:text-neutral-400">
                 {repoData.language && (
                   <span className="font-bold text-neutral-900 dark:text-white bg-black/5 dark:bg-white/10 px-2 py-0.5 rounded-[4px]">
                     {repoData.language}
                   </span>
                 )}
                 <span>Updated {new Date(repoData.updated_at).toLocaleDateString()}</span>
              </div>
            </div>

            <BeveledButton 
              asAnchor
              href={repoData.html_url} 
              target="_blank" 
              rel="noopener noreferrer" 
              variant="accent"
              size="lg"
              className="w-full"
              icon={<ExternalLink size={16} />}
              iconPosition="right"
            >
              Open on GitHub
            </BeveledButton>
          </div>
        ) : null}
      </NeoModal>

      {/* Contact Modal */}
      <NeoModal 
        isOpen={showContactModal} 
        onClose={() => setShowContactModal(false)} 
        title="GET IN TOUCH"
        statusColor="green"
        badge="CONTACT"
      >
         <div className="space-y-4">
            <p className="text-sm font-grotesk text-neutral-700 dark:text-neutral-300">
              Feel free to reach out for collaborations, coding discussions, or opportunities.
            </p>
            
            <div className="tactile-well p-3.5 rounded-[10px] space-y-2">
              <span className="font-mono text-xs font-bold uppercase text-neutral-500 dark:text-neutral-400 block">Direct Email</span>
              <div className="flex gap-2">
                 <code className="tactile-panel px-3 py-2 flex-1 overflow-x-auto text-xs font-mono text-neutral-900 dark:text-neutral-100 flex items-center">
                   sannivachatterjee25@gmail.com
                 </code>
                 <BeveledButton 
                   onClick={copyEmail}
                   variant="accent"
                   size="sm"
                   title="Copy Email"
                 >
                   {copiedEmail ? <Check size={16} /> : <Copy size={16} />}
                 </BeveledButton>
              </div>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-1">
               {contacts.map((contact) => (
                 <BeveledButton
                   key={contact.name}
                   asAnchor
                   href={contact.url}
                   target="_blank"
                   rel="noopener noreferrer"
                   variant="default"
                   size="md"
                   icon={contact.icon}
                   className="w-full"
                 >
                   {contact.name}
                 </BeveledButton>
               ))}
            </div>
         </div>
      </NeoModal>
    </section>
  );
}
