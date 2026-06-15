import { useState, useRef, useMemo, useEffect } from 'react';
import Fuse from 'fuse.js';
import { projects, skillCategories, experiences, certifications, aboutData, contactInfo } from '../constants';

// Build searchable corpus from all portfolio data
const buildCorpus = () => {
  const entries = [];

  // Projects
  projects.forEach((p) => {
    entries.push({
      type: 'project',
      title: p.name,
      content: p.description,
      tags: p.tags.map((t) => t.name).join(', '),
      link: p.source_code_link,
    });
  });

  // Skills
  skillCategories.forEach((cat) => {
    entries.push({
      type: 'skill',
      title: cat.title,
      content: cat.skills.join(', '),
      tags: 'skills, tech stack, tools',
    });
  });

  // Experience
  experiences.forEach((exp) => {
    entries.push({
      type: 'experience',
      title: `${exp.title} at ${exp.company}`,
      content: exp.points.join('. '),
      tags: exp.date,
      link: exp.link,
    });
  });

  // Certifications
  certifications.forEach((cert) => {
    entries.push({
      type: 'certification',
      title: cert.title,
      content: `Issued by ${cert.issuer}`,
      tags: 'certification, credential',
    });
  });

  // About
  entries.push({
    type: 'about',
    title: 'About Panya Kapoor',
    content: aboutData.bio,
    tags: 'about, bio, background',
  });

  // Contact
  entries.push({
    type: 'contact',
    title: 'Contact Information',
    content: `Email: ${contactInfo.email}. Socials: ${contactInfo.socials.map((s) => s.name).join(', ')}`,
    tags: 'contact, email, social',
  });

  return entries;
};

// Natural Language Intent Router for common conversational queries
const getIntentResponse = (query) => {
  const intentRules = [
    {
      pattern: /^(hi|hello|hey|greetings|sup|yo)\b/i,
      response: "Hello! I'm Panya's digital assistant. You can ask me about her projects, experience, skills, or how to contact her."
    },
    {
      pattern: /\b(who are you|who is this|what is your name|what are you)\b/i,
      response: "I'm an AI assistant built to help you navigate Panya Kapoor's portfolio. I can answer questions about her background and work!"
    },
    {
      pattern: /\b(who is panya|about panya|tell me about panya|background|bio)\b/i,
      response: aboutData.bio
    },
    {
      pattern: /\b(job|hire|hiring|open to work|full-time|internship|looking for work)\b/i,
      response: "Panya is currently open to full-time roles! She's a MERN stack developer graduating from SRM IST in 2027."
    },
    {
      pattern: /\b(study|education|university|college|cgpa|degree|srm|school)\b/i,
      response: "Panya studies at SRM IST (Batch of 2027) and maintains an excellent CGPA of 9.8/10."
    },
    {
      pattern: /\b(stack|tech stack|technologies|languages|frameworks|what do you use)\b/i,
      response: "Panya primarily works with the MERN stack: MongoDB, Express.js, React, and Node.js. She also has experience with Redux Toolkit, Tailwind CSS, Python, and more."
    },
    {
      pattern: /\b(contact|email|reach|message|hire her|talk to)\b/i,
      response: `You can reach Panya directly at ${contactInfo.email}. She'd love to hear from you!`
    },
    {
      pattern: /\b(projects|portfolio|built|made|work)\b/i,
      response: "Panya has built several awesome projects, including a Finance Tracker, an HR Workflow Designer, and a Blockchain Healthcare app. You can ask me about a specific one, or check the Projects section!"
    },
    {
      pattern: /\b(experience|internship|worked at|work experience)\b/i,
      response: "Panya recently interned as an AI + Blockchain Intern at 1M1B, and has also worked as a Freelance Web Developer building brand-aligned websites."
    },
    {
      pattern: /\b(resume|cv|download)\b/i,
      response: "You can download Panya's resume from the 'Download Resume' button at the top of the page, or view her full experience in the Experience section."
    },
    {
      pattern: /\b(how are you|how do you do)\b/i,
      response: "I'm just a few lines of code running in your browser, but I'm doing great! How can I help you learn more about Panya?"
    },
    {
      pattern: /\b(bye|goodbye|cya|see ya)\b/i,
      response: "Goodbye! Thanks for visiting Panya's portfolio. Feel free to reach out to her via the contact form if you need anything."
    },
    {
      pattern: /\b(github|repo|code)\b/i,
      response: "You can find all of Panya's code and repositories on her GitHub! Just click the GitHub icons on the project cards."
    }
  ];

  for (const rule of intentRules) {
    if (rule.pattern.test(query)) {
      return rule.response;
    }
  }
  return null;
};

const PortfolioAssistant = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [messages, setMessages] = useState([
    { sender: 'bot', text: "Hi! I'm Panya's AI assistant. Ask me anything about her skills, experience, or projects!" }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  
  const inputRef = useRef(null);
  const messagesEndRef = useRef(null);

  const corpus = useMemo(() => buildCorpus(), []);
  const fuse = useMemo(
    () =>
      new Fuse(corpus, {
        keys: ['title', 'content', 'tags'],
        threshold: 0.4, // Allow slight fuzzy matching
        includeScore: true,
        minMatchCharLength: 2,
      }),
    [corpus]
  );

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen, isTyping]);

  const toggleModal = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  };

  // Handle Cmd+K / Ctrl+K to open
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        toggleModal();
      }
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!query.trim() || isTyping) return;
    
    const userText = query.trim();
    setMessages(prev => [...prev, { sender: 'user', text: userText }]);
    setQuery('');
    setIsTyping(true);
    
    setTimeout(() => {
      setIsTyping(false);
      
      // 1. Try Natural Language Intent Matching First
      const intentResponse = getIntentResponse(userText);
      if (intentResponse) {
        setMessages(prev => [...prev, { sender: 'bot', text: intentResponse }]);
        return;
      }

      // 2. Fallback to Fuse.js Fuzzy Search for specific projects/skills
      const searchResults = fuse.search(userText);
      
      if (searchResults.length > 0) {
        const bestMatch = searchResults[0].item;
        let botResponse = '';
        
        switch (bestMatch.type) {
          case 'project':
            botResponse = `Regarding projects, Panya built "${bestMatch.title}". ${bestMatch.content} It uses: ${bestMatch.tags}.`;
            if (bestMatch.link && bestMatch.link !== '#') {
              botResponse += ` You can check it out at her GitHub!`;
            }
            break;
          case 'skill':
            botResponse = `Panya is highly skilled in ${bestMatch.title}, specifically: ${bestMatch.content}.`;
            break;
          case 'experience':
            botResponse = `As for experience, ${bestMatch.title} (${bestMatch.tags}): ${bestMatch.content}`;
            break;
          case 'certification':
            botResponse = `Panya holds the "${bestMatch.title}" certification, ${bestMatch.content}.`;
            break;
          case 'about':
            botResponse = `Here's a bit about Panya: ${bestMatch.content}`;
            break;
          case 'contact':
            botResponse = `You can reach Panya directly: ${bestMatch.content}`;
            break;
          default:
            botResponse = `I found something about ${bestMatch.title}: ${bestMatch.content}`;
        }
        
        setMessages(prev => [...prev, { sender: 'bot', text: botResponse }]);
      } else {
        setMessages(prev => [...prev, { sender: 'bot', text: "I'm not exactly sure about that. Try asking about her specific skills, recent projects, or work experience!" }]);
      }
    }, 600 + Math.random() * 400); // simulate thinking
  };

  return (
    <>
      {/* Floating trigger button */}
      <button
        onClick={toggleModal}
        className={`fixed bottom-6 right-6 z-[200] group flex items-center justify-center w-14 h-14 rounded-full bg-[var(--accent)]/90 border border-white/20 shadow-[0_0_20px_rgba(var(--accent-r),var(--accent-g),var(--accent-b),0.3)] backdrop-blur-md
          hover:scale-105 hover:bg-[var(--accent)] transition-all duration-300 ${isOpen ? 'scale-0 opacity-0 pointer-events-none' : 'scale-100 opacity-100'}`}
        aria-label="Open AI Assistant"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
        </svg>
      </button>

      {/* Chat Window Panel */}
      <div 
        className={`fixed bottom-24 right-6 w-80 sm:w-96 h-[500px] max-h-[70vh] z-[999] bg-[#0a0a0a]/95 backdrop-blur-2xl border border-white/10 rounded-2xl shadow-2xl flex flex-col transition-all duration-300 origin-bottom-right
          ${isOpen ? 'scale-100 opacity-100 pointer-events-auto' : 'scale-90 opacity-0 pointer-events-none'}`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-white/5 bg-white/[0.02]">
          <div className="flex items-center gap-3">
            <div>
              <h3 className="text-white text-sm font-semibold font-inter">Panya's Assistant</h3>
            </div>
          </div>
          <button onClick={toggleModal} className="text-secondary/60 hover:text-white transition-colors p-1">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>

        {/* Chat History */}
        <div className="flex-1 overflow-y-auto p-5 flex flex-col gap-4 scroll-smooth">
          {messages.map((msg, idx) => {
            const isBot = msg.sender === 'bot';
            return (
              <div key={idx} className={`flex w-full ${isBot ? 'justify-start' : 'justify-end'}`}>
                <div 
                  className={`max-w-[85%] p-3 rounded-2xl text-sm font-inter leading-relaxed ${
                    isBot 
                      ? 'bg-white/5 text-secondary border border-white/5 rounded-tl-sm' 
                      : 'bg-[var(--accent)] text-white shadow-[0_4px_15px_rgba(var(--accent-r),var(--accent-g),var(--accent-b),0.3)] rounded-tr-sm'
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            );
          })}
          
          {isTyping && (
            <div className="flex w-full justify-start">
              <div className="bg-white/5 border border-white/5 p-4 rounded-2xl rounded-tl-sm flex items-center gap-1.5">
                <div className="w-1.5 h-1.5 rounded-full bg-secondary/60 animate-bounce" style={{ animationDelay: '0ms' }} />
                <div className="w-1.5 h-1.5 rounded-full bg-secondary/60 animate-bounce" style={{ animationDelay: '150ms' }} />
                <div className="w-1.5 h-1.5 rounded-full bg-secondary/60 animate-bounce" style={{ animationDelay: '300ms' }} />
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="p-4 bg-white/[0.02] border-t border-white/5 rounded-b-2xl">
          <form onSubmit={handleSendMessage} className="relative flex items-center">
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Ask about my experience..."
              className="w-full bg-[#111111] border border-white/10 outline-none text-sm text-white px-4 py-3 rounded-xl placeholder:text-secondary/40 font-inter focus:border-[var(--accent)]/50 transition-colors pr-12"
            />
            <button 
              type="submit"
              disabled={!query.trim() || isTyping}
              className="absolute right-2 p-1.5 text-[var(--accent)] hover:text-white disabled:opacity-50 disabled:hover:text-[var(--accent)] transition-colors"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="22" y1="2" x2="11" y2="13"></line>
                <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
              </svg>
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default PortfolioAssistant;
