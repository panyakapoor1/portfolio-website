/* eslint-disable react-refresh/only-export-components */
import { useRef, useEffect } from 'react';
import { gsap } from '../utils/gsap';
import { useReducedMotion } from '../hooks/useReducedMotion';
import SectionWrapper from '../hoc/SectionWrapper';
import { aboutData, heroData } from '../constants';

const About = () => {
  const containerRef = useRef(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (reducedMotion || !containerRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.bento-box',
        { y: 50, opacity: 0, scale: 0.95 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.8,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 75%',
          },
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, [reducedMotion]);

  return (
    <div ref={containerRef} className="w-full relative">
      {/* Ambient Glow Orbs */}
      <div className="absolute top-[10%] left-[-10%] w-[500px] h-[500px] bg-[var(--accent)]/15 rounded-full blur-[120px] pointer-events-none -z-10" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-[var(--accent)]/10 rounded-full blur-[150px] pointer-events-none -z-10" />

      <div className="mb-12">
        <p className="text-sm font-mono text-secondary tracking-widest uppercase mb-2">01</p>
        <h2 className="text-5xl md:text-6xl font-playfair font-bold text-white italic">About Me</h2>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        
        {/* Left Side: Square Photo */}
        <div className="w-full lg:w-[420px] shrink-0">
          <div className="bento-box glass-strong rounded-3xl p-2 relative overflow-hidden group aspect-square magnetic-target flex items-center justify-center border border-white/[0.03]">
            <div className="absolute inset-0 bg-gradient-to-t from-[var(--accent-glow)] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10 pointer-events-none" />
            <img 
              src={heroData.profileImage} 
              alt="Panya Kapoor" 
              className="w-full h-full object-cover rounded-2xl transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:scale-105"
            />
          </div>
        </div>

        {/* Right Side: Bio and Stats */}
        <div className="flex-1 flex flex-col gap-6">
          
          {/* Bio Box */}
          <div className="bento-box glass-subtle rounded-3xl p-8 lg:p-10 relative overflow-hidden flex-1 flex flex-col justify-center border border-white/[0.03]">
            <div className="absolute top-0 right-0 p-6 opacity-20 text-white/50">
              <svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
                <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
              </svg>
            </div>
            <p className="text-secondary/90 font-inter leading-relaxed text-sm lg:text-base max-w-3xl">
              {aboutData.bio}
            </p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            
            {/* Stat Pill 1 */}
            <div className="bento-box glass-subtle rounded-3xl p-6 relative overflow-hidden flex flex-col justify-between border border-white/[0.03] group hover:border-[var(--accent)]/30 hover:shadow-[0_0_30px_rgba(var(--accent-r),var(--accent-g),var(--accent-b),0.15)] transition-all duration-500">
              <div className="absolute inset-0 bg-gradient-to-br from-[var(--accent)]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
              <div className="relative z-10 w-10 h-10 rounded-full bg-white/5 flex items-center justify-center mb-6 group-hover:bg-[var(--accent)]/20 transition-colors">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-white/70">
                  <path d="M22 10v6M2 10l10-5 10 5-10 5z"></path>
                  <path d="M6 12v5c3 3 9 3 12 0v-5"></path>
                </svg>
              </div>
              <div className="relative z-10">
                <p className="text-[10px] font-mono text-secondary uppercase mb-1">{aboutData.stats[0].label}</p>
                <p className="text-2xl font-playfair font-semibold text-white group-hover:text-[var(--accent)] transition-colors duration-300">{aboutData.stats[0].value}</p>
                <p className="text-[11px] text-secondary/60 mt-1">{aboutData.stats[0].sub}</p>
              </div>
            </div>

            {/* Stat Pill 2 */}
            <div className="bento-box glass-subtle rounded-3xl p-6 relative overflow-hidden flex flex-col justify-between border border-white/[0.03] group hover:border-[var(--accent)]/30 hover:shadow-[0_0_30px_rgba(var(--accent-r),var(--accent-g),var(--accent-b),0.15)] transition-all duration-500">
              <div className="absolute inset-0 bg-gradient-to-br from-[var(--accent)]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
              <div className="relative z-10 w-10 h-10 rounded-full bg-white/5 flex items-center justify-center mb-6 group-hover:bg-[var(--accent)]/20 transition-colors">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-white/70">
                  <polyline points="16 18 22 12 16 6"></polyline>
                  <polyline points="8 6 2 12 8 18"></polyline>
                </svg>
              </div>
              <div className="relative z-10">
                <p className="text-[10px] font-mono text-secondary uppercase mb-1">{aboutData.stats[1].label}</p>
                <p className="text-2xl font-playfair font-semibold text-white group-hover:text-[var(--accent)] transition-colors duration-300">{aboutData.stats[1].value}</p>
                <p className="text-[11px] text-secondary/60 mt-1">{aboutData.stats[1].sub}</p>
              </div>
            </div>

            {/* Stat Pill 3 */}
            <div className="bento-box glass-subtle rounded-3xl p-6 relative overflow-hidden flex flex-col justify-between border border-white/[0.03] group hover:border-[var(--accent)]/30 hover:shadow-[0_0_30px_rgba(var(--accent-r),var(--accent-g),var(--accent-b),0.15)] transition-all duration-500">
              <div className="absolute inset-0 bg-gradient-to-br from-[var(--accent)]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
              <div className="relative z-10 w-10 h-10 rounded-full bg-white/5 flex items-center justify-center mb-6 group-hover:bg-[var(--accent)]/20 transition-colors">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-white/70">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                  <polyline points="22 4 12 14.01 9 11.01" />
                </svg>
              </div>
              <div className="relative z-10">
                <p className="text-[10px] font-mono text-secondary uppercase mb-1">{aboutData.stats[2].label}</p>
                <p className="text-2xl font-playfair font-semibold text-white group-hover:text-[var(--accent)] transition-colors duration-300">{aboutData.stats[2].value}</p>
                <p className="text-[11px] text-secondary/80 mt-1">{aboutData.stats[2].sub}</p>
              </div>
            </div>

          </div>
        </div>
        
      </div>
    </div>
  );
};

export default SectionWrapper(About, 'about', '01');
