import React, { useEffect, useRef, useState } from 'react';
import { Github, Instagram, Youtube, Mail, ExternalLink, Star, Loader2, Copy, Check } from 'lucide-react';
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
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  
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

  // Easter Egg State
  const clickCountRef = useRef(0);
  const [showSecretModal, setShowSecretModal] = useState(false);
  const clickTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Trigger initial animation when visible
  useEffect(() => {
    if (isVisible) {
      triggerAnimation(false);
    }
  }, [isVisible]);

  const scramble = (finalText: string, setText: React.Dispatch<React.SetStateAction<string>>, intervalRef: React.MutableRefObject<ReturnType<typeof setInterval> | null>) => {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ!@#$%^&*()_+[]{}|;:,.<>?";
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

      iterations += 1 / 3;
    }, 30);
  };

  const triggerAnimation = (targetIsBengali: boolean) => {
    const newPrefix = targetIsBengali ? "হাই! আমি " : "Hi!, I'm ";
    const newName = targetIsBengali ? "সানিভা" : "Sanniva.";
    
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

  const handleSecretClick = () => {
    clickCountRef.current += 1;
    
    if (clickTimeoutRef.current) {
      clearTimeout(clickTimeoutRef.current);
    }
    
    // Reset count if no click within 500ms
    clickTimeoutRef.current = setTimeout(() => {
      clickCountRef.current = 0;
    }, 500);

    if (clickCountRef.current >= 3) {
      setShowSecretModal(true);
      clickCountRef.current = 0;
      if (clickTimeoutRef.current) clearTimeout(clickTimeoutRef.current);
    }
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
    { name: 'YouTube', icon: <Youtube />, url: 'https://youtube.com/@rikudoesstuff', color: 'bg-neo-warm-coral text-black' },
    { name: 'Instagram', icon: <Instagram />, url: 'https://www.instagram.com/imsanniva/', color: 'bg-neo-warm-mustard text-black' },
  ];

  return (
    <section 
      id="about" 
      ref={sectionRef}
      className="min-h-[90vh] flex items-center justify-center px-4 py-8 md:py-16 relative overflow-hidden transition-colors duration-300 bg-transparent"
    >
      <div className="absolute top-10 md:top-20 left-4 md:left-10 w-12 md:w-16 h-12 md:h-16 bg-neo-warm-mustard border-4 border-black dark:border-neo-warm-terracotta/20 dark:bg-transparent rounded-full opacity-60 animate-bounce"></div>
      <div className="absolute bottom-20 md:bottom-40 right-4 md:right-10 w-16 md:w-24 h-16 md:h-24 bg-neo-warm-sage border-4 border-black dark:border-neo-warm-sage/20 dark:bg-transparent rotate-12 -z-10 opacity-70"></div>
      
      <div className="max-w-6xl w-full mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-16 items-center">
        <div className="order-2 lg:order-1 space-y-6 md:space-y-8 text-center lg:text-left">
          <div className={`relative inline-block transition-all duration-1000 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
             <h1 className="font-editorial text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-black leading-[1.1] md:leading-none tracking-tighter z-10 relative dark:text-white whitespace-nowrap">
              {/* Layout Stabilizer for Prefix */}
              <span className="relative inline-block">
                <span className="opacity-0">{targetPrefix}</span>
                <span className="absolute inset-0">{prefixText}</span>
              </span>
              
              {/* Layout Stabilizer for Name */}
              <span 
                  onClick={handleNameClick}
                  className="relative inline-block text-neo-warm-coral dark:text-white cursor-pointer hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black px-2 -mx-2 rounded-sm transition-colors select-none"
                  title="Click to translate"
              >
                 <span className="opacity-0">{targetName}</span>
                 <span className="absolute inset-0 left-2">{nameText}</span>
              </span>
             </h1>
             <div className={`absolute -bottom-1 md:-bottom-2 left-0 w-full h-3 md:h-4 bg-neo-warm-sage dark:bg-neo-warm-coral/40 -z-0 skew-x-12 transition-all duration-1000 delay-500 ${isVisible ? 'scale-x-100' : 'scale-x-0'}`}></div>
          </div>

          <div className={`bg-neo-white dark:bg-neo-dark-surface border-4 border-black dark:border-neo-dark-border p-5 md:p-6 shadow-neo dark:shadow-neo-dark transform hover:rotate-0 transition-all duration-1000 delay-300 ease-out ${isVisible ? 'opacity-100 translate-y-0 lg:rotate-1' : 'opacity-0 translate-y-12 lg:rotate-3'}`}>
            <h2 className="font-ui font-bold text-lg md:text-xl mb-3 md:mb-4 border-b-2 border-black dark:border-neo-dark-border pb-2 text-neo-warm-coral dark:text-neo-warm-terracotta text-left uppercase tracking-tighter">
              Introduction_v1.0
            </h2>
            <div className="space-y-4">
              <p className="font-grotesk text-lg md:text-xl leading-relaxed dark:text-gray-200 text-left font-medium">
                Hey there! I’m a <span className="font-bold bg-neo-warm-mustard text-black px-1 dark:bg-neo-warm-terracotta/40 dark:text-white">7th grader</span> who’s way too into coding and techy experiments. 
              </p>
              <p className="font-grotesk text-lg md:text-xl leading-relaxed dark:text-gray-400 text-left">
                Most people say I’m funny—some even laugh at my jokes on purpose 😏. When I’m not breaking things or rebuilding them, I'm probably designing something colorful.
              </p>
            </div>
          </div>

          <div className={`flex flex-col sm:flex-row gap-4 justify-center lg:justify-start transition-all duration-1000 delay-500 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
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
          </div>
        </div>

        <div className={`order-1 lg:order-2 flex justify-center relative transition-all duration-1000 delay-100 ${isVisible ? 'opacity-100 scale-100 rotate-0' : 'opacity-0 scale-95 rotate-3'}`}>
          <div className="relative w-64 h-64 md:w-80 md:h-80 lg:w-[420px] lg:h-[420px] group">
            
            {/* Shadow/Offset Div */}
            <div className="absolute inset-0 translate-x-3 translate-y-3 md:translate-x-6 md:translate-y-6 bg-neo-warm-terracotta border-4 md:border-8 border-black dark:border-neo-dark-border"></div>
            
            {/* Main Image Div - Thicker Frame */}
            <div className="absolute inset-0 border-4 md:border-8 border-black dark:border-neo-dark-border bg-gray-200 dark:bg-neo-dark-surface z-10 overflow-hidden">
                <img 
                  src="https://github.com/devriku.png"
                  alt="Sanniva Chatterjee" 
                  className="w-full h-full object-cover transition-all duration-500 grayscale group-hover:grayscale-0"
                />
            </div>

             <div 
               onClick={handleSecretClick}
               className="absolute -bottom-4 md:-bottom-6 -right-4 md:-right-6 z-20 bg-neo-warm-coral dark:bg-neo-dark-surface border-4 border-black dark:border-neo-warm-coral/50 px-3 md:px-4 py-1.5 md:py-2 font-ui font-bold text-sm md:text-base text-black dark:text-neo-warm-coral shadow-neo rotate-[5deg] animate-pulse cursor-pointer select-none active:scale-95 transition-transform"
             >
                SANNIVA_DEV
             </div>
          </div>
        </div>
      </div>

      <NeoModal 
        isOpen={showWorkModal} 
        onClose={() => setShowWorkModal(false)} 
        title="Latest Project"
      >
        {loadingRepo ? (
          <div className="flex flex-col items-center justify-center py-12">
            <Loader2 className="animate-spin mb-4 text-neo-black dark:text-neo-warm-terracotta" size={48} />
            <p className="font-bold text-xl dark:text-white">Connecting to GitHub...</p>
          </div>
        ) : errorRepo ? (
           <div className="text-center py-8">
             <p className="font-bold text-red-500 mb-4">Couldn't fetch the repo data.</p>
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
            <div className="bg-neo-bg-light dark:bg-neo-dark-bg p-4 border-2 border-black">
              <div className="flex justify-between items-start mb-2">
                 <h4 className="font-bold text-2xl font-editorial dark:text-white">{repoData.name}</h4>
                 <div className="flex items-center gap-1 bg-neo-warm-mustard border border-black px-2 py-1 text-xs font-bold text-black">
                    <Star size={12} fill="black" /> {repoData.stargazers_count}
                 </div>
              </div>
              <p className="text-gray-600 dark:text-gray-400 mb-4 leading-relaxed">{repoData.description || "No description provided for this project."}</p>
              
              <div className="flex flex-wrap gap-2 mb-4">
                 {repoData.language && (
                   <span className="bg-neo-warm-terracotta dark:bg-neo-warm-terracotta/10 px-2 py-1 text-xs font-bold border border-black rounded-full dark:text-neo-warm-terracotta text-white">
                     {repoData.language}
                   </span>
                 )}
                 <span className="bg-neo-warm-coral/20 dark:bg-white/5 px-2 py-1 text-xs font-bold border border-black rounded-full text-black dark:text-gray-400">
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
            <p className="text-lg mb-6 text-center font-medium dark:text-gray-300">
              Want to collab, chat code, or just say hi?
            </p>
            <div className="bg-neo-bg-light dark:bg-neo-dark-bg border-2 border-black p-4 mb-6 relative group">
              <div className="flex items-center gap-3 mb-2">
                 <div className="bg-neo-warm-mustard p-2 border border-black text-black">
                   <Mail size={20} />
                 </div>
                 <span className="font-bold text-lg dark:text-white">Email</span>
              </div>
              <div className="flex gap-2">
                 <code className="bg-neo-white dark:bg-neo-dark-surface dark:text-neo-warm-sage p-2 border border-black flex-1 overflow-x-auto text-sm">
                   sannivachatterjee25@gmail.com
                 </code>
                 <button 
                   onClick={copyEmail}
                   className="bg-neo-warm-terracotta text-white p-2 border-2 border-black hover:bg-neo-warm-coral transition-colors"
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

      <NeoModal 
        isOpen={showSecretModal} 
        onClose={() => setShowSecretModal(false)} 
        title="SECRET UNLOCKED 🔓"
      >
         <div className="text-center space-y-4 py-4">
            <div className="text-6xl animate-bounce">👾</div>
            <h3 className="font-editorial text-3xl font-bold">You found the Easter Egg!</h3>
            <p className="font-grotesk text-lg">
              Congratulations! You've clicked the logo 3 times. 
              There is no prize, but you get infinite bragging rights.
            </p>
            <div className="bg-black text-green-400 p-4 font-mono text-left text-sm rounded border-2 border-gray-800 shadow-neo-sm">
              <p>{`> access_level: "super_admin"`}</p>
              <p>{`> unlocking_secrets...`}</p>
              <p>{`> error: secrets_not_found_404`}</p>
              <p className="animate-pulse">{`> _`}</p>
            </div>
            <button 
              onClick={() => setShowSecretModal(false)}
              className="mt-4 px-6 py-2 bg-neo-warm-mustard border-2 border-black font-bold shadow-neo hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all"
            >
              CLOSE TERMINAL
            </button>
         </div>
      </NeoModal>
    </section>
  );
}