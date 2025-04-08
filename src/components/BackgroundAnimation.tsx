
import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';

interface BackgroundAnimationProps {
  className?: string;
  textToAnimate?: string;
  animateText?: boolean;
  animationSpeed?: number; // New prop for controlling animation speed
}

export const BackgroundAnimation: React.FC<BackgroundAnimationProps> = ({ 
  className = '', 
  textToAnimate = 'AKVPN',
  animateText = false,
  animationSpeed = 1.0 // Default speed multiplier
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
    
    // More serious and less distracting colors
    const particleColors = [
      0xFFFFFF, // White
      0xCCCCCC, // Light Gray
      0xAAAAAA, // Medium Gray
      0xDDDDDD, // Silver
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
          color: particleColors[Math.floor(Math.random() * particleColors.length)],
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
      // Create particles
      for (let i = 0; i < particlesCount; i++) {
        const material = new THREE.MeshBasicMaterial({
          color: particleColors[Math.floor(Math.random() * particleColors.length)],
          transparent: true,
          opacity: 0.7,
          side: THREE.DoubleSide
        });
        
        const particle = new THREE.Mesh(sphereGeometry, material);
        
        // Random scaling
        const scale = Math.random() * 0.5 + 0.3;
        particle.scale.set(scale, scale, scale);
        
        // Random positions within a box
        particle.position.x = (Math.random() - 0.5) * 40;
        particle.position.y = (Math.random() - 0.5) * 30;
        particle.position.z = (Math.random() - 0.5) * 20;
        
        // Random rotation
        particle.rotation.x = Math.random() * Math.PI;
        particle.rotation.y = Math.random() * Math.PI;
        particle.rotation.z = Math.random() * Math.PI;
        
        // Store initial position for animation
        (particle as any).rotationSpeed = {
          x: Math.random() * 0.01 - 0.005,
          y: Math.random() * 0.01 - 0.005,
          z: Math.random() * 0.01 - 0.005
        };
        
        (particle as any).floatSpeed = Math.random() * 0.01 + 0.001;
        (particle as any).floatDistance = Math.random() * 2 + 1;
        
        particles.add(particle);
      }
    }
    
    scene.add(particles);
    
    // More subtle lighting
    const directionalLight = new THREE.DirectionalLight(0xFFFFFF, 0.8);
    directionalLight.position.set(1, 1, 1);
    scene.add(directionalLight);
    
    const ambientLight = new THREE.AmbientLight(0xCCCCCC, 0.3);
    scene.add(ambientLight);
    
    // Animation
    let time = 0;
    const animate = () => {
      requestAnimationFrame(animate);
      
      // Apply animation speed multiplier
      time += 0.005 * animationSpeed;
      
      if (animateText) {
        // Faster animation formation - adjusted parameters
        const progress = Math.min(1, time / (3 / animationSpeed)); // Animation completes faster based on speed
        
        textParticles.forEach((particle, i) => {
          if (progress < 0.4) { // Shorter chaotic phase (was 0.6)
            // More aggressive chaotic movement for a threatening look
            particle.position.x += (Math.sin(time * 5 + i) * 0.15) * (1 - progress * 2.5);
            particle.position.y += (Math.cos(time * 4 + i) * 0.15) * (1 - progress * 2.5);
            particle.position.z += (Math.sin(time * 3 + i) * 0.1) * (1 - progress * 2.5);
          } else {
            // Formation phase - more rapid convergence to final positions
            const formationProgress = (progress - 0.4) / 0.6;
            
            particle.position.x = THREE.MathUtils.lerp(
              particle.position.x,
              finalPositions[i].x,
              0.1 + formationProgress * 0.2 * animationSpeed
            );
            
            particle.position.y = THREE.MathUtils.lerp(
              particle.position.y,
              finalPositions[i].y,
              0.1 + formationProgress * 0.2 * animationSpeed
            );
            
            particle.position.z = THREE.MathUtils.lerp(
              particle.position.z,
              finalPositions[i].z,
              0.1 + formationProgress * 0.2 * animationSpeed
            );
          }
          
          // Less playful rotation for a more serious look
          particle.rotation.x += 0.005;
          particle.rotation.y += 0.005;
        });
      } else {
        // Animate individual particles
        particles.children.forEach((particle, i) => {
          const p = particle as any;
          
          // More subtle rotation
          particle.rotation.x += p.rotationSpeed.x * 0.5;
          particle.rotation.y += p.rotationSpeed.y * 0.5;
          particle.rotation.z += p.rotationSpeed.z * 0.5;
          
          // More subtle movement
          particle.position.y += Math.sin(time + i * 0.1) * 0.005;
          particle.position.x += Math.sin(time * p.floatSpeed) * 0.005;
          
          // Reset particles that go off screen
          if (particle.position.y > 15) {
            particle.position.y = -15;
            particle.position.x = (Math.random() - 0.5) * 40;
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
  }, [animateText, textToAnimate, animationSpeed]);
  
  return <div ref={containerRef} className={`pointer-events-none ${className}`}></div>;
};
