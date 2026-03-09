'use client';

import { motion, useScroll, useTransform, useSpring, AnimatePresence } from 'framer-motion';
import { Github, ExternalLink, Code2, Layers, Cpu, Database } from 'lucide-react';
import { useState, useRef } from 'react';

const projects = [
  {
    title: "Smart Task Manager",
    category: "Full Stack",
    desc: "A comprehensive task management system with full CRUD operations. Implements JWT authentication for secure login and data privacy, with a responsive UI for a seamless cross-device experience.",
    tech: ["React.js", "Node.js", "MongoDB", "JWT"],
    icon: Layers,
    color: "from-cyan-400 to-blue-500",
    github: "https://github.com/anubhavtiwari63067-sketch/Smart-task-manager.git",
    live: "https://anubhavtiwari63067-sketch.github.io/Smart-task-manager/"
  },
  {
    title: "AI Chat Interface",
    category: "AI Integration",
    desc: "A real-time AI chat interface powered by OpenAI API. Efficiently manages asynchronous API calls and complex application states to provide instant, intelligent responses to user queries.",
    tech: ["React", "OpenAI API", "Framer Motion"],
    icon: Cpu,
    color: "from-purple-400 to-pink-500"
  },
  {
    title: "E-Commerce Dashboard",
    category: "Frontend Dev",
    desc: "A dynamic frontend interface featuring advanced product filtering and shopping cart functionality. Built with a modular JavaScript structure for high performance and dynamic data rendering.",
    tech: ["HTML5", "CSS3", "JavaScript"],
    icon: Code2,
    color: "from-orange-400 to-red-500"
  }
];

const ProjectCard = ({ project, index, scrollXProgress }: { project: any; index: number; scrollXProgress: any }) => {
  const [isHovered, setIsHovered] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const rotateY = useTransform(scrollXProgress, [0, 0.5, 1], [15, 0, -15]);

  return (
    <motion.div
      ref={ref}
      style={{ perspective: 1000, rotateY }}
      initial={{ opacity: 0, scale: 0.9, rotateY: 20 }}
      whileInView={{ opacity: 1, scale: 1, rotateY: 0 }}
      viewport={{ once: true }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      transition={{ delay: index * 0.1, duration: 0.8 }}
      className="relative group p-[2px] rounded-3xl overflow-hidden cursor-pointer"
    >
      <div className={`absolute inset-0 bg-gradient-to-br transition-opacity duration-300 ${project.color} ${isHovered ? 'opacity-100' : 'opacity-20 translate-y-1'}`} />
      
      <div className="relative h-full bg-black/95 rounded-[22px] p-8 backdrop-blur-3xl">
        <div className="flex justify-between items-start mb-10">
          <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${project.color} flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:rotate-12 transition-transform duration-500`}>
            <project.icon className="w-8 h-8 text-black" />
          </div>
          <div className="flex gap-4">
            {project.github && (
              <motion.a 
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ y: -4, color: '#fff' }}
                className="p-3 bg-white/5 rounded-full text-gray-400 border border-white/10 hover:bg-white/10 transition-colors"
                title="View GitHub Repository"
              >
                <Github className="w-5 h-5" />
              </motion.a>
            )}
            {project.live && (
              <motion.a 
                href={project.live}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ y: -4, color: '#fff' }}
                className="p-3 bg-white/5 rounded-full text-gray-400 border border-white/10 hover:bg-white/10 transition-colors"
                title="Live Preview"
              >
                <ExternalLink className="w-5 h-5" />
              </motion.a>
            )}
            {!project.live && (
              <motion.button 
                whileHover={{ y: -4, color: '#fff' }}
                className="p-3 bg-white/5 rounded-full text-gray-400 border border-white/10 hover:bg-white/10 transition-colors opacity-50 cursor-not-allowed"
                title="Live Preview Coming Soon"
              >
                <ExternalLink className="w-5 h-5" />
              </motion.button>
            )}
          </div>
        </div>

        <span className="text-cyan-400 font-mono text-[10px] uppercase tracking-widest block mb-4">
          {project.category}
        </span>
        
        <h3 className="text-3xl font-black text-white mb-6 tracking-tight leading-none group-hover:text-cyan-200 transition-colors">
          {project.title}
        </h3>

        <p className="text-gray-400 text-sm mb-10 line-clamp-3 leading-relaxed font-medium">
          {project.desc}
        </p>

        <div className="flex flex-wrap gap-2 mt-auto pt-6 border-t border-white/5">
          {project.tech.map((t: string) => (
            <span key={t} className="px-3 py-1 bg-white/5 text-gray-500 rounded-full text-[10px] uppercase font-bold tracking-widest group-hover:text-cyan-400/80 transition-colors">
              {t}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default function ProjectCarousel() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollXProgress } = useScroll({
    container: containerRef,
  });

  const scaleX = useSpring(scrollXProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <section id="projects" className="py-32 px-6 relative overflow-hidden bg-black/50 overflow-x-hidden">
      <div className="max-w-7xl mx-auto mb-20">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          className="flex items-end justify-between gap-8 mb-4 border-l-4 border-cyan-500 pl-8 ml-4"
        >
          <div>
            <h2 className="text-5xl md:text-7xl font-black text-white tracking-tighter uppercase leading-none">
              Mission <br /><span className="text-cyan-500">Deployments.</span>
            </h2>
            <p className="mt-8 text-gray-400 max-w-xl font-medium">
              High-quality thumbnails with "Live Preview" and "GitHub Repo" buttons that glow on hover. Each project is a milestone in engineering excellence.
            </p>
          </div>
          <div className="hidden lg:block text-right pb-4">
            <span className="text-cyan-400 font-mono text-sm tracking-widest uppercase">Select Operation</span>
          </div>
        </motion.div>
      </div>

      <div ref={containerRef} className="flex gap-8 overflow-x-auto pb-20 no-scrollbar snap-x snap-mandatory px-[calc(50vw-((min(1280px,100vw)-48px)/2))] lg:px-44">
        {projects.map((project, idx) => (
          <div key={idx} className="min-w-[320px] md:min-w-[450px] snap-center">
            <ProjectCard project={project} index={idx} scrollXProgress={scrollXProgress} />
          </div>
        ))}
      </div>

      <div className="max-w-7xl mx-auto h-1 bg-white/10 rounded-full overflow-hidden relative">
        <motion.div 
          className="h-full bg-cyan-500 origin-left"
          style={{ scaleX }}
        />
      </div>

      <style jsx global>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </section>
  );
}
