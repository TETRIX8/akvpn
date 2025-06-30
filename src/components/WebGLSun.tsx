
import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Mesh } from 'three';

function Sun() {
  const meshRef = useRef<Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.5;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.2;
    }
  });

  return (
    <mesh ref={meshRef} position={[0, 0, 0]}>
      <sphereGeometry args={[1, 32, 32]} />
      <meshBasicMaterial color="#FFD700" />
    </mesh>
  );
}

function Corona() {
  const meshRef = useRef<Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.z = state.clock.elapsedTime * 0.3;
      meshRef.current.scale.setScalar(1 + Math.sin(state.clock.elapsedTime * 2) * 0.1);
    }
  });

  return (
    <mesh ref={meshRef} position={[0, 0, 0]}>
      <sphereGeometry args={[1.2, 32, 32]} />
      <meshBasicMaterial color="#FFA500" transparent opacity={0.3} />
    </mesh>
  );
}

function SunRays() {
  const raysRef = useRef<Mesh>(null);

  useFrame((state) => {
    if (raysRef.current) {
      raysRef.current.rotation.z = state.clock.elapsedTime * 0.1;
    }
  });

  const rays = [];
  for (let i = 0; i < 12; i++) {
    const angle = (i / 12) * Math.PI * 2;
    const x = Math.cos(angle) * 2;
    const y = Math.sin(angle) * 2;
    
    rays.push(
      <mesh key={i} position={[x, y, 0]} rotation={[0, 0, angle]}>
        <circleGeometry args={[0.1, 8]} />
        <meshBasicMaterial color="#FFFF00" transparent opacity={0.6} />
      </mesh>
    );
  }

  return (
    <mesh ref={raysRef}>
      {rays}
    </mesh>
  );
}

export const WebGLSun = () => {
  return (
    <div className="w-full h-64 relative">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 50 }}
        style={{ background: 'transparent' }}
      >
        <ambientLight intensity={0.6} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <pointLight position={[-10, -10, -10]} intensity={0.5} />
        
        <Sun />
        <Corona />
        <SunRays />
      </Canvas>
    </div>
  );
};
