
import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

const Sun = () => {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.y += 0.003;
    meshRef.current.rotation.x += 0.001;
  });

  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[3, 32, 32]} />
      <meshStandardMaterial 
        color="#ff9500"
        emissive="#ff4d00"
        emissiveIntensity={0.5}
        roughness={0.7}
        metalness={0.3}
      />
    </mesh>
  );
};

const SunRays = () => {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.z += 0.001;
  });

  return (
    <mesh ref={meshRef} scale={1.2}>
      <torusGeometry args={[4, 0.2, 16, 50]} />
      <meshStandardMaterial 
        color="#ff5500"
        emissive="#ff3300"
        emissiveIntensity={1}
        transparent={true}
        opacity={0.6}
      />
    </mesh>
  );
};

const SunGlow = () => {
  return (
    <mesh>
      <sphereGeometry args={[3.5, 32, 32]} />
      <meshStandardMaterial
        color="#ff9500"
        emissive="#ff7300"
        emissiveIntensity={0.8}
        transparent={true}
        opacity={0.2}
      />
    </mesh>
  );
};

export const WebGLSun = ({ position = "top-right" }: { position?: "top-right" | "bottom-right" | "top-left" | "bottom-left" }) => {
  const getPositionStyles = () => {
    switch (position) {
      case "top-right":
        return "top-0 right-0";
      case "bottom-right":
        return "bottom-0 right-0";
      case "top-left":
        return "top-0 left-0";
      case "bottom-left":
        return "bottom-0 left-0";
      default:
        return "top-0 right-0";
    }
  };

  return (
    <div className={`absolute ${getPositionStyles()} w-60 h-60 md:w-80 md:h-80 overflow-hidden pointer-events-none z-10 opacity-75`}>
      <Canvas camera={{ position: [0, 0, 10], fov: 40 }}>
        <ambientLight intensity={0.3} />
        <pointLight position={[10, 10, 10]} intensity={2} />
        <pointLight position={[-10, -10, 10]} intensity={1} />
        <Sun />
        <SunGlow />
        <SunRays />
      </Canvas>
    </div>
  );
};
