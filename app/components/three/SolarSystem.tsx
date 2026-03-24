'use client';

import { useRef, useMemo } from 'react';
import { useFrame, useLoader } from '@react-three/fiber';
import { Float, MeshDistortMaterial, Text, Image as DreiImage } from '@react-three/drei';
import * as THREE from 'three';

interface OrbitProps {
  radius: number;
  speed: number;
  color: string;
  size: number;
  hasImage?: boolean;
  imagePath?: string;
  label?: string;
}

function Planet({ radius, speed, color, size, hasImage, imagePath, label }: OrbitProps) {
  const meshRef = useRef<THREE.Group>(null);
  const orbitRef = useRef<THREE.LineLoop>(null);

  // Generate orbit ring
  const orbitPoints = useMemo(() => {
    const points = [];
    for (let i = 0; i <= 64; i++) {
      const angle = (i / 64) * Math.PI * 2;
      points.push(new THREE.Vector3(Math.cos(angle) * radius, 0, Math.sin(angle) * radius));
    }
    return points;
  }, [radius]);

  const orbitGeometry = useMemo(() => new THREE.BufferGeometry().setFromPoints(orbitPoints), [orbitPoints]);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    if (meshRef.current) {
      meshRef.current.position.x = Math.cos(time * speed) * radius;
      meshRef.current.position.z = Math.sin(time * speed) * radius;
      meshRef.current.rotation.y += 0.01;
    }
  });

  return (
    <group>
      {/* Orbit Ring */}
      <lineLoop ref={orbitRef} geometry={orbitGeometry}>
        <lineBasicMaterial attach="material" color={color} opacity={0.2} transparent />
      </lineLoop>

      {/* Planet / Image */}
      <group ref={meshRef}>
        {hasImage && imagePath ? (
          <group>
            {/* The circular image */}
            <mesh>
              <circleGeometry args={[size * 1.5, 32]} />
              <MeshDistortMaterial
                color={color}
                speed={2}
                distort={0.3}
                radius={1}
                transparent
                opacity={0.3}
              />
            </mesh>
            <DreiImage
              url={imagePath}
              scale={[size * 2, size * 2]}
              transparent
              opacity={0.9}
            >
              {/* This makes it a circle */}
              <circleGeometry args={[1, 32]} />
            </DreiImage>

            {/* Glowing Ring around the image */}
            <mesh rotation={[Math.PI / 2, 0, 0]}>
              <torusGeometry args={[size * 1.1, 0.02, 16, 100]} />
              <meshStandardMaterial color={color} emissive={color} emissiveIntensity={5} />
            </mesh>
          </group>
        ) : (
          <mesh>
            <sphereGeometry args={[size, 32, 32]} />
            <meshStandardMaterial 
              color={color} 
              emissive={color} 
              emissiveIntensity={2}
              roughness={0.1}
              metalness={0.8}
            />
          </mesh>
        )}

        {/* Optional Label */}
        {label && (
          <Text
            position={[0, size + 0.3, 0]}
            fontSize={0.2}
            color="white"
            anchorX="center"
            anchorY="middle"
            font="https://fonts.gstatic.com/s/orbitron/v25/yYqxR928V8_S_TSh670q.woff"
          >
            {label}
          </Text>
        )}
      </group>
    </group>
  );
}

export function SolarSystem() {
  const sunRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    if (sunRef.current) {
      sunRef.current.rotation.y = time * 0.2;
    }
  });

  return (
    <group position={[0, -1, 0]} rotation={[Math.PI / 8, 0, 0]}>
      {/* Central Sun (AI Core / User Focus) */}
      <Float speed={1.5} rotationIntensity={1} floatIntensity={2}>
        <mesh ref={sunRef}>
          <sphereGeometry args={[1.2, 32, 32]} />
          <MeshDistortMaterial
             color="#22d3ee"
             emissive="#22d3ee"
             emissiveIntensity={2}
             speed={3}
             distort={0.4}
             radius={1}
          />
        </mesh>
        
        {/* Sun Glow */}
        <mesh>
          <sphereGeometry args={[1.5, 32, 32]} />
          <meshBasicMaterial color="#22d3ee" transparent opacity={0.15} />
        </mesh>
      </Float>

      {/* Orbits */}
      <Planet 
        radius={3} 
        speed={0.5} 
        color="#c084fc" // Purple
        size={0.15} 
        label="React"
      />
      <Planet 
        radius={4.5} 
        speed={0.3} 
        color="#22d3ee" // Cyan
        size={0.2} 
        label="Next.js"
      />
      <Planet 
        radius={6.5} 
        speed={0.2} 
        color="#f472b6" // Pink
        size={0.4} 
        hasImage 
        imagePath="/avatar.jpg"
        label="Anubhav"
      />
      <Planet 
        radius={8.5} 
        speed={0.15} 
        color="#818cf8" // Indigo
        size={0.18} 
        label="Three.js"
      />
      <Planet 
        radius={10.5} 
        speed={0.1} 
        color="#34d399" // Emerald
        size={0.12} 
        label="Node.js"
      />

      {/* Atmospheric Star Background Integration */}
      <Stars />
    </group>
  );
}

function Stars() {
  const points = useMemo(() => {
    const p = new Float32Array(2000 * 3);
    for (let i = 0; i < 2000; i++) {
      const r = 20 + Math.random() * 30;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.random() * Math.PI;
      p[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      p[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      p[i * 3 + 2] = r * Math.cos(phi);
    }
    return p;
  }, []);

  return (
    <points>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={points.length / 3}
          array={points}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial color="#22d3ee" size={0.05} transparent opacity={0.5} sizeAttenuation />
    </points>
  );
}
