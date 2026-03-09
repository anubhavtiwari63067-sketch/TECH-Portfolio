'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Terminal, Send, CheckCircle, AlertTriangle, Cpu, Globe, Rocket, Linkedin } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';

const responses = [
  { text: "> Initializing secure handshake...", delay: 500 },
  { text: "> Routing through encrypted tunnels...", delay: 800 },
  { text: "> Validating transmission protocols...", delay: 400 },
  { text: "> Message successfully delivered to Mission Control.", delay: 600, success: true }
];

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [statusLog, setStatusLog] = useState<string[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [statusLog]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatusLog([]);

    // Simulate terminal response
    for (const res of responses) {
      await new Promise(r => setTimeout(r, res.delay));
      setStatusLog(prev => [...prev, res.text]);
    }

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const result = await res.json();
      
      if (res.ok) {
        setStatusLog(prev => [...prev, `> ${result.message}`]);
        setIsSuccess(true);
        setFormData({ name: '', email: '', message: '' });
      } else {
        setStatusLog(prev => [...prev, `> ERROR: ${result.error || 'Unknown failure'}`]);
      }
    } catch (err) {
      setStatusLog(prev => [...prev, `> CRITICAL: Handshake failed. System timed out.`]);
    }
    
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(false);
      setStatusLog([]);
    }, 5000);
  };

  return (
    <section id="contact" className="py-32 px-6 relative bg-black/50 overflow-hidden">
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-transparent to-cyan-500/10 pointer-events-none" />
      
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-20 relative z-10 items-center">
        
        <div className="flex-1 space-y-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
          >
            <span className="text-cyan-400 font-mono tracking-[0.3em] uppercase text-sm mb-6 block">Mission Governance</span>
            <h2 className="text-6xl md:text-8xl font-black text-white tracking-tighter uppercase leading-none">
              Let's <br /><span className="text-cyan-500">Collaborate.</span>
            </h2>
            <p className="mt-8 text-gray-400 max-w-lg font-medium leading-relaxed">
              Reach out via the secure terminal below. My systems are primed for new architectural missions and high-impact engineering projects.
            </p>
          </motion.div>

          <div className="grid grid-cols-2 gap-8 pt-8">
            <div className="space-y-4">
              <Globe className="w-8 h-8 text-cyan-400/50" />
              <div className="text-white font-bold uppercase tracking-widest text-[10px]">Location</div>
              <p className="text-gray-500 font-medium">Lucknow, India</p>
            </div>
            <div className="space-y-4">
              <Rocket className="w-8 h-8 text-cyan-400/50" />
              <div className="text-white font-bold uppercase tracking-widest text-[10px]">Transmission</div>
              <p className="text-gray-500 font-medium whitespace-nowrap overflow-hidden text-ellipsis">Tiwarianubhav186@gmail.com</p>
              <div className="flex flex-col gap-1">
                <p className="text-gray-500 font-medium text-xs">Ph: +91 6306713085</p>
                <a 
                  href="https://www.linkedin.com/in/anubhav-tiwari-805875336" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="flex items-center gap-2 text-cyan-500 hover:text-cyan-400 font-medium text-xs transition-colors"
                >
                  <Linkedin className="w-3 h-3" />
                  LinkedIn Profile
                </a>
              </div>
            </div>
          </div>
        </div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          className="flex-1 w-full max-w-2xl bg-black/80 backdrop-blur-2xl rounded-[2.5rem] border border-white/10 overflow-hidden shadow-[0_0_80px_rgba(34,211,238,0.1)] group relative"
        >
          <div className="bg-white/5 border-b border-white/10 px-8 py-4 flex items-center justify-between">
            <div className="flex gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500/50" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
              <div className="w-3 h-3 rounded-full bg-green-500/50" />
            </div>
            <div className="flex items-center gap-2 text-cyan-500/50 font-mono text-[10px]">
              <Cpu className="w-4 h-4" />
              MTW_SECURE_PROTO-v2.0
            </div>
          </div>

          <form onSubmit={handleSubmit} className="p-8 md:p-12 space-y-8 relative">
            <div className="grid md:grid-cols-2 gap-8">
               <div className="space-y-3">
                  <label className="text-gray-500 font-bold uppercase tracking-widest text-[10px] ml-4">Codename</label>
                  <input 
                    required
                    type="text" 
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    placeholder="ENTER VISITOR NAME"
                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white placeholder:text-gray-700 focus:outline-none focus:border-cyan-500/50 transition-colors uppercase font-mono text-sm leading-none"
                  />
               </div>
               <div className="space-y-3">
                  <label className="text-gray-500 font-bold uppercase tracking-widest text-[10px] ml-4">Transmission Frequency</label>
                  <input 
                    required
                    type="email" 
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    placeholder="EMAIL@PROTOCOL.COM"
                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white placeholder:text-gray-700 focus:outline-none focus:border-cyan-500/50 transition-colors uppercase font-mono text-sm leading-none"
                  />
               </div>
            </div>

            <div className="space-y-3">
              <label className="text-gray-500 font-bold uppercase tracking-widest text-[10px] ml-4">Detailed Intel</label>
              <textarea 
                required
                rows={4}
                value={formData.message}
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                placeholder="DESCRIBE MISSION OBJECTIVES..."
                className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-6 text-white placeholder:text-gray-700 focus:outline-none focus:border-cyan-500/50 transition-colors uppercase font-mono text-sm resize-none"
              />
            </div>

            <motion.button 
              disabled={isSubmitting}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full bg-cyan-500 hover:bg-cyan-400 text-black font-black py-5 rounded-2xl transition-all flex items-center justify-center gap-3 uppercase tracking-widest disabled:opacity-50 disabled:cursor-not-allowed group shadow-[0_0_40px_rgba(34,211,238,0.2)]"
            >
              {isSubmitting ? (
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-black rounded-full animate-bounce [animation-delay:-0.3s]" />
                  <div className="w-2 h-2 bg-black rounded-full animate-bounce [animation-delay:-0.15s]" />
                  <div className="w-2 h-2 bg-black rounded-full animate-bounce" />
                </div>
              ) : (
                <>
                  <Send className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  Initiate Transmission
                </>
              )}
            </motion.button>

            {/* Terminal Overlay for submission */}
            <AnimatePresence>
                {isSubmitting && (
                    <motion.div 
                        initial={{ opacity: 0, y: 10, backdropFilter: "blur(0px)" }}
                        animate={{ opacity: 1, y: 0, backdropFilter: "blur(20px)" }}
                        exit={{ opacity: 0, scale: 1.05 }}
                        className="absolute inset-0 bg-black/60 z-20 flex flex-col p-8 md:p-12 overflow-hidden"
                    >
                        <div className="font-mono text-cyan-400 text-sm space-y-4 h-full overflow-y-auto no-scrollbar pt-8" ref={scrollRef}>
                           {statusLog.map((log, i) => (
                               <motion.div 
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                key={i}
                                className="flex gap-4"
                               >
                                  <span className="text-gray-700">[{new Date().toLocaleTimeString('en-US', {hour12: false, hour: '2-digit', minute:'2-digit', second:'2-digit'})}]</span>
                                  <span className={log.includes('successfully') ? 'text-green-400' : ''}>{log}</span>
                               </motion.div>
                           ))}
                           {isSuccess && (
                                <motion.div 
                                    initial={{ scale: 0 }} 
                                    animate={{ scale: 1 }}
                                    className="flex flex-col items-center justify-center h-full gap-6 text-center"
                                >
                                    <CheckCircle className="w-24 h-24 text-green-500" />
                                    <div className="space-y-2">
                                        <h4 className="text-white text-2xl font-black">TRANSMISSION OK.</h4>
                                        <p className="text-green-500 font-bold uppercase tracking-widest text-[10px]">Awaiting feedback loop.</p>
                                    </div>
                                </motion.div>
                           )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
          </form>
        </motion.div>
      </div>

      <style jsx>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
      `}</style>
    </section>
  );
}
