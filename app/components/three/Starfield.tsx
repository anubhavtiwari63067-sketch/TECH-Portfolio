'use client';

import { useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as random from 'maath/random/dist/maath-random.esm';
import { useRef, useState } from 'react';
import * as THREE from 'three';

export function Starfield(props: any) {
  const ref = useRef<THREE.Points>(null);
  
  // 5000 points * 3 values per point (x, y, z) = 15000 elements
  const [sphere] = useState(() => {
    const positions = new Float32Array(5000 * 3);
    return random.inSphere(positions, { radius: 1.5 }) as Float32Array;
  });

  useFrame((_state, delta) => {
    if (ref.current) {
      ref.current.rotation.x -= delta / 10;
      ref.current.rotation.y -= delta / 15;
    }
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points 
        ref={ref} 
        positions={sphere} 
        stride={3} 
        frustumCulled={false} 
        {...props}
      >
        <PointMaterial
          transparent
          color="#22d3ee" // Changed to match the cyan theme
          size={0.003}
          sizeAttenuation={true}
          depthWrite={false}
        />
      </Points>
    </group>
  );
}
