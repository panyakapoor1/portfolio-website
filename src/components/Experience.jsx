/* eslint-disable react-refresh/only-export-components */
import { useRef, useEffect } from 'react';
import { gsap } from '../utils/gsap';
import { useReducedMotion } from '../hooks/useReducedMotion';
import SectionWrapper from '../hoc/SectionWrapper';
import { experiences } from '../constants';

const ExperienceCard = ({ exp, index }) => {
  return (
    <div className="relative pl-10 md:pl-0 w-full flex flex-col md:flex-row justify-between items-start md:items-center group">
      {/* Timeline Dot */}
      <div className="absolute left-[3px] md:left-1/2 md:-translate-x-1/2 top-2 md:top-1/2 md:-translate-y-1/2 w-4 h-4 rounded-full bg-primary border-2 border-[var(--accent)] z-20 
        group-hover:bg-[var(--accent)] transition-colors duration-500 shadow-[0_0_15px_rgba(var(--accent-r),var(--accent-g),var(--accent-b),0.5)]" 
      />

      {/* Date (Left on Desktop, Top on Mobile) */}
      <div className={`md:w-[45%] ${index % 2 === 0 ? 'md:text-right md:pr-12' : 'md:order-last md:pl-12'} mb-2 md:mb-0`}>
        <span className="text-[11px] font-mono text-[var(--accent)] uppercase tracking-wider bg-[var(--accent-glass)] px-3 py-1 rounded-full border border-[var(--accent)]/20">
          {exp.date}
        </span>
      </div>

      {/* Card Content */}
      <div className={`exp-card w-full md:w-[45%] glass-subtle rounded-2xl p-6 relative overflow-hidden gradient-border transition-transform duration-500 hover:-translate-y-1
        ${index % 2 === 0 ? 'md:order-last' : 'md:text-right'}`}
      >
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[var(--accent)] to-transparent opacity-30" />
        
        <div className={`flex items-center gap-3 mb-4 ${index % 2 === 0 ? '' : 'md:flex-row-reverse'}`}>
          <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-xl shrink-0">
            {exp.icon}
          </div>
          <div>
            <h3 className="text-lg font-playfair font-semibold text-white">{exp.title}</h3>
            <p className="text-sm font-inter text-secondary/80">{exp.company}</p>
          </div>
        </div>

        <ul className={`space-y-2 mt-4 ${index % 2 === 0 ? '' : 'md:flex flex-col items-end'}`}>
          {exp.points.map((point, i) => (
            <li key={i} className="text-sm text-secondary/70 flex items-start gap-2 max-w-sm">
              <span className="text-[var(--accent)] mt-1.5 text-[8px]">●</span>
              <span className={`flex-1 ${index % 2 === 0 ? '' : 'md:text-right'}`}>{point}</span>
            </li>
          ))}
        </ul>

        {exp.link && (
          <a
            href={exp.link}
            target="_blank"
            rel="noopener noreferrer"
            className={`inline-flex items-center gap-2 mt-6 text-xs font-mono text-white/50 hover:text-[var(--accent)] transition-colors magnetic-target
              ${index % 2 === 0 ? '' : 'md:justify-end md:w-full'}`}
          >
            Visit Website
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="7" y1="17" x2="17" y2="7"></line>
              <polyline points="7 7 17 7 17 17"></polyline>
            </svg>
          </a>
        )}
      </div>
    </div>
  );
};

const Experience = () => {
  const containerRef = useRef(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (reducedMotion || !containerRef.current) return;

    const ctx = gsap.context(() => {
      // Timeline progress fill animation
      gsap.to('.timeline-fill', {
        height: '100%',
        ease: 'none',
        scrollTrigger: {
          trigger: '.timeline-container',
          start: 'top center',
          end: 'bottom center',
          scrub: true,
        }
      });

      // Reveal cards
      gsap.utils.toArray('.exp-card').forEach((card) => {
        gsap.fromTo(
          card,
          { y: 50, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 85%',
            }
          }
        );
      });
    }, containerRef);

    return () => ctx.revert();
  }, [reducedMotion]);

  return (
    <div ref={containerRef} className="w-full relative">
      {/* Ambient Glow Orb */}
      <div className="absolute top-[20%] right-[-10%] w-[400px] h-[400px] bg-[var(--accent)]/15 rounded-full blur-[120px] pointer-events-none -z-10" />

      <div className="mb-16">
        <p className="text-sm font-mono text-secondary tracking-widest uppercase mb-2">02</p>
        <h2 className="text-5xl md:text-6xl font-playfair font-bold text-white italic">Experience</h2>
      </div>

      <div className="timeline-container relative max-w-4xl mx-auto py-10">
        {/* Background Line */}
        <div className="absolute left-[10px] md:left-1/2 md:-translate-x-1/2 top-0 bottom-0 w-[2px] bg-white/5 rounded-full" />
        
        {/* Animated Fill Line */}
        <div className="timeline-fill absolute left-[10px] md:left-1/2 md:-translate-x-1/2 top-0 w-[2px] bg-gradient-to-b from-[var(--accent)] to-[var(--accent-cyan)] shadow-[0_0_15px_rgba(var(--accent-r),var(--accent-g),var(--accent-b),0.5)] h-0 rounded-full z-10" />

        <div className="space-y-16">
          {experiences.map((exp, index) => (
            <ExperienceCard key={index} exp={exp} index={index} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default SectionWrapper(Experience, 'experience', '02');
