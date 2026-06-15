import { useRef, useMemo, useEffect } from "react";
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

// Global mouse tracker
const mouse = { x: 0, y: 0 };
if (typeof window !== "undefined") {
  window.addEventListener("mousemove", (e) => {
    mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
  });
}

function ShaderBlob() {
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

  useFrame((state, delta) => {
    const time = state.clock.getElapsedTime();
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = time;
    }
    if (meshRef.current) {
      // Interactive rotation - react to mouse
      const targetRotationX = time * 0.02 + mouse.y * 0.5;
      const targetRotationY = time * 0.05 + mouse.x * 0.5;

      meshRef.current.rotation.x += (targetRotationX - meshRef.current.rotation.x) * delta * 2;
      meshRef.current.rotation.y += (targetRotationY - meshRef.current.rotation.y) * delta * 2;
      meshRef.current.rotation.z = time * 0.03;

      // Interactive position (subtle floating towards mouse)
      const targetPosX = mouse.x * 2;
      const targetPosY = -2 + mouse.y * 1.5;

      currentPos.current.x += (targetPosX - currentPos.current.x) * delta * 1.5;
      currentPos.current.y += (targetPosY - currentPos.current.y) * delta * 1.5;

      meshRef.current.position.x = currentPos.current.x;
      meshRef.current.position.y = currentPos.current.y;
    }
  });

  return (
    <Icosahedron ref={meshRef} args={[4, 32]} position={[0, -2, -8]}>
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

function ParticleCloud() {
  const ref = useRef<THREE.Points>(null);

  // Generate random points in a sphere
  const sphere = useMemo(() => {
    const minRadius = 2;
    const maxRadius = 15;
    const particlesCount = 1000;
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
  }, []);

  useFrame((state, delta) => {
    if (ref.current) {
      // Rotation logic + react to mouse
      const targetRotX = mouse.y * 0.2;
      const targetRotY = mouse.x * 0.2;

      ref.current.rotation.x += (targetRotX - ref.current.rotation.x) * delta + (delta / 10);
      ref.current.rotation.y += (targetRotY - ref.current.rotation.y) * delta + (delta / 15);
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

export function BackgroundCanvas() {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none opacity-60 mix-blend-screen">
      <Canvas 
        camera={{ position: [0, 0, 10] }} 
        dpr={[1, 1.5]} 
        gl={{ powerPreference: "high-performance", antialias: false, stencil: false, depth: false }}
      >
        <ParticleCloud />
        <ShaderBlob />

        <EffectComposer disableNormalPass>
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
      </Canvas>
    </div>
  );
}
