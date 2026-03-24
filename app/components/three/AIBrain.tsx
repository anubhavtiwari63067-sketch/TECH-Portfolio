'use client';

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Points, PointMaterial, Line } from '@react-three/drei';
import * as THREE from 'three';

export function AIBrain() {
  const groupRef = useRef<THREE.Group>(null);
  const particleCount = 2000;

  // Generate brain-like particle positions (approximate with an ellipsoid)
  const particles = useMemo(() => {
    const positions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      const u = Math.random();
      const v = Math.random();
      const theta = 2 * Math.PI * u;
      const phi = Math.acos(2 * v - 1);
      
      const r = 1.2 + Math.random() * 0.3;
      // Shaping it slightly more like a brain (two lobes)
      const x = r * Math.sin(phi) * Math.cos(theta);
      const y = r * Math.sin(phi) * Math.sin(theta) * 1.3; // Stretched vertically
      const z = r * Math.cos(phi) * (x > 0 ? 1.1 : 1.0); // Slight asymmetry
      
      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;
    }
    return positions;
  }, []);

  // Neural network lines
  const lines = useMemo(() => {
    const lineData = [];
    const lineCount = 80; // Increased
    for (let i = 0; i < lineCount; i++) {
        const p1Index = Math.floor(Math.random() * particleCount);
        const p2Index = Math.floor(Math.random() * particleCount);
        
        const p1 = new THREE.Vector3(
            particles[p1Index * 3],
            particles[p1Index * 3 + 1],
            particles[p1Index * 3 + 2]
        );
        const p2 = new THREE.Vector3(
            particles[p2Index * 3],
            particles[p2Index * 3 + 1],
            particles[p2Index * 3 + 2]
        );
        
        if (p1.distanceTo(p2) < 0.8) {
            lineData.push([p1, p2]);
        }
    }
    return lineData;
  }, [particles]);

  useFrame((state) => {
    const { clock } = state;
    const t = clock.getElapsedTime();
    if (groupRef.current) {
      groupRef.current.rotation.y = t * 0.2;
      groupRef.current.position.y = Math.sin(t * 0.5) * 0.1;
    }
  });

  return (
    <group ref={groupRef}>
      <Points positions={particles} stride={3} frustumCulled={false}>
        <PointMaterial
          transparent
          color="#22d3ee"
          size={0.015}
          sizeAttenuation={true}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </Points>
      
      {lines.map((points, i) => (
        <Line
          key={i}
          points={points}
          color="#22d3ee"
          lineWidth={0.5}
          transparent
          opacity={0.3}
          blending={THREE.AdditiveBlending}
        />
      ))}

      {/* Light Rays */}
      {[...Array(6)].map((_, i) => (
        <mesh key={i} rotation={[0, (i * Math.PI) / 3, 0]} position={[0, -1, 0]}>
          <cylinderGeometry args={[0.02, 0.5, 3, 32]} />
          <meshBasicMaterial
            color="#22d3ee"
            transparent
            opacity={0.05}
            blending={THREE.AdditiveBlending}
            depthWrite={false}
          />
        </mesh>
      ))}

      {/* Internal Glow */}
      <mesh>
        <sphereGeometry args={[1, 32, 32]} />
        <meshStandardMaterial 
            color="#22d3ee" 
            transparent 
            opacity={0.1} 
            emissive="#22d3ee"
            emissiveIntensity={2}
        />
      </mesh>
      {/* Base Platform Ring */}
      <mesh rotation-x={-Math.PI / 2} position={[0, -1.5, 0]}>
        <ringGeometry args={[0.8, 1.2, 32]} />
        <meshBasicMaterial color="#22d3ee" transparent opacity={0.2} blending={THREE.AdditiveBlending} side={THREE.DoubleSide} />
      </mesh>
      <mesh rotation-x={-Math.PI / 2} position={[0, -1.5, 0]}>
        <ringGeometry args={[1.3, 1.4, 32]} />
        <meshBasicMaterial color="#22d3ee" transparent opacity={0.1} blending={THREE.AdditiveBlending} side={THREE.DoubleSide} />
      </mesh>
    </group>
  );
}
