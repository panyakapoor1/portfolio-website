import { useEffect, useRef } from 'react';
import { TypeAnimation } from 'react-type-animation';
import { gsap } from '../utils/gsap';
import { heroData } from '../constants';
import { useReducedMotion } from '../hooks/useReducedMotion';
import PixelFluidText from './PixelFluidText';

const Hero = () => {
  const heroRef = useRef(null);
  const contentRef = useRef(null);
  const textContainerRef = useRef(null);
  const reducedMotion = useReducedMotion();
  const name = heroData.name;

  useEffect(() => {
    if (reducedMotion) return;

    const tl = gsap.timeline({ delay: 1.6 });
    if (textContainerRef.current) {
      tl.fromTo(
        textContainerRef.current,
        { y: 40, opacity: 0, scale: 0.95 },
        { y: 0, opacity: 1, scale: 1, duration: 1.2, ease: 'power3.out' }
      );
    }

    // Scroll parallax
    gsap.to('.hero-content-wrapper', {
      y: '30%',
      opacity: 0,
      ease: 'none',
      scrollTrigger: {
        trigger: '.hero-section',
        start: 'top top',
        end: 'bottom top',
        scrub: true,
      }
    });

    return () => {
      // Cleanup scroll triggers
    };
  }, [reducedMotion]);

  return (
    <section ref={heroRef} className="hero-section relative w-full min-h-screen flex items-center justify-center overflow-hidden">
      {/* Ambient Core Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[50vw] h-[50vw] max-w-[500px] max-h-[500px] bg-[var(--accent)]/15 rounded-full blur-[100px] pointer-events-none z-0 mix-blend-screen" />

      <div ref={contentRef} className="hero-content-wrapper relative z-10 w-full max-w-7xl mx-auto px-6 flex flex-col items-center text-center pb-24 pointer-events-none">
        <p className="text-secondary/80 font-mono text-sm tracking-widest uppercase mb-0 animate-fade-in z-20" style={{ animationDelay: '1s' }}>
          Welcome To My Space
        </p>
        
        <div ref={textContainerRef} className="w-full -mt-4 -mb-[13px] md:-mt-8 md:-mb-[29px] z-10 relative">
          <PixelFluidText text={name} />
        </div>

        <div className="h-12 mb-8">
          <TypeAnimation
            sequence={heroData.typewriterSequences}
            wrapper="p"
            speed={50}
            className="text-lg sm:text-xl font-mono text-secondary/90 bg-white/[0.03] px-6 py-2 rounded-full border border-white/5"
            repeat={Infinity}
          />
        </div>


        <div className="flex flex-wrap justify-center gap-6 animate-fade-in pointer-events-auto" style={{ animationDelay: '2.8s', animationFillMode: 'both' }}>
          <a
            href={heroData.cta.primary.link}
            onClick={(e) => {
              e.preventDefault();
              document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="magnetic-target group relative px-6 py-3 bg-white/5 border border-white/10 rounded-full font-inter font-medium text-sm text-white overflow-hidden transition-all duration-300 hover:border-white/30 backdrop-blur-md"
          >
            <span className="relative z-10">{heroData.cta.primary.text}</span>
            <div className="absolute inset-0 bg-gradient-to-r from-[var(--accent-glass)] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </a>
        </div>
      </div>

    </section>
  );
};

export default Hero;
