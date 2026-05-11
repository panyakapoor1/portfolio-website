import { useState, useEffect } from 'react';
import { navLinks } from '../constants';

const Navbar = () => {
  const [active, setActive] = useState('');
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
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
    <nav
      className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 ${
        scrolled
          ? 'bg-primary/80 backdrop-blur-xl border-b border-[rgba(145,94,255,0.08)]'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-16 flex items-center justify-between h-[72px]">
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
            setActive('');
          }}
          className="flex items-center gap-3 group"
        >
          <div className="w-9 h-9 rounded-lg bg-accent/10 flex items-center justify-center group-hover:bg-accent/20 transition-colors duration-300">
            <span className="text-accent font-poppins font-bold text-lg">P</span>
          </div>
          <span className="text-white font-poppins font-semibold text-lg hidden sm:block">
            Panya<span className="text-accent">.</span>
          </span>
        </a>

        <ul className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <li key={link.id}>
              <a
                href={`#${link.id}`}
                onClick={(e) => handleNavClick(e, link.id)}
                className={`text-sm font-inter font-medium transition-colors duration-300 relative py-1 ${
                  active === link.id ? 'text-white' : 'text-secondary hover:text-white'
                }`}
              >
                {link.title}
                <span
                  className={`absolute bottom-0 left-0 h-[2px] bg-accent transition-all duration-300 ${
                    active === link.id ? 'w-full' : 'w-0'
                  }`}
                />
              </a>
            </li>
          ))}
        </ul>

        <button
          id="nav-menu-toggle"
          className="md:hidden flex flex-col gap-[5px] w-7 z-50"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle navigation menu"
        >
          <span
            className={`block h-[2px] bg-white transition-all duration-300 ${
              menuOpen ? 'rotate-45 translate-y-[7px]' : ''
            }`}
          />
          <span
            className={`block h-[2px] bg-white transition-all duration-300 ${
              menuOpen ? 'opacity-0' : ''
            }`}
          />
          <span
            className={`block h-[2px] bg-white transition-all duration-300 ${
              menuOpen ? '-rotate-45 -translate-y-[7px]' : ''
            }`}
          />
        </button>
      </div>

      <div
        className={`md:hidden fixed inset-0 bg-primary/95 backdrop-blur-xl transition-all duration-500 flex flex-col items-center justify-center gap-8 ${
          menuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        {navLinks.map((link) => (
          <a
            key={link.id}
            href={`#${link.id}`}
            onClick={(e) => handleNavClick(e, link.id)}
            className={`text-2xl font-poppins font-semibold transition-colors duration-300 ${
              active === link.id ? 'text-accent' : 'text-white'
            }`}
          >
            {link.title}
          </a>
        ))}
      </div>
    </nav>
  );
};

export default Navbar;
