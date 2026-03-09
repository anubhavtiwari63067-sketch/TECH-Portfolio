'use client';

import { motion } from 'framer-motion';
import { ChevronDown, Download, Monitor, Code, Zap } from 'lucide-react';

const Card = ({ icon: Icon, title, desc }: { icon: any; title: string; desc: string }) => (
  <motion.div 
    whileHover={{ y: -5, scale: 1.02 }}
    className="p-6 bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 group cursor-pointer hover:bg-white/10 transition-all duration-300"
  >
    <div className="w-12 h-12 rounded-xl bg-cyan-500/20 flex items-center justify-center mb-6 group-hover:bg-cyan-500/30 transition-colors">
      <Icon className="w-6 h-6 text-cyan-400 group-hover:animate-bounce" />
    </div>
    <h3 className="text-xl font-bold text-white mb-2 uppercase tracking-tight">{title}</h3>
    <p className="text-gray-400 leading-relaxed text-sm">{desc}</p>
  </motion.div>
);

export default function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center px-6 pt-20">
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-transparent via-cyan-500/5 to-transparent blur-3xl" />

      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="max-w-7xl w-full z-10 flex flex-col md:flex-row items-center justify-between gap-12"
      >
        <div className="text-center md:text-left flex-1">
          <motion.span 
            initial={{ letterSpacing: '0.5em', opacity: 0 }}
            animate={{ letterSpacing: '0.1em', opacity: 1 }}
            className="text-cyan-400 font-mono text-sm mb-6 inline-block uppercase tracking-[0.3em]"
          >
            Engineering Meets Imagination
          </motion.span>
          
          <h1 className="text-5xl md:text-8xl font-black text-white mb-8 tracking-tighter leading-[0.9]">
            FULL STACK <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 animate-gradient-x">
              DEVELOPER.
            </span>
          </h1>

          <p className="text-gray-400 text-lg md:text-xl max-w-2xl mb-12 font-medium leading-relaxed">
            Building responsive applications with the MERN stack (MongoDB, Express, React, Node.js) and AI integration. Turning complex problems into elegant digital solutions.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center md:justify-start mb-12 md:mb-24">
            <motion.a 
              href="/Anubhav_Tiwari_Resume.pdf"
              download="Anubhav_Tiwari_Resume.pdf"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-cyan-500 hover:bg-cyan-400 text-black font-bold rounded-full transition-colors flex items-center justify-center gap-3 shadow-[0_0_20px_rgba(34,211,238,0.4)]"
            >
              <Download className="w-5 h-5" />
              Download Mission Resume
            </motion.a>
            
            <motion.a 
              href="/Anubhav_Tiwari_Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-white/5 hover:bg-white/10 text-white font-bold rounded-full border border-white/10 transition-all flex items-center justify-center gap-3 backdrop-blur-md"
            >
              <Monitor className="w-5 h-5" />
              View Resume
            </motion.a>
          </div>
        </div>

        {/* 3D Avatar Container - Now handled by the main background Canvas to prevent WebGL errors */}
        <div className="relative w-full h-[350px] md:w-[600px] md:h-[600px] flex-shrink-0" />
      </motion.div>

      <div className="grid md:grid-cols-3 gap-8 w-full max-w-6xl relative z-10">
        <Card 
          icon={Code} 
          title="Full Stack" 
          desc="Modern architectures built with Next.js, Node, and Scalable Databases."
        />
        <Card 
          icon={Monitor} 
          title="Interactive UI" 
          desc="Immersive 3D experiences using Three.js and Framer Motion."
        />
        <Card 
          icon={Zap} 
          title="Fast Delivery" 
          desc="Optimized for performance, SEO, and developer-first experiences."
        />
      </div>

      <motion.div 
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 text-gray-500 flex flex-col items-center gap-2"
      >
        <span className="text-[10px] uppercase tracking-widest font-mono">Initiate Descent</span>
        <ChevronDown className="w-5 h-5" />
      </motion.div>
    </section>
  );
}
