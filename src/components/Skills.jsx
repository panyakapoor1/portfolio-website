import { useEffect, useRef } from 'react';
import { gsap, ScrollTrigger } from '../utils/gsap';
import { skillCategories } from '../constants';
import { useReducedMotion } from '../hooks/useReducedMotion';
import SectionWrapper from '../hoc/SectionWrapper';

const Skills = () => {
  const gridRef = useRef(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (reducedMotion || !gridRef.current) return;

    const items = gridRef.current.querySelectorAll('.skill-card');
    gsap.fromTo(
      items,
      { y: 40, autoAlpha: 0, scale: 0.95 },
      {
        y: 0,
        autoAlpha: 1,
        scale: 1,
        stagger: 0.08,
        duration: 0.6,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: gridRef.current,
          start: 'top 75%',
        },
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach((t) => {
        if (t.vars?.trigger === gridRef.current) t.kill();
      });
    };
  }, [reducedMotion]);

  return (
    <>
      <p className="text-sm font-inter uppercase tracking-[4px] text-secondary mb-2">What I Work With</p>
      <h2 className="text-4xl sm:text-5xl font-poppins font-bold text-white mb-12">
        Skills<span className="text-accent">.</span>
      </h2>

      <div ref={gridRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {skillCategories.map((category) => (
          <div
            key={category.title}
            className="skill-card bg-tertiary/30 border border-[rgba(145,94,255,0.08)] rounded-xl p-6 backdrop-blur-sm hover:border-accent/15 transition-all duration-300 group"
          >
            <h3 className="text-sm font-inter font-semibold text-accent uppercase tracking-wider mb-4">
              {category.title}
            </h3>
            <div className="flex flex-wrap gap-2">
              {category.skills.map((skill) => (
                <span
                  key={skill}
                  className="text-sm font-inter text-secondary/90 px-3 py-1.5 rounded-lg bg-primary/50 border border-white/5 hover:border-accent/20 hover:text-white transition-all duration-200"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default SectionWrapper(Skills, 'skills');
