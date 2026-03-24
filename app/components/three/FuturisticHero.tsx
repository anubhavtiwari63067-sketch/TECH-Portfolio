'use client';

import { Suspense, useRef, useMemo } from 'react';
import { useFrame, useLoader } from '@react-three/fiber';
import { Points, PointMaterial, Line, Float, MeshDistortMaterial, Text, Image as DreiImage, PerspectiveCamera, OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

// --- DATA STREAMS ---
function DataStreams({ count = 20 }) {
  const points = useMemo(() => {
    const list = [];
    for (let i = 0; i < count; i++) {
      const z = (Math.random() - 0.5) * 10;
      const x = (Math.random() - 0.5) * 15;
      const y = (Math.random() - 0.5) * 15;
      list.push({
        start: new THREE.Vector3(x, y, z),
        speed: 0.05 + Math.random() * 0.1,
        length: 1 + Math.random() * 2
      });
    }
    return list;
  }, [count]);

  return (
    <group>
      {points.map((p, i) => (
        <DataStream key={i} {...p} />
      ))}
    </group>
  );
}

function DataStream({ start, speed, length }: { start: THREE.Vector3, speed: number, length: number }) {
  const meshRef = useRef<THREE.Group>(null);
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.position.z += speed;
      if (meshRef.current.position.z > 10) meshRef.current.position.z = -10;
    }
  });

  return (
    <group ref={meshRef} position={[start.x, start.y, start.z]}>
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.01, 0.01, length, 8]} />
        <meshBasicMaterial color="#22d3ee" transparent opacity={0.3} blending={THREE.AdditiveBlending} />
      </mesh>
      {/* Glow head */}
      <mesh position={[0, -length / 2, 0]}>
        <sphereGeometry args={[0.03, 16, 16]} />
        <meshBasicMaterial color="#22d3ee" transparent opacity={1} blending={THREE.AdditiveBlending} />
      </mesh>
    </group>
  );
}

// --- FLOATING ICONS ---
function FloatingIcon({ url, position, label, color }: { url?: string, position: [number, number, number], label: string, color: string }) {
  const ref = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (ref.current) {
      ref.current.position.y += Math.sin(t + position[0]) * 0.002;
      ref.current.rotation.y = Math.sin(t) * 0.1;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5} position={position}>
      <group ref={ref}>
        {/* Glowing Background Disc */}
        <mesh position={[0, 0, -0.1]}>
          <circleGeometry args={[0.4, 32]} />
          <meshBasicMaterial color={color} transparent opacity={0.1} blending={THREE.AdditiveBlending} />
        </mesh>
        
        {/* Glow Ring */}
        <mesh>
          <ringGeometry args={[0.4, 0.42, 32]} />
          <meshBasicMaterial color={color} transparent opacity={0.5} blending={THREE.AdditiveBlending} />
        </mesh>

        <Text
          position={[0, -0.6, 0]}
          fontSize={0.2}
          color="white"
          anchorX="center"
          anchorY="middle"
          font="https://fonts.gstatic.com/s/orbitron/v25/yYqxR928V8_S_TSh670q.woff"
        >
          {label}
        </Text>
        
        {/* Generic mesh icon since we don't have SVG urls handy */}
        <mesh>
             <boxGeometry args={[0.2, 0.2, 0.2]} />
             <meshStandardMaterial color={color} emissive={color} emissiveIntensity={2} />
        </mesh>
      </group>
    </Float>
  );
}

// --- CIRCUIT BACKGROUND ---
function CircuitPlane({ textureUrl }: { textureUrl: string }) {
    const texture = useLoader(THREE.TextureLoader, textureUrl);
    texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
    
    return (
        <mesh position={[0, 0, -5]} scale={[40, 40, 1]}>
            <planeGeometry />
            <meshBasicMaterial map={texture} transparent opacity={0.4} color="#0a192f" />
        </mesh>
    );
}

// --- THE HOLOGRAPHIC BRAIN ---
function FuturisticBrain() {
  const groupRef = useRef<THREE.Group>(null);
  const particleCount = 1500;

  const particles = useMemo(() => {
    const pos = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.acos(2 * Math.random() - 1);
        const r = 1.5 + Math.random() * 0.3;
        
        const x = r * Math.sin(phi) * Math.cos(theta);
        const y = r * Math.sin(phi) * Math.sin(theta) * 1.4;
        const z = r * Math.cos(phi) * (x > 0 ? 1.1 : 1.0);
        
        pos[i * 3] = x;
        pos[i * 3 + 1] = y;
        pos[i * 3 + 2] = z;
    }
    return pos;
  }, []);

  const lines = useMemo(() => {
    const list = [];
    for (let i = 0; i < 60; i++) {
        const p1I = Math.floor(Math.random() * particleCount);
        const p2I = Math.floor(Math.random() * particleCount);
        const p1 = new THREE.Vector3(particles[p1I*3], particles[p1I*3+1], particles[p1I*3+2]);
        const p2 = new THREE.Vector3(particles[p2I*3], particles[p2I*3+1], particles[p2I*3+2]);
        if (p1.distanceTo(p2) < 1) list.push([p1, p2]);
    }
    return list;
  }, [particles]);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (groupRef.current) {
      groupRef.current.rotation.y = t * 0.1;
      const scale = 1 + Math.sin(t * 2) * 0.05;
      groupRef.current.scale.set(scale, scale, scale);
    }
  });

  return (
    <group ref={groupRef}>
      <Points positions={particles} stride={3}>
        <PointMaterial 
            transparent 
            color="#22d3ee" 
            size={0.02} 
            sizeAttenuation 
            depthWrite={false} 
            blending={THREE.AdditiveBlending} 
        />
      </Points>
      {lines.map((p, i) => (
        <Line 
            key={i} 
            points={p} 
            color="#22d3ee" 
            lineWidth={0.5} 
            transparent 
            opacity={0.2} 
            blending={THREE.AdditiveBlending} 
        />
      ))}
      <mesh>
        <sphereGeometry args={[1.3, 32, 32]} />
        <meshBasicMaterial color="#22d3ee" transparent opacity={0.05} blending={THREE.AdditiveBlending} />
      </mesh>
      
      {/* Core light */}
      <mesh>
        <sphereGeometry args={[0.5, 32, 32]} />
        <meshBasicMaterial color="#22d3ee" transparent opacity={0.4} blending={THREE.AdditiveBlending} />
      </mesh>
    </group>
  );
}

export function FuturisticHero() {
  return (
    <group>
      {/* Background Layer */}
      <Suspense fallback={null}>
        <CircuitPlane textureUrl="/cyber_circuit_pattern.png" />
      </Suspense>

      {/* Midground Layer - Neural Network */}
      <group position={[0, 0, 0]}>
        <FuturisticBrain />
        <DataStreams count={30} />
      </group>

      {/* Foreground Layer - Icons */}
      <FloatingIcon position={[-4, 2, 2]} label="JavaScript" color="#f7df1e" />
      <FloatingIcon position={[4, 2, 0]} label="React" color="#61dafb" />
      <FloatingIcon position={[-3, -3, 3]} label="Node.js" color="#339933" />
      <FloatingIcon position={[3, -3, 1]} label="AI" color="#ff00ff" />
      
      {/* User Avatar - Floating */}
      <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.5} position={[0, -2.5, 5]}>
         <group>
            <DreiImage
                url="/avatar.jpg"
                scale={[1.5, 1.5]}
                transparent
                opacity={0.8}
            >
                <circleGeometry args={[1, 32]} />
            </DreiImage>
            <mesh rotation={[Math.PI / 2, 0, 0]}>
                <torusGeometry args={[0.8, 0.02, 16, 100]} />
                <meshBasicMaterial color="#22d3ee" />
            </mesh>
         </group>
      </Float>

      {/* Atmosphere */}
      <Stars count={3000} />
      
      {/* Lighting focus */}
      <spotLight position={[0, 10, 10]} angle={0.5} penumbra={1} intensity={2} color="#22d3ee" />
      <pointLight position={[0, -5, -5]} intensity={1} color="#0000ff" />
    </group>
  );
}

function Stars({ count = 1000 }) {
  const points = useMemo(() => {
    const list = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      list[i * 3] = (Math.random() - 0.5) * 50;
      list[i * 3 + 1] = (Math.random() - 0.5) * 50;
      list[i * 3 + 2] = (Math.random() - 0.5) * 50;
    }
    return list;
  }, [count]);

  return (
    <Points positions={points}>
      <PointMaterial color="white" size={0.03} sizeAttenuation transparent opacity={0.2} />
    </Points>
  );
}
