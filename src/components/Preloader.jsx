import { useEffect, useRef, useState } from 'react';
import { gsap } from '../utils/gsap';

const Preloader = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const preloaderRef = useRef(null);
  const progressBarRef = useRef(null);
  const lettersRef = useRef([]);
  const counterRef = useRef(null);
  const name = 'PANYA KAPOOR';
  const startTime = useRef(Date.now());

  useEffect(() => {
    const tl = gsap.timeline();
    tl.fromTo(
      lettersRef.current,
      { y: 60, opacity: 0, rotateX: -90 },
      {
        y: 0,
        opacity: 1,
        rotateX: 0,
        stagger: 0.06,
        duration: 0.7,
        ease: 'back.out(1.7)',
      }
    );

    const interval = setInterval(() => {
      setProgress((prev) => {
        const next = Math.min(prev + Math.random() * 15 + 5, 100);
        return next;
      });
    }, 100);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (counterRef.current) {
      gsap.to(counterRef.current, {
        textContent: Math.round(progress),
        duration: 0.3,
        snap: { textContent: 1 },
      });
    }

    if (progressBarRef.current) {
      gsap.to(progressBarRef.current, {
        width: `${progress}%`,
        duration: 0.3,
        ease: 'power2.out',
      });
    }

    if (progress >= 100) {
      const elapsed = Date.now() - startTime.current;
      const remainingDelay = Math.max(1200 - elapsed, 0);

      setTimeout(() => {
        gsap.to(preloaderRef.current, {
          yPercent: -100,
          duration: 0.8,
          ease: 'power3.inOut',
          onComplete: () => {
            if (onComplete) onComplete();
          },
        });
      }, remainingDelay);
    }
  }, [progress, onComplete]);

  return (
    <div
      ref={preloaderRef}
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-primary"
      style={{ willChange: 'transform' }}
    >
      <div className="flex gap-1 mb-12 overflow-hidden">
        {name.split('').map((letter, i) => (
          <span
            key={i}
            ref={(el) => (lettersRef.current[i] = el)}
            className="text-4xl sm:text-6xl font-poppins font-bold text-white inline-block"
            style={{
              opacity: 0,
              display: letter === ' ' ? 'inline-block' : undefined,
              width: letter === ' ' ? '0.5em' : undefined,
            }}
          >
            {letter === ' ' ? '\u00A0' : letter}
          </span>
        ))}
      </div>

      <div className="w-64 sm:w-80 h-[2px] bg-[#1d1836] rounded-full overflow-hidden">
        <div
          ref={progressBarRef}
          className="h-full bg-accent rounded-full"
          style={{ width: '0%', boxShadow: '0 0 12px rgba(145, 94, 255, 0.6)' }}
        />
      </div>

      <span
        ref={counterRef}
        className="mt-4 text-sm font-inter text-secondary tracking-widest"
      >
        0
      </span>
      <span className="text-sm font-inter text-secondary tracking-widest">%</span>
    </div>
  );
};

export default Preloader;
