import profile from "../assets/profile.jpeg";
import resume from "../assets/resume.pdf";

export const navLinks = [
  { id: "about", title: "About" },
  { id: "experience", title: "Experience" },
  { id: "projects", title: "Projects" },
  { id: "skills", title: "Skills" },
  { id: "contact", title: "Contact" },
];

export const heroData = {
  name: "PANYA KAPOOR",
  typewriterSequences: [
    "I build things for the web.",
    2000,
    "MERN Stack Developer.",
    2000,
    "Turning ideas into scalable apps.",
    2000,
  ],
  cta: {
    primary: { text: "View My Work", link: "#projects" },
    secondary: { text: "Download Resume", link: resume },
  },
  profileImage: profile,
};

export const aboutData = {
  bio: "I'm Panya - a CS undergrad who genuinely enjoys building things. Whether it's a full-stack finance app or a drag-and-drop workflow builder, I like writing code that actually solves something real. I work mostly with the MERN stack, care a lot about both clean architecture and the UI in front of it, and I'm always looking for the next problem worth solving.",
  stats: [
    { label: "CGPA", value: "9.8/10", sub: "SRM IST · Batch 2027" },
    { label: "Stack", value: "MERN", sub: "MongoDB · Express · React · Node" },
    { label: "Status", value: "Open", sub: "Looking for Full-Time Roles" },
  ],
};

export const experiences = [
  {
    title: "AI + Blockchain Intern",
    company: "1M1B (One Million for One Billion)",
    date: "Jul 2025 – Oct 2025",
    points: [
      "Contributed to an AI + Ethereum Green Credit Marketplace",
      "Worked on AI model integration and smart contract implementation",
    ],
    icon: "I",
  },
  {
    title: "Freelance Web Developer",
    company: "Aisha Oyarekhua / Improbable Leadership",
    date: "Jan 2025 – Mar 2025",
    points: [
      "Designed and deployed a responsive brand-aligned website from scratch",
    ],
    icon: "W",
    link: "https://www.improbableleadership.com/",
  },
];

export const projects = [
  {
    name: "Finance Tracker",
    description:
      "Full-stack finance app with budgeting, analytics, and CI/CD pipeline. Features expense categorization, income tracking, and visual analytics dashboard.",
    tags: [
      { name: "MERN", color: "text-[#61DAFB]" },
      { name: "Redux Toolkit", color: "text-[#764ABC]" },
      { name: "JWT", color: "text-[#D63AFF]" },
      { name: "GitHub Actions", color: "text-[#2088FF]" },
    ],
    source_code_link: "https://github.com/panyakapoor1/financetracker",
  },
  {
    name: "HR Workflow Designer",
    description:
      "Drag-and-drop HR workflow builder with simulation mode. Build complex approval chains, onboarding flows, and automate HR processes visually.",
    tags: [
      { name: "React Flow", color: "text-[#FF0072]" },
      { name: "Zustand", color: "text-[#F7DF1E]" },
      { name: "Vite", color: "text-[#646CFF]" },
    ],
    source_code_link: "https://github.com/panyakapoor1/hierarchy-builder",
  },
  {
    name: "Food Billing System",
    description:
      "Restaurant billing system with automated bill generation, menu management, and order tracking. Streamlined POS solution for food businesses.",
    tags: [
      { name: "Python", color: "text-[#3776AB]" },
      { name: "Streamlit", color: "text-[#FF4B4B]" },
      { name: "MySQL", color: "text-[#4479A1]" },
    ],
    source_code_link: "https://github.com/panyakapoor1/dbms-food-billing",
  },
  {
    name: "Blockchain Healthcare",
    description:
      "HackIndia project — secure patient records on Ethereum blockchain. Decentralized health data management with privacy-first architecture.",
    tags: [
      { name: "Ethereum", color: "text-[#3C3C3D]" },
      { name: "React", color: "text-[#61DAFB]" },
      { name: "Solidity", color: "text-[#AA6746]" },
    ],
    source_code_link: "https://github.com/panyakapoor1",
  },
];

export const skillCategories = [
  {
    title: "Languages",
    skills: ["Python", "Java", "C++", "JavaScript", "HTML", "CSS"],
  },
  {
    title: "Frameworks",
    skills: ["React.js", "Node.js", "Express.js", "Bootstrap"],
  },
  {
    title: "Databases",
    skills: ["MongoDB", "MySQL"],
  },
  {
    title: "Tools",
    skills: ["Git", "GitHub", "Figma", "Canva", "Jupyter", "Google Colab"],
  },
  {
    title: "Data",
    skills: ["Pandas", "NumPy", "Matplotlib", "Streamlit"],
  },
  {
    title: "Concepts",
    skills: ["DSA", "OOP", "DBMS", "OS", "REST APIs", "JWT"],
  },
];

export const certifications = [
  { title: "Python Basic", issuer: "HackerRank" },
  { title: "Java Basic", issuer: "HackerRank" },
  { title: "AI Fundamentals", issuer: "IBM" },
  { title: "DELF A1", issuer: "French Ministry of Education" },
  { title: "Deloitte Technology Simulation", issuer: "Forage" },
];

export const contactInfo = {
  email: "panyakapoor1@gmail.com",
  phone: "9205030857",
  socials: [
    {
      name: "LinkedIn",
      url: "https://www.linkedin.com/in/panya-kapoor-43178427b/",
      icon: "linkedin",
    },
    {
      name: "GitHub",
      url: "https://github.com/panyakapoor1",
      icon: "github",
    },
    {
      name: "LeetCode",
      url: "https://leetcode.com/_panyakpr1",
      icon: "leetcode",
    },
  ],
};

export const footerData = {
  text: "Designed & Built by Panya Kapoor · 2026",
  socials: [
    { name: "LinkedIn", url: "https://www.linkedin.com/in/panya-kapoor-43178427b/" },
    { name: "GitHub", url: "https://github.com/panyakapoor1" },
    { name: "LeetCode", url: "https://leetcode.com/_panyakpr1" },
  ],
};
