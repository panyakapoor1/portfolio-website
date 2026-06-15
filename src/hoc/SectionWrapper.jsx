import { gsap } from '../utils/gsap';
import { useEffect, useRef } from 'react';
import { useReducedMotion } from '../hooks/useReducedMotion';

const SectionWrapper = (Component, idName, sectionNumber) => {
  return function HOC() {
    const sectionRef = useRef(null);
    const reducedMotion = useReducedMotion();

    useEffect(() => {
      if (reducedMotion || !sectionRef.current) return;

      const ctx = gsap.context(() => {
        // Subtle slide-up reveal for the entire section content
        gsap.fromTo(
          '.section-content',
          { y: 50, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 80%',
              end: 'top 50%',
              scrub: 1,
            },
          }
        );
        
        // Parallax effect on the background section number
        if (sectionNumber) {
          gsap.to('.section-number', {
            y: -100,
            ease: 'none',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top bottom',
              end: 'bottom top',
              scrub: true,
            }
          });
        }
      }, sectionRef);

      return () => ctx.revert();
    }, [reducedMotion]);

    return (
      <section
        ref={sectionRef}
        id={idName}
        className="relative sm:px-16 px-6 sm:py-24 py-16 max-w-7xl mx-auto z-0"
      >
        {/* Gradient divider line at the top of the section */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[80%] h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
        
        <span className="hash-span" id={idName}>
          &nbsp;
        </span>
        
        {/* Numbered section indicator (Mradul/Hitakshi inspired) */}
        {sectionNumber && (
          <div className="section-number">{sectionNumber}</div>
        )}

        <div className="section-content relative z-10">
          <Component />
        </div>
      </section>
    );
  };
};

export default SectionWrapper;
