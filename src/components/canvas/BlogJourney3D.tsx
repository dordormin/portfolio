import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Icosahedron, Box, Torus, Octahedron } from '@react-three/drei';
import * as THREE from 'three';

// Create a series of floating geometric shapes that form a "journey" or path
export function BlogJourney3D({ isMobile }: { isMobile: boolean }) {
  const groupRef = useRef<THREE.Group>(null);

  // We generate a long path of objects
  const objects = useMemo(() => {
    const items = [];
    const count = 50;
    const pathLength = 100; // How deep the journey goes in Z

    for (let i = 0; i < count; i++) {
      // Distribution along Z axis
      const z = -(i / count) * pathLength;
      
      // Keep them somewhat near the center (tunnel effect)
      const x = (Math.random() - 0.5) * 15;
      const y = (Math.random() - 0.5) * 15;
      
      // Random scale and type
      const scale = Math.random() * 0.5 + 0.2;
      const type = Math.floor(Math.random() * 4);
      
      items.push({ id: i, position: new THREE.Vector3(x, y, z), scale, type });
    }
    return items;
  }, []);

  // Use a ref for smooth scroll interpolation
  const currentScrollProgress = useRef(0);

  useFrame((state, delta) => {
    if (!groupRef.current) return;

    // Calculate Scroll Progress (0.0 to 1.0)
    const scrollY = window.scrollY;
    const maxScroll = Math.max(1, document.body.scrollHeight - window.innerHeight);
    const targetProgress = Math.min(1, Math.max(0, scrollY / maxScroll));

    // Smoothly interpolate current scroll towards target
    currentScrollProgress.current = THREE.MathUtils.damp(
      currentScrollProgress.current,
      targetProgress,
      4,
      delta
    );

    // As user scrolls, move the entire group FORWARD on Z axis
    // At progress 0 -> Z = 0
    // At progress 1 -> Z = 90 (almost at the end of the 100-length path)
    groupRef.current.position.z = currentScrollProgress.current * 90;
    
    // Slight ambient rotation of the entire group for dream-like feel
    groupRef.current.rotation.z = state.clock.getElapsedTime() * 0.05;

    // Also rotate the children individually
    groupRef.current.children.forEach((child, i) => {
      child.rotation.x += delta * (0.2 + i * 0.01);
      child.rotation.y += delta * (0.3 + i * 0.01);
    });
  });

  return (
    <group ref={groupRef}>
      {objects.map((obj) => {
        const props = {
          position: obj.position,
          scale: obj.scale,
        };
        
        return (
          <group key={obj.id} {...props}>
            <mesh>
              {obj.type === 0 && <boxGeometry args={[1, 1, 1]} />}
              {obj.type === 1 && <icosahedronGeometry args={[1, 0]} />}
              {obj.type === 2 && <torusGeometry args={[0.7, 0.2, 16, 32]} />}
              {obj.type === 3 && <octahedronGeometry args={[1, 0]} />}
              
              <meshPhysicalMaterial
                color="#f97316"
                emissive="#f97316"
                emissiveIntensity={0.5}
                roughness={0.2}
                metalness={0.8}
                wireframe={Math.random() > 0.5}
                transparent
                opacity={0.7}
              />
            </mesh>
          </group>
        );
      })}
    </group>
  );
}
