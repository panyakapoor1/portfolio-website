import { footerData } from '../constants';

const Footer = () => {
  return (
    <footer className="w-full relative z-10 border-t border-white/5 bg-gradient-to-b from-transparent to-[#050816]">
      <div className="max-w-7xl mx-auto px-6 sm:px-16 py-12 flex flex-col md:flex-row justify-between items-center gap-6">
        
        <div className="flex flex-col items-center md:items-start">
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="text-2xl font-playfair font-bold text-white mb-2 flex items-center gap-2 magnetic-target"
          >
            Panya<span className="text-[var(--accent)]">.</span>
          </a>
          <p className="text-xs font-mono text-secondary/60 uppercase tracking-widest">
            {footerData.text}
          </p>
        </div>

        <div className="flex items-center gap-6">
          {footerData.socials.map((social, index) => (
            <a
              key={index}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              className="magnetic-target text-sm font-mono text-secondary/80 hover:text-[var(--accent)] transition-colors relative group"
            >
              {social.name}
              <span className="absolute -bottom-1 left-0 w-0 h-px bg-[var(--accent)] group-hover:w-full transition-all duration-300" />
            </a>
          ))}
        </div>
      </div>
      
      {/* Bottom accent glow line */}
      <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-[var(--accent)] to-transparent opacity-20" />
    </footer>
  );
};

export default Footer;
