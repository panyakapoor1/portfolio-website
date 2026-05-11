import { motion } from 'framer-motion';
import { aboutData, heroData } from '../constants';
import { fadeIn } from '../utils/motion';
import SectionWrapper from '../hoc/SectionWrapper';

const About = () => {
  return (
    <>
      <p className="text-sm font-inter uppercase tracking-[4px] text-secondary mb-2">Introduction</p>
      <h2 className="text-4xl sm:text-5xl font-poppins font-bold text-white mb-12">
        About Me<span className="text-accent">.</span>
      </h2>

      <div className="flex flex-col lg:flex-row gap-12 items-center">
        <motion.div
          variants={fadeIn('right', 'tween', 0.2, 0.8)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          className="flex-shrink-0"
        >
          <div className="relative w-64 h-64 sm:w-72 sm:h-72 rounded-2xl overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-br from-accent/20 to-transparent z-10 rounded-2xl" />
            <img
              src={heroData.profileImage}
              alt="Panya Kapoor"
              className="w-full h-full object-cover rounded-2xl transition-transform duration-700 group-hover:scale-105"
              onError={(e) => {
                e.target.style.display = 'none';
                e.target.nextSibling.style.display = 'flex';
              }}
            />
            <div
              className="w-full h-full bg-tertiary rounded-2xl items-center justify-center border border-[rgba(145,94,255,0.12)] hidden"
            >
              <span className="text-6xl">👨‍💻</span>
            </div>
            <div className="absolute -inset-[1px] rounded-2xl border border-accent/20 z-20 pointer-events-none" />
          </div>
        </motion.div>

        <div className="flex-1">
          <motion.p
            variants={fadeIn('left', 'tween', 0.3, 0.8)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
            className="text-secondary font-inter text-base leading-relaxed mb-8"
          >
            {aboutData.bio}
          </motion.p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {aboutData.stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                variants={fadeIn('up', 'spring', 0.3 + index * 0.15, 0.8)}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.3 }}
                className="bg-tertiary/50 border border-[rgba(145,94,255,0.08)] rounded-xl p-5 text-center backdrop-blur-sm hover:border-accent/20 transition-colors duration-300"
              >
                <p className="text-2xl font-poppins font-bold text-white mb-1">
                  {stat.value}
                </p>
                <p className="text-xs font-inter text-accent font-medium uppercase tracking-wider mb-1">
                  {stat.label}
                </p>
                <p className="text-xs font-inter text-secondary/70">
                  {stat.sub}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default SectionWrapper(About, 'about');
