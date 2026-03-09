'use client';

import { Grid as ThreeGrid } from "@react-three/drei";

export function Grid() {
  return (
    <ThreeGrid
      position={[0, -0.01, 0]}
      args={[10.5, 10.5]}
      cellSize={0.5}
      cellThickness={0.5}
      cellColor="#22d3ee"
      sectionSize={3}
      sectionThickness={1}
      sectionColor="#22d3ee"
      fadeDistance={10}
      fadeStrength={1}
      followCamera={false}
      infiniteGrid={true}
    />
  );
}
