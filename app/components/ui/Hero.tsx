import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion';
import { ChevronDown, Sparkles, Terminal, Activity, Download, Monitor } from 'lucide-react';
import HolographicText from './HolographicText';
import FloatingTechIcons from './FloatingTechIcons';
import { useEffect, useState, useRef } from 'react';

export default function Hero() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const orbitTime = useMotionValue(0);

  const springX = useSpring(mouseX, { damping: 25, stiffness: 150 });
  const springY = useSpring(mouseY, { damping: 25, stiffness: 150 });

  const moveX = useTransform(springX, [-500, 500], [-30, 30]);
  const moveY = useTransform(springY, [-500, 500], [-30, 30]);
  
  // Planetary Orbit calculation
  const orbitX = useTransform(orbitTime, t => Math.cos(t) * 150);
  const orbitY = useTransform(orbitTime, t => Math.sin(t) * 100);
  const orbitScale = useTransform(orbitTime, t => (Math.sin(t) + 2) / 3); // Scale between 0.33 and 1
  const orbitZIndex = useTransform(orbitTime, t => Math.sin(t) > 0 ? 0 : 20);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX - window.innerWidth / 2);
      mouseY.set(e.clientY - window.innerHeight / 2);
    };

    let animationFrame: number;
    const startTime = Date.now();
    
    const animateOrbit = (time: number) => {
      const elapsed = (Date.now() - startTime) / 1000;
      
      if (elapsed > 5) {
        // Orbit starts after 5 seconds
        orbitTime.set((elapsed - 5) / 2); // Orbit speed
      } else {
        // Stable for first 5 seconds
        orbitTime.set(0); 
      }
      
      animationFrame = requestAnimationFrame(animateOrbit);
    };
    animationFrame = requestAnimationFrame(animateOrbit);

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrame);
    };
  }, [mouseX, mouseY, orbitTime]);

  return (
    <section className="relative min-h-screen flex items-center justify-center px-6 overflow-hidden">
      <motion.div 
        style={{ x: moveX, y: moveY }}
        className="max-w-7xl w-full z-10 grid md:grid-cols-2 gap-12 items-center"
      >
        
        {/* Left Side Content */}
        <motion.div
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex flex-col gap-6"
        >
          <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/20 w-fit">
            <Sparkles className="w-4 h-4 text-cyan-400 animate-pulse" />
            <span className="text-xs font-mono text-cyan-400 tracking-wider">SYSTEM ONLINE: AI INTERFACE v2.0</span>
          </div>

          <div className="space-y-2 relative">
            <motion.h2 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-cyan-400 font-mono text-sm tracking-[0.3em] uppercase"
            >
              Anubhav Tiwari
            </motion.h2>
            
            <h1 className="text-5xl md:text-7xl font-black text-white leading-tight">
              Aspiring <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 drop-shadow-[0_0_15px_rgba(34,211,238,0.3)]">
                Full Stack Developer.
              </span>
            </h1>
          </div>

          <p className="text-gray-400 text-lg max-w-xl leading-relaxed italic border-l-2 border-cyan-500/30 pl-6 py-2">
            "AI Integration | Problem Solver | Hackathon Participant"
          </p>

          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <Terminal className="w-5 h-5 text-cyan-500" />
              <div className="text-xl md:text-2xl font-bold">
                <HolographicText text="Building Smart Web Applications" />
              </div>
            </div>
            <motion.div 
               className="h-1 bg-gradient-to-r from-cyan-500 to-transparent w-48"
               initial={{ scaleX: 0 }}
               animate={{ scaleX: 1 }}
               transition={{ delay: 2, duration: 1 }}
            />
          </div>

          <FloatingTechIcons />

          <div className="flex flex-wrap gap-4 mt-8">
            <div className="relative group">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-lg blur opacity-30 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-tilt"></div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="relative px-8 py-3 bg-black text-cyan-400 border border-cyan-500/50 font-bold rounded-lg transition-all flex items-center gap-2 group-hover:text-white"
              >
                Explore Projects
                <Activity className="w-4 h-4" />
              </motion.button>
            </div>

            <motion.a 
              href="/Anubhav_Tiwari_Resume.pdf"
              download="Anubhav_Tiwari_Resume.pdf"
              whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(34,211,238,0.4)" }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-3 bg-cyan-500 text-black font-bold rounded-lg transition-all flex items-center gap-2"
            >
              <Download className="w-4 h-4" />
              Download Resume
            </motion.a>
            
            <motion.a 
              href="/Anubhav_Tiwari_Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-3 bg-white/5 border border-white/10 text-white font-bold rounded-lg transition-all flex items-center gap-2 backdrop-blur-md"
            >
              <Monitor className="w-4 h-4" />
              View Resume
            </motion.a>
          </div>
        </motion.div>

        {/* Right Side Visual (3D Space Reserved) */}
        <div className="relative h-[400px] md:h-[600px] flex items-center justify-center">
            {/* The Planetary Orbit Image */}
            <motion.div
              style={{
                x: orbitX,
                y: orbitY,
                scale: orbitScale,
                zIndex: orbitZIndex
              }}
              className="absolute pointer-events-none"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ 
                scale: [0, 1.2, 1], 
                opacity: 1,
                filter: ["brightness(1)", "brightness(2)", "brightness(1)"] 
              }}
              transition={{ 
                duration: 1, 
                times: [0, 0.5, 1],
                delay: 0.5
              }}
            >
              {/* Blinking Circular Effect */}
              <motion.div 
                className="absolute inset-[-10px] rounded-full border-2 border-cyan-500/50"
                animate={{ scale: [1, 1.2], opacity: [0.5, 0] }}
                transition={{ duration: 1, repeat: Infinity }}
              />
              <div className="relative w-32 h-32 md:w-48 md:h-48 rounded-full border-2 border-cyan-500/80 overflow-hidden shadow-[0_0_50px_rgba(34,211,238,0.5)]">
                <img 
                  src="/avatar.jpg" 
                  alt="Anubhav Tiwari" 
                  className="w-full h-full object-cover"
                />
              </div>
            </motion.div>

            <motion.div 
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1.5, delay: 0.2 }}
                className="absolute inset-0 pointer-events-none"
            >
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-cyan-500/20 blur-[100px] rounded-full" />
                <div className="absolute top-0 right-0 w-32 h-32 border-t-2 border-r-2 border-cyan-500/30 rounded-tr-3xl" />
                <div className="absolute bottom-0 left-0 w-32 h-32 border-b-2 border-l-2 border-cyan-500/30 rounded-bl-3xl" />
                
                {[...Array(5)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute text-[10px] font-mono text-cyan-500/40"
                        animate={{
                            y: [0, -40, 0],
                            opacity: [0, 0.5, 0]
                        }}
                        transition={{
                            duration: 3 + i,
                            repeat: Infinity,
                            delay: i * 0.5
                        }}
                        style={{
                            left: `${20 + i * 15}%`,
                            top: `${30 + i * 10}%`
                        }}
                    >
                        {Math.random().toString(16).slice(2, 8).toUpperCase()}
                    </motion.div>
                ))}
            </motion.div>
        </div>
      </motion.div>

      <motion.div 
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-30"
      >
        <span className="text-[10px] uppercase tracking-widest font-mono">Initiate Scroll</span>
        <ChevronDown className="w-5 h-5 text-cyan-500" />
      </motion.div>
    </section>
  );
}
