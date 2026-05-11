import { useState, Suspense, useCallback } from 'react';
import { Canvas } from '@react-three/fiber';
import { useLenis } from './hooks/useLenis';
import Preloader from './components/Preloader';
import CustomCursor from './components/CustomCursor';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Experience from './components/Experience';
import Projects from './components/Projects';
import Skills from './components/Skills';
import Certifications from './components/Certifications';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Stars from './canvas/Stars';
import { isWebGLAvailable } from './utils/webgl';

const App = () => {
  const [loaded, setLoaded] = useState(false);
  const lenisRef = useLenis();

  const handlePreloaderComplete = useCallback(() => {
    setLoaded(true);
  }, []);

  return (
    <>
      {!loaded && <Preloader onComplete={handlePreloaderComplete} />}
      <CustomCursor />

      <div
        className="relative"
        style={{
          opacity: loaded ? 1 : 0,
          transition: 'opacity 0.6s ease-in-out',
          pointerEvents: loaded ? 'auto' : 'none',
        }}
      >
        {isWebGLAvailable() && (
          <div className="fixed inset-0 z-0 pointer-events-none">
            <Canvas
              dpr={[1, 1.5]}
              camera={{ position: [0, 0, 1] }}
              gl={{ powerPreference: 'high-performance', antialias: false }}
            >
              <Suspense fallback={null}>
                <Stars />
              </Suspense>
            </Canvas>
          </div>
        )}

        <Navbar />
        <Hero />

        <div className="relative z-10 bg-gradient-to-b from-transparent via-primary/50 to-primary">
          <About />
          <Experience />
          <Projects />
          <Skills />
          <Certifications />
          <Contact />
        </div>

        <Footer />
      </div>
    </>
  );
};

export default App;
