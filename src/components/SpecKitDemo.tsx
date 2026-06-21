import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Icosahedron, MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';

function AnimatedShape() {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.5;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.3;
    }
  });

  return (
    <Icosahedron ref={meshRef} args={[1, 4]} scale={1.5}>
      <MeshDistortMaterial
        color="#ff7b00"
        attach="material"
        distort={0.4}
        speed={2}
        roughness={0.2}
        metalness={0.8}
      />
    </Icosahedron>
  );
}

export function SpecKitDemo() {
  return (
    <div className="absolute top-10 right-10 md:top-32 md:right-32 w-64 h-64 z-50">
      {/* Glassmorphism Card */}
      <div className="w-full h-full rounded-2xl bg-white/5 backdrop-blur-md border border-white/20 shadow-2xl overflow-hidden relative group transition-transform hover:scale-105 duration-500">
        <div className="absolute top-3 left-3 text-[10px] font-mono text-white/50 tracking-widest uppercase z-10">
          Spec-Kit Demo
        </div>
        
        {/* WebGL Canvas */}
        <Canvas camera={{ position: [0, 0, 4] }}>
          <ambientLight intensity={1} />
          <directionalLight position={[2, 1, 1]} intensity={2} />
          <AnimatedShape />
        </Canvas>
        
        <div className="absolute bottom-3 left-3 right-3 text-xs text-white/70 text-center z-10">
          Interactive WebGL
        </div>
      </div>
    </div>
  );
}
