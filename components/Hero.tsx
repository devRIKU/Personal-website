import React, { useEffect, useRef, useState } from 'react';
import { Github, Twitter, Instagram, Youtube, Mail, ExternalLink, Star, GitFork, Loader2, Copy, Check } from 'lucide-react';
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
  
  // Modal States
  const [showWorkModal, setShowWorkModal] = useState(false);
  const [showContactModal, setShowContactModal] = useState(false);
  
  // Data States
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
    if (repoData) return; // Don't refetch if we already have data

    setLoadingRepo(true);
    setErrorRepo(false);
    try {
      const response = await fetch('https://api.github.com/users/devriku/repos?sort=updated&direction=desc');
      if (!response.ok) throw new Error('Failed to fetch');
      
      const data = await response.json();
      // Filter out the personal website repo and get the next latest one
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
    { name: 'GitHub', icon: <Github />, url: 'https://github.com/devriku', color: 'bg-neo-black text-white dark:bg-black dark:text-white dark:border-white' },
    { name: 'Twitter', icon: <Twitter />, url: 'https://twitter.com', color: 'bg-neo-blue text-black dark:bg-transparent dark:text-neo-blue dark:border-neo-blue' },
    { name: 'Instagram', icon: <Instagram />, url: 'https://instagram.com', color: 'bg-neo-pink text-black dark:bg-transparent dark:text-neo-pink dark:border-neo-pink' },
    { name: 'YouTube', icon: <Youtube />, url: 'https://youtube.com', color: 'bg-red-500 text-white dark:bg-transparent dark:text-red-500 dark:border-red-500' },
  ];

  return (
    <section 
      id="about" 
      ref={sectionRef}
      className="min-h-[90vh] flex items-center justify-center px-4 py-12 relative overflow-hidden transition-colors duration-300"
    >
      {/* Decorative background elements */}
      <div className="absolute top-20 left-10 w-16 h-16 bg-neo-yellow border-4 border-black dark:border-neo-blue dark:bg-transparent rounded-full mix-blend-multiply dark:mix-blend-normal opacity-50 animate-bounce delay-75"></div>
      <div className="absolute bottom-40 right-10 w-24 h-24 bg-neo-pink border-4 border-black dark:border-neo-green dark:bg-transparent rotate-12 -z-10 opacity-70"></div>
      
      <div className="max-w-6xl w-full mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        
        {/* Text Content */}
        <div className="order-2 md:order-1 space-y-8">
          <div className={`relative inline-block transition-all duration-1000 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
             <h1 className="font-editorial text-6xl md:text-8xl font-black leading-none tracking-tighter z-10 relative dark:text-white">
              Hi!, I'm Sanniva.
             </h1>
             <div className={`absolute -bottom-2 left-0 w-full h-4 bg-neo-green dark:bg-neo-pink -z-0 skew-x-12 transition-all duration-1000 delay-500 ${isVisible ? 'scale-x-100' : 'scale-x-0'}`}></div>
          </div>

          <div className={`bg-white dark:bg-neo-dark-surface border-4 border-black dark:border-neo-blue p-6 shadow-neo dark:shadow-none transform rotate-1 hover:rotate-0 transition-all duration-1000 delay-300 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
            <h2 className="font-ui font-bold text-xl mb-4 border-b-2 border-black dark:border-neo-blue pb-2 dark:text-neo-blue">
              Introduction_v1.0
            </h2>
            <p className="font-grotesk text-lg md:text-xl leading-relaxed mb-4 dark:text-gray-300">
              Hey there! I’m a <span className="font-bold bg-neo-yellow text-black px-1 dark:bg-neo-blue dark:text-black">7th grader</span> at Techno India Group Public School who’s way too into coding and all things techy. I’m not gonna lie—I don’t feel like a genius, but somehow I manage to pull off good grades (magic, maybe?).
            </p>
            <p className="font-grotesk text-lg md:text-xl leading-relaxed dark:text-gray-300">
              Most people say I’m funny—some even laugh at my jokes on purpose 😏. When I’m not figuring out how stuff works or breaking it, you’ll find me doing something random but probably cool.
            </p>
          </div>

          <div className={`flex gap-4 transition-all duration-1000 delay-500 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
             <button 
                onClick={fetchLatestRepo}
                className="font-ui font-bold text-lg px-8 py-3 bg-black text-white dark:bg-transparent dark:text-neo-green border-4 border-black dark:border-neo-green hover:bg-white hover:text-black dark:hover:bg-neo-green dark:hover:text-black shadow-neo dark:shadow-none active:shadow-none active:translate-x-[5px] active:translate-y-[5px] transition-all"
             >
                VIEW WORK
             </button>
             <button 
                onClick={() => setShowContactModal(true)}
                className="font-ui font-bold text-lg px-8 py-3 bg-neo-blue text-black border-4 border-black dark:border-neo-pink dark:bg-transparent dark:text-neo-pink hover:bg-neo-pink dark:hover:bg-neo-pink dark:hover:text-black shadow-neo dark:shadow-none active:shadow-none active:translate-x-[5px] active:translate-y-[5px] transition-all"
             >
                CONTACT
             </button>
          </div>
        </div>

        {/* Image / 3D Cutout */}
        <div className={`order-1 md:order-2 flex justify-center relative transition-all duration-1000 delay-100 ${isVisible ? 'opacity-100 scale-100 rotate-0' : 'opacity-0 scale-95 rotate-3'}`}>
          <div className="relative w-72 h-80 md:w-96 md:h-[500px] group">
            {/* Background solid shape */}
            <div className="absolute inset-0 bg-black dark:bg-neo-blue translate-x-4 translate-y-4 md:translate-x-8 md:translate-y-8 transition-transform group-hover:translate-x-2 group-hover:translate-y-2 dark:opacity-20"></div>
            
            {/* Frame */}
            <div className="absolute inset-0 border-4 border-black dark:border-neo-yellow bg-neo-yellow dark:bg-transparent"></div>
            
            {/* Image Placeholder */}
            <div className="absolute inset-4 border-2 border-black dark:border-neo-yellow bg-white dark:bg-black overflow-hidden">
                <img 
                  src="/hero-image.png"
                  onError={(e) => {
                    // Fallback to dicebear if local image not found
                    e.currentTarget.src = "https://api.dicebear.com/9.x/notionists/svg? seed=Sanniva";
                    e.currentTarget.onerror = null;
                  }}
                  alt="Sanniva Chatterjee" 
                  className="w-full h-full object-cover transition-all duration-500 scale-105 group-hover:scale-100"
                />
            </div>
            
            {/* Floating Badge */}
             <div className="absolute -bottom-6 -left-6 bg-neo-pink dark:bg-black border-4 border-black dark:border-neo-green px-4 py-2 font-ui font-bold text-white dark:text-neo-green shadow-neo dark:shadow-none rotate-[-10deg] animate-pulse">
                FUTURE DEV
             </div>
          </div>
        </div>
      </div>

      {/* LATEST WORK MODAL */}
      <NeoModal 
        isOpen={showWorkModal} 
        onClose={() => setShowWorkModal(false)} 
        title="Latest Construction"
      >
        {loadingRepo ? (
          <div className="flex flex-col items-center justify-center py-12">
            <Loader2 className="animate-spin mb-4 text-neo-black dark:text-neo-white" size={48} />
            <p className="font-bold text-xl">Digging through GitHub...</p>
          </div>
        ) : errorRepo ? (
           <div className="text-center py-8">
             <p className="font-bold text-red-500 mb-4">Oops! Couldn't fetch the latest data.</p>
             <a 
                href="https://github.com/devriku" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-black text-white dark:bg-white dark:text-black px-6 py-2 border-2 border-black dark:border-white font-bold hover:bg-white hover:text-black dark:hover:bg-black dark:hover:text-white transition-colors"
             >
               Visit GitHub Directly <ExternalLink size={16} />
             </a>
           </div>
        ) : repoData ? (
          <div className="space-y-6">
            <div className="bg-gray-100 dark:bg-neo-dark-bg p-4 border-2 border-black dark:border-neo-blue">
              <div className="flex justify-between items-start mb-2">
                 <h4 className="font-bold text-2xl font-editorial dark:text-white">{repoData.name}</h4>
                 <div className="flex items-center gap-1 bg-neo-yellow border border-black px-2 py-1 text-xs font-bold text-black">
                    <Star size={12} fill="black" /> {repoData.stargazers_count}
                 </div>
              </div>
              <p className="text-gray-600 dark:text-gray-300 mb-4">{repoData.description || "No description provided for this cool project."}</p>
              
              <div className="flex flex-wrap gap-2 mb-4">
                 {repoData.language && (
                   <span className="bg-neo-blue/30 dark:bg-transparent px-2 py-1 text-xs font-bold border border-black dark:border-neo-blue rounded-full dark:text-neo-blue">
                     {repoData.language}
                   </span>
                 )}
                 <span className="bg-gray-200 dark:bg-transparent px-2 py-1 text-xs font-bold border border-black dark:border-gray-500 rounded-full text-gray-500 dark:text-gray-300">
                   Updated: {new Date(repoData.updated_at).toLocaleDateString()}
                 </span>
              </div>
            </div>

            <a 
              href={repoData.html_url} 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 bg-neo-green text-black border-4 border-black dark:border-neo-green dark:bg-transparent dark:text-neo-green py-3 font-bold text-lg hover:shadow-neo dark:hover:bg-neo-green dark:hover:text-black transition-all active:translate-x-[2px] active:translate-y-[2px] active:shadow-none"
            >
              Check it out <ExternalLink size={20} />
            </a>
          </div>
        ) : null}
      </NeoModal>

      {/* CONTACT LIST MODAL */}
      <NeoModal 
        isOpen={showContactModal} 
        onClose={() => setShowContactModal(false)} 
        title="Drop a Line"
      >
         <div className="space-y-4">
            <p className="text-lg mb-6 text-center font-medium dark:text-white">
              Want to collab, chat code, or just say hi? Here's where I live on the internet.
            </p>

            {/* Email Section */}
            <div className="bg-white dark:bg-neo-dark-surface border-2 border-black dark:border-neo-blue p-4 mb-6 relative group">
              <div className="flex items-center gap-3 mb-2">
                 <div className="bg-neo-yellow p-2 border border-black text-black">
                   <Mail size={20} />
                 </div>
                 <span className="font-bold text-lg dark:text-white">Email</span>
              </div>
              <div className="flex gap-2">
                 <code className="bg-gray-100 dark:bg-black dark:text-neo-green p-2 border border-gray-300 dark:border-gray-700 flex-1 overflow-x-auto text-sm">
                   sannivachatterjee25@gmail.com
                 </code>
                 <button 
                   onClick={copyEmail}
                   className="bg-black text-white dark:bg-transparent dark:text-neo-blue p-2 border-2 border-black dark:border-neo-blue hover:bg-gray-800 dark:hover:bg-neo-blue dark:hover:text-black transition-colors"
                   title="Copy Email"
                 >
                   {copiedEmail ? <Check size={20} className="text-neo-green dark:text-inherit" /> : <Copy size={20} />}
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
                   className={`flex items-center gap-3 p-4 border-2 border-black font-bold text-lg shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-none hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] dark:hover:shadow-none transition-all ${contact.color}`}
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