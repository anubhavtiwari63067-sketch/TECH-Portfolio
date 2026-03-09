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
import { Avatar3D } from "./components/three/Avatar3D";
import { motion, AnimatePresence } from "framer-motion";

export default function Home() {
  const [hasStarted, setHasStarted] = useState(false);
  const [showContent, setShowContent] = useState(false);

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (hasStarted) {
      const timer = setTimeout(() => setShowContent(true), 1500);
      return () => clearTimeout(timer);
    }
  }, [hasStarted]);

  return (
    <main className="relative bg-black min-h-screen text-white font-sans selection:bg-cyan-500/30 selection:text-cyan-400">
      
      {/* 3D Background - Always there, but transitions its intensity */}
      <div className={`fixed inset-0 z-0 pointer-events-none transition-opacity duration-1000 ${hasStarted ? 'opacity-100' : 'opacity-40'}`}>
        {mounted && (
          <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
            <fog attach="fog" args={["#000", 2, 12]} />
            <ambientLight intensity={1.5} />
            <pointLight position={[5, 5, 5]} intensity={1.5} />
            <color attach="background" args={["#000"]} />
            <Suspense fallback={null}>
              <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
                <Starfield />
              </Float>
              {hasStarted && (
                <group scale={showContent ? 1 : 0}>
                  <Grid />
                  {/* Positioned for the Hero section top-right */}
                  <group position={[3, 1, 0]}>
                    <Avatar3D isVisible={showContent} />
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
