'use client';

import { useRef, useState, useEffect } from 'react';
import { useFrame, useLoader } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import * as THREE from 'three';

export function Avatar3D({ isVisible }: { isVisible: boolean }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const groupRef = useRef<THREE.Group>(null);
  const ringRef1 = useRef<THREE.Mesh>(null);
  const ringRef2 = useRef<THREE.Mesh>(null);
  const ringRef3 = useRef<THREE.Mesh>(null);
  const [isStable, setIsStable] = useState(true);
  const [scrollProgress, setScrollProgress] = useState(0);

  // 5 second stability timer
  useEffect(() => {
    const timer = setTimeout(() => setIsStable(false), 5000);
    return () => clearTimeout(timer);
  }, []);

  // Track page scroll
  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY;
      const total = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(scrolled / (total || 1));
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Load the headshot texture
  const texture = useLoader(THREE.TextureLoader, '/avatar.jpg');

  useFrame((state, delta) => {
    if (!meshRef.current || !groupRef.current) return;

    // Smooth Entrance Scale (Direct property modification for performance)
    const targetScale = isVisible ? 1 : 0;
    groupRef.current.scale.setScalar(THREE.MathUtils.lerp(groupRef.current.scale.x, targetScale, 0.08));

    // Calculate Target Position
    let targetX = 0;
    let targetY = 0;
    let targetZ = 0;

    if (!isStable) {
      const scrollOffset = scrollProgress;
      const time = state.clock.getElapsedTime();
      
      // Complex floating path
      targetX = Math.sin(time * 0.4 + scrollOffset * 5) * 8 * scrollOffset - 4 * scrollOffset; 
      targetY = Math.cos(time * 0.3 + scrollOffset * 3) * 6 * scrollOffset - 2 * scrollOffset;
      targetZ = -Math.sin(time * 0.2 + scrollOffset * 2) * 8 * scrollOffset;
    }

    // Smoothly transition position
    groupRef.current.position.x = THREE.MathUtils.lerp(groupRef.current.position.x, targetX, 0.02);
    groupRef.current.position.y = THREE.MathUtils.lerp(groupRef.current.position.y, targetY, 0.02);
    groupRef.current.position.z = THREE.MathUtils.lerp(groupRef.current.position.z, targetZ, 0.02);

    // Mouse Parallax Effect
    const mouseX = state.mouse.x * 0.4;
    const mouseY = state.mouse.y * 0.4;
    
    meshRef.current.rotation.y = THREE.MathUtils.lerp(meshRef.current.rotation.y, mouseX, 0.1);
    meshRef.current.rotation.x = THREE.MathUtils.lerp(meshRef.current.rotation.x, -mouseY, 0.1);

    // Rotating HUD Ring Motion
    if (ringRef1.current) ringRef1.current.rotation.z += delta * 0.5;
    if (ringRef2.current) ringRef2.current.rotation.z -= delta * 0.8;
    if (ringRef3.current) ringRef3.current.rotation.z += delta * 1.2;
  });

  return (
    <group ref={groupRef} position={[0, 0, 0]} scale={0.01}>
      <Float speed={2.5} rotationIntensity={0.3} floatIntensity={0.6}>
        {/* Main Avatar Headshot */}
        <mesh ref={meshRef}>
          <circleGeometry args={[1.5, 64]} />
          <meshStandardMaterial 
            map={texture} 
            transparent 
            side={THREE.DoubleSide}
            roughness={0.3}
            metalness={0.2}
            emissive="#ffffff"
            emissiveIntensity={0.2}
          />
        </mesh>

        {/* Scanline Overlay */}
        <mesh position={[0, 0, 0.01]}>
          <circleGeometry args={[1.5, 64]} />
          <meshBasicMaterial 
            color="#22d3ee"
            transparent
            opacity={0.05}
            wireframe
          />
        </mesh>

        {/* HUD Ring 1 - Outer Pulsating Biometric */}
        <mesh ref={ringRef1}>
          <ringGeometry args={[1.6, 1.65, 64, 1]} />
          <meshStandardMaterial 
            color="#22d3ee" 
            emissive="#22d3ee"
            emissiveIntensity={2}
            transparent 
            opacity={0.5} 
            side={THREE.DoubleSide}
          />
        </mesh>

        {/* HUD Ring 2 - Inner Scanning Dashes (Top) */}
        <mesh ref={ringRef2} rotation={[0, 0, Math.PI / 3]}>
          <ringGeometry args={[1.7, 1.72, 8, 1, 0, Math.PI * 0.4]} />
          <meshStandardMaterial 
            color="#22d3ee" 
            emissive="#22d3ee"
            emissiveIntensity={1}
            transparent 
            opacity={0.3} 
            side={THREE.DoubleSide}
          />
        </mesh>

        {/* HUD Ring 3 - Inner Scanning Dashes (Bottom) */}
        <mesh ref={ringRef3} rotation={[0, 0, -Math.PI / 3]}>
          <ringGeometry args={[1.7, 1.72, 8, 1, 0, Math.PI * 0.4]} />
          <meshStandardMaterial 
            color="#22d3ee" 
            emissive="#22d3ee" 
            emissiveIntensity={2} 
            transparent 
            opacity={0.3} 
            side={THREE.DoubleSide}
          />
        </mesh>

        {/* HUD Ring 4 - Secondary Frame */}
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[1.8, 0.01, 16, 100]} />
          <meshBasicMaterial 
            color="#22d3ee" 
            transparent 
            opacity={0.1} 
          />
        </mesh>

        {/* Ambient Back Glow */}
        <mesh position={[0, 0, -0.2]}>
          <circleGeometry args={[2, 64]} />
          <meshBasicMaterial 
            color="#22d3ee" 
            transparent 
            opacity={0.1} 
            side={THREE.DoubleSide} 
          />
        </mesh>
      </Float>
    </group>
  );
}
