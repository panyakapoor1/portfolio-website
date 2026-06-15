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
    
    // Check if hovering over a magnetic target
    const target = document.elementFromPoint(x, y)?.closest('.magnetic-target');
    
    if (target) {
      const rect = target.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      // Calculate pull (max 15px)
      const pullX = (x - centerX) * 0.2;
      const pullY = (y - centerY) * 0.2;

      gsap.to(ringRef.current, {
        x: centerX + pullX,
        y: centerY + pullY,
        duration: 0.2,
        ease: 'power2.out',
      });
      
      // Pull the button itself slightly
      gsap.to(target, {
        x: pullX,
        y: pullY,
        duration: 0.3,
        ease: 'power2.out',
      });
    } else {
      gsap.to(ringRef.current, {
        x,
        y,
        duration: 0.6,
        ease: 'power2.out',
      });
    }
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

    if (target.closest('a, button, [role="button"], .magnetic-target')) {
      gsap.to(ringRef.current, {
        width: 60,
        height: 60,
        borderColor: 'var(--accent)',
        backgroundColor: 'transparent',
        duration: 0.3,
      });
      gsap.to(dotRef.current, { scale: 0, duration: 0.2 });
    }
  }, []);

  const handleMouseLeave = useCallback((e) => {
    if (isTouch.current) return;
    
    const target = e.target.closest('.magnetic-target');
    if (target) {
      // Reset button position
      gsap.to(target, { x: 0, y: 0, duration: 0.5, ease: 'elastic.out(1, 0.3)' });
    }

    gsap.to([dotRef.current, ringRef.current], { opacity: 1, duration: 0.2 });
    gsap.to(dotRef.current, { scale: 1, duration: 0.2 });
    gsap.to(ringRef.current, {
      width: 40,
      height: 40,
      borderColor: 'rgba(255, 255, 255, 0.6)',
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
