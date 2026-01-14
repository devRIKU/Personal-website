import React, { useEffect, useRef, useState } from 'react';
import { Github, Twitter, Instagram, Youtube, Mail, ExternalLink, Star, Loader2, Copy, Check } from 'lucide-react';
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
    { name: 'GitHub', icon: <Github />, url: 'https://github.com/devriku', color: 'bg-neo-black text-white dark:bg-neo-dark-surface dark:text-gray-300 dark:border-neo-dark-border' },
    { name: 'YouTube', icon: <Youtube />, url: 'https://youtube.com/@rikudoesstuff', color: 'bg-red-500 text-white dark:bg-red-500/20 dark:text-red-400 dark:border-red-500/30' },
    { name: 'Instagram', icon: <Instagram />, url: 'https://www.instagram.com/imsanniva/', color: 'bg-neo-pink text-black dark:bg-neo-pink/20 dark:text-neo-pink dark:border-neo-pink/30' },
  ];

  return (
    <section 
      id="about" 
      ref={sectionRef}
      className="min-h-[90vh] flex items-center justify-center px-4 py-8 md:py-16 relative overflow-hidden transition-colors duration-300"
    >
      <div className="absolute top-10 md:top-20 left-4 md:left-10 w-12 md:w-16 h-12 md:h-16 bg-neo-yellow/40 border-4 border-black dark:border-neo-blue/20 dark:bg-transparent rounded-full mix-blend-multiply dark:mix-blend-normal opacity-50 animate-bounce delay-75"></div>
      <div className="absolute bottom-20 md:bottom-40 right-4 md:right-10 w-16 md:w-24 h-16 md:h-24 bg-neo-pink/40 border-4 border-black dark:border-neo-green/20 dark:bg-transparent rotate-12 -z-10 opacity-70"></div>
      
      <div className="max-w-6xl w-full mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-16 items-center">
        <div className="order-2 lg:order-1 space-y-6 md:space-y-8 text-center lg:text-left">
          <div className={`relative inline-block transition-all duration-1000 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
             <h1 className="font-editorial text-5xl md:text-7xl lg:text-8xl font-black leading-[1.1] md:leading-none tracking-tighter z-10 relative dark:text-white">
              Hi!, I'm Sanniva.
             </h1>
             <div className={`absolute -bottom-1 md:-bottom-2 left-0 w-full h-3 md:h-4 bg-neo-green dark:bg-neo-pink/40 -z-0 skew-x-12 transition-all duration-1000 delay-500 ${isVisible ? 'scale-x-100' : 'scale-x-0'}`}></div>
          </div>

          <div className={`bg-white dark:bg-neo-dark-surface border-4 border-black dark:border-neo-dark-border p-5 md:p-6 shadow-neo dark:shadow-neo-dark transform lg:rotate-1 hover:rotate-0 transition-all duration-1000 delay-300 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
            <h2 className="font-ui font-bold text-lg md:text-xl mb-3 md:mb-4 border-b-2 border-black dark:border-neo-dark-border pb-2 dark:text-neo-blue text-left uppercase tracking-tighter">
              Introduction_v1.0
            </h2>
            <p className="font-grotesk text-lg md:text-xl leading-relaxed mb-4 dark:text-gray-300 text-left">
              Hey there! I’m a <span className="font-bold bg-neo-yellow text-black px-1 dark:bg-neo-blue/20 dark:text-neo-blue">7th grader</span> at Techno India Group Public School who’s way too into coding and all things techy. 
            </p>
            <p className="font-grotesk text-lg md:text-xl leading-relaxed dark:text-gray-400 text-left">
              Most people say I’m funny—some even laugh at my jokes on purpose 😏. When I’m not figuring out how stuff works, breaking it, or trying to rebuild it, you’ll find me doing something random but probably cool.
            </p>
          </div>

          <div className={`flex flex-col sm:flex-row gap-4 justify-center lg:justify-start transition-all duration-1000 delay-500 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
             <button 
                onClick={fetchLatestRepo}
                className="font-ui font-bold text-lg px-8 py-3 bg-black text-white dark:bg-neo-dark-surface dark:text-neo-green border-4 border-black dark:border-neo-dark-border hover:bg-white hover:text-black dark:hover:bg-neo-green dark:hover:text-black shadow-neo dark:shadow-neo-dark active:shadow-none active:translate-x-[5px] active:translate-y-[5px] transition-all"
             >
                VIEW WORK
             </button>
             <button 
                onClick={() => setShowContactModal(true)}
                className="font-ui font-bold text-lg px-8 py-3 bg-neo-blue text-black border-4 border-black dark:border-neo-dark-border dark:bg-neo-dark-surface dark:text-neo-pink hover:bg-neo-pink dark:hover:bg-neo-pink dark:hover:text-black shadow-neo dark:shadow-neo-dark active:shadow-none active:translate-x-[5px] active:translate-y-[5px] transition-all"
             >
                CONTACT
             </button>
          </div>
        </div>

        <div className={`order-1 lg:order-2 flex justify-center relative transition-all duration-1000 delay-100 ${isVisible ? 'opacity-100 scale-100 rotate-0' : 'opacity-0 scale-95 rotate-3'}`}>
          <div className="relative w-64 h-72 md:w-80 md:h-96 lg:w-96 lg:h-[500px] group">
            <div className="absolute inset-0 bg-black translate-x-3 translate-y-3 md:translate-x-6 md:translate-y-6 dark:bg-white/5"></div>
            <div className="absolute inset-0 border-4 border-black dark:border-neo-dark-border bg-white dark:bg-neo-dark-surface z-10 flex items-center justify-center p-3 md:p-4">
              <div className="w-full h-full border-4 border-black dark:border-neo-dark-border bg-neo-yellow dark:bg-neo-dark-surface overflow-hidden relative">
                <img 
                  src="https://github.com/devriku.png"
                  alt="Sanniva Chatterjee" 
                  className="w-full h-full object-cover transition-all duration-500 grayscale group-hover:grayscale-0"
                />
              </div>
            </div>
             <div className="absolute -bottom-4 md:-bottom-6 -right-4 md:-right-6 z-20 bg-neo-pink dark:bg-neo-dark-surface border-4 border-black dark:border-neo-pink/50 px-3 md:px-4 py-1.5 md:py-2 font-ui font-bold text-sm md:text-base text-black dark:text-neo-pink shadow-neo dark:shadow-neo-dark rotate-[5deg] animate-pulse">
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
            <Loader2 className="animate-spin mb-4 text-neo-black dark:text-neo-blue" size={48} />
            <p className="font-bold text-xl dark:text-white">Connecting to GitHub...</p>
          </div>
        ) : errorRepo ? (
           <div className="text-center py-8">
             <p className="font-bold text-red-500 mb-4">Couldn't fetch the repo data.</p>
             <a 
                href="https://github.com/devriku" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-black text-white dark:bg-neo-dark-surface dark:text-neo-blue px-6 py-2 border-2 border-black dark:border-neo-blue/50 font-bold hover:bg-white hover:text-black transition-colors"
             >
               Visit GitHub <ExternalLink size={16} />
             </a>
           </div>
        ) : repoData ? (
          <div className="space-y-6">
            <div className="bg-gray-100 dark:bg-neo-dark-bg p-4 border-2 border-black dark:border-neo-dark-border">
              <div className="flex justify-between items-start mb-2">
                 <h4 className="font-bold text-2xl font-editorial dark:text-white">{repoData.name}</h4>
                 <div className="flex items-center gap-1 bg-neo-yellow border border-black px-2 py-1 text-xs font-bold text-black">
                    <Star size={12} fill="black" /> {repoData.stargazers_count}
                 </div>
              </div>
              <p className="text-gray-600 dark:text-gray-400 mb-4">{repoData.description || "No description provided for this project."}</p>
              
              <div className="flex flex-wrap gap-2 mb-4">
                 {repoData.language && (
                   <span className="bg-neo-blue/30 dark:bg-neo-blue/10 px-2 py-1 text-xs font-bold border border-black dark:border-neo-blue/30 rounded-full dark:text-neo-blue">
                     {repoData.language}
                   </span>
                 )}
                 <span className="bg-gray-200 dark:bg-white/5 px-2 py-1 text-xs font-bold border border-black dark:border-white/10 rounded-full text-gray-500 dark:text-gray-400">
                   Updated: {new Date(repoData.updated_at).toLocaleDateString()}
                 </span>
              </div>
            </div>

            <a 
              href={repoData.html_url} 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 bg-neo-green text-black border-4 border-black dark:border-neo-green/50 dark:bg-neo-dark-surface dark:text-neo-green py-3 font-bold text-lg hover:shadow-neo dark:hover:bg-neo-green dark:hover:text-black transition-all active:translate-x-[2px] active:translate-y-[2px] active:shadow-none"
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
            <div className="bg-white dark:bg-neo-dark-bg border-2 border-black dark:border-neo-dark-border p-4 mb-6 relative group">
              <div className="flex items-center gap-3 mb-2">
                 <div className="bg-neo-yellow p-2 border border-black text-black">
                   <Mail size={20} />
                 </div>
                 <span className="font-bold text-lg dark:text-white">Email</span>
              </div>
              <div className="flex gap-2">
                 <code className="bg-gray-100 dark:bg-neo-dark-surface dark:text-neo-green p-2 border border-gray-300 dark:border-neo-dark-border flex-1 overflow-x-auto text-sm">
                   sannivachatterjee25@gmail.com
                 </code>
                 <button 
                   onClick={copyEmail}
                   className="bg-black text-white dark:bg-neo-dark-surface dark:text-neo-blue p-2 border-2 border-black dark:border-neo-blue/50 hover:bg-gray-800 transition-colors"
                   title="Copy Email"
                 >
                   {copiedEmail ? <Check size={20} className="text-neo-green" /> : <Copy size={20} />}
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
                   className={`flex items-center gap-3 p-4 border-2 border-black dark:border-neo-dark-border font-bold text-lg shadow-neo dark:shadow-neo-dark hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-neo transition-all ${contact.color}`}
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