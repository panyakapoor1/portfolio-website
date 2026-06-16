import { useEffect, useRef, useState } from 'react';

const PixelFluidText = ({ 
  text = "Panya Kapoor", 
  fontSize = "160px",
  fontFamily = "'Playfair Display', serif",
  color = "#ffffff",
  gap = 3, // Ultra-fine particle resolution (less pixelated)
  radius = 90 // Slightly larger mouse repulsion radius
}) => {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [dynamicFontSize, setDynamicFontSize] = useState(fontSize);

  useEffect(() => {
    // Ensure font is loaded before drawing
    document.fonts.ready.then(() => {
      setIsLoaded(true);
    });

    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 480) {
        setDynamicFontSize("70px");
      } else if (width < 768) {
        setDynamicFontSize("90px");
      } else if (width < 1024) {
        setDynamicFontSize("120px");
      } else {
        setDynamicFontSize(fontSize);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [fontSize]);

  useEffect(() => {
    if (!isLoaded || !canvasRef.current || !containerRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    
    // Scale canvas for high DPI
    const dpr = window.devicePixelRatio || 1;
    let width = containerRef.current.clientWidth;
    let height = containerRef.current.clientHeight;
    
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
    ctx.scale(dpr, dpr);

    let particlesArray = [];
    let mouse = { x: -1000, y: -1000, radius };

    class Particle {
      constructor(x, y, color, size) {
        this.x = x + (Math.random() - 0.5) * 50; // start slightly randomized
        this.y = y + (Math.random() - 0.5) * 50;
        this.originX = x;
        this.originY = y;
        this.color = color;
        this.size = size;
        this.vx = (Math.random() - 0.5) * 2;
        this.vy = (Math.random() - 0.5) * 2;
        this.ease = 0.05 + Math.random() * 0.05; // variance in spring
        this.friction = 0.85 + Math.random() * 0.05;
      }

      update() {
        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < mouse.radius) {
          // Increase repulsion force for a more dramatic 'breaking' effect
          const force = (mouse.radius - distance) / mouse.radius;
          const angle = Math.atan2(dy, dx);
          this.vx -= Math.cos(angle) * force * 7;
          this.vy -= Math.sin(angle) * force * 7;
        }

        // Spring back
        this.vx += (this.originX - this.x) * this.ease;
        this.vy += (this.originY - this.y) * this.ease;

        this.vx *= this.friction;
        this.vy *= this.friction;

        this.x += this.vx;
        this.y += this.vy;
      }

      draw() {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        // Draw as smooth circles instead of blocky rects
        ctx.arc(this.x, this.y, this.size / 1.5, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    const init = () => {
      particlesArray = [];
      
      // Draw text to extract pixels
      ctx.fillStyle = color;
      ctx.font = `bold ${dynamicFontSize} ${fontFamily}`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      
      // Always handle multi-line text (split by space)
      const words = text.split(' ');
      if (words.length > 1) {
        // Multi-line for all screen sizes
        const baseSize = parseInt(dynamicFontSize);
        const offset = baseSize * 0.45; // 45% of font size for spacing
        ctx.fillText(words[0], width / 2, height / 2 - offset);
        ctx.fillText(words.slice(1).join(' '), width / 2, height / 2 + offset);
      } else {
        ctx.fillText(text, width / 2, height / 2);
      }

      const textCoordinates = ctx.getImageData(0, 0, width * dpr, height * dpr);
      ctx.clearRect(0, 0, width * dpr, height * dpr);

      // Extract pixels
      for (let y = 0; y < textCoordinates.height; y += gap * dpr) {
        for (let x = 0; x < textCoordinates.width; x += gap * dpr) {
          const index = (y * textCoordinates.width + x) * 4;
          const alpha = textCoordinates.data[index + 3];
          
          if (alpha > 128) {
            // Found a pixel belonging to the text
            // Generate a color variance or keep it white
            const r = textCoordinates.data[index];
            const g = textCoordinates.data[index + 1];
            const b = textCoordinates.data[index + 2];
            particlesArray.push(new Particle(x / dpr, y / dpr, `rgba(${r},${g},${b},${alpha/255})`, gap));
          }
        }
      }
    };

    init();

    let animationFrameId;
    const animate = () => {
      ctx.clearRect(0, 0, width, height);
      for (let i = 0; i < particlesArray.length; i++) {
        particlesArray[i].update();
        particlesArray[i].draw();
      }
      animationFrameId = requestAnimationFrame(animate);
    };
    animate();

    // Event Listeners
    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };
    
    const handleMouseLeave = () => {
      mouse.x = -1000;
      mouse.y = -1000;
    };

    const handleResize = () => {
      width = containerRef.current.clientWidth;
      height = containerRef.current.clientHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.scale(dpr, dpr);
      
      init();
    };

    window.addEventListener('resize', handleResize);
    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseleave', handleMouseLeave);
    canvas.addEventListener('touchstart', (e) => handleMouseMove(e.touches[0]), { passive: true });
    canvas.addEventListener('touchmove', (e) => handleMouseMove(e.touches[0]), { passive: true });

    return () => {
      window.removeEventListener('resize', handleResize);
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('mouseleave', handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, [text, dynamicFontSize, fontSize, color, gap, radius, isLoaded, fontFamily]);

  return (
    <div ref={containerRef} className="w-full h-[300px] md:h-[400px] flex items-center justify-center relative cursor-crosshair">
      <canvas ref={canvasRef} className="absolute inset-0 pointer-events-auto" />
    </div>
  );
};

export default PixelFluidText;
