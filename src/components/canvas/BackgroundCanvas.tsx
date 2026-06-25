import { useRef, useMemo, useEffect, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial, Icosahedron } from "@react-three/drei";
import {
  EffectComposer,
  Bloom,
  Noise,
  ChromaticAberration,
} from "@react-three/postprocessing";
import { BlendFunction } from "postprocessing";
import * as THREE from "three";
import { BlogJourney3D } from "./BlogJourney3D";
import { useSoundContext } from "@/contexts/SoundContext";
import { toneEngine } from "@/utils/ToneEngine";
import { hardwareProfiler } from "@/utils/HardwareProfiler";

// Global mouse and scroll tracker
const mouse = { x: 0, y: 0 };
let cachedMaxScroll = 1000;

if (typeof window !== "undefined") {
  window.addEventListener("mousemove", (e) => {
    mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
  });
  
  const updateScroll = () => {
    cachedMaxScroll = document.body.scrollHeight;
  };
  
  window.addEventListener("resize", updateScroll);
  // Initial calculation after a slight delay to allow rendering
  setTimeout(updateScroll, 500);
}

function ShaderBlob({ isMobile }: { isMobile?: boolean }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<THREE.ShaderMaterial>(null);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uColorStart: { value: new THREE.Color("#f97316") }, // Orange
      uColorEnd: { value: new THREE.Color("#2a0a00") },
    }),
    [],
  );

  const vertexShader = `
    uniform float uTime;
    varying vec2 vUv;
    varying float vElevation;

    // Simplex 3D Noise 
    vec4 permute(vec4 x){return mod(((x*34.0)+1.0)*x, 289.0);}
    vec4 taylorInvSqrt(vec4 r){return 1.79284291400159 - 0.85373472095314 * r;}

    float snoise(vec3 v){ 
      const vec2  C = vec2(1.0/6.0, 1.0/3.0) ;
      const vec4  D = vec4(0.0, 0.5, 1.0, 2.0);

      vec3 i  = floor(v + dot(v, C.yyy) );
      vec3 x0 = v - i + dot(i, C.xxx) ;

      vec3 g = step(x0.yzx, x0.xyz);
      vec3 l = 1.0 - g;
      vec3 i1 = min( g.xyz, l.zxy );
      vec3 i2 = max( g.xyz, l.zxy );

      vec3 x1 = x0 - i1 + 1.0 * C.xxx;
      vec3 x2 = x0 - i2 + 2.0 * C.xxx;
      vec3 x3 = x0 - 1.0 + 3.0 * C.xxx;

      i = mod(i, 289.0 ); 
      vec4 p = permute( permute( permute( 
                i.z + vec4(0.0, i1.z, i2.z, 1.0 ))
              + i.y + vec4(0.0, i1.y, i2.y, 1.0 )) 
              + i.x + vec4(0.0, i1.x, i2.x, 1.0 ));

      float n_ = 1.0/7.0; 
      vec3  ns = n_ * D.wyz - D.xzx;

      vec4 j = p - 49.0 * floor(p * ns.z *ns.z);  

      vec4 x_ = floor(j * ns.z);
      vec4 y_ = floor(j - 7.0 * x_ );    

      vec4 x = x_ *ns.x + ns.yyyy;
      vec4 y = y_ *ns.x + ns.yyyy;
      vec4 h = 1.0 - abs(x) - abs(y);

      vec4 b0 = vec4( x.xy, y.xy );
      vec4 b1 = vec4( x.zw, y.zw );

      vec4 s0 = floor(b0)*2.0 + 1.0;
      vec4 s1 = floor(b1)*2.0 + 1.0;
      vec4 sh = -step(h, vec4(0.0));

      vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy ;
      vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww ;

      vec3 p0 = vec3(a0.xy,h.x);
      vec3 p1 = vec3(a0.zw,h.y);
      vec3 p2 = vec3(a1.xy,h.z);
      vec3 p3 = vec3(a1.zw,h.w);

      vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2, p2), dot(p3,p3)));
      p0 *= norm.x;
      p1 *= norm.y;
      p2 *= norm.z;
      p3 *= norm.w;

      vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
      m = m * m;
      return 42.0 * dot( m*m, vec4( dot(p0,x0), dot(p1,x1), 
                                    dot(p2,x2), dot(p3,x3) ) );
    }

    void main() {
      vUv = uv;
      float elevation = snoise(vec3(position.x * 0.8, position.y * 0.8, position.z * 0.8 + uTime * 0.2)) * 0.8;
      vElevation = elevation;
      
      // Additional small high-freq noise for detail
      float elevation2 = snoise(vec3(position.x * 2.5, position.y * 2.5, position.z * 2.5 - uTime * 0.4)) * 0.2;
      
      vec3 newPosition = position + normal * (elevation + elevation2);
      gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0);
    }
  `;

  const fragmentShader = `
    uniform vec3 uColorStart;
    uniform vec3 uColorEnd;
    varying vec2 vUv;
    varying float vElevation;

    void main() {
      // Create a smooth mix based on the noise elevation
      float mixStrength = (vElevation + 1.0) * 0.5;
      vec3 mixColor = mix(uColorStart, uColorEnd, mixStrength);
      
      // Add a rim glow effect
      float rim = 1.0 - smoothstep(0.0, 1.2, abs(vElevation));
      mixColor += vec3(0.5, 0.2, 0.0) * rim;
      
      gl_FragColor = vec4(mixColor, 1.0);
    }
  `;

  // Smooth position state for interpolation
  const currentPos = useRef({ x: 0, y: -2 });

  // Target positions and colors based on scroll sections
  const sections = useMemo(() => [
    // 0: Hero (Center, Orange)
    { pos: new THREE.Vector3(0, -2, -8), color: new THREE.Color("#f97316") },
    // 1: About (Right, Purple)
    { pos: new THREE.Vector3(4, 0, -10), color: new THREE.Color("#8b5cf6") },
    // 2: Experience (Left, Cyan)
    { pos: new THREE.Vector3(-4, 2, -12), color: new THREE.Color("#06b6d4") },
    // 3: Projects (Far Right, Pink)
    { pos: new THREE.Vector3(5, -2, -10), color: new THREE.Color("#ec4899") },
    // 4: Contact (Center Close, Orange)
    { pos: new THREE.Vector3(0, 0, -4), color: new THREE.Color("#f97316") }
  ], []);

  useFrame((state, rawDelta) => {
    // Cap delta to prevent massive jumps or NaN during CPU throttling (like Lighthouse)
    const delta = Math.min(rawDelta, 0.1);
    const time = state.clock.getElapsedTime();
    
    // 1. Calculate Scroll Progress (0.0 to 1.0)
    const scrollY = window.scrollY;
    // Fallback maxScroll to 1000 if not available to avoid NaN initially
    const maxScroll = Math.max(1, cachedMaxScroll - window.innerHeight);
    const scrollProgress = Math.min(1, Math.max(0, scrollY / maxScroll));

    // 2. Interpolate Section Values
    const totalSections = sections.length - 1;
    const currentSectionIdx = Math.min(Math.floor(scrollProgress * totalSections), totalSections - 1);
    const nextSectionIdx = currentSectionIdx + 1;
    // Local progress between the two current sections
    const localProgress = (scrollProgress * totalSections) - currentSectionIdx;

    const currentSection = sections[currentSectionIdx];
    const nextSection = sections[nextSectionIdx];

    // Smoothstep for more elegant transitions
    const smoothProgress = THREE.MathUtils.smoothstep(localProgress, 0, 1);

    // 3. Apply to Shader Material
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = time;
      
      // Interpolate colors
      const targetColor = currentSection.color.clone().lerp(nextSection.color, smoothProgress);
      materialRef.current.uniforms.uColorStart.value.lerp(targetColor, delta * 2);
    }

    // 4. Apply to Mesh (Position & Rotation)
    if (meshRef.current) {
      // Calculate target base position from scroll
      const baseTargetPos = currentSection.pos.clone().lerp(nextSection.pos, smoothProgress);

      // Interactive rotation - react to mouse + base scroll rotation
      const targetRotationX = time * 0.02 + mouse.y * 0.5 + (scrollProgress * Math.PI);
      const targetRotationY = time * 0.05 + mouse.x * 0.5 + (scrollProgress * Math.PI * 2);

      meshRef.current.rotation.x = THREE.MathUtils.damp(meshRef.current.rotation.x, targetRotationX, 4, delta);
      meshRef.current.rotation.y = THREE.MathUtils.damp(meshRef.current.rotation.y, targetRotationY, 4, delta);
      meshRef.current.rotation.z = time * 0.03;

      // Interactive position (base position + subtle floating towards mouse)
      const targetPosX = baseTargetPos.x + (mouse.x * 2);
      const targetPosY = baseTargetPos.y + (mouse.y * 1.5);

      currentPos.current.x = THREE.MathUtils.damp(currentPos.current.x, targetPosX, 3, delta);
      currentPos.current.y = THREE.MathUtils.damp(currentPos.current.y, targetPosY, 3, delta);
      
      // Interpolate Z smoothly
      meshRef.current.position.z = THREE.MathUtils.damp(meshRef.current.position.z, baseTargetPos.z, 2, delta);

      meshRef.current.position.x = currentPos.current.x;
      meshRef.current.position.y = currentPos.current.y;
    }
    
    // Modulate Tone.js generative audio engine based on the scroll progress
    toneEngine.setModulation(scrollProgress);
  });

  const settings = hardwareProfiler.getSettings();

  return (
    <Icosahedron ref={meshRef} args={[4, settings.geometrySegments]} position={[0, -2, -8]}>
      <shaderMaterial
        ref={materialRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        wireframe={true}
        transparent={true}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </Icosahedron>
  );
}

function ParticleCloud({ isMobile }: { isMobile: boolean }) {
  const ref = useRef<THREE.Points>(null);

  // Generate random points in a sphere
  const sphere = useMemo(() => {
    const minRadius = 2;
    const maxRadius = 15;
    const settings = hardwareProfiler.getSettings();
    const particlesCount = settings.particleCount;
    const positions = new Float32Array(particlesCount * 3);

    for (let i = 0; i < particlesCount; i++) {
      const theta = Math.random() * 2 * Math.PI;
      const phi = Math.acos(Math.random() * 2 - 1);

      const r = minRadius + Math.random() * (maxRadius - minRadius);

      const x = r * Math.sin(phi) * Math.cos(theta);
      const y = r * Math.sin(phi) * Math.sin(theta);
      const z = r * Math.cos(phi);

      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;
    }
    return positions;
  }, [isMobile]);

  useFrame((state, rawDelta) => {
    const delta = Math.min(rawDelta, 0.1);
    if (ref.current) {
      // Calculate Scroll Progress
      const scrollY = window.scrollY;
      const maxScroll = Math.max(1, cachedMaxScroll - window.innerHeight);
      const scrollProgress = Math.min(1, Math.max(0, scrollY / maxScroll));

      // Rotation logic + react to mouse
      const targetRotX = mouse.y * 0.2 + (scrollProgress * Math.PI * 0.5);
      const targetRotY = mouse.x * 0.2 + (scrollProgress * Math.PI);

      ref.current.rotation.x = THREE.MathUtils.damp(ref.current.rotation.x, targetRotX, 2, delta);
      ref.current.rotation.y = THREE.MathUtils.damp(ref.current.rotation.y, targetRotY, 2, delta);
      
      // As you scroll down, the particles rush past the camera (Z translation)
      const targetPosZ = scrollProgress * 15; // Moves from 0 to 15 forward
      ref.current.position.z = THREE.MathUtils.damp(ref.current.position.z, targetPosZ, 2, delta);
    }
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={sphere} stride={3} frustumCulled={false}>
        <PointMaterial
          transparent
          color="#f97316"
          size={0.03}
          sizeAttenuation={true}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </Points>
    </group>
  );
}

export function BackgroundCanvas({ viewMode }: { viewMode: 'portfolio' | 'blog' }) {
  const [isMobile, setIsMobile] = useState(false);
  const { isMuted } = useSoundContext();
  const settings = hardwareProfiler.getSettings();

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);



  if (settings.isBot) {
    return (
      <div className="fixed inset-0 z-0 pointer-events-none bg-gradient-to-br from-black to-orange-950/20"></div>
    );
  }

  return (
    <div className="fixed inset-0 z-0 pointer-events-none opacity-60 mix-blend-screen">
      <Canvas 
        camera={{ position: [0, 0, 10] }} 
        dpr={settings.dpr} 
        gl={{ powerPreference: "high-performance", antialias: false, stencil: false, depth: false }}
      >
        <ParticleCloud isMobile={isMobile} />
        {viewMode === 'portfolio' && <ShaderBlob isMobile={isMobile} />}
        {viewMode === 'blog' && <BlogJourney3D isMobile={isMobile} />}

        {!isMobile && settings.effectsEnabled && (
          <EffectComposer>
            <Bloom
              luminanceThreshold={0.2}
              luminanceSmoothing={0.9}
              intensity={2.5}
              mipmapBlur
            />
            <Noise opacity={0.03} />
            <ChromaticAberration
              blendFunction={BlendFunction.NORMAL}
              offset={new THREE.Vector2(0.002, 0.002)}
            />
          </EffectComposer>
        )}
      </Canvas>
    </div>
  );
}
