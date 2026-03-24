'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Power } from 'lucide-react';
import { useState } from 'react';

export default function LandingOverlay({ onStart }: { onStart: () => void }) {
  const [isPoweringOn, setIsPoweringOn] = useState(false);

  const handleClick = () => {
    setIsPoweringOn(true);
    setTimeout(onStart, 1500); // Trigger the start after animation
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 backdrop-blur-[2px] overflow-hidden">
      <AnimatePresence mode="wait">
        {!isPoweringOn ? (
          <motion.button
            key="power-button"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 2, opacity: 0, filter: 'blur(20px)' }}
            whileHover={{ scale: 1.1, boxShadow: '0 0 30px rgba(0, 255, 255, 0.5)' }}
            className="relative p-8 rounded-full border-2 border-cyan-500/50 bg-black/50 backdrop-blur-sm group"
            onClick={handleClick}
          >
            <Power className="w-12 h-12 text-cyan-400 group-hover:text-cyan-200 transition-colors" />
            <div className="absolute inset-0 rounded-full border-2 border-cyan-500 opacity-20 animate-ping" />
            <p className="absolute -bottom-12 left-1/2 -translate-x-1/2 text-cyan-500 font-mono tracking-widest uppercase">Power On</p>
          </motion.button>
        ) : (
          <motion.div
            key="glitch-text"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center"
          >
            <h1 className="text-6xl md:text-8xl font-black text-white glitch tracking-tighter" data-text="ANUBHAV TIWARI">
              ANUBHAV TIWARI
            </h1>
            <div className="h-1 w-full bg-cyan-500 scale-x-0 animate-expand-x mt-4" />
          </motion.div>
        )}
      </AnimatePresence>

      <style jsx>{`
        .glitch {
          position: relative;
          text-shadow: 0.05em 0 0 rgba(255, 0, 0, 0.75), -0.025em -0.05em 0 rgba(0, 255, 0, 0.75),
            0.025em 0.05em 0 rgba(0, 0, 255, 0.75);
          animation: glitch 500ms infinite;
        }

        .glitch::before,
        .glitch::after {
          content: attr(data-text);
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
        }

        .glitch::before {
          animation: glitch 650ms infinite;
          clip-path: polygon(0 0, 100% 0, 100% 45%, 0 45%);
          transform: translate(-0.025em, -0.0125em);
          opacity: 0.8;
        }

        .glitch::after {
          animation: glitch 375ms infinite;
          clip-path: polygon(0 80%, 100% 20%, 100% 100%, 0 100%);
          transform: translate(0.0125em, 0.025em);
          opacity: 0.8;
        }

        @keyframes glitch {
          0% {
            text-shadow: 0.05em 0 0 rgba(255, 0, 0, 0.75), -0.05em -0.025em 0 rgba(0, 255, 0, 0.75),
              -0.025em 0.05em 0 rgba(0, 0, 255, 0.75);
          }
          14% {
            text-shadow: 0.05em 0 0 rgba(255, 0, 0, 0.75), -0.05em -0.025em 0 rgba(0, 255, 0, 0.75),
              -0.025em 0.05em 0 rgba(0, 0, 255, 0.75);
          }
          15% {
            text-shadow: -0.05em -0.025em 0 rgba(255, 0, 0, 0.75), 0.025em 0.025em 0 rgba(0, 255, 0, 0.75),
              -0.05em -0.05em 0 rgba(0, 0, 255, 0.75);
          }
          49% {
            text-shadow: -0.05em -0.025em 0 rgba(255, 0, 0, 0.75), 0.025em 0.025em 0 rgba(0, 255, 0, 0.75),
              -0.05em -0.05em 0 rgba(0, 0, 255, 0.75);
          }
          50% {
            text-shadow: 0.025em 0.05em 0 rgba(255, 0, 0, 0.75), 0.05em 0 0 rgba(0, 255, 0, 0.75),
              0 -0.05em 0 rgba(0, 0, 255, 0.75);
          }
          99% {
            text-shadow: 0.025em 0.05em 0 rgba(255, 0, 0, 0.75), 0.05em 0 0 rgba(0, 255, 0, 0.75),
              0 -0.05em 0 rgba(0, 0, 255, 0.75);
          }
          100% {
            text-shadow: -0.025em 0 0 rgba(255, 0, 0, 0.75), -0.025em -0.025em 0 rgba(0, 255, 0, 0.75),
              -0.025em -0.05em 0 rgba(0, 0, 255, 0.75);
          }
        }

        @keyframes expand-x {
          from { transform: scaleX(0); }
          to { transform: scaleX(1); }
        }

        .animate-expand-x {
          animation: expand-x 1s ease-out forwards;
        }
      `}</style>
    </div>
  );
}
