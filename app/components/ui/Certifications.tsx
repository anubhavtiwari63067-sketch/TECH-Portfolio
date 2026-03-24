'use client';

import { motion } from 'framer-motion';
import { ShieldCheck, Award, Star, Cpu, Code, Database } from 'lucide-react';

const certs = [
  { name: 'Full Stack Dev', org: 'Physics Wallah (PW) Skills', icon: Code, color: 'text-cyan-500', link: 'https://pwskills.com/' },
  { name: 'AI Integration', org: 'Advanced Workflow Training', icon: Cpu, color: 'text-purple-500' },
  { name: 'MERN Architecture', org: 'Next-Gen Stack Certification', icon: Database, color: 'text-blue-500' },
  { name: 'Responsive Design', org: 'UI/UX Mastery Workshop', icon: Star, color: 'text-pink-500' },
];

export default function Certifications() {
  return (
    <section className="py-24 px-6 relative bg-gradient-to-t from-black via-transparent to-black overflow-hidden">
      <div className="absolute inset-0 z-0 bg-cyan-500/5 blur-[100px] opacity-20 pointer-events-none" />
      <div className="max-w-7xl mx-auto flex flex-col items-center gap-16 relative z-10">
        
        <div className="text-center space-y-6">
          <span className="text-cyan-400 font-mono tracking-[0.4em] uppercase text-sm flex items-center justify-center gap-4">
            <span className="h-[1px] w-12 bg-cyan-500" /> Operational Mastery
          </span>
          <h2 className="text-5xl md:text-7xl font-black text-white tracking-tighter uppercase leading-none">
            Verified <br /><span className="text-cyan-500">Excellence.</span>
          </h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 w-full">
          {certs.map((cert, idx) => (
             <motion.a 
               href={cert.link || '#'}
               target={cert.link ? "_blank" : "_self"}
               rel={cert.link ? "noopener noreferrer" : ""}
               key={idx}
               initial={{ opacity: 0, scale: 0.9, y: 20 }}
               whileInView={{ opacity: 1, scale: 1, y: 0 }}
               transition={{ delay: idx * 0.1 }}
               whileHover={{ y: -10, scale: 1.05 }}
               className="p-8 bg-white/5 backdrop-blur-3xl rounded-[2rem] border border-white/10 group cursor-pointer hover:bg-white/10 transition-all duration-300 flex flex-col items-center text-center gap-6 shadow-[0_4px_40px_rgba(0,0,0,0.5)] block"
             >
                <div className={`w-16 h-16 rounded-3xl bg-black border border-white/10 flex items-center justify-center group-hover:scale-110 group-hover:rotate-12 transition-all duration-500 ${cert.color}`}>
                   <cert.icon className="w-8 h-8" />
                </div>
                <div className="space-y-2">
                   <h4 className="text-white font-bold uppercase tracking-tight text-sm leading-tight">{cert.name}</h4>
                   <p className="text-gray-500 font-bold uppercase tracking-widest text-[8px] leading-relaxed">{cert.org}</p>
                </div>
                <div className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity">
                   <ShieldCheck className="w-4 h-4 text-cyan-500" />
                </div>
             </motion.a>
          ))}
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="bg-white/5 border border-white/10 p-8 rounded-[2rem] flex flex-col md:flex-row items-center justify-between gap-12 w-full max-w-4xl backdrop-blur-3xl relative overflow-hidden group shadow-2xl"
        >
          <div className="absolute inset-0 bg-cyan-500/5 blur-[100px] opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
          <div className="flex items-center gap-6 relative z-10">
            <div className="w-16 h-16 rounded-full bg-cyan-500/20 flex items-center justify-center group-hover:bg-cyan-500 animate-pulse transition-all">
                <Award className="w-8 h-8 text-cyan-400 group-hover:text-black" />
            </div>
            <div className="text-left">
               <h4 className="text-white font-black uppercase text-xl tracking-tight leading-none mb-2">Ongoing Specialization</h4>
               <p className="text-gray-400 font-medium text-sm leading-relaxed max-w-sm">Constantly evolving my stack with next-gen frameworks and distributed architecture.</p>
            </div>
          </div>
          <button className="relative z-10 px-8 py-4 bg-white/10 hover:bg-white/20 text-white font-bold rounded-2xl border border-white/10 transition-all uppercase tracking-widest text-xs">View Credentials</button>
        </motion.div>
      </div>
    </section>
  );
}
