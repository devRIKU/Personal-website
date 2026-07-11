import React, { useEffect, useRef, useState } from 'react';
import { Github, Instagram, Youtube, Mail, ExternalLink, Star, Loader2, Copy, Check } from 'lucide-react';
import { motion } from 'motion/react';
import NeoModal from './NeoModal';

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

  // Animation State
  const [prefixText, setPrefixText] = useState("Hi!, I'm ");
  const [nameText, setNameText] = useState("Sanniva.");
  
  // Target states for layout stabilization
  const [targetPrefix, setTargetPrefix] = useState("Hi!, I'm ");
  const [targetName, setTargetName] = useState("Sanniva.");

  const [isBengali, setIsBengali] = useState(false);
  
  const prefixIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const nameIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Trigger initial animation on mount
  useEffect(() => {
    triggerAnimation(false);
  }, []);

  const scramble = (finalText: string, setText: React.Dispatch<React.SetStateAction<string>>, intervalRef: React.MutableRefObject<ReturnType<typeof setInterval> | null>) => {
    // Expanded character set for more chaos
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+[]{}|;:,.<>?/~`";
    let iterations = 0;
    
    if (intervalRef.current) clearInterval(intervalRef.current);

    intervalRef.current = setInterval(() => {
      setText(prev => 
        finalText.split("").map((letter, index) => {
          if (index < iterations) {
            return finalText[index];
          }
          return chars[Math.floor(Math.random() * chars.length)];
        }).join("")
      );

      if (iterations >= finalText.length) {
        if (intervalRef.current) clearInterval(intervalRef.current);
      }

      // Faster convergence
      iterations += 1 / 2.5;
    }, 20); // Faster tick rate (20ms)
  };

  const triggerAnimation = (targetIsBengali: boolean) => {
    const newPrefix = targetIsBengali ? "হাই! আমি " : "Hi!, I'm ";
    const newName = targetIsBengali ? "সানিভ" : "Sanniva.";
    
    // Update targets immediately to reserve correct layout space
    setTargetPrefix(newPrefix);
    setTargetName(newName);

    scramble(newPrefix, setPrefixText, prefixIntervalRef);
    scramble(newName, setNameText, nameIntervalRef);
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
    { name: 'GitHub', icon: <Github />, url: 'https://github.com/devriku', color: 'bg-neo-black text-white' },
    { name: 'YouTube', icon: <Youtube />, url: 'https://www.youtube.com/@Rikudoestuff', color: 'bg-neo-warm-coral text-black' },
    { name: 'Instagram', icon: <Instagram />, url: 'https://www.instagram.com/imsanniva/', color: 'bg-neo-warm-mustard text-black' },
  ];

  return (
    <section 
      id="about" 
      className="min-h-[90svh] flex items-center justify-center px-4 pt-32 pb-12 md:py-16 relative overflow-hidden transition-colors duration-300 bg-transparent"
    >
      <div className="absolute top-10 md:top-20 left-4 md:left-10 w-12 md:w-16 h-12 md:h-16 bg-neo-warm-mustard border-4 border-black dark:border-neo-warm-terracotta/20 dark:bg-transparent rounded-full opacity-60 animate-bounce"></div>
      <div className="absolute bottom-20 md:bottom-40 right-4 md:right-10 w-16 md:w-24 h-16 md:h-24 bg-neo-warm-sage border-4 border-black dark:border-neo-warm-sage/20 dark:bg-transparent rotate-12 -z-10 opacity-70"></div>
      
      <div className="max-w-6xl w-full mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-16 items-center">
        <div className="order-2 lg:order-1 space-y-6 md:space-y-8 text-center lg:text-left">
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative inline-block"
          >
             <h1 className={`font-display font-black leading-[1.1] md:leading-none tracking-tighter z-10 relative dark:text-white whitespace-nowrap transition-all duration-300 ${isBengali ? 'text-2xl xs:text-3xl sm:text-4xl md:text-6xl lg:text-7xl' : 'text-3xl xs:text-4xl sm:text-5xl md:text-7xl lg:text-8xl'}`}>
              {/* Layout Stabilizer for Prefix */}
              <span className="relative inline-block">
                <span className="opacity-0">{targetPrefix}</span>
                <span className="absolute inset-0">{prefixText}</span>
              </span>
              
              {/* Layout Stabilizer for Name */}
              <span 
                  onClick={handleNameClick}
                  className="relative inline-block text-neo-warm-coral dark:text-white cursor-pointer hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black px-2 -mr-2 ml-2 rounded-sm transition-colors select-none font-cursive italic font-medium"
                  title="Click to translate"
              >
                 <span className="opacity-0">{targetName}</span>
                 <span className="absolute inset-0 left-2">{nameText}</span>
              </span>
             </h1>
             <motion.div 
               initial={{ scaleX: 0 }}
               whileInView={{ scaleX: 1 }}
               viewport={{ once: true, amount: 0.1 }}
               transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
               className="absolute -bottom-1 md:-bottom-2 left-0 w-full h-3 md:h-4 bg-neo-warm-sage dark:bg-neo-warm-coral/40 -z-0 skew-x-12 origin-left"
             ></motion.div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 50, rotate: 3 }}
            whileInView={{ opacity: 1, y: 0, rotate: 1 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="bg-neo-white dark:bg-neo-dark-surface border-4 border-black dark:border-neo-dark-border p-5 md:p-6 shadow-neo dark:shadow-neo-dark transform hover:rotate-0 transition-transform duration-300"
          >
            <h2 className="font-ui font-bold text-lg md:text-xl mb-3 md:mb-4 border-b-2 border-black dark:border-neo-dark-border pb-2 text-neo-warm-terracotta dark:text-neo-warm-terracotta text-left uppercase tracking-tighter">
              Introduction_v1.0
            </h2>
            <div className="space-y-4">
              <p className="font-grotesk text-lg md:text-xl leading-relaxed text-neo-black dark:text-gray-200 text-left font-medium">
                Hey there! I’m a <span className="font-bold bg-neo-warm-mustard text-black px-1 dark:bg-neo-warm-terracotta/40 dark:text-white">8th grader</span> who’s way too into coding and techy experiments. 
              </p>
              <p className="font-grotesk text-lg md:text-xl leading-relaxed text-neo-black dark:text-gray-400 text-left">
                Most people say I’m funny—some even laugh at my jokes on purpose 😏. When I’m not breaking things or rebuilding them, I'm probably designing something colorful.
              </p>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
            className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
          >
             <button 
                onClick={fetchLatestRepo}
                className="font-ui font-bold text-lg px-8 py-3 bg-neo-black text-white dark:bg-white dark:text-black border-4 border-black dark:border-white hover:bg-neo-white hover:text-black dark:hover:bg-neo-warm-sage shadow-neo active:shadow-none active:translate-x-[5px] active:translate-y-[5px] transition-all"
             >
                VIEW WORK
             </button>
             <button 
                onClick={() => setShowContactModal(true)}
                className="font-ui font-bold text-lg px-8 py-3 bg-neo-warm-sage text-black border-4 border-black dark:border-neo-dark-border dark:bg-neo-dark-surface dark:text-neo-warm-coral hover:bg-neo-warm-mustard shadow-neo active:shadow-none active:translate-x-[5px] active:translate-y-[5px] transition-all"
             >
                CONTACT
             </button>
          </motion.div>
        </div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.9, rotate: 3 }}
          whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
          className="order-1 lg:order-2 flex justify-center relative"
        >
          <div className="relative w-64 h-64 md:w-80 md:h-80 lg:w-[420px] lg:h-[420px] group">
            
            {/* Shadow/Offset Div */}
            <div className="absolute inset-0 translate-x-3 translate-y-3 md:translate-x-6 md:translate-y-6 bg-neo-warm-terracotta border-4 md:border-8 border-black dark:border-neo-dark-border"></div>
            
            {/* Main Image Div - Thicker Frame */}
            <div className="absolute inset-0 border-4 md:border-8 border-black dark:border-neo-dark-border bg-gray-200 dark:bg-neo-dark-surface z-10 overflow-hidden">
                <img 
                  src="https://github.com/devriku.png" referrerPolicy="no-referrer"
                  alt="Sanniva Chatterjee" 
                  className="w-full h-full object-cover transition-all duration-500 grayscale group-hover:grayscale-0"
                />
            </div>

             <div 
               className="absolute -bottom-4 md:-bottom-6 -right-4 md:-right-6 z-20 bg-neo-warm-coral dark:bg-neo-dark-surface border-4 border-black dark:border-neo-warm-coral/50 px-3 md:px-4 py-1.5 md:py-2 font-ui font-bold text-sm md:text-base text-black dark:text-neo-warm-coral shadow-neo rotate-[5deg] animate-pulse cursor-default select-none"
             >
                SANNIVA_DEV
             </div>
          </div>
        </motion.div>
      </div>

      <NeoModal 
        isOpen={showWorkModal} 
        onClose={() => setShowWorkModal(false)} 
        title="Latest Project"
      >
        {loadingRepo ? (
          <div className="flex flex-col items-center justify-center py-12">
            <Loader2 className="animate-spin mb-4 text-neo-black dark:text-neo-warm-terracotta" size={48} />
            <p className="font-bold text-xl text-neo-black dark:text-white">Connecting to GitHub...</p>
          </div>
        ) : errorRepo ? (
           <div className="text-center py-8">
             <p className="font-bold text-red-600 dark:text-red-400 mb-4">Couldn't fetch the repo data.</p>
             <a 
                href="https://github.com/devriku" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-black text-white px-6 py-2 border-2 border-black font-bold hover:bg-white hover:text-black transition-colors"
             >
               Visit GitHub <ExternalLink size={16} />
             </a>
           </div>
        ) : repoData ? (
          <div className="space-y-6">
            <div className="bg-neo-bg-light dark:bg-[#222] p-4 border-2 border-black dark:border-gray-500">
              <div className="flex justify-between items-start mb-2">
                 <h4 className="font-bold text-2xl font-editorial dark:text-white text-neo-black">{repoData.name}</h4>
                 <div className="flex items-center gap-1 bg-neo-warm-mustard border border-black px-2 py-1 text-xs font-bold text-black">
                    <Star size={12} fill="black" /> {repoData.stargazers_count}
                 </div>
              </div>
              <p className="text-gray-800 dark:text-gray-300 mb-4 leading-relaxed">{repoData.description || "No description provided for this project."}</p>
              
              <div className="flex flex-wrap gap-2 mb-4">
                 {repoData.language && (
                   <span className="bg-neo-warm-terracotta dark:bg-neo-warm-terracotta/20 px-2 py-1 text-xs font-bold border border-black dark:border-neo-warm-terracotta rounded-full dark:text-neo-warm-terracotta text-white">
                     {repoData.language}
                   </span>
                 )}
                 <span className="bg-neo-warm-coral/20 dark:bg-white/10 px-2 py-1 text-xs font-bold border border-black dark:border-gray-500 rounded-full text-black dark:text-gray-300">
                   Updated: {new Date(repoData.updated_at).toLocaleDateString()}
                 </span>
              </div>
            </div>

            <a 
              href={repoData.html_url} 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 bg-neo-warm-sage text-black border-4 border-black py-3 font-bold text-lg hover:bg-neo-warm-mustard transition-all shadow-neo active:shadow-none"
            >
              Check Repository <ExternalLink size={20} />
            </a>
          </div>
        ) : null}
      </NeoModal>

      <NeoModal 
        isOpen={showContactModal} 
        onClose={() => setShowContactModal(false)} 
        title="Drop a Line"
      >
         <div className="space-y-4">
            <p className="text-lg mb-6 text-center font-medium text-neo-black dark:text-gray-300">
              Want to collab, chat code, or just say hi?
            </p>
            <div className="bg-neo-bg-light dark:bg-[#222] border-2 border-black dark:border-gray-500 p-4 mb-6 relative group">
              <div className="flex items-center gap-3 mb-2">
                 <div className="bg-neo-warm-mustard p-2 border border-black text-black">
                   <Mail size={20} />
                 </div>
                 <span className="font-bold text-lg text-neo-black dark:text-white">Email</span>
              </div>
              <div className="flex gap-2">
                 <code className="bg-neo-white dark:bg-neo-dark-surface text-neo-black dark:text-neo-warm-sage p-2 border border-black dark:border-gray-500 flex-1 overflow-x-auto text-sm">
                   sannivachatterjee25@gmail.com
                 </code>
                 <button 
                   onClick={copyEmail}
                   className="bg-neo-warm-terracotta text-white p-2 border-2 border-black dark:border-neo-warm-terracotta hover:bg-neo-warm-coral transition-colors"
                   title="Copy Email"
                 >
                   {copiedEmail ? <Check size={20} className="text-neo-warm-sage" /> : <Copy size={20} />}
                 </button>
              </div>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
               {contacts.map((contact) => (
                 <a
                   key={contact.name}
                   href={contact.url}
                   target="_blank"
                   rel="noopener noreferrer"
                   className={`flex items-center gap-3 p-4 border-2 border-black font-bold text-lg shadow-neo hover:translate-x-[2px] hover:translate-y-[2px] transition-all ${contact.color}`}
                 >
                   {contact.icon}
                   {contact.name}
                 </a>
               ))}
            </div>
         </div>
      </NeoModal>
    </section>
  );
}