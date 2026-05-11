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
      },
      boxShadow: {
        card: "0px 35px 120px -15px #211e35",
        "accent-glow": "0 0 30px rgba(145, 94, 255, 0.15)",
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
      },
    },
  },
  plugins: [],
};
