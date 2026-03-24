'use client';

import { motion } from 'framer-motion';
import { Code2, Atom, Server, Brain } from 'lucide-react';

const icons = [
  { Icon: Code2, label: 'JS', color: 'text-yellow-400', delay: 0, link: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript' },
  { Icon: Atom, label: 'React', color: 'text-cyan-400', delay: 0.5, link: 'https://react.dev/' },
  { Icon: Server, label: 'Node.js', color: 'text-green-500', delay: 1, link: 'https://nodejs.org/' },
  { Icon: Brain, label: 'AI', color: 'text-purple-500', delay: 1.5, link: 'https://openai.com/' },
];

export default function FloatingTechIcons() {
  return (
    <div className="flex gap-8 mt-8 relative z-50 pointer-events-auto">
      {icons.map(({ Icon, label, color, delay, link }, i) => (
        <motion.a
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          key={label}
          initial={{ opacity: 0, y: 20 }}
          animate={{ 
            opacity: 1, 
            y: [0, -15, 0],
          }}
          transition={{
            opacity: { delay: 0.5 + delay, duration: 0.5 },
            y: { 
              duration: 3, 
              repeat: Infinity, 
              ease: "easeInOut",
              delay: delay 
            }
          }}
          className="flex flex-col items-center gap-2 group cursor-pointer"
        >
          <div className={`p-4 rounded-xl bg-white/5 border border-white/10 backdrop-blur-md group-hover:border-cyan-500/50 group-hover:shadow-[0_0_20px_rgba(34,211,238,0.2)] transition-all duration-300`}>
            <Icon className={`w-8 h-8 ${color} group-hover:scale-110 transition-transform`} />
          </div>
          <span className="text-[10px] font-mono uppercase tracking-widest text-gray-500 group-hover:text-cyan-400 transition-colors">
            {label}
          </span>
        </motion.a>
      ))}
    </div>
  );
}
