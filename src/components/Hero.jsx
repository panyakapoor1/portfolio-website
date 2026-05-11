import { useEffect, useRef, useState } from 'react';
import { TypeAnimation } from 'react-type-animation';
import { gsap, ScrollTrigger } from '../utils/gsap';
import { heroData } from '../constants';
import { useReducedMotion } from '../hooks/useReducedMotion';
import ComputerModel from '../canvas/ComputerModel';

const Hero = () => {
  const heroRef = useRef(null);
  const contentRef = useRef(null);
  const lettersRef = useRef([]);
  const chevronRef = useRef(null);
  const reducedMotion = useReducedMotion();
  const name = heroData.name;

  useEffect(() => {
    if (reducedMotion) return;

    const tl = gsap.timeline({ delay: 1.6 });
    tl.fromTo(
      lettersRef.current.filter(Boolean),
      { y: 80, opacity: 0, rotateX: -90 },
      {
        y: 0,
        opacity: 1,
        rotateX: 0,
        stagger: 0.04,
        duration: 0.6,
        ease: 'back.out(1.7)',
      }
    );

    const scrollTl = gsap.timeline({
      scrollTrigger: {
        trigger: '.hero-section',
        start: 'top top',
        end: 'bottom top',
        scrub: 1.5,
        anticipatePin: 1,
      },
    });

    scrollTl
      .to('.hero-content', { autoAlpha: 0, y: -60, ease: 'power2.in' })
      .to('.hero-canvas-wrapper', { scale: 0.85, autoAlpha: 0 }, '<');

    if (chevronRef.current) {
      gsap.to(chevronRef.current, {
        opacity: 0,
        delay: 3,
        duration: 1,
      });
    }

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, [reducedMotion]);

  return (
    <section
      ref={heroRef}
      className="hero-section relative w-full min-h-screen flex items-center overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-primary via-[#080b20] to-[#0d0f1f] z-[1]" />

      <div className="absolute inset-0 z-[2] overflow-hidden pointer-events-none">
        {[...Array(80)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-accent/20"
            style={{
              width: `${Math.random() * 3 + 1}px`,
              height: `${Math.random() * 3 + 1}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `float ${5 + Math.random() * 10}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 5}s`,
              opacity: Math.random() * 0.5 + 0.2,
            }}
          />
        ))}
      </div>

      <div
        ref={contentRef}
        className="hero-content relative z-10 max-w-7xl mx-auto px-6 sm:px-16 w-full flex flex-col lg:flex-row items-center justify-between gap-10 pt-24"
      >
        <div className="flex-1 max-w-2xl">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-5 h-5 rounded-full bg-accent shadow-[0_0_20px_rgba(145,94,255,0.4)]" />
            <div className="w-px h-20 bg-gradient-to-b from-accent to-transparent" />
          </div>

          <h1 className="flex flex-col mb-4">
            {name.split(' ').map((word, wordIdx, words) => {
              const startIndex = words.slice(0, wordIdx).reduce((acc, w) => acc + w.length + 1, 0);
              return (
                <div key={wordIdx} className="flex flex-wrap gap-[2px]">
                  {word.split('').map((letter, letterIdx) => (
                    <span
                      key={letterIdx}
                      ref={(el) => (lettersRef.current[startIndex + letterIdx] = el)}
                      className="text-5xl sm:text-7xl lg:text-8xl font-poppins font-bold text-white inline-block"
                      style={{ opacity: reducedMotion ? 1 : 0 }}
                    >
                      {letter}
                    </span>
                  ))}
                </div>
              );
            })}
          </h1>

          <div className="h-12 mb-8">
            <TypeAnimation
              sequence={heroData.typewriterSequences}
              wrapper="p"
              speed={50}
              className="text-xl sm:text-2xl font-inter text-secondary"
              repeat={Infinity}
            />
          </div>

          <div className="flex flex-wrap gap-4">
            <a
              href={heroData.cta.primary.link}
              onClick={(e) => {
                e.preventDefault();
                document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="group relative px-8 py-3.5 bg-accent/10 border border-accent/30 rounded-xl font-inter font-medium text-white text-sm overflow-hidden transition-all duration-300 hover:border-accent/60 hover:shadow-[0_0_30px_rgba(145,94,255,0.15)]"
              id="cta-view-work"
            >
              <span className="relative z-10">{heroData.cta.primary.text}</span>
              <div className="absolute inset-0 bg-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </a>
            <a
              href={heroData.cta.secondary.link}
              className="px-8 py-3.5 border border-white/10 rounded-xl font-inter font-medium text-secondary text-sm transition-all duration-300 hover:border-white/25 hover:text-white"
              id="cta-download-resume"
              target="_blank"
              rel="noopener noreferrer"
            >
              {heroData.cta.secondary.text}
            </a>
          </div>
        </div>

        <div className="hero-canvas-wrapper flex-1 w-full h-[350px] sm:h-[450px] lg:h-[550px] hidden xs:block">
          <ComputerModel />
        </div>
      </div>

      <div
        ref={chevronRef}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
      >
        <div className="w-[30px] h-[50px] rounded-full border-2 border-secondary/30 flex justify-center pt-2">
          <div className="w-2 h-2 rounded-full bg-accent animate-bounce" />
        </div>
      </div>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) translateX(0px); }
          25% { transform: translateY(-15px) translateX(5px); }
          50% { transform: translateY(-5px) translateX(-5px); }
          75% { transform: translateY(-20px) translateX(8px); }
        }
      `}</style>
    </section>
  );
};

export default Hero;
