'use client';

import { motion } from 'framer-motion';
import { Menu, X, Rocket, Terminal } from 'lucide-react';
import { useState } from 'react';
import Link from 'next/link';

const NavLink = ({ href, children, icon: Icon }: { href: string; children: React.ReactNode; icon: any }) => (
  <Link href={href}>
    <motion.button 
      whileHover={{ y: -2, color: '#22d3ee' }}
      className="flex items-center gap-2 px-4 py-2 text-gray-400 font-mono text-sm transition-colors group"
    >
      <Icon className="w-4 h-4 group-hover:animate-pulse" />
      {children}
    </motion.button>
  </Link>
);

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 w-full z-50 backdrop-blur-md bg-black/10 border-b border-white/10">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Rocket className="w-8 h-8 text-cyan-400" />
          <span className="text-xl font-bold tracking-tighter text-white">ANUBHAV<span className="text-cyan-400">TIWARI</span></span>
        </div>

        <div className="hidden md:flex gap-4">
          <NavLink href="#projects" icon={Terminal}>Projects</NavLink>
          <NavLink href="#about" icon={Rocket}>Qualifications</NavLink>
          <NavLink href="#contact" icon={Terminal}>Mission Control</NavLink>
        </div>

        <button className="md:hidden text-white" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X /> : <Menu />}
        </button>
      </div>

      {isOpen && (
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden bg-black/90 p-4 border-b border-white/10 space-y-4"
        >
          <NavLink href="#projects" icon={Terminal}>Projects</NavLink>
          <NavLink href="#about" icon={Rocket}>Qualifications</NavLink>
          <NavLink href="#contact" icon={Terminal}>Mission Control</NavLink>
        </motion.div>
      )}
    </nav>
  );
}
