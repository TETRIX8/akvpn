
import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';

interface SpringAnimationProps {
  className?: string;
}

export const SpringAnimation: React.FC<SpringAnimationProps> = ({ className = '' }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (!containerRef.current) return;
    
    // Create scene
    const scene = new THREE.Scene();
    
    // Create camera
    const camera = new THREE.PerspectiveCamera(
      75, 
      containerRef.current.clientWidth / containerRef.current.clientHeight, 
      0.1, 
      1000
    );
    camera.position.z = 5;
    
    // Create renderer
    const renderer = new THREE.WebGLRenderer({ 
      alpha: true, 
      antialias: true 
    });
    renderer.setSize(
      containerRef.current.clientWidth, 
      containerRef.current.clientHeight
    );
    renderer.setClearColor(0x000000, 0);
    containerRef.current.appendChild(renderer.domElement);
    
    // Spring theme colors
    const springColors = [
      0x4ade80, // green-400
      0xa7f3d0, // spring-secondary
      0x2dd4bf, // spring-accent
      0xecfdf5, // spring-light
    ];
    
    // Create particles
    const particlesCount = 200;
    const particles = new THREE.Group();
    scene.add(particles);
    
    // Create geometry for particles
    const geometry = new THREE.SphereGeometry(0.05, 8, 8);
    
    // Create particles with spring colors
    for (let i = 0; i < particlesCount; i++) {
      const material = new THREE.MeshBasicMaterial({
        color: springColors[Math.floor(Math.random() * springColors.length)],
        transparent: true,
        opacity: Math.random() * 0.5 + 0.3,
      });
      
      const particle = new THREE.Mesh(geometry, material);
      
      // Random positions within a sphere
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);
      const radius = Math.random() * 4 + 1;
      
      particle.position.x = radius * Math.sin(phi) * Math.cos(theta);
      particle.position.y = radius * Math.sin(phi) * Math.sin(theta);
      particle.position.z = radius * Math.cos(phi);
      
      // Store initial position for animation
      (particle as any).initialPosition = { ...particle.position };
      (particle as any).speed = Math.random() * 0.01 + 0.005;
      (particle as any).amplitude = Math.random() * 0.5 + 0.3;
      
      particles.add(particle);
    }
    
    // Add some flower-like objects
    const createFlower = (x: number, y: number, z: number, color: number) => {
      const flowerGroup = new THREE.Group();
      
      // Center
      const centerGeometry = new THREE.SphereGeometry(0.15, 16, 16);
      const centerMaterial = new THREE.MeshBasicMaterial({ color: 0xffd700 });
      const center = new THREE.Mesh(centerGeometry, centerMaterial);
      flowerGroup.add(center);
      
      // Petals
      const petalCount = 5;
      const petalGeometry = new THREE.ConeGeometry(0.1, 0.4, 8);
      const petalMaterial = new THREE.MeshBasicMaterial({ 
        color: color,
        transparent: true,
        opacity: 0.7
      });
      
      for (let i = 0; i < petalCount; i++) {
        const petal = new THREE.Mesh(petalGeometry, petalMaterial);
        const angle = (i / petalCount) * Math.PI * 2;
        petal.position.x = Math.cos(angle) * 0.2;
        petal.position.y = Math.sin(angle) * 0.2;
        petal.rotation.z = angle + Math.PI / 2;
        petal.rotation.x = Math.PI / 3;
        flowerGroup.add(petal);
      }
      
      flowerGroup.position.set(x, y, z);
      (flowerGroup as any).hoverSpeed = Math.random() * 0.01 + 0.005;
      (flowerGroup as any).initialY = y;
      
      scene.add(flowerGroup);
      return flowerGroup;
    };
    
    // Add some flower objects
    const flowers = [];
    for (let i = 0; i < 8; i++) {
      const x = (Math.random() - 0.5) * 8;
      const y = (Math.random() - 0.5) * 8;
      const z = Math.random() * -3 - 1;
      const color = springColors[Math.floor(Math.random() * springColors.length)];
      flowers.push(createFlower(x, y, z, color));
    }
    
    // Animation
    let time = 0;
    const animate = () => {
      requestAnimationFrame(animate);
      
      time += 0.01;
      
      // Rotate particle group slowly
      particles.rotation.y += 0.001;
      particles.rotation.x += 0.0005;
      
      // Animate individual particles
      particles.children.forEach((particle: THREE.Mesh, i) => {
        const p = particle as any;
        const initialPos = p.initialPosition;
        
        // Create a floating motion
        particle.position.y = initialPos.y + Math.sin(time + i * 0.1) * p.amplitude;
        particle.position.x = initialPos.x + Math.cos(time + i * 0.1) * p.amplitude * 0.5;
      });
      
      // Animate flowers
      flowers.forEach((flower) => {
        const f = flower as any;
        flower.position.y = f.initialY + Math.sin(time * f.hoverSpeed * 5) * 0.2;
        flower.rotation.y += 0.01;
      });
      
      renderer.render(scene, camera);
    };
    
    animate();
    
    // Handle window resize
    const handleResize = () => {
      if (!containerRef.current) return;
      
      camera.aspect = containerRef.current.clientWidth / containerRef.current.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
    };
    
    window.addEventListener('resize', handleResize);
    
    // Clean up
    return () => {
      if (containerRef.current) {
        containerRef.current.removeChild(renderer.domElement);
      }
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  
  return <div ref={containerRef} className={`${className}`}></div>;
};
