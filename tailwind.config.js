/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#050816",
        secondary: "#aaa6c3",
        tertiary: "#1d1836",
        "black-100": "#100d25",
        "black-200": "#090325",
        "white-100": "#f3f3f3",
        accent: "#915EFF",
        "accent-cyan": "#4fc3f7",
        "accent-coral": "#FF6B6B",
        "accent-emerald": "#10B981",
        "accent-amber": "#F59E0B",
      },
      boxShadow: {
        card: "0px 35px 120px -15px #211e35",
        "accent-glow": "0 0 30px rgba(145, 94, 255, 0.15)",
        "glass": "0 8px 32px rgba(0, 0, 0, 0.3)",
      },
      screens: {
        xs: "450px",
      },
      backgroundImage: {
        "hero-pattern": "linear-gradient(to bottom, #050816, #0d0f1f)",
      },
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
        inter: ["Inter", "sans-serif"],
        mono: ["DM Mono", "monospace"],
        playfair: ["Playfair Display", "serif"],
      },
      animation: {
        "float": "float 6s ease-in-out infinite",
        "pulse-glow": "pulse-glow 2s ease-in-out infinite",
        "orbit": "orbit 20s linear infinite",
        "gradient-shift": "gradient-shift 8s ease infinite",
        "slide-up": "slide-up 0.5s ease-out",
        "fade-in": "fade-in 0.6s ease-out",
        "ripple-expand": "ripple-expand 1.2s cubic-bezier(0.65, 0, 0.35, 1) forwards",
        "marquee": "marquee var(--marquee-duration, 30s) linear infinite",
        "marquee-reverse": "marquee-reverse var(--marquee-duration, 30s) linear infinite",
      },
      keyframes: {
        "float": {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-20px)" },
        },
        "pulse-glow": {
          "0%, 100%": { opacity: "0.4", transform: "scale(1)" },
          "50%": { opacity: "0.8", transform: "scale(1.05)" },
        },
        "orbit": {
          "0%": { transform: "rotate(0deg) translateX(var(--orbit-radius, 120px)) rotate(0deg)" },
          "100%": { transform: "rotate(360deg) translateX(var(--orbit-radius, 120px)) rotate(-360deg)" },
        },
        "gradient-shift": {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
        },
        "slide-up": {
          "0%": { transform: "translateY(20px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        "ripple-expand": {
          "0%": { transform: "translate(-50%, -50%) scale(0)", opacity: "1" },
          "50%": { transform: "translate(-50%, -50%) scale(300)", opacity: "1" },
          "100%": { transform: "translate(-50%, -50%) scale(300)", opacity: "0" },
        },
        "marquee": {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        "marquee-reverse": {
          "0%": { transform: "translateX(-50%)" },
          "100%": { transform: "translateX(0)" },
        },
      },
    },
  },
  plugins: [
    function({ addUtilities }) {
      addUtilities({
        '.pause-animation': {
          'animation-play-state': 'paused',
        }
      })
    }
  ],
};
