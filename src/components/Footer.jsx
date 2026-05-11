import { footerData } from '../constants';

const Footer = () => {
  return (
    <footer className="relative z-10 border-t border-[rgba(145,94,255,0.06)] bg-primary/50 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-6 sm:px-16 py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-sm font-inter text-secondary/60 text-center sm:text-left">
          {footerData.text}
        </p>
        <div className="flex items-center gap-6">
          {footerData.socials.map((social) => (
            <a
              key={social.name}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-inter text-secondary/50 hover:text-accent transition-colors duration-200"
              aria-label={social.name}
            >
              {social.name}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
