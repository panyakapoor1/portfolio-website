import { motion } from 'framer-motion';
import { certifications } from '../constants';
import { fadeIn } from '../utils/motion';
import SectionWrapper from '../hoc/SectionWrapper';

const Certifications = () => {
  return (
    <>
      <p className="text-sm font-inter uppercase tracking-[4px] text-secondary mb-2">Credentials</p>
      <h2 className="text-4xl sm:text-5xl font-poppins font-bold text-white mb-12">
        Certifications<span className="text-accent">.</span>
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {certifications.map((cert, index) => (
          <motion.div
            key={cert.title}
            variants={fadeIn('up', 'spring', index * 0.1, 0.6)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
            className="bg-tertiary/30 border border-[rgba(145,94,255,0.08)] rounded-xl p-5 backdrop-blur-sm hover:border-accent/15 transition-all duration-300 group flex items-start gap-4"
          >
            <div className="w-10 h-10 rounded-lg bg-accent/10 border border-accent/15 flex items-center justify-center flex-shrink-0 group-hover:bg-accent/15 transition-colors duration-300">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#915EFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                <polyline points="22 4 12 14.01 9 11.01" />
              </svg>
            </div>
            <div>
              <p className="text-sm font-inter font-medium text-white mb-0.5">
                {cert.title}
              </p>
              <p className="text-xs font-inter text-secondary/70">
                {cert.issuer}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </>
  );
};

export default SectionWrapper(Certifications, 'certifications');
