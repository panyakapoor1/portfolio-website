import { useEffect, useRef } from 'react';
import { gsap, ScrollTrigger } from '../utils/gsap';
import { experiences } from '../constants';
import { useReducedMotion } from '../hooks/useReducedMotion';
import SectionWrapper from '../hoc/SectionWrapper';

const ExperienceCard = ({ experience, index }) => (
  <div className="timeline-item flex gap-6 sm:gap-10 relative">
    <div className="flex flex-col items-center">
      <div className="w-12 h-12 rounded-full bg-accent/10 border border-accent/20 flex items-center justify-center text-2xl flex-shrink-0 z-10">
        {experience.icon}
      </div>
      {index < experiences.length - 1 && (
        <div className="w-px flex-1 bg-gradient-to-b from-accent/20 to-transparent mt-2" />
      )}
    </div>

    <div className="pb-12 flex-1">
      <div className="bg-tertiary/40 border border-[rgba(145,94,255,0.08)] rounded-xl p-6 backdrop-blur-sm hover:border-accent/15 transition-all duration-300">
        <p className="text-xs font-inter text-accent font-medium uppercase tracking-wider mb-2">
          {experience.date}
        </p>
        <h3 className="text-xl font-poppins font-semibold text-white mb-1">
          {experience.title}
        </h3>
        <p className="text-sm font-inter text-secondary mb-2">
          {experience.company}
        </p>
        {experience.link && (
          <a
            href={experience.link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block text-xs font-inter text-accent hover:underline mb-4"
          >
            View Project →
          </a>
        )}
        <ul className="space-y-2">
          {experience.points.map((point, i) => (
            <li key={i} className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-accent mt-2 flex-shrink-0" />
              <span className="text-sm font-inter text-secondary/80 leading-relaxed">
                {point}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  </div>
);

const Experience = () => {
  const sectionRef = useRef(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (reducedMotion) return;

    gsap.fromTo(
      '.timeline-item',
      { x: -60, autoAlpha: 0 },
      {
        x: 0,
        autoAlpha: 1,
        stagger: 0.18,
        ease: 'power2.out',
        duration: 0.8,
        scrollTrigger: {
          trigger: '.experience-section',
          start: 'top 70%',
        },
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach((t) => {
        if (t.vars?.trigger === '.experience-section') t.kill();
      });
    };
  }, [reducedMotion]);

  return (
    <div ref={sectionRef} className="experience-section">
      <p className="text-sm font-inter uppercase tracking-[4px] text-secondary mb-2">What I've Done So Far</p>
      <h2 className="text-4xl sm:text-5xl font-poppins font-bold text-white mb-12">
        Experience<span className="text-accent">.</span>
      </h2>

      <div className="max-w-3xl mx-auto">
        {experiences.map((exp, index) => (
          <ExperienceCard key={exp.company} experience={exp} index={index} />
        ))}
      </div>
    </div>
  );
};

export default SectionWrapper(Experience, 'experience');
