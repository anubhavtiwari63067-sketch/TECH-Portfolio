'use client';

import { useState, useRef, useEffect } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function MusicPlayer({ autoPlay = false }: { autoPlay?: boolean }) {
  const [isMuted, setIsMuted] = useState(true);
  const [hasInteracted, setHasInteracted] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    if (autoPlay && audioRef.current && !hasInteracted) {
      audioRef.current.play().then(() => {
        setIsMuted(false);
        setHasInteracted(true);
      }).catch(() => {
        // Autoplay blocked by browser
        console.log("Autoplay blocked. Waiting for interaction.");
      });
    }
  }, [autoPlay, hasInteracted]);

  const toggleMute = () => {
    if (audioRef.current) {
      if (isMuted) {
        audioRef.current.play();
        audioRef.current.muted = false;
        setIsMuted(false);
      } else {
        audioRef.current.muted = true;
        setIsMuted(true);
      }
      setHasInteracted(true);
    }
  };

  return (
    <div className="fixed bottom-10 right-10 z-[60] flex items-center gap-4">
      <audio ref={audioRef} loop src="/headlights.mp3" />
      
      <motion.button
        onClick={toggleMute}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="p-4 bg-black/50 backdrop-blur-xl border border-white/10 rounded-full text-cyan-400 shadow-[0_0_20px_rgba(34,211,238,0.2)] hover:border-cyan-500/50 transition-colors group"
      >
        <div className="relative">
          {isMuted ? <VolumeX className="w-6 h-6" /> : <Volume2 className="w-6 h-6 animate-pulse" />}
          
          <AnimatePresence>
            {!hasInteracted && isMuted && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="absolute right-16 top-1/2 -translate-y-1/2 whitespace-nowrap bg-cyan-500 text-black text-[10px] font-bold uppercase tracking-widest px-4 py-2 rounded-lg pointer-events-none"
              >
                Intiate Audio Protocol
                <div className="absolute right-[-4px] top-1/2 -translate-y-1/2 w-2 h-2 bg-cyan-500 rotate-45" />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.button>
    </div>
  );
}
