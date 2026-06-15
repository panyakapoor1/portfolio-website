import { useEffect, useState, useRef } from 'react';
import { gsap } from '../utils/gsap';

const Preloader = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const containerRef = useRef(null);
  const barRef = useRef(null);

  useEffect(() => {
    let currentProgress = 0;
    
    // Simulate loading progress
    const interval = setInterval(() => {
      currentProgress += Math.random() * 20;
      
      if (currentProgress >= 100) {
        currentProgress = 100;
        clearInterval(interval);
        
        // Outro animation
        const tl = gsap.timeline({
          onComplete: () => {
            if (onComplete) onComplete();
          }
        });
        
        tl.to('.preloader-content', {
          opacity: 0,
          y: -20,
          duration: 0.6,
          ease: "power2.inOut"
        })
        .to(containerRef.current, {
          opacity: 0,
          duration: 0.8,
          ease: "power2.inOut",
        });
      }
      
      setProgress(Math.floor(currentProgress));
    }, 120);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <div ref={containerRef} className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#050505] overflow-hidden">
      
      <div className="preloader-content flex flex-col items-center relative z-10 w-full max-w-sm px-8">
        
        {/* Minimalist Progress Line */}
        <div className="w-full h-[1px] bg-white/10 relative overflow-hidden mb-6">
          <div 
            ref={barRef}
            className="absolute top-0 left-0 h-full bg-white transition-all duration-300 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>

        <div className="flex justify-between items-center w-full">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-white animate-pulse" />
            <span className="text-[10px] font-mono tracking-widest uppercase text-white/50">
              Initializing
            </span>
          </div>
          <span className="text-xs font-mono text-white/80">
            {String(progress).padStart(3, '0')} %
          </span>
        </div>

      </div>
      
    </div>
  );
};

export default Preloader;
