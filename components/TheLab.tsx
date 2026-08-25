import React, { useState, useEffect } from 'react';
import { Github, ExternalLink, Star, GitFork, Loader2, Sparkles, Code2, FolderGit2, ArrowUpRight } from 'lucide-react';
import { motion } from 'motion/react';
import NeoModal from './NeoModal';
import TactileCard from './tactile/TactileCard';
import StatusLED from './tactile/StatusLED';
import BeveledButton from './tactile/BeveledButton';

interface LabProject {
  id: string;
  name: string;
  codename: string;
  description: string;
  language: string;
  stars: number;
  forks: number;
  repoUrl: string;
  liveUrl?: string;
  updatedAt?: string;
  isLive: boolean;
}

const fallbackProjects: LabProject[] = [
  {
    id: 'epp',
    name: 'Epp',
    codename: 'COMPILER_CORE',
    description: 'Experimental programming language compiler & runtime architecture built with deterministic grammar parsing.',
    language: 'Rust',
    stars: 5,
    forks: 1,
    repoUrl: 'https://github.com/devriku/Epp',
    isLive: false
  },
  {
    id: 'epp-vscode',
    name: 'epp-vscode',
    codename: 'LSP_ENGINE',
    description: 'Language Server Protocol (LSP) extension providing real-time syntax diagnostics, token highlighting, and AST inspection.',
    language: 'TypeScript',
    stars: 3,
    forks: 0,
    repoUrl: 'https://github.com/devriku/epp-vscode',
    isLive: false
  },
  {
    id: 'indietube',
    name: 'IndieTube',
    codename: 'WEB_MEDIA',
    description: 'Minimalist video streaming client emphasizing content creators, low latency playback, and distraction-free layouts.',
    language: 'TypeScript',
    stars: 2,
    forks: 0,
    repoUrl: 'https://github.com/devriku',
    isLive: false
  }
];

export default function TheLab() {
  const [selectedProject, setSelectedProject] = useState<LabProject | null>(null);
  const [projects, setProjects] = useState<LabProject[]>(fallbackProjects);
  const [loading, setLoading] = useState(true);
  const [isLiveSource, setIsLiveSource] = useState(false);

  useEffect(() => {
    let isMounted = true;

    const fetchLiveRepos = async () => {
      try {
        // Try internal cached API first
        let data: any = null;
        try {
          const res = await fetch('/api/github/repos');
          if (res.ok) {
            const json = await res.json();
            if (json.repos && Array.isArray(json.repos) && json.repos.length > 0) {
              data = json.repos;
            }
          }
        } catch (e) {
          // Fall through to direct GitHub API
        }

        // Direct fallback if server route didn't return repos
        if (!data) {
          const ghRes = await fetch('https://api.github.com/users/devriku/repos?sort=updated&per_page=8');
          if (ghRes.ok) {
            data = await ghRes.json();
          }
        }

        if (isMounted && Array.isArray(data) && data.length > 0) {
          // Filter out forks if there are sufficient source repos
          const filtered = data.filter((r: any) => !r.fork);
          const repoList = filtered.length >= 3 ? filtered : data;

          const mapped: LabProject[] = repoList.slice(0, 6).map((repo: any) => ({
            id: String(repo.id || repo.name),
            name: repo.name,
            codename: repo.name.toUpperCase().replace(/[^A-Z0-9]/g, '_'),
            description: repo.description || 'Public software repository and architectural experiment.',
            language: repo.language || 'TypeScript',
            stars: repo.stargazers_count || 0,
            forks: repo.forks_count || 0,
            repoUrl: repo.html_url,
            liveUrl: repo.homepage || undefined,
            updatedAt: repo.updated_at ? new Date(repo.updated_at).toLocaleDateString('en-US', { month: 'short', year: 'numeric' }) : undefined,
            isLive: true
          }));

          if (mapped.length > 0) {
            setProjects(mapped);
            setIsLiveSource(true);
          }
        }
      } catch (err) {
        console.warn('Could not fetch live GitHub repositories, using fallback:', err);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchLiveRepos();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <section id="lab" className="py-14 md:py-20 bg-transparent border-t-4 border-black dark:border-neo-dark-border relative overflow-hidden transition-colors duration-300">
      <div className="max-w-6xl mx-auto px-4 relative z-10 space-y-6">
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 border-b-2 border-black/10 dark:border-white/10 pb-4"
        >
          <div>
            <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-black text-neutral-900 dark:text-white uppercase tracking-tight">
              THE LAB<span className="text-neo-secondary">.</span>
            </h2>
            <p className="font-grotesk text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 mt-1 max-w-xl">
              Open-source repositories, compiler prototypes, and live software experiments.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="font-mono text-[11px] font-bold text-neutral-500 dark:text-neutral-400 flex items-center gap-1.5">
              <StatusLED status={isLiveSource ? 'green' : 'amber'} />
              <span>{isLiveSource ? 'GITHUB LIVE' : 'SYNCED'}</span>
            </span>
          </div>
        </motion.div>

        {loading ? (
          <div className="flex justify-center items-center py-12">
            <Loader2 className="animate-spin text-neo-secondary w-8 h-8" />
          </div>
        ) : (
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-2.5 sm:gap-4">
            {projects.map((project, index) => {
              const tabColor = 
                index % 4 === 0 ? 'bg-amber-400 dark:bg-amber-500' :
                index % 4 === 1 ? 'bg-rose-400 dark:bg-rose-500' :
                index % 4 === 2 ? 'bg-emerald-400 dark:bg-emerald-500' : 'bg-sky-400 dark:bg-sky-500';

              return (
                <motion.div 
                  key={project.id}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.1 }}
                  transition={{ duration: 0.35, delay: index * 0.05, ease: "easeOut" }}
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setSelectedProject(project)}
                  className="group cursor-pointer relative pt-3.5 sm:pt-4"
                >
                  {/* Compact Folder Tab */}
                  <div className={`absolute top-0 left-2 w-20 sm:w-28 h-4 sm:h-5 ${tabColor} border border-black/20 dark:border-white/10 rounded-t-[5px] sm:rounded-t-[6px] z-0 shadow-xs transition-transform duration-150 group-hover:-translate-y-0.5 flex items-center px-1.5 sm:px-2`}>
                    <span className="font-mono text-[7px] sm:text-[8px] font-black uppercase text-black tracking-wider truncate block">
                      {project.codename}
                    </span>
                  </div>

                  {/* Main Tactile Card */}
                  <TactileCard 
                    variant="panel"
                    className="relative z-10 h-full p-2.5 sm:p-4 flex flex-col justify-between transition-colors shadow-sm group-hover:border-black/30 dark:group-hover:border-white/30"
                  >
                    <div className="space-y-1.5 sm:space-y-2">
                      {/* Top bar with Language & Stars */}
                      <div className="flex items-center justify-between gap-1 sm:gap-2">
                        <span className="font-mono text-[9px] sm:text-[10px] font-bold px-1.5 sm:px-2 py-0.5 rounded-[4px] bg-black/5 dark:bg-white/10 text-neutral-800 dark:text-neutral-200 border border-black/5 dark:border-white/5 flex items-center gap-1 truncate">
                          <Code2 size={10} className="text-neo-secondary shrink-0" />
                          <span className="truncate">{project.language}</span>
                        </span>

                        <div className="flex items-center gap-1.5 sm:gap-2 font-mono text-[9px] sm:text-[10px] text-neutral-500 dark:text-neutral-400 shrink-0">
                          {project.stars > 0 && (
                            <span className="flex items-center gap-0.5 text-amber-600 dark:text-amber-400 font-bold">
                              <Star size={10} fill="currentColor" /> {project.stars}
                            </span>
                          )}
                          {project.forks > 0 && (
                            <span className="hidden xs:flex items-center gap-0.5">
                              <GitFork size={10} /> {project.forks}
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Project Title */}
                      <h3 className="font-display text-xs sm:text-base font-bold text-neutral-900 dark:text-white leading-snug group-hover:text-neo-secondary transition-colors flex items-center justify-between gap-1">
                        <span className="truncate">{project.name}</span>
                        <ArrowUpRight size={12} className="text-neutral-400 group-hover:text-neutral-900 dark:group-hover:text-white transition-colors shrink-0" />
                      </h3>

                      {/* Compact Description */}
                      <p className="font-grotesk text-[11px] sm:text-xs text-neutral-600 dark:text-neutral-300 line-clamp-2 leading-relaxed">
                        {project.description}
                      </p>
                    </div>

                    {/* Bottom strip */}
                    <div className="pt-2 sm:pt-2.5 mt-2 sm:mt-2.5 border-t border-black/10 dark:border-white/10 flex items-center justify-between text-[9px] sm:text-[11px] font-mono text-neutral-500 dark:text-neutral-400">
                      <span className="truncate">{project.updatedAt ? `Updated ${project.updatedAt}` : 'Active'}</span>
                      <span className="font-bold text-neo-secondary shrink-0 ml-1">Open →</span>
                    </div>
                  </TactileCard>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>

      {/* Detail Modal */}
      <NeoModal
        isOpen={!!selectedProject}
        onClose={() => setSelectedProject(null)}
        title={selectedProject?.name || 'PROJECT DETAILS'}
        badge={selectedProject?.codename || 'REPOSITORY'}
        statusColor="green"
      >
        {selectedProject && (
          <div className="space-y-4">
            <div className="tactile-well p-4 sm:p-5 rounded-[10px] space-y-3">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <h3 className="font-display text-xl sm:text-2xl font-bold text-neutral-900 dark:text-white">
                    {selectedProject.name}
                  </h3>
                  <span className="font-mono text-xs text-neutral-500 dark:text-neutral-400">
                    Primary Stack: {selectedProject.language}
                  </span>
                </div>
                {selectedProject.stars > 0 && (
                  <div className="flex items-center gap-1 font-mono text-xs font-bold text-amber-600 dark:text-amber-400 bg-amber-400/10 px-2 py-1 rounded-[6px] border border-amber-400/20">
                    <Star size={13} fill="currentColor" /> {selectedProject.stars} stars
                  </div>
                )}
              </div>

              <p className="font-grotesk text-sm sm:text-base leading-relaxed text-neutral-700 dark:text-neutral-300">
                {selectedProject.description}
              </p>
              
              {selectedProject.updatedAt && (
                <div className="pt-2 border-t border-black/10 dark:border-white/10 font-mono text-xs text-neutral-500 dark:text-neutral-400">
                  Last pushed to GitHub: <span className="font-semibold text-neutral-800 dark:text-neutral-200">{selectedProject.updatedAt}</span>
                </div>
              )}
            </div>

            <div className="flex flex-col sm:flex-row gap-2.5 pt-1">
              {selectedProject.repoUrl && (
                <BeveledButton 
                  asAnchor
                  href={selectedProject.repoUrl} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  variant="sky"
                  size="md"
                  className="flex-1"
                  icon={<Github size={15} />}
                >
                  GitHub Repository
                </BeveledButton>
              )}
              {selectedProject.liveUrl && (
                <BeveledButton 
                  asAnchor
                  href={selectedProject.liveUrl} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  variant="accent"
                  size="md"
                  className="flex-1"
                  icon={<ExternalLink size={15} />}
                >
                  Live Deployment
                </BeveledButton>
              )}
            </div>
          </div>
        )}
      </NeoModal>
    </section>
  );
}
