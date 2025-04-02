
import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';

interface ReviewsAnimationProps {
  className?: string;
}

export const ReviewsAnimation: React.FC<ReviewsAnimationProps> = ({ className = '' }) => {
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
    camera.position.z = 15;
    
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
    
    // Create circular particles for bubbles
    const particlesCount = 80;
    const particles = new THREE.Group();
    
    for (let i = 0; i < particlesCount; i++) {
      const geometry = new THREE.CircleGeometry(Math.random() * 0.3 + 0.1, 32);
      const material = new THREE.MeshBasicMaterial({
        color: springColors[Math.floor(Math.random() * springColors.length)],
        transparent: true,
        opacity: Math.random() * 0.4 + 0.1,
        side: THREE.DoubleSide
      });
      
      const particle = new THREE.Mesh(geometry, material);
      
      // Random positions
      particle.position.x = (Math.random() - 0.5) * 30;
      particle.position.y = (Math.random() - 0.5) * 20;
      particle.position.z = (Math.random() - 0.5) * 10;
      
      // Animation properties
      (particle as any).speed = Math.random() * 0.02 + 0.01;
      (particle as any).direction = Math.random() > 0.5 ? 1 : -1;
      
      particles.add(particle);
    }
    
    scene.add(particles);
    
    // Add some star shapes
    const createStar = (x: number, y: number, z: number, size: number, color: number) => {
      const geometry = new THREE.BufferGeometry();
      
      // Star shape
      const vertices = [];
      const outerRadius = size;
      const innerRadius = size * 0.4;
      const points = 5;
      
      for (let i = 0; i < points * 2; i++) {
        const radius = i % 2 === 0 ? outerRadius : innerRadius;
        const angle = (i / (points * 2)) * Math.PI * 2;
        vertices.push(
          Math.cos(angle) * radius, 
          Math.sin(angle) * radius, 
          0
        );
      }
      
      // Add center point
      vertices.push(0, 0, 0);
      
      // Create faces (triangles)
      const indices = [];
      const centerIndex = points * 2;
      
      for (let i = 0; i < points * 2; i++) {
        indices.push(i, (i + 1) % (points * 2), centerIndex);
      }
      
      geometry.setIndex(indices);
      geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
      
      const material = new THREE.MeshBasicMaterial({
        color: color,
        transparent: true,
        opacity: 0.8,
        side: THREE.DoubleSide
      });
      
      const star = new THREE.Mesh(geometry, material);
      star.position.set(x, y, z);
      
      // Animation properties
      (star as any).rotationSpeed = Math.random() * 0.01 + 0.005;
      (star as any).floatSpeed = Math.random() * 0.005 + 0.001;
      
      scene.add(star);
      return star;
    };
    
    // Add stars
    const stars = [];
    for (let i = 0; i < 15; i++) {
      const x = (Math.random() - 0.5) * 20;
      const y = (Math.random() - 0.5) * 15;
      const z = -Math.random() * 5;
      const size = Math.random() * 0.5 + 0.3;
      const color = springColors[Math.floor(Math.random() * springColors.length)];
      stars.push(createStar(x, y, z, size, color));
    }
    
    // Animation
    let time = 0;
    const animate = () => {
      requestAnimationFrame(animate);
      
      time += 0.01;
      
      // Animate particles (bubbles)
      particles.children.forEach((particle) => {
        const p = particle as any;
        
        // Move upward slowly
        particle.position.y += p.speed * p.direction;
        
        // Slight horizontal movement
        particle.position.x += Math.sin(time * p.speed) * 0.01;
        
        // Reset when off screen
        if (particle.position.y > 15 || particle.position.y < -15) {
          particle.position.y = -15 * p.direction;
          particle.position.x = (Math.random() - 0.5) * 30;
        }
      });
      
      // Animate stars
      stars.forEach((star) => {
        const s = star as any;
        
        // Rotate stars
        star.rotation.z += s.rotationSpeed;
        
        // Float stars
        star.position.y += Math.sin(time * s.floatSpeed) * 0.01;
        star.position.x += Math.cos(time * s.floatSpeed) * 0.01;
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
