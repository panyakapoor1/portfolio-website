/* eslint-disable react-refresh/only-export-components */
import { useRef, useState, useEffect } from 'react';
import { gsap } from '../utils/gsap';
import { useReducedMotion } from '../hooks/useReducedMotion';
import SectionWrapper from '../hoc/SectionWrapper';
import { skillCategories, certifications } from '../constants';

const Skills = () => {
  const containerRef = useRef(null);
  const flowerRef = useRef(null);
  const reducedMotion = useReducedMotion();
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  // 3D Parallax Mouse Tracking for the entire flower
  useEffect(() => {
    if (reducedMotion || !flowerRef.current) return;

    const handleMouseMove = (e) => {
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      
      // Normalize mouse position between -1 and 1
      const x = (clientX / innerWidth) * 2 - 1;
      const y = (clientY / innerHeight) * 2 - 1;
      
      setMousePos({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [reducedMotion]);

  // Apply parallax tilt using GSAP
  useEffect(() => {
    if (!flowerRef.current || reducedMotion) return;
    
    gsap.to(flowerRef.current, {
      rotateY: mousePos.x * 15, // Max 15 degree tilt
      rotateX: -mousePos.y * 15,
      ease: 'power2.out',
      duration: 1
    });
  }, [mousePos, reducedMotion]);

  // Entrance Animation
  useEffect(() => {
    if (reducedMotion || !containerRef.current) return;

    gsap.fromTo(
      containerRef.current,
      { opacity: 0, y: 100 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 70%',
        }
      }
    );
  }, [reducedMotion]);

  return (
    <div ref={containerRef} className="w-full relative">
      {/* Ambient Glow Orb */}
      <div className="absolute top-[50%] right-[-10%] w-[400px] h-[400px] bg-[var(--accent)]/15 rounded-full blur-[120px] pointer-events-none -z-10" />

      <div className="mb-16 md:text-center relative z-20 pointer-events-none">
        <p className="text-sm font-mono text-secondary tracking-widest uppercase mb-2">04</p>
        <h2 className="text-5xl md:text-6xl font-playfair font-bold text-white italic drop-shadow-lg">
          Skills
        </h2>
      </div>

      {/* MOBILE LAYOUT: Standard Stack (Hidden on md+) */}
      <div className="md:hidden flex flex-col gap-6 mb-24 mt-8">
        {skillCategories.map((category, index) => (
          <div key={index} className="glass-subtle rounded-3xl p-6 border border-white/5 relative overflow-hidden">
            <h3 className="text-xl font-playfair font-semibold text-[var(--accent)] mb-4">{category.title}</h3>
            <div className="flex flex-wrap gap-2">
              {category.skills.map((skill, i) => (
                <span key={i} className="text-xs text-white/80 bg-white/5 px-3 py-1.5 rounded-full border border-white/10">
                  {skill}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* DESKTOP LAYOUT: The Interactive 3D Flower Bloom (Hidden on mobile) */}
      <div className="hidden md:flex relative w-full h-[1000px] items-center justify-center mb-8 mt-4 perspective-[1500px]">
        <div 
          ref={flowerRef} 
          className="relative w-[100px] h-[100px] preserve-3d"
        >
          {/* Central Core */}
          <div className="absolute inset-0 -ml-[40px] -mt-[40px] w-[180px] h-[180px] rounded-full glass-strong border border-[var(--accent)]/30 flex items-center justify-center z-50 shadow-[0_0_80px_rgba(var(--accent-r),var(--accent-g),var(--accent-b),0.3)] animate-pulse-slow">
            <div className="text-center">
              <div className="w-10 h-10 mx-auto mb-2 text-[var(--accent)]">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                </svg>
              </div>
              <h3 className="text-base font-playfair font-bold text-white tracking-widest uppercase">Core</h3>
            </div>
          </div>

          {/* Flower Petals */}
          {skillCategories.map((category, index) => {
            const total = skillCategories.length;
            // Offset by 30 degrees so the header sits perfectly in the 'V' gap at the top
            const angle = (360 / total) * index + 30;
            const isHovered = hoveredIndex === index;
            const isAnyHovered = hoveredIndex !== null;
            
            // Base radius when idle, expanded radius when hovered
            // Restored to larger size to prevent horizontal overlapping of the cards
            const baseRadius = 280; 
            const expandedRadius = 360;
            // If another petal is hovered, push non-hovered petals slightly further away and dim them
            const radius = isHovered ? expandedRadius : (isAnyHovered ? baseRadius + 15 : baseRadius);
            const opacity = isHovered ? 1 : (isAnyHovered ? 0.3 : 0.8);
            const scale = isHovered ? 1.1 : (isAnyHovered ? 0.9 : 1);
            
            return (
              <div
                key={index}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                className="absolute top-1/2 left-1/2 w-56 lg:w-64 -ml-28 lg:-ml-32 -mt-24 lg:-mt-24 z-40 cursor-default"
                style={{
                  // The magical CSS that places elements in a perfect circle but keeps them upright
                  transform: `rotate(${angle}deg) translateY(-${radius}px) rotate(-${angle}deg) scale(${scale})`,
                  transition: 'transform 0.8s cubic-bezier(0.34, 1.56, 0.64, 1), opacity 0.5s ease',
                  opacity: opacity,
                }}
              >
                <div 
                  className={`bento-box glass-strong rounded-3xl p-6 lg:p-8 h-full flex flex-col group hover:glow-box transition-all duration-500 border overflow-hidden ${
                    isHovered ? 'border-[var(--accent)]/50 bg-[#0a0a0a]/80 shadow-[0_0_40px_rgba(var(--accent-r),var(--accent-g),var(--accent-b),0.2)]' : 'border-white/5 bg-transparent'
                  }`}
                >
                  {/* Dynamic background glow inside the petal */}
                  <div 
                    className="absolute inset-0 bg-gradient-to-br from-[var(--accent)]/10 to-transparent transition-opacity duration-500"
                    style={{ opacity: isHovered ? 1 : 0 }}
                  />

                  <div className="relative z-10 flex flex-col h-full">
                    <h3 className={`text-xl font-playfair font-semibold mb-4 transition-colors duration-300 ${isHovered ? 'text-[var(--accent)]' : 'text-white/90'}`}>
                      {category.title}
                    </h3>
                    
                    <div className="flex flex-wrap gap-2">
                      {category.skills.map((skill, skillIdx) => (
                        <span 
                          key={skillIdx} 
                          className={`text-xs font-inter px-3 py-1.5 rounded-full transition-all duration-300 ${
                            isHovered 
                              ? 'bg-[var(--accent)]/10 text-white border border-[var(--accent)]/30' 
                              : 'bg-white/5 text-white/60 border border-white/5'
                          }`}
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Certificates and Certifications Area */}
      <div className="relative border-t border-white/5 pt-16 mt-12 md:mt-0">
        <h3 className="text-5xl md:text-6xl font-playfair font-bold text-white italic drop-shadow-lg mb-12 md:text-center">Certificates and Certifications</h3>
        
        <div className="flex flex-wrap justify-center gap-4">
          {certifications.map((cert, index) => (
            <div 
              key={index} 
              className="glass-subtle px-5 py-3 rounded-xl border border-white/5 flex items-center gap-4 group hover:border-[var(--accent)]/30 transition-all duration-300"
            >
              <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center shrink-0 border border-white/10 group-hover:border-[var(--accent)]/50 transition-colors">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-white/50 group-hover:text-[var(--accent)] transition-colors">
                  <path d="M12 15l-2 5-9-5 2-5M12 15l2 5 9-5-2-5M12 15V3" />
                  <circle cx="12" cy="3" r="2" />
                </svg>
              </div>
              <div>
                <p className="text-sm font-medium text-white group-hover:text-[var(--accent)] transition-colors">{cert.title}</p>
                <p className="text-[10px] font-mono text-secondary/60 uppercase tracking-wider">{cert.issuer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SectionWrapper(Skills, 'skills', '04');
