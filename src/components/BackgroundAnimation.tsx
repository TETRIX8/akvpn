
import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';

interface BackgroundAnimationProps {
  className?: string;
}

export const BackgroundAnimation: React.FC<BackgroundAnimationProps> = ({ className = '' }) => {
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
    camera.position.z = 20;
    
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
    
    // Create particles
    const particlesCount = 100;
    const particles = new THREE.Group();
    
    // Create leaf geometry
    const createLeaf = () => {
      const shape = new THREE.Shape();
      shape.moveTo(0, 0);
      shape.bezierCurveTo(1, 1, -1, 2, 0, 3);
      shape.bezierCurveTo(1, 2, 1, 1, 0, 0);
      
      return new THREE.ShapeGeometry(shape);
    };
    
    const leafGeometry = createLeaf();
    
    // Leaf colors
    const leafColors = [
      0x4ade80, // green-400
      0xa7f3d0, // spring-secondary
      0x34d399, // emerald-400
      0x10b981, // emerald-500
    ];
    
    // Create leaf particles
    for (let i = 0; i < particlesCount; i++) {
      const material = new THREE.MeshBasicMaterial({
        color: leafColors[Math.floor(Math.random() * leafColors.length)],
        transparent: true,
        opacity: 0.7,
        side: THREE.DoubleSide
      });
      
      const leaf = new THREE.Mesh(leafGeometry, material);
      
      // Random scaling
      const scale = Math.random() * 0.5 + 0.3;
      leaf.scale.set(scale, scale, scale);
      
      // Random positions within a box
      leaf.position.x = (Math.random() - 0.5) * 40;
      leaf.position.y = (Math.random() - 0.5) * 30;
      leaf.position.z = (Math.random() - 0.5) * 20;
      
      // Random rotation
      leaf.rotation.x = Math.random() * Math.PI;
      leaf.rotation.y = Math.random() * Math.PI;
      leaf.rotation.z = Math.random() * Math.PI;
      
      // Store initial position for animation
      (leaf as any).rotationSpeed = {
        x: Math.random() * 0.01 - 0.005,
        y: Math.random() * 0.01 - 0.005,
        z: Math.random() * 0.01 - 0.005
      };
      
      (leaf as any).floatSpeed = Math.random() * 0.01 + 0.001;
      (leaf as any).floatDistance = Math.random() * 2 + 1;
      
      particles.add(leaf);
    }
    
    scene.add(particles);
    
    // Add a teal/green gradient background light
    const directionalLight = new THREE.DirectionalLight(0x4ade80, 1);
    directionalLight.position.set(1, 1, 1);
    scene.add(directionalLight);
    
    const ambientLight = new THREE.AmbientLight(0x2dd4bf, 0.5);
    scene.add(ambientLight);
    
    // Animation
    let time = 0;
    const animate = () => {
      requestAnimationFrame(animate);
      
      time += 0.005;
      
      // Animate individual leaves
      particles.children.forEach((leaf, i) => {
        const l = leaf as any;
        
        // Rotate leaves
        leaf.rotation.x += l.rotationSpeed.x;
        leaf.rotation.y += l.rotationSpeed.y;
        leaf.rotation.z += l.rotationSpeed.z;
        
        // Float leaves
        leaf.position.y += Math.sin(time + i * 0.1) * 0.01;
        
        // Move leaves slightly
        leaf.position.x += Math.sin(time * l.floatSpeed) * 0.01;
        
        // Reset leaves that go off screen
        if (leaf.position.y > 15) {
          leaf.position.y = -15;
          leaf.position.x = (Math.random() - 0.5) * 40;
        }
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
  
  return <div ref={containerRef} className={`pointer-events-none ${className}`}></div>;
};
