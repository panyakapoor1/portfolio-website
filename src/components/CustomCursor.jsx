import { useEffect, useRef, useCallback } from 'react';
import { gsap } from '../utils/gsap';
import '../styles/cursor.css';

const CustomCursor = () => {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const textRef = useRef(null);
  const isTouch = useRef(false);

  useEffect(() => {
    isTouch.current = window.matchMedia('(pointer: coarse)').matches;
  }, []);

  const handleMouseMove = useCallback((e) => {
    if (isTouch.current) return;

    const { clientX: x, clientY: y } = e;

    gsap.set(dotRef.current, { x, y });
    gsap.to(ringRef.current, {
      x,
      y,
      duration: 0.6,
      ease: 'power2.out',
    });
  }, []);

  const handleMouseEnter = useCallback((e) => {
    if (isTouch.current) return;
    const target = e.target;

    if (target.closest('canvas')) {
      gsap.to([dotRef.current, ringRef.current], { opacity: 0, duration: 0.2 });
      return;
    }

    if (target.closest('.project-card')) {
      gsap.to(ringRef.current, { width: 80, height: 80, duration: 0.3 });
      if (textRef.current) {
        textRef.current.style.opacity = '1';
        textRef.current.textContent = 'VIEW';
      }
      return;
    }

    if (target.closest('a, button, [role="button"]')) {
      gsap.to(ringRef.current, {
        width: 60,
        height: 60,
        borderColor: '#915EFF',
        duration: 0.3,
      });
    }
  }, []);

  const handleMouseLeave = useCallback(() => {
    if (isTouch.current) return;
    gsap.to([dotRef.current, ringRef.current], { opacity: 1, duration: 0.2 });
    gsap.to(ringRef.current, {
      width: 40,
      height: 40,
      borderColor: 'rgba(255, 255, 255, 0.5)',
      duration: 0.3,
    });
    if (textRef.current) {
      textRef.current.style.opacity = '0';
      textRef.current.textContent = '';
    }
  }, []);

  useEffect(() => {
    if (isTouch.current) return;

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseover', handleMouseEnter);
    document.addEventListener('mouseout', handleMouseLeave);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseover', handleMouseEnter);
      document.removeEventListener('mouseout', handleMouseLeave);
    };
  }, [handleMouseMove, handleMouseEnter, handleMouseLeave]);

  if (typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches) {
    return null;
  }

  return (
    <>
      <div ref={dotRef} className="cursor-dot" />
      <div ref={ringRef} className="cursor-ring">
        <span ref={textRef} className="cursor-text" />
      </div>
    </>
  );
};

export default CustomCursor;
