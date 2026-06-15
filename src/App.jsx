import { useState, Suspense, useCallback, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import Preloader from './components/Preloader';
import CustomCursor from './components/CustomCursor';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Experience from './components/Experience';
import Projects from './components/Projects';
import Skills from './components/Skills';
import Contact from './components/Contact';
import Footer from './components/Footer';
import PortfolioAssistant from './components/PortfolioAssistant';
import Stars from './canvas/Stars';
import RippleTransition from './components/RippleTransition';
import { isWebGLAvailable } from './utils/webgl';

const App = () => {
  const [loaded, setLoaded] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [ripple, setRipple] = useState(null); // { color, x, y, themePayload }

  const handlePreloaderComplete = useCallback(() => {
    setLoaded(true);
  }, []);

  // Update scroll progress bar
  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollTop;
      const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scroll = `${totalScroll / windowHeight}`;
      setScrollProgress(scroll);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const applyTheme = (theme) => {
    document.documentElement.style.setProperty('--accent', theme.color);
    document.documentElement.style.setProperty('--accent-r', theme.r);
    document.documentElement.style.setProperty('--accent-g', theme.g);
    document.documentElement.style.setProperty('--accent-b', theme.b);
  };

  return (
    <div className="relative bg-transparent text-white selection:bg-[var(--accent)]/30 min-h-screen z-0">
      {!loaded && <Preloader onComplete={handlePreloaderComplete} />}
      <CustomCursor />

      {ripple && (
        <RippleTransition
          color={ripple.color}
          x={ripple.x}
          y={ripple.y}
          onComplete={() => {
            applyTheme(ripple.themePayload);
            setRipple(null);
          }}
        />
      )}

      {/* Global Scroll Progress Bar */}
      <div 
        className="scroll-progress" 
        style={{ transform: `scaleX(${scrollProgress})`, transformOrigin: '0 0' }} 
      />

      {isWebGLAvailable() && (
        <div 
          className="fixed inset-0 z-0 pointer-events-none"
          style={{
            opacity: loaded ? 1 : 0,
            transition: 'opacity 0.6s ease-in-out',
          }}
        >
          <Canvas
            dpr={[1, 1.5]}
            camera={{ position: [0, 0, 5], fov: 45 }}
            gl={{ powerPreference: 'high-performance', antialias: true }}
          >
            <Suspense fallback={null}>
              <Stars />
            </Suspense>
          </Canvas>
        </div>
      )}

      <div
        className="relative z-10"
        style={{
          opacity: loaded ? 1 : 0,
          transition: 'opacity 0.6s ease-in-out',
          pointerEvents: loaded ? 'auto' : 'none',
        }}
      >

        <Navbar />
        <Hero />

        <div className="relative z-10">
          <About />
          <Experience />
          <Projects />
          <Skills />
          {/* Certifications merged into Skills */}
          <Contact />
        </div>

        <Footer />
      </div>

      {loaded && <PortfolioAssistant />}
    </div>
  );
};

export default App;
