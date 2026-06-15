import { useState, useEffect } from 'react';
import { navLinks } from '../constants';

const Navbar = () => {
  const [active, setActive] = useState('');
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrollDir, setScrollDir] = useState('up');

  // Track scroll direction to hide nav on scroll down
  useEffect(() => {
    let lastScrollY = window.scrollY;
    
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setScrolled(currentScrollY > 50);
      
      if (currentScrollY > lastScrollY && currentScrollY > 200) {
        setScrollDir('down');
      } else {
        setScrollDir('up');
      }
      lastScrollY = currentScrollY;
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e, id) => {
    e.preventDefault();
    setActive(id);
    setMenuOpen(false);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      {/* Desktop Floating Pill Nav */}
      <nav
        className={`fixed bottom-8 left-1/2 -translate-x-1/2 z-[100] transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)]
          hidden md:block
          ${scrollDir === 'down' ? 'translate-y-24 opacity-0' : 'translate-y-0 opacity-100'}
        `}
      >
        <div className="glass-strong rounded-full px-2 py-2 flex items-center gap-1 shadow-[0_10px_40px_rgba(0,0,0,0.5)]">
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
              setActive('');
            }}
            className="w-10 h-10 rounded-full flex items-center justify-center magnetic-target hover:bg-white/10 transition-colors"
            aria-label="Home"
          >
            <span className="text-white font-playfair font-bold">P.</span>
          </a>
          
          <div className="w-px h-6 bg-white/10 mx-2" />
          
          <ul className="flex items-center gap-1 relative">
            {navLinks.map((link) => (
              <li key={link.id} className="relative z-10">
                <a
                  href={`#${link.id}`}
                  onClick={(e) => handleNavClick(e, link.id)}
                  className={`px-5 py-2.5 rounded-full text-sm font-inter font-medium transition-colors duration-300 block magnetic-target
                    ${active === link.id ? 'text-white' : 'text-secondary hover:text-white'}
                  `}
                >
                  {link.title}
                </a>
                {active === link.id && (
                  <div className="absolute inset-0 bg-white/10 rounded-full -z-10 animate-fade-in" />
                )}
              </li>
            ))}
          </ul>
        </div>
      </nav>

      {/* Mobile Top Bar (Minimal) */}
      <nav
        className={`md:hidden fixed top-0 left-0 right-0 z-[100] transition-all duration-300
          ${scrolled ? 'bg-primary/80 backdrop-blur-md border-b border-white/5' : 'bg-transparent'}
        `}
      >
        <div className="px-6 h-[72px] flex items-center justify-between">
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
              setActive('');
            }}
            className="font-playfair font-bold text-lg text-white"
          >
            Panya<span className="text-[var(--accent)]">.</span>
          </a>
          
          <button
            className="w-10 h-10 flex flex-col justify-center items-center gap-[5px]"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <span className={`block w-6 h-[2px] bg-white transition-all ${menuOpen ? 'rotate-45 translate-y-[7px]' : ''}`} />
            <span className={`block w-6 h-[2px] bg-white transition-all ${menuOpen ? 'opacity-0' : ''}`} />
            <span className={`block w-6 h-[2px] bg-white transition-all ${menuOpen ? '-rotate-45 -translate-y-[7px]' : ''}`} />
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div
        className={`md:hidden fixed inset-0 z-[90] bg-primary/95 backdrop-blur-xl transition-all duration-500 flex flex-col items-center justify-center gap-8
          ${menuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}
        `}
      >
        {navLinks.map((link) => (
          <a
            key={link.id}
            href={`#${link.id}`}
            onClick={(e) => handleNavClick(e, link.id)}
            className={`text-3xl font-playfair italic transition-colors duration-300
              ${active === link.id ? 'text-[var(--accent)]' : 'text-white'}
            `}
          >
            {link.title}
          </a>
        ))}
      </div>
    </>
  );
};

export default Navbar;
