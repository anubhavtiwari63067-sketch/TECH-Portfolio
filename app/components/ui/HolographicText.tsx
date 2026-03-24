'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

export default function HolographicText({ text }: { text: string }) {
  const [displayedText, setDisplayedText] = useState('');
  const [complete, setComplete] = useState(false);

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setDisplayedText(text.slice(0, i));
      i++;
      if (i > text.length) {
        clearInterval(interval);
        setComplete(true);
      }
    }, 100);
    return () => clearInterval(interval);
  }, [text]);

  return (
    <div className="relative inline-block">
      <motion.span
        className="text-cyan-400 font-mono relative z-10"
        animate={complete ? { 
          textShadow: ["0 0 5px #22d3ee", "0 0 20px #22d3ee", "0 0 5px #22d3ee"] 
        } : {}}
        transition={{ duration: 2, repeat: Infinity }}
      >
        {displayedText}
        {!complete && (
          <motion.span
            animate={{ opacity: [0, 1, 0] }}
            transition={{ duration: 0.8, repeat: Infinity }}
            className="inline-block w-2 H-6 bg-cyan-400 ml-1"
          >
            _
          </motion.span>
        )}
      </motion.span>
      
      {/* Glitch layer */}
      {complete && (
        <motion.span
          className="absolute inset-0 text-red-500/30 font-mono -z-10"
          animate={{
            x: [0, -2, 2, 0],
            opacity: [0, 0.5, 0]
          }}
          transition={{ duration: 0.2, repeat: Infinity, repeatDelay: 3 }}
        >
          {text}
        </motion.span>
      )}
    </div>
  );
}
