import React, { useRef, useState, useEffect } from 'react';
import { FolderOpen, Github, ExternalLink, Lock, FileText, Fingerprint, Loader2 } from 'lucide-react';
import NeoModal from './NeoModal';

interface Project {
  id: string;
  title: string;
  codename: string;
  description: string;
  tech: string[];
  repoUrl?: string;
  liveUrl?: string;
  securityLevel: 'TOP SECRET' | 'CONFIDENTIAL' | 'RESTRICTED';
  color: string;
}

export default function TheLab() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) setIsVisible(true);
    }, { threshold: 0.1 });
    
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const fetchRepos = async () => {
      try {
        const response = await fetch('https://api.github.com/users/devriku/repos');
        const data = await response.json();
        
        const targetRepos = ['Epp', 'epp-vscode'];
        const filtered = data.filter((repo: any) => targetRepos.includes(repo.name));
        
        const mappedProjects: Project[] = filtered.map((repo: any, index: number) => ({
          id: `p${index + 1}`,
          title: repo.name,
          codename: `PROJECT_${repo.name.toUpperCase().replace(/[^A-Z0-9]/g, '_')}`,
          description: repo.description || 'No description provided. Classified information.',
          tech: [repo.language || 'Unknown', 'GitHub API'],
          repoUrl: repo.html_url,
          liveUrl: repo.homepage || undefined,
          securityLevel: index % 2 === 0 ? 'TOP SECRET' : 'CONFIDENTIAL',
          color: index % 2 === 0 ? 'bg-neo-warm-mustard' : 'bg-neo-warm-coral'
        }));
        
        setProjects(mappedProjects);
      } catch (error) {
        console.error('Failed to fetch repos:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchRepos();
  }, []);

  return (
    <section id="lab" ref={sectionRef} className="py-20 bg-neo-bg-light dark:bg-black border-t-4 border-black dark:border-neo-dark-border relative overflow-hidden transition-colors duration-300">
      
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5 pointer-events-none" 
           style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '20px 20px' }}>
      </div>

      <div className="max-w-6xl mx-auto px-4 relative z-10">
        <div className={`mb-12 flex flex-col items-start gap-2 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
           <div className="bg-black text-white dark:bg-white dark:text-black px-4 py-1 font-bold font-mono text-sm tracking-widest uppercase transform rotate-1">
             CLASSIFIED MATERIALS
           </div>
           <h2 className="font-display text-5xl md:text-6xl font-black text-neo-black dark:text-white uppercase tracking-tighter">
             THE LAB<span className="text-neo-warm-terracotta">.</span>
           </h2>
           <p className="font-grotesk text-lg text-gray-600 dark:text-gray-400 max-w-xl">
             Experimental projects, code snippets, and top-secret builds. Pulled directly from GitHub. Handle with care.
           </p>
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-20">
            <Loader2 className="animate-spin text-neo-warm-terracotta w-12 h-12" />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <div 
                key={project.id}
                onClick={() => setSelectedProject(project)}
                className={`group cursor-pointer relative transition-all duration-700`}
                style={{
                  opacity: isVisible ? 1 : 0,
                  transform: isVisible ? 'translateY(0)' : 'translateY(40px)',
                  transitionDelay: `${index * 150}ms`
                }}
              >
                {/* Folder Tab */}
                <div className={`absolute -top-8 left-0 w-1/2 h-10 ${project.color} border-4 border-b-0 border-black dark:border-white rounded-t-lg z-0 transition-transform duration-300 group-hover:-translate-y-2`}>
                   <span className="absolute bottom-1 left-3 font-mono text-[10px] font-bold uppercase opacity-60">
                     CASE #{project.id.toUpperCase()}
                   </span>
                </div>

                {/* Main Folder Body */}
                <div className="relative z-10 bg-[#f4f1ea] dark:bg-[#1a1a1a] border-4 border-black dark:border-white h-full min-h-[280px] p-6 flex flex-col shadow-neo hover:shadow-neo-lg hover:-translate-y-1 transition-all duration-300">
                  
                  {/* Stamp */}
                  <div className="absolute top-4 right-4 border-2 border-red-600 text-red-600 px-2 py-1 font-black text-xs uppercase tracking-widest transform rotate-12 opacity-70 group-hover:opacity-100 transition-opacity">
                    {project.securityLevel}
                  </div>

                  <div className="mt-4 mb-2">
                     <h3 className="font-editorial text-3xl font-bold text-black dark:text-white leading-none mb-1 group-hover:underline decoration-neo-warm-terracotta decoration-2 underline-offset-4">
                       {project.title}
                     </h3>
                     <code className="text-xs font-mono bg-black/5 dark:bg-white/10 px-1 py-0.5 rounded text-gray-500 dark:text-gray-400">
                       Codename: {project.codename}
                     </code>
                  </div>

                  <p className="font-grotesk text-sm font-medium text-gray-700 dark:text-gray-300 line-clamp-3 mb-6 flex-grow">
                    {project.description}
                  </p>

                  <div className="mt-auto">
                     <div className="flex flex-wrap gap-2 mb-4">
                        {project.tech.map(t => (
                          <span key={t} className="text-[10px] font-bold uppercase border border-black dark:border-gray-500 px-2 py-0.5 bg-white dark:bg-black text-black dark:text-white">
                            {t}
                          </span>
                        ))}
                     </div>
                     
                     <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest group-hover:text-neo-warm-terracotta transition-colors">
                        <FolderOpen size={16} />
                        <span>Access File</span>
                     </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <NeoModal
        isOpen={!!selectedProject}
        onClose={() => setSelectedProject(null)}
        title={selectedProject?.codename || 'PROJECT FILE'}
      >
        {selectedProject && (
          <div className="space-y-6">
             <div className="bg-neo-bg-light dark:bg-[#222] p-4 border-2 border-dashed border-black dark:border-gray-500 relative">
                <Fingerprint className="absolute bottom-4 right-4 text-black/5 dark:text-white/5 w-24 h-24" />
                <div className="flex items-center gap-2 mb-4">
                   <div className={`w-3 h-3 rounded-full ${selectedProject.color} border border-black dark:border-white`}></div>
                   <h4 className="font-mono font-bold text-sm uppercase text-neo-black dark:text-white">Mission Brief</h4>
                </div>
                <h2 className="font-editorial text-3xl font-bold mb-4 text-neo-black dark:text-white">{selectedProject.title}</h2>
                <p className="font-grotesk text-lg leading-relaxed mb-4 text-gray-800 dark:text-gray-200">{selectedProject.description}</p>
                
                <div className="grid grid-cols-2 gap-4 my-6">
                   <div className="bg-white dark:bg-[#333] border-2 border-black dark:border-gray-500 p-3">
                      <span className="block text-[10px] font-bold uppercase text-gray-600 dark:text-gray-400 mb-1">Clearance</span>
                      <span className="font-mono font-bold text-red-600 dark:text-red-400">{selectedProject.securityLevel}</span>
                   </div>
                   <div className="bg-white dark:bg-[#333] border-2 border-black dark:border-gray-500 p-3">
                      <span className="block text-[10px] font-bold uppercase text-gray-600 dark:text-gray-400 mb-1">Status</span>
                      <span className="font-mono font-bold text-green-600 dark:text-green-400">ACTIVE DEV</span>
                   </div>
                </div>
             </div>

             <div className="flex flex-col sm:flex-row gap-4">
                {selectedProject.repoUrl && (
                  <a href={selectedProject.repoUrl} target="_blank" rel="noopener noreferrer" className="flex-1 flex items-center justify-center gap-2 bg-black text-white py-3 font-bold border-2 border-black hover:bg-white hover:text-black transition-all shadow-neo active:shadow-none">
                    <Github size={18} /> Source Code
                  </a>
                )}
                {selectedProject.liveUrl && (
                  <a href={selectedProject.liveUrl} target="_blank" rel="noopener noreferrer" className="flex-1 flex items-center justify-center gap-2 bg-neo-warm-mustard text-black py-3 font-bold border-2 border-black hover:bg-neo-white transition-all shadow-neo active:shadow-none">
                    <ExternalLink size={18} /> Live Demo
                  </a>
                )}
             </div>
          </div>
        )}
      </NeoModal>
    </section>
  );
}