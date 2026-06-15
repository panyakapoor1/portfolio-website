/* eslint-disable react-refresh/only-export-components */
import { useState, useRef, useEffect } from 'react';
import emailjs from '@emailjs/browser';
import { gsap } from '../utils/gsap';
import SectionWrapper from '../hoc/SectionWrapper';
import { useReducedMotion } from '../hooks/useReducedMotion';
import { heroData, contactInfo } from '../constants';

const Contact = () => {
  const formRef = useRef();
  const containerRef = useRef();
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(null); // 'success' | 'error' | null
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (reducedMotion || !containerRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.contact-element',
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.15,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 80%',
          }
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, [reducedMotion]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus(null);

    emailjs
      .send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        {
          from_name: form.name,
          to_name: 'Panya',
          from_email: form.email,
          to_email: 'panyakapoor1@gmail.com',
          message: form.message,
        },
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      )
      .then(
        () => {
          setLoading(false);
          setStatus('success');
          setForm({ name: '', email: '', message: '' });
          setTimeout(() => setStatus(null), 5000);
        },
        (error) => {
          setLoading(false);
          setStatus('error');
          console.error(error);
        }
      );
  };

  return (
    <div ref={containerRef} className="w-full relative min-h-[600px]">
      <div className="relative z-10 flex flex-col lg:flex-row gap-16 lg:gap-8">
        
        {/* Left Side: Bold CTA (Hitakshi Inspired) */}
        <div className="flex-1 flex flex-col justify-center">
          <div className="contact-element mb-2">
            <p className="text-sm font-mono text-[var(--accent)] tracking-widest uppercase">05</p>
          </div>
          
          <h2 className="contact-element text-5xl md:text-7xl font-playfair font-bold text-white tracking-tight leading-[1.1] mb-8">
            Let's build <br/><span className="italic text-secondary">something</span> together.
          </h2>
          
          <p className="contact-element text-secondary/80 font-inter max-w-md mb-10 leading-relaxed">
            Currently looking for full-time opportunities and internships in software development. Drop a note - I'll get back to you quickly.
          </p>
          
          <div className="contact-element flex flex-wrap gap-4">
            <a 
              href={`mailto:${contactInfo.email}`}
              className="magnetic-target px-8 py-4 bg-[var(--accent)] text-white font-medium rounded-full hover:bg-[var(--accent-cyan)] transition-colors shadow-[0_0_20px_rgba(var(--accent-r),var(--accent-g),var(--accent-b),0.3)]"
            >
              Say hello
            </a>
            <a 
              href={heroData.cta.secondary.link}
              target="_blank"
              rel="noopener noreferrer"
              className="magnetic-target px-8 py-4 bg-white/5 border border-white/10 text-white font-medium rounded-full hover:bg-white/10 transition-colors"
            >
              View resume ↗
            </a>
          </div>
        </div>

        {/* Right Side: Terminal Form (Sreeja Inspired) */}
        <div className="contact-element flex-[0.8] w-full">
          <div className="bento-box glass-strong rounded-3xl p-8 relative overflow-hidden group hover:glow-box transition-all duration-500 border border-white/10 shadow-2xl">
            {/* Terminal Header */}
            <div className="bg-[#0f111a] px-4 py-3 flex items-center gap-2 border-b border-white/5">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-[#ff5f56]" />
                <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
                <div className="w-3 h-3 rounded-full bg-[#27c93f]" />
              </div>
              <p className="ml-2 text-xs font-mono text-secondary/50">contact.sh</p>
            </div>

            {/* Terminal Body */}
            <form ref={formRef} onSubmit={handleSubmit} className="p-6 md:p-8 flex flex-col gap-6 font-mono">
              <div className="flex flex-col">
                <label className="text-xs text-secondary/60 mb-2 flex gap-2">
                  <span className="text-[var(--accent)]">❯</span> Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  required
                  placeholder="John Doe"
                  className="bg-transparent border-b border-white/10 focus:border-[var(--accent)] py-2 text-white text-sm outline-none placeholder:text-white/20 transition-colors"
                />
              </div>
              
              <div className="flex flex-col">
                <label className="text-xs text-secondary/60 mb-2 flex gap-2">
                  <span className="text-[var(--accent)]">❯</span> Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  required
                  placeholder="john@example.com"
                  className="bg-transparent border-b border-white/10 focus:border-[var(--accent)] py-2 text-white text-sm outline-none placeholder:text-white/20 transition-colors"
                />
              </div>

              <div className="flex flex-col">
                <label className="text-xs text-secondary/60 mb-2 flex gap-2">
                  <span className="text-[var(--accent)]">❯</span> Message
                </label>
                <textarea
                  rows="4"
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  required
                  placeholder="Hello Panya..."
                  className="bg-white/[0.02] border border-white/10 focus:border-[var(--accent)] rounded-lg p-3 text-white text-sm outline-none placeholder:text-white/20 transition-colors resize-none mt-1"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="mt-2 py-3 bg-white/5 border border-white/10 rounded-lg text-white text-sm hover:bg-[var(--accent)]/20 hover:border-[var(--accent)]/50 transition-all duration-300 disabled:opacity-50"
              >
                {loading ? '[ Executing... ]' : '[ Send_Message ]'}
              </button>

              {status === 'success' && (
                <p className="text-xs text-[#27c93f] mt-2">✓ Message sent successfully. I'll be in touch!</p>
              )}
              {status === 'error' && (
                <p className="text-xs text-[#ff5f56] mt-2">⚠ Failed to send message. Please try email instead.</p>
              )}
            </form>
          </div>
        </div>

      </div>
    </div>
  );
};

export default SectionWrapper(Contact, 'contact', '');
