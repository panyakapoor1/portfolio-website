import { useEffect, useRef } from 'react';
import { gsap, ScrollTrigger } from '../utils/gsap';
import { useReducedMotion } from '../hooks/useReducedMotion';

const SectionWrapper = (Component, idName, className = '') => {
  function HOC(props) {
    const sectionRef = useRef(null);
    const titleRef = useRef(null);
    const reducedMotion = useReducedMotion();

    useEffect(() => {
      if (reducedMotion) return;

      const section = sectionRef.current;
      const title = titleRef.current;

      if (title) {
        gsap.fromTo(
          title,
          { y: 40, autoAlpha: 0 },
          {
            y: 0,
            autoAlpha: 1,
            duration: 0.9,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: section,
              start: 'top 80%',
            },
          }
        );
      }

      return () => {
        ScrollTrigger.getAll().forEach((trigger) => {
          if (trigger.vars.trigger === section) {
            trigger.kill();
          }
        });
      };
    }, [reducedMotion]);

    return (
      <section
        ref={sectionRef}
        id={idName}
        className={`relative z-10 mx-auto max-w-7xl px-6 py-16 sm:px-16 sm:py-24 ${className}`}
      >
        <span className="hash-span" id={idName}>
          &nbsp;
        </span>
        <div ref={titleRef}>
          <Component {...props} />
        </div>
      </section>
    );
  }

  HOC.displayName = `SectionWrapper(${Component.displayName || Component.name || 'Component'})`;
  return HOC;
};

export default SectionWrapper;
