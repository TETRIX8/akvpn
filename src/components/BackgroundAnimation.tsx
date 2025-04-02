
import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';

interface BackgroundAnimationProps {
  className?: string;
  textToAnimate?: string;
  animateText?: boolean;
}

export const BackgroundAnimation: React.FC<BackgroundAnimationProps> = ({ 
  className = '', 
  textToAnimate = 'AKVPN',
  animateText = false 
}) => {
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
    const particlesCount = animateText ? 120 : 100;
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
    const sphereGeometry = new THREE.SphereGeometry(0.25, 8, 8);
    
    // Leaf colors
    const leafColors = [
      0x4ade80, // green-400
      0xa7f3d0, // spring-secondary
      0x34d399, // emerald-400
      0x10b981, // emerald-500
    ];
    
    // If animateText is true, create text particles
    let textParticles: THREE.Mesh[] = [];
    let initialPositions: {x: number, y: number, z: number}[] = [];
    let finalPositions: {x: number, y: number, z: number}[] = [];
    
    if (animateText) {
      // Create a canvas to draw text
      const canvas = document.createElement('canvas');
      canvas.width = 1024;
      canvas.height = 256;
      const ctx = canvas.getContext('2d')!;
      ctx.fillStyle = 'white';
      ctx.font = 'bold 150px Arial';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(textToAnimate, canvas.width / 2, canvas.height / 2);
      
      // Get pixel data
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const pixels = imageData.data;
      
      // Sample points from text
      const textPoints = [];
      const sampleStep = 8; // Sample every 8 pixels
      
      for (let y = 0; y < canvas.height; y += sampleStep) {
        for (let x = 0; x < canvas.width; x += sampleStep) {
          const i = (y * canvas.width + x) * 4;
          // If pixel is not transparent (alpha > 0)
          if (pixels[i + 3] > 128) {
            // Map canvas coordinates to world space
            const worldX = (x - canvas.width / 2) * 0.02;
            const worldY = -(y - canvas.height / 2) * 0.02; // Invert Y as canvas Y increases downward
            textPoints.push({ x: worldX, y: worldY, z: 0 });
          }
        }
      }
      
      // Create particles for each point
      for (let i = 0; i < Math.min(particlesCount, textPoints.length); i++) {
        const material = new THREE.MeshBasicMaterial({
          color: leafColors[Math.floor(Math.random() * leafColors.length)],
          transparent: true,
          opacity: 0.9,
        });
        
        const particle = new THREE.Mesh(sphereGeometry, material);
        
        // Random initial position
        const initialPos = {
          x: (Math.random() - 0.5) * 20,
          y: (Math.random() - 0.5) * 20,
          z: (Math.random() - 0.5) * 10
        };
        
        particle.position.set(initialPos.x, initialPos.y, initialPos.z);
        
        // Store initial and final positions
        initialPositions.push(initialPos);
        finalPositions.push(textPoints[i]);
        
        textParticles.push(particle);
        particles.add(particle);
      }
    } else {
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
      
      if (animateText) {
        // Animate text particles
        const progress = Math.min(1, time / 4); // Animation completes in ~8 seconds
        
        textParticles.forEach((particle, i) => {
          if (progress < 0.6) {
            // Chaotic movement phase
            particle.position.x += (Math.sin(time * 3 + i) * 0.1) * (1 - progress * 1.5);
            particle.position.y += (Math.cos(time * 2 + i) * 0.1) * (1 - progress * 1.5);
            particle.position.z += (Math.sin(time + i) * 0.05) * (1 - progress * 1.5);
          } else {
            // Formation phase - smoothly move to final positions
            const formationProgress = (progress - 0.6) / 0.4; // Normalize to 0-1 for formation phase
            
            particle.position.x = THREE.MathUtils.lerp(
              particle.position.x,
              finalPositions[i].x,
              0.05 + formationProgress * 0.1
            );
            
            particle.position.y = THREE.MathUtils.lerp(
              particle.position.y,
              finalPositions[i].y,
              0.05 + formationProgress * 0.1
            );
            
            particle.position.z = THREE.MathUtils.lerp(
              particle.position.z,
              finalPositions[i].z,
              0.05 + formationProgress * 0.1
            );
          }
          
          // Slowly rotate the particles
          particle.rotation.x += 0.01;
          particle.rotation.y += 0.01;
        });
      } else {
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
      }
      
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
  }, [animateText, textToAnimate]);
  
  return <div ref={containerRef} className={`pointer-events-none ${className}`}></div>;
};
