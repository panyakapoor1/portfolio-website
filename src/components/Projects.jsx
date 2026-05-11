import { motion } from 'framer-motion';
import { Tilt } from 'react-tilt';
import { projects } from '../constants';
import { fadeIn } from '../utils/motion';
import SectionWrapper from '../hoc/SectionWrapper';

const ProjectCard = ({ project, index }) => (
  <motion.div
    variants={fadeIn('up', 'spring', index * 0.15, 0.75)}
    initial="hidden"
    whileInView="show"
    viewport={{ once: true, amount: 0.2 }}
  >
    <Tilt
      options={{ max: 15, scale: 1, speed: 450 }}
      className="project-card bg-tertiary/40 border border-[rgba(145,94,255,0.08)] rounded-2xl overflow-hidden backdrop-blur-sm group hover:border-accent/20 transition-all duration-500 cursor-pointer"
    >
      <div className="relative h-48 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-accent/20 via-purple-600/10 to-blue-500/10" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-20 h-20 rounded-2xl bg-accent/10 border border-accent/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
            <span className="text-3xl">
              {index === 0 ? '💰' : index === 1 ? '⚙️' : index === 2 ? '🍕' : '🏥'}
            </span>
          </div>
        </div>
        <div className="absolute top-3 right-3 z-10">
          <a
            href={project.source_code_link}
            target="_blank"
            rel="noopener noreferrer"
            className="w-9 h-9 rounded-full bg-black/50 backdrop-blur-sm border border-white/10 flex items-center justify-center hover:bg-accent/20 hover:border-accent/30 transition-all duration-300"
            onClick={(e) => e.stopPropagation()}
            aria-label={`View ${project.name} source code`}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="white">
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
            </svg>
          </a>
        </div>
      </div>

      <div className="p-6">
        <h3 className="text-xl font-poppins font-semibold text-white mb-2 group-hover:text-accent/90 transition-colors duration-300">
          {project.name}
        </h3>
        <p className="text-sm font-inter text-secondary/80 leading-relaxed mb-4">
          {project.description}
        </p>
        <div className="flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <span
              key={tag.name}
              className={`text-xs font-inter font-medium px-2.5 py-1 rounded-md bg-black/20 border border-white/5 ${tag.color}`}
            >
              #{tag.name}
            </span>
          ))}
        </div>
      </div>
    </Tilt>
  </motion.div>
);

const Projects = () => {
  return (
    <>
      <p className="text-sm font-inter uppercase tracking-[4px] text-secondary mb-2">My Work</p>
      <h2 className="text-4xl sm:text-5xl font-poppins font-bold text-white mb-4">
        Projects<span className="text-accent">.</span>
      </h2>
      <p className="text-secondary font-inter text-base max-w-2xl mb-12 leading-relaxed">
        Each project reflects my focus on solving real problems with clean, scalable code. From full-stack apps to blockchain solutions.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-8">
        {projects.map((project, index) => (
          <ProjectCard key={project.name} project={project} index={index} />
        ))}
      </div>
    </>
  );
};

export default SectionWrapper(Projects, 'projects');
