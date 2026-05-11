import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import emailjs from 'emailjs-com';
import { contactInfo } from '../constants';
import { fadeIn } from '../utils/motion';
import { gsap, ScrollTrigger } from '../utils/gsap';
import { useReducedMotion } from '../hooks/useReducedMotion';
import { Earth } from '../canvas';
import SectionWrapper from '../hoc/SectionWrapper';

const Contact = () => {
  const formRef = useRef(null);
  const sectionRef = useRef(null);
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('idle');
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (reducedMotion || !sectionRef.current) return;

    const items = sectionRef.current.querySelectorAll('.contact-animate');
    gsap.fromTo(
      items,
      { y: 50, autoAlpha: 0 },
      {
        y: 0,
        autoAlpha: 1,
        stagger: 0.15,
        duration: 0.8,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
        },
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach((t) => {
        if (t.vars?.trigger === sectionRef.current) t.kill();
      });
    };
  }, [reducedMotion]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus('loading');

    emailjs
      .send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        {
          from_name: form.name,
          to_name: 'Panya Kapoor',
          from_email: form.email,
          to_email: contactInfo.email,
          message: form.message,
        },
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      )
      .then((response) => {
        console.log('SUCCESS!', response.status, response.text);
        setStatus('success');
        setForm({ name: '', email: '', message: '' });
        setTimeout(() => setStatus('idle'), 4000);
      })
      .catch((err) => {
        console.error('FAILED...', err);
        setStatus('error');
        setTimeout(() => setStatus('idle'), 4000);
      });
  };

  const SocialIcon = ({ name }) => {
    const icons = {
      linkedin: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
        </svg>
      ),
      github: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
        </svg>
      ),
      leetcode: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
          <path d="M13.483 0a1.374 1.374 0 0 0-.961.438L7.116 6.226l-3.854 4.126a5.266 5.266 0 0 0-1.209 2.104 5.35 5.35 0 0 0-.125.513 5.527 5.527 0 0 0 .062 2.362 5.83 5.83 0 0 0 .349 1.017 5.938 5.938 0 0 0 1.271 1.818l4.277 4.193.039.038c2.248 2.165 5.852 2.133 8.063-.074l2.396-2.392c.54-.54.54-1.414.003-1.955a1.378 1.378 0 0 0-1.951-.003l-2.396 2.392a3.021 3.021 0 0 1-4.205.038l-.02-.019-4.276-4.193c-.652-.64-.972-1.469-.948-2.263a2.68 2.68 0 0 1 .066-.523 2.545 2.545 0 0 1 .619-1.164L9.13 8.114c1.058-1.134 3.204-1.27 4.43-.278l3.501 2.831c.593.48 1.461.387 1.94-.207a1.384 1.384 0 0 0-.207-1.943l-3.5-2.831c-.8-.647-1.766-1.045-2.774-1.202l2.015-2.158A1.384 1.384 0 0 0 13.483 0zm-2.866 12.815a1.38 1.38 0 0 0-1.38 1.382 1.38 1.38 0 0 0 1.38 1.382H20.79a1.38 1.38 0 0 0 1.38-1.382 1.38 1.38 0 0 0-1.38-1.382z" />
        </svg>
      ),
    };
    return icons[name] || null;
  };

  return (
    <div ref={sectionRef}>
      <p className="text-sm font-inter uppercase tracking-[4px] text-secondary mb-2">Get in Touch</p>
      <h2 className="text-4xl sm:text-5xl font-poppins font-bold text-white mb-12">
        Contact<span className="text-accent">.</span>
      </h2>

      <div className="flex flex-col lg:flex-row gap-12">
        <div className="contact-animate flex-1">
          <form
            ref={formRef}
            onSubmit={handleSubmit}
            className="flex flex-col gap-5"
            id="contact-form"
          >
            <label className="flex flex-col gap-2">
              <span className="text-sm font-inter font-medium text-white">Your Name</span>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                required
                placeholder="What's your name?"
                className="bg-tertiary/50 border border-[rgba(145,94,255,0.08)] rounded-xl px-4 py-3.5 text-sm font-inter text-white placeholder:text-secondary/40 outline-none focus:border-accent/30 transition-colors duration-300"
                id="contact-name"
              />
            </label>

            <label className="flex flex-col gap-2">
              <span className="text-sm font-inter font-medium text-white">Your Email</span>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                required
                placeholder="What's your email?"
                className="bg-tertiary/50 border border-[rgba(145,94,255,0.08)] rounded-xl px-4 py-3.5 text-sm font-inter text-white placeholder:text-secondary/40 outline-none focus:border-accent/30 transition-colors duration-300"
                id="contact-email"
              />
            </label>

            <label className="flex flex-col gap-2">
              <span className="text-sm font-inter font-medium text-white">Your Message</span>
              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                required
                rows={6}
                placeholder="What do you want to say?"
                className="bg-tertiary/50 border border-[rgba(145,94,255,0.08)] rounded-xl px-4 py-3.5 text-sm font-inter text-white placeholder:text-secondary/40 outline-none focus:border-accent/30 transition-colors duration-300 resize-none"
                id="contact-message"
              />
            </label>

            <button
              type="submit"
              disabled={status === 'loading'}
              className="bg-accent/10 border border-accent/30 rounded-xl px-8 py-3.5 font-inter font-medium text-white text-sm hover:border-accent/60 hover:shadow-[0_0_30px_rgba(145,94,255,0.15)] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              id="contact-submit"
            >
              {status === 'loading'
                ? 'Sending...'
                : status === 'success'
                ? 'Sent ✓'
                : status === 'error'
                ? 'Failed — Try Again'
                : 'Send Message'}
            </button>
          </form>

          <div className="mt-8 flex flex-col gap-3">
            <a
              href={`mailto:${contactInfo.email}`}
              className="text-sm font-inter text-secondary hover:text-accent transition-colors duration-200"
            >
              {contactInfo.email}
            </a>
            <div className="flex gap-3 mt-2">
              {contactInfo.socials.map((social) => (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-lg bg-tertiary/50 border border-[rgba(145,94,255,0.08)] flex items-center justify-center text-secondary hover:text-accent hover:border-accent/20 transition-all duration-300"
                  aria-label={social.name}
                  id={`social-${social.icon}`}
                >
                  <SocialIcon name={social.icon} />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="contact-animate flex-1 h-[350px] sm:h-[450px] hidden sm:block">
          <Earth />
        </div>
      </div>
    </div>
  );
};

export default SectionWrapper(Contact, 'contact');
