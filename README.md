# Developer Portfolio | Panya Kapoor

A high-performance, interactive developer profile built with React, Vite, and Three.js. This project showcases my skills, experience, and projects through an immersive 3D experience.

## 🚀 Features

- **Immersive 3D Visuals**: Real-time 3D rendering using Three.js and React Three Fiber.
- **Fluid Animations**: Smooth, performant transitions powered by GSAP and Framer Motion.
- **Responsive Architecture**: Mobile-first design implemented with Tailwind CSS.
- **Interactive Elements**:
  - Custom dynamic cursor
  - Scroll-triggered 3D animations
  - Functional contact system via EmailJS
  - Interactive project showcases
- **Optimized Loading**: Custom preloader and asset management for a seamless entry.

## 🛠️ Tech Stack

- **Framework**: React.js
- **Build Tool**: Vite
- **3D/Graphics**: Three.js, React Three Fiber, GLSL Shaders
- **Styling**: Tailwind CSS
- **Motion**: Framer Motion, GSAP
- **Contact**: EmailJS

## 📋 Getting Started

### Prerequisites
- Node.js (v18+)
- npm or yarn

### Local Setup
1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd portfolio-website
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Environment Configuration:**
   Create a `.env` file in the root directory based on `.env.example`:
   ```env
   VITE_EMAILJS_SERVICE_ID=your_service_id
   VITE_EMAILJS_TEMPLATE_ID=your_template_id
   VITE_EMAILJS_PUBLIC_KEY=your_public_key
   ```

4. **Launch Dev Server:**
   ```bash
   npm run dev
   ```

## 🌐 Deployment

This project is optimized for deployment on platforms like **Vercel**, **Netlify**, or **GitHub Pages**.

1. **Build the project:**
   ```bash
   npm run build
   ```
2. **Deploy the `dist` folder** to your preferred hosting provider.

## 📄 License

Distributed under the MIT License.
