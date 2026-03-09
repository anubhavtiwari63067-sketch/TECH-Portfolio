'use client';

import { motion } from 'framer-motion';
import { Github, Twitter, Linkedin, Terminal, ArrowUpCircle } from 'lucide-react';

const SocialLink = ({ icon: Icon, href }: { icon: any; href: string }) => (
  <motion.a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    whileHover={{ y: -5, scale: 1.1, color: '#22d3ee' }}
    className="p-4 bg-white/5 border border-white/10 rounded-2xl text-gray-500 hover:bg-white/10 transition-all shadow-[0_4px_20px_rgba(0,0,0,0.5)]"
  >
    <Icon className="w-6 h-6" />
  </motion.a>
);

export default function Footer() {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <footer className="py-20 px-6 relative bg-black border-t border-white/5">
      <div className="max-w-7xl mx-auto flex flex-col items-center">
        
        <div className="flex flex-col md:flex-row items-center justify-between w-full gap-12 mb-20 bg-gradient-to-br from-white/5 to-transparent p-12 rounded-[3.5rem] border border-white/5 shadow-2xl relative overflow-hidden group">
          <div className="absolute inset-0 bg-cyan-500/5 blur-[100px] opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
          
          <div className="relative z-10 flex flex-col md:items-start items-center gap-6">
            <div className="flex items-center gap-2">
              <Terminal className="w-10 h-10 text-cyan-400" />
              <span className="text-3xl font-black text-white tracking-tighter uppercase">Anubhav <span className="text-cyan-400">Tiwari</span></span>
            </div>
            <p className="text-gray-500 max-w-sm font-medium leading-relaxed md:text-left text-center">
              The cinematic portfolio where engineering meets imagination. Built with Next.js, Three.js, and extreme precision.
            </p>
          </div>

          <div className="relative z-10 flex gap-6">
            <SocialLink href="https://github.com/anubhavtiwari63067-sketch" icon={Github} />
            <SocialLink href="#" icon={Twitter} />
            <SocialLink href="https://www.linkedin.com/in/anubhav-tiwari-805875336" icon={Linkedin} />
          </div>
        </div>

        <div className="flex flex-col items-center gap-12 text-center">
          <motion.button 
            onClick={scrollToTop}
            whileHover={{ scale: 1.05 }}
            className="flex flex-col items-center gap-4 group"
          >
            <ArrowUpCircle className="w-10 h-10 text-cyan-700 group-hover:text-cyan-400 transition-colors" />
            <span className="text-[10px] uppercase font-bold tracking-[0.5em] text-cyan-900 group-hover:text-cyan-400 transition-colors">Return To Orbit</span>
          </motion.button>
          
          <div className="flex flex-col gap-4 text-center">
            <p className="text-gray-700 text-[10px] uppercase font-bold tracking-[0.2em]">
              &copy; 2026 Tech Trailer Protocol. All Rights Reserved.
            </p>
            <div className="flex justify-center gap-8 text-[8px] uppercase font-bold tracking-[0.3em] text-gray-800">
               <span className="hover:text-cyan-400 cursor-pointer">Security Compliance</span>
               <span className="hover:text-cyan-400 cursor-pointer">Privacy Protocol</span>
               <span className="hover:text-cyan-400 cursor-pointer">Usage Agreement</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
