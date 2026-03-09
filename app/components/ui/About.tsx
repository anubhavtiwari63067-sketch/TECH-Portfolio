'use client';

import { motion } from 'framer-motion';
import { Rocket, Target, Zap, Shield, HelpCircle, User } from 'lucide-react';
import { useState } from 'react';

const Skills = [
  { name: 'React.js', color: 'text-cyan-400', url: 'https://react.dev/' },
  { name: 'Next.js', color: 'text-white', url: 'https://nextjs.org/' },
  { name: 'Three.js', color: 'text-cyan-300', url: 'https://threejs.org/' },
  { name: 'Node.js', color: 'text-green-400', url: 'https://nodejs.org/' },
  { name: 'Express.js', color: 'text-yellow-400', url: 'https://expressjs.com/' },
  { name: 'MongoDB', color: 'text-emerald-500', url: 'https://www.mongodb.com/' },
  { name: 'TailwindCSS', color: 'text-cyan-200', url: 'https://tailwindcss.com/' },
  { name: 'JavaScript', color: 'text-yellow-300', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript' },
  { name: 'HTML5', color: 'text-orange-500', url: 'https://developer.mozilla.org/en-US/docs/Web/HTML' },
  { name: 'CSS3', color: 'text-blue-500', url: 'https://developer.mozilla.org/en-US/docs/Web/CSS' },
  { name: 'AI Integration', color: 'text-purple-400', url: 'https://openai.com/' },
  { name: 'AI Prompting', color: 'text-indigo-400', url: 'https://www.deeplearning.ai/short-courses/chatgpt-prompt-engineering-for-developers/' },
  { name: 'Debugging', color: 'text-red-400', url: 'https://github.com/microsoft/vscode-chrome-debug' },
];

export default function About() {
  const [activeSpeech, setActiveSpeech] = useState(0);

  const speeches = [
    "I build responsive applications using the MERN stack with a focus on AI integration.",
    "Certified by PW Skills, my mission is to bridge the gap between creative UI and scalable backend logic.",
    "I leverage AI tools to optimize coding workflows and solve complex architectural challenges."
  ];

  return (
    <section id="about" className="py-32 px-6 relative overflow-hidden flex flex-col items-center">
      <div className="absolute inset-0 z-0 bg-gradient-to-t from-cyan-500/5 via-transparent to-transparent opacity-50" />
      <div className="max-w-7xl w-full mx-auto grid md:grid-cols-2 gap-20 items-center relative z-10">
        
        {/* The "Cast" Character - Placeholder for 3D Model */}
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
          className="relative group h-[500px] md:h-[650px] overflow-hidden rounded-[2.5rem] border border-white/10 bg-black/50 backdrop-blur-3xl group"
        >
          <div className="absolute inset-x-0 bottom-0 top-[40%] bg-gradient-to-t from-black via-black/80 to-transparent z-10" />
          
          {/* Stylized Avatar Placeholder - High end glow and pattern */}
          <div className="absolute inset-0 flex items-center justify-center p-12">
            <motion.div
              animate={{ 
                scale: [1, 1.05, 1],
                rotate: [0, 2, -2, 0],
                y: [0, -15, 0]
              }}
              transition={{ repeat: Infinity, duration: 8, ease: "easeInOut" }}
              className="w-full h-full relative"
            >
              <div className="absolute inset-0 rounded-full bg-cyan-500/20 blur-[100px] animate-pulse" />
              <div className="relative w-full h-full flex items-center justify-center">
                <div className="w-64 h-64 border-2 border-cyan-500/50 rounded-full flex items-center justify-center group-hover:scale-110 group-hover:bg-cyan-500/20 transition-all duration-700">
                  <div className="w-48 h-48 border-2 border-white/20 rounded-full flex items-center justify-center animate-spin-slow">
                    <User className="w-24 h-24 text-cyan-400 group-hover:text-white transition-colors rotate-[-15deg]" />
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            className="absolute bottom-12 left-12 right-12 z-20 space-y-6"
          >
            <div className="bg-cyan-500/10 backdrop-blur-xl border border-cyan-500/30 p-8 rounded-3xl relative">
              <div className="absolute -top-3 left-8 w-6 h-6 bg-cyan-500/10 border-t border-l border-cyan-500/30 rotate-45" />
              <p className="text-white md:text-xl font-medium leading-relaxed tracking-tight">
                "{speeches[activeSpeech]}"
              </p>
              <div className="flex gap-2 mt-6">
                {speeches.map((_, i) => (
                  <button 
                    key={i}
                    onClick={() => setActiveSpeech(i)}
                    title={`Select speech bubble ${i + 1}`}
                    className={`h-1.5 rounded-full transition-all duration-500 ${activeSpeech === i ? 'w-12 bg-cyan-500' : 'w-4 bg-white/20 hover:bg-white/40'}`}
                  />
                ))}
              </div>
            </div>
            <div className="flex justify-between items-center text-cyan-400 font-mono text-[10px] uppercase tracking-[0.3em]">
              <span>System: Character Active</span>
              <span className="flex items-center gap-2"><HelpCircle className="w-3 h-3" /> Info</span>
            </div>
          </motion.div>
        </motion.div>

        {/* Professional Summary Content */}
        <div className="space-y-12">
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="space-y-4"
          >
            <span className="text-cyan-400 font-mono tracking-[0.3em] uppercase text-sm flex items-center gap-4">
              <span className="h-[1px] w-12 bg-cyan-500" /> Professional Resume
            </span>
            <h2 className="text-5xl md:text-7xl font-black text-white tracking-tighter uppercase leading-none">
              Engineering <br /><span className="text-cyan-500">Imagination.</span>
            </h2>
          </motion.div>

          <p className="text-gray-400 text-lg leading-relaxed font-medium">
            Motivated Full Stack Developer certified in AI-integrated web development. Proficient in building responsive applications using the MERN stack (MongoDB, Express, React, Node.js).
          </p>

          <div className="space-y-4 pt-4 border-t border-white/10">
            <h4 className="text-white font-bold uppercase tracking-widest text-[10px]">Academic Background</h4>
            <div className="space-y-4">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-white font-bold text-sm">Bachelor of Arts</p>
                  <p className="text-gray-500 text-xs">IGPG collage Gouri Ganj Amethi</p>
                </div>
                <span className="text-cyan-500 font-mono text-[10px] bg-cyan-500/10 px-2 py-1 rounded">GRADUATE</span>
              </div>
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-white font-bold text-sm">Intermediate (Class 12)</p>
                  <p className="text-gray-500 text-xs">Shri Jai Narayan Mishra Inter College, Lucknow</p>
                </div>
                <span className="text-gray-500 font-mono text-[10px] bg-white/5 px-2 py-1 rounded">2022</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-8">
            <div className="p-8 bg-white/5 backdrop-blur-md rounded-3xl border border-white/10 group hover:border-cyan-500/30 transition-colors">
              <Rocket className="w-10 h-10 text-cyan-500 mb-6 group-hover:scale-110 transition-transform" />
              <h4 className="text-white font-bold uppercase tracking-widest text-sm mb-2">Core Ethos</h4>
              <p className="text-gray-500 text-xs font-medium leading-relaxed">Problem Solving by nature, Adaptable by design. I thrive on technical challenges.</p>
            </div>
            <div className="p-8 bg-white/5 backdrop-blur-md rounded-3xl border border-white/10 group hover:border-cyan-500/30 transition-colors">
              <Target className="w-10 h-10 text-cyan-500 mb-6 group-hover:scale-110 transition-transform" />
              <h4 className="text-white font-bold uppercase tracking-widest text-sm mb-2">Efficiency</h4>
              <p className="text-gray-500 text-xs font-medium leading-relaxed">Expert Time Management to ensure high-velocity delivery without compromising quality.</p>
            </div>
          </div>

          <div className="pt-8 border-t border-white/10">
            <h4 className="text-white font-bold uppercase tracking-widest text-[10px] mb-8">Specialized Tech Arsenal</h4>
            <div className="flex flex-wrap gap-4">
              {Skills.map((skill) => (
                <motion.a 
                  key={skill.name}
                  href={skill.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1, y: -2 }}
                  className="px-6 py-3 bg-white/5 border border-white/10 rounded-2xl flex items-center gap-3 backdrop-blur-md hover:bg-white/10 transition-all cursor-pointer group"
                >
                  <div className={`w-2 h-2 rounded-full bg-current ${skill.color} group-hover:animate-pulse`} />
                  <span className={`font-bold text-xs uppercase tracking-widest ${skill.color}`}>{skill.name}</span>
                </motion.a>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .animate-spin-slow { animation: spin 20s linear infinite; }
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
      `}</style>
    </section>
  );
}
