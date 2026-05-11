import { useEffect, useRef } from 'react';
import Lenis from '@studio-freight/lenis';
import { gsap } from '../utils/gsap';
import { ScrollTrigger } from '../utils/gsap';

export const useLenis = () => {
  const lenisRef = useRef(null);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.4,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smooth: true,
      smoothTouch: false,
    });

    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });
    gsap.ticker.lagSmoothing(0);

    lenisRef.current = lenis;

    return () => {
      lenis.destroy();
      gsap.ticker.remove(lenis.raf);
    };
  }, []);

  return lenisRef;
};

export default useLenis;
