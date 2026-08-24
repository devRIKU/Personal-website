import React, { useState, useEffect } from 'react';
import { FolderOpen, Github, ExternalLink, Lock, FileText, Fingerprint, Loader2, Sparkles, Terminal } from 'lucide-react';
import { motion } from 'motion/react';
import NeoModal from './NeoModal';
import TactileCard from './tactile/TactileCard';
import HardwareHeader from './tactile/HardwareHeader';
import StatusLED from './tactile/StatusLED';
import HardwareBadge from './tactile/HardwareBadge';
import BeveledButton from './tactile/BeveledButton';

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

const defaultLabProjects: Project[] = [
  {
    id: 'p1',
    title: 'Epp',
    codename: 'PROJECT_EPP',
    description: 'Experimental programming language compiler & runtime architecture built with deterministic grammar parsing.',
    tech: ['Rust', 'Compiler Design', 'LLVM'],
    repoUrl: 'https://github.com/devriku/Epp',
    securityLevel: 'TOP SECRET',
    color: 'bg-neo-accent'
  },
  {
    id: 'p2',
    title: 'epp-vscode',
    codename: 'PROJECT_EPP_VSCODE',
    description: 'Language Server Protocol (LSP) extension providing real-time syntax diagnostics, token highlighting, and AST inspection.',
    tech: ['TypeScript', 'VS Code API', 'LSP'],
    repoUrl: 'https://github.com/devriku/epp-vscode',
    securityLevel: 'CONFIDENTIAL',
    color: 'bg-neo-highlight'
  },
  {
    id: 'p3',
    title: 'IndieTube',
    codename: 'PROJECT_INDIETUBE',
    description: 'Minimalist video streaming client emphasizing content creators, low latency playback, and distraction-free layouts.',
    tech: ['React', 'Tailwind CSS', 'Web Media'],
    repoUrl: 'https://github.com/devriku',
    securityLevel: 'RESTRICTED',
    color: 'bg-neo-support'
  }
];

export default function TheLab() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [projects, setProjects] = useState<Project[]>(defaultLabProjects);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRepos = async () => {
      try {
        const response = await fetch('https://api.github.com/users/devriku/repos');
        if (!response.ok) throw new Error('API response not ok');
        const data = await response.json();
        
        if (Array.isArray(data)) {
          const targetRepos = ['Epp', 'epp-vscode'];
          const filtered = data.filter((repo: any) => targetRepos.includes(repo.name));
          
          if (filtered.length > 0) {
            const mappedProjects: Project[] = filtered.map((repo: any, index: number) => ({
              id: `p${index + 1}`,
              title: repo.name,
              codename: `PROJECT_${repo.name.toUpperCase().replace(/[^A-Z0-9]/g, '_')}`,
              description: repo.description || 'Classified software architecture experiment.',
              tech: [repo.language || 'TypeScript', 'GitHub API'],
              repoUrl: repo.html_url,
              liveUrl: repo.homepage || undefined,
              securityLevel: index % 2 === 0 ? 'TOP SECRET' : 'CONFIDENTIAL',
              color: index % 2 === 0 ? 'bg-neo-accent' : 'bg-neo-highlight'
            }));
            
            // Merge with default extra projects if needed
            setProjects(mappedProjects.length >= 2 ? mappedProjects : defaultLabProjects);
          }
        }
      } catch (error) {
        console.warn('Using default lab projects:', error);
        setProjects(defaultLabProjects);
      } finally {
        setLoading(false);
      }
    };
    
    fetchRepos();
  }, []);

  return (
    <section id="lab" className="py-16 md:py-24 bg-transparent border-t-4 border-black dark:border-neo-dark-border relative overflow-hidden transition-colors duration-300">
      <div className="max-w-6xl mx-auto px-4 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="mb-12 flex flex-col items-start gap-2"
        >
          <h2 className="font-display text-4xl md:text-5xl font-black text-neutral-900 dark:text-white uppercase tracking-tight">
            THE LAB<span className="text-neo-secondary">.</span>
          </h2>
          <p className="font-grotesk text-base text-neutral-600 dark:text-neutral-300 max-w-xl">
            Featured projects, compiler prototypes, and interactive web tools built with craftsmanship.
          </p>
        </motion.div>

        {loading ? (
          <div className="flex justify-center items-center py-16">
            <Loader2 className="animate-spin text-neo-secondary w-10 h-10" />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pt-4">
            {projects.map((project, index) => {
              const tabColor = 
                index === 0 ? 'bg-amber-400 dark:bg-amber-500' :
                index === 1 ? 'bg-rose-400 dark:bg-rose-500' :
                index === 2 ? 'bg-emerald-400 dark:bg-emerald-500' : 'bg-sky-400 dark:bg-sky-500';

              return (
              <motion.div 
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{ duration: 0.5, delay: index * 0.1, ease: "easeOut" }}
                onClick={() => setSelectedProject(project)}
                className="group cursor-pointer relative"
              >
                {/* Tactile Folder Tab */}
                <div className={`absolute -top-7 left-0 w-3/5 xs:w-1/2 sm:w-2/5 h-8 ${tabColor} border border-black/20 dark:border-white/10 rounded-t-[8px] z-0 shadow-sm transition-transform duration-200 group-hover:-translate-y-1`}>
                   <span className="absolute bottom-1 left-2.5 font-mono text-[9px] font-bold uppercase text-black tracking-wider truncate max-w-[90%] block">
                     {project.codename}
                   </span>
                </div>

                {/* Main Tactile Folder Body */}
                <TactileCard 
                  variant="panel"
                  className="relative z-10 h-full min-h-[240px] sm:min-h-[260px] p-4 sm:p-6 flex flex-col justify-between group-hover:-translate-y-1 transition-all duration-200"
                >
                  <div>
                    {/* Header bar */}
                    <div className="flex justify-between items-start mb-3 gap-2">
                      <div className="flex items-center gap-1.5 sm:gap-2 min-w-0">
                        <span className="hardware-screw shrink-0" />
                        <span className="font-mono text-[10px] font-bold text-neutral-500 dark:text-neutral-400 uppercase tracking-wider truncate">
                          {project.category}
                        </span>
                      </div>
                      <StatusLED status="green" label="ACTIVE" />
                    </div>

                    <div className="mt-2 mb-3">
                       <h3 className="font-display text-xl sm:text-2xl font-bold text-neutral-900 dark:text-white leading-tight mb-1 group-hover:text-neo-secondary transition-colors">
                         {project.title}
                       </h3>
                    </div>

                    <p className="font-grotesk text-xs sm:text-sm text-neutral-600 dark:text-neutral-300 line-clamp-3 mb-4 leading-relaxed">
                      {project.description}
                    </p>
                  </div>

                  <div className="pt-3 sm:pt-4 border-t border-black/10 dark:border-white/10">
                     <div className="flex flex-wrap gap-1.5 mb-3">
                        {project.tech.map(t => (
                          <span key={t} className="font-mono text-[10px] font-bold px-2 py-0.5 rounded-[4px] bg-black/5 dark:bg-white/10 text-neutral-800 dark:text-neutral-200 border border-black/5 dark:border-white/5">
                            {t}
                          </span>
                        ))}
                     </div>
                     
                     <div className="flex items-center justify-between text-xs font-ui font-bold uppercase tracking-wider text-neo-secondary group-hover:text-black dark:group-hover:text-white transition-colors">
                        <span className="flex items-center gap-1.5">
                          <FolderOpen size={14} /> View Details
                        </span>
                        <span>→</span>
                     </div>
                  </div>
                </TactileCard>
              </motion.div>
              );
            })}
          </div>
        )}
      </div>

      <NeoModal
        isOpen={!!selectedProject}
        onClose={() => setSelectedProject(null)}
        title={selectedProject?.title || 'PROJECT DETAILS'}
        badge={selectedProject?.codename || 'FEATURE'}
        statusColor="green"
      >
        {selectedProject && (
          <div className="space-y-4">
             <div className="tactile-well p-4 sm:p-5 rounded-[10px] space-y-3">
                <h3 className="font-display text-xl sm:text-2xl font-bold text-neutral-900 dark:text-white">
                  {selectedProject.title}
                </h3>
                <p className="font-grotesk text-sm sm:text-base leading-relaxed text-neutral-700 dark:text-neutral-300">
                  {selectedProject.description}
                </p>
                
                <div className="pt-3 border-t border-black/10 dark:border-white/10 space-y-2">
                   <span className="block text-xs font-mono font-bold uppercase text-neutral-500 dark:text-neutral-400">
                     Technologies & Libraries
                   </span>
                   <div className="flex flex-wrap gap-1.5">
                     {selectedProject.tech.map(t => (
                       <span key={t} className="font-mono text-xs font-bold px-2.5 py-1 rounded-[6px] bg-black/5 dark:bg-white/10 text-neutral-900 dark:text-white border border-black/10 dark:border-white/10">
                         {t}
                       </span>
                     ))}
                   </div>
                </div>
             </div>

             <div className="flex flex-col sm:flex-row gap-3 pt-1">
                {selectedProject.repoUrl && (
                  <BeveledButton 
                    asAnchor
                    href={selectedProject.repoUrl} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    variant="sky"
                    className="flex-1"
                    icon={<Github size={16} />}
                  >
                    Source Code
                  </BeveledButton>
                )}
                {selectedProject.liveUrl && (
                  <BeveledButton 
                    asAnchor
                    href={selectedProject.liveUrl} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    variant="accent"
                    className="flex-1"
                    icon={<ExternalLink size={16} />}
                  >
                    Live Preview
                  </BeveledButton>
                )}
             </div>
          </div>
        )}
      </NeoModal>
    </section>
  );
}