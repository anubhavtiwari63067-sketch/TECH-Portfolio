'use client';

import { Suspense, useState, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { Starfield } from "./components/three/Starfield";
import { Grid } from "./components/three/Grid";
import { OrbitControls, Float, ScrollControls } from "@react-three/drei";
import LandingOverlay from "./components/ui/LandingOverlay";
import Navbar from "./components/ui/Navbar";
import Hero from "./components/ui/Hero";
import ProjectCarousel from "./components/ui/ProjectCarousel";
import About from "./components/ui/About";
import Certifications from "./components/ui/Certifications";
import Contact from "./components/ui/Contact";
import Footer from "./components/ui/Footer";
import MusicPlayer from "./components/ui/MusicPlayer";
import { AIBrain } from "./components/three/AIBrain";
import CyberBackground from "./components/ui/CyberBackground";
import CursorGlow from "./components/ui/CursorGlow";
import { motion, AnimatePresence } from "framer-motion";

export default function Home() {
  const [hasStarted, setHasStarted] = useState(false);
  const [showContent, setShowContent] = useState(false);

  const [mounted, setMounted] = useState(false);
  const [webglSupported, setWebglSupported] = useState(true);

  useEffect(() => {
    setMounted(true);
    
    // Check for WebGL support
    try {
      const canvas = document.createElement('canvas');
      const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
      if (!gl) {
        console.warn("WebGL not supported, falling back to 2D background");
        setWebglSupported(false);
      }
    } catch (e) {
      console.warn("WebGL detection error, falling back to 2D background", e);
      setWebglSupported(false);
    }
  }, []);

  useEffect(() => {
    if (hasStarted) {
      const timer = setTimeout(() => setShowContent(true), 1500); // Wait for Power On animation
      return () => clearTimeout(timer);
    }
  }, [hasStarted]);

  return (
    <main className="relative bg-black min-h-screen text-white font-sans selection:bg-cyan-500/30 selection:text-cyan-400">
      
      <CyberBackground />
      <CursorGlow />
      
      {/* 3D Background - Always there, but transitions its intensity */}
      <div className={`fixed inset-0 z-0 pointer-events-none transition-opacity duration-1000 ${hasStarted ? 'opacity-100' : 'opacity-40'}`}>
        {/* CSS Fallback background with "Orbit" simulation for when WebGL is unavailable */}
        {!webglSupported && (
          <div className="absolute inset-0 bg-[#000] overflow-hidden">
            {/* Rotating Starfield Fallback */}
            <div className="absolute inset-[-50%] opacity-20 bg-[radial-gradient(circle_at_center,_#22d3ee_0%,_transparent_2px)] bg-[length:50px_50px] animate-orbit-slow" />
            <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-from)_0%,_transparent_100%)] from-cyan-500/20" />
            
            {/* Rotating Grid Fallback */}
            <div className="absolute inset-[-50%] grid grid-cols-[repeat(40,minmax(0,1fr))] grid-rows-[repeat(40,minmax(0,1fr))] opacity-[0.05] animate-orbit-slow-reverse">
              {Array.from({ length: 1600 }).map((_, i) => (
                <div key={i} className="border-[0.5px] border-cyan-500" />
              ))}
            </div>

            {/* Logo Fallback for the Avatar if WebGL is disabled */}
            {hasStarted && showContent && (
              <div className="absolute top-1/2 right-[15%] -translate-y-1/2 w-48 h-48 rounded-full border border-cyan-500/30 flex items-center justify-center animate-pulse">
                <img src="/avatar.jpg" alt="Profile" className="w-40 h-40 rounded-full object-cover border-2 border-cyan-500 shadow-[0_0_20px_#22d3ee]" />
              </div>
            )}
          </div>
        )}

        {mounted && webglSupported && (
          <Canvas 
            camera={{ position: [0, 0, 7], fov: 45 }}
            gl={{ 
              antialias: true,
              powerPreference: 'high-performance',
              failIfMajorPerformanceCaveat: false 
            }}
          >
            <fog attach="fog" args={["#000", 2, 12]} />
            <ambientLight intensity={2} />
            <pointLight position={[5, 10, 5]} intensity={2} />
            <color attach="background" args={["#000"]} />
            <Suspense fallback={null}>
              <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
                <Starfield />
              </Float>
              {hasStarted && (
                <group scale={showContent ? 1 : 0}>
                  <Grid />
                  {/* Positioned for the Hero section with better visibility */}
                  <group position={[2.2, 0.5, 0]}>
                    <Suspense fallback={<mesh><sphereGeometry args={[1, 32, 32]} /><meshStandardMaterial color="#22d3ee" wireframe /></mesh>}>
                      <AIBrain />
                    </Suspense>
                  </group>
                </group>
              )}
              <OrbitControls 
                enableZoom={false} 
                enablePan={false} 
                autoRotate 
                autoRotateSpeed={0.5} 
              />
            </Suspense>
          </Canvas>
        )}
      </div>

      <AnimatePresence>
        {!hasStarted && (
          <LandingOverlay onStart={() => setHasStarted(true)} />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showContent && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="relative z-10"
          >
            <Navbar />
            <div className="relative overflow-hidden pt-16">
              <Hero />
              <ProjectCarousel />
              <About />
              <Certifications />
              <Contact />
              <Footer />
            </div>
            <MusicPlayer autoPlay />
          </motion.div>
        )}
      </AnimatePresence>

      <style jsx global>{`
        body {
          margin: 0;
          background: #000;
          color: #fff;
          overflow-x: hidden;
        }

        @keyframes gradient-x {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }

        @keyframes orbit-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        @keyframes orbit-slow-reverse {
          from { transform: rotate(0deg); }
          to { transform: rotate(-360deg); }
        }

        .animate-orbit-slow {
          animation: orbit-slow 60s linear infinite;
        }

        .animate-orbit-slow-reverse {
          animation: orbit-slow-reverse 120s linear infinite;
        }

        .animate-gradient-x {
          background-size: 200% 200%;
          animation: gradient-x 15s ease infinite;
        }

        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }

        ::selection {
          background: rgba(34, 211, 238, 0.3);
          color: #22d3ee;
        }
      `}</style>
    </main>
  );
}
