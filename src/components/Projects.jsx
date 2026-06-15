/* eslint-disable react-refresh/only-export-components */
import { useRef, useEffect } from 'react';
import { gsap } from '../utils/gsap';
import { useReducedMotion } from '../hooks/useReducedMotion';
import SectionWrapper from '../hoc/SectionWrapper';
import { projects } from '../constants';

const ProjectCard = ({ project, index }) => {
  const cardRef = useRef(null);

  // Optional: VanillaTilt-style physics could go here, 
  // but standard CSS transitions work beautifully with the glow.

  return (
    <div 
      ref={cardRef}
      className={`w-full glass-strong rounded-[2rem] p-6 lg:p-8 relative overflow-hidden group flex flex-col justify-between border-[rgba(255,255,255,0.05)] transition-all duration-500 hover:-translate-y-2 hover:border-[var(--accent)]/50 hover:glow-box ${index % 2 === 1 ? 'md:mt-24' : ''}`}
    >
      {/* Dynamic Sreeja-Style Background Glow */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-[var(--accent-glow)] to-transparent" />
        <div className="absolute right-0 bottom-0 w-64 h-64 bg-gradient-to-tl from-[var(--accent)]/20 to-transparent blur-3xl" />
        <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[var(--accent)] to-transparent opacity-50" />
      </div>

      {/* Number Badge */}
      <div className="absolute top-6 right-6 z-10">
        <span className="text-[10px] font-mono text-white/30 tracking-widest uppercase bg-white/5 px-3 py-1.5 rounded-full border border-white/5 group-hover:text-[var(--accent)] transition-colors">
          {String(index + 1).padStart(2, '0')}
        </span>
      </div>

      {/* Screenshot Placeholder Area with Reveal Animation */}
      <div className="w-full h-[250px] sm:h-[300px] rounded-2xl bg-[#0a0a0a] overflow-hidden relative mb-8 border border-white/5 group-hover:border-[var(--accent)]/30 transition-all duration-500 transform group-hover:scale-[1.02]">
        {/* Placeholder gradient pattern representing screenshot */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-white/10 via-transparent to-transparent opacity-30 group-hover:opacity-80 transition-opacity duration-500" />
        
        {/* Mock App UI Elements */}
        <div className="absolute inset-0 p-4 opacity-50 group-hover:opacity-100 transition-opacity duration-500 flex flex-col">
          <div className="w-full flex justify-between items-center mb-4">
            <div className="flex gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full bg-white/20 group-hover:bg-[#FF5F56] transition-colors" />
              <div className="w-2.5 h-2.5 rounded-full bg-white/20 group-hover:bg-[#FFBD2E] transition-colors" />
              <div className="w-2.5 h-2.5 rounded-full bg-white/20 group-hover:bg-[#27C93F] transition-colors" />
            </div>
          </div>
          <div className="flex-1 flex items-center justify-center">
            <div className="text-white/20 group-hover:text-[var(--accent)] transition-colors duration-500 transform group-hover:scale-110">
              <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
                <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
                <line x1="8" y1="21" x2="16" y2="21"></line>
                <line x1="12" y1="17" x2="12" y2="21"></line>
              </svg>
            </div>
          </div>
        </div>
      </div>

      <div className="relative z-10 flex flex-col flex-1">
        <h3 className="text-2xl sm:text-3xl font-playfair font-bold text-white mb-4 group-hover:text-[var(--accent)] transition-colors duration-300 drop-shadow-md">
          {project.name}
        </h3>
        
        <p className="text-sm font-inter text-secondary/80 leading-relaxed mb-6">
          {project.description}
        </p>

        <div className="mt-auto">
          <div className="flex flex-wrap gap-2 mb-8">
            {project.tags.map((tag) => (
              <span key={tag.name} className="text-[10px] font-mono text-[var(--accent)] bg-[var(--accent)]/5 px-2.5 py-1 rounded-md border border-[var(--accent)]/10">
                {tag.name}
              </span>
            ))}
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-white/10 group-hover:border-[var(--accent)]/30 transition-colors">
            <a
              href={project.source_code_link}
              target="_blank"
              rel="noopener noreferrer"
              className="magnetic-target flex items-center gap-2 text-xs font-mono text-white/60 hover:text-white transition-colors group-hover:text-[var(--accent)]"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
              Source Code
            </a>
            
            <a
              href={project.source_code_link}
              target="_blank"
              rel="noopener noreferrer"
              className="magnetic-target w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white group-hover:bg-[var(--accent)] group-hover:border-transparent transition-all duration-300 group-hover:-rotate-45"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

const Projects = () => {
  const sectionRef = useRef(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (reducedMotion || !sectionRef.current) return;

    const cards = sectionRef.current.querySelectorAll('.project-card-wrapper');
    
    gsap.fromTo(
      cards,
      { y: 100, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        stagger: 0.1,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%',
        }
      }
    );
  }, [reducedMotion]);

  return (
    <div ref={sectionRef} className="w-full relative">
      {/* Ambient Glow Orb */}
      <div className="absolute top-[30%] left-[-20%] w-[600px] h-[600px] bg-[var(--accent)]/15 rounded-full blur-[150px] pointer-events-none -z-10" />

      <div className="mb-16">
        <p className="text-sm font-mono text-secondary tracking-widest uppercase mb-2">03</p>
        <h2 className="text-5xl md:text-6xl font-playfair font-bold text-white italic">Projects</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 pb-10">
        {projects.map((project, index) => (
          <div key={index} className="project-card-wrapper">
            <ProjectCard project={project} index={index} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default SectionWrapper(Projects, 'projects', '03');
