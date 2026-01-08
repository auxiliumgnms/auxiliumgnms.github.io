import { useRef, useLayoutEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Environment, Float, PerspectiveCamera } from '@react-three/drei';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import * as THREE from 'three';

gsap.registerPlugin(ScrollTrigger);

function RedX() {
  const meshRef = useRef<THREE.Group>(null);
  
  useLayoutEffect(() => {
    if (!meshRef.current) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: "body",
        start: "top top",
        end: "bottom bottom",
        scrub: 1.5, // Smoother scrub
      }
    });

    // 1. Initial State (Hero) -> Theme Section
    // Tilt slightly forward as if searching
    tl.to(meshRef.current.rotation, {
      x: 0.5,
      y: 0.5,
      z: 0.2,
      duration: 2,
    }, 0);

    tl.to(meshRef.current.position, {
      z: 0, 
      y: 0.5,
      duration: 2
    }, 0);

    // 2. Theme -> Meaning
    // Rotate fully to face camera, stabilized
    tl.to(meshRef.current.rotation, {
      x: 0,
      y: Math.PI * 2, // Full spin
      z: 0,
      duration: 2,
    }, 2);
    
    tl.to(meshRef.current.scale, {
      x: 1.2,
      y: 1.2,
      z: 1.2,
      duration: 2,
    }, 2);

    // 3. Meaning -> Speakers
    // Move to side to make room for grid
    tl.to(meshRef.current.position, {
      x: 4, // Move right
      y: 0,
      z: -2,
      duration: 3,
    }, 4);
    
    tl.to(meshRef.current.rotation, {
      y: Math.PI * 2.2,
      duration: 3,
    }, 4);

    // 4. Speakers -> CTA
    // Center again, big and impactful
    tl.to(meshRef.current.position, {
      x: 0,
      y: 0,
      z: 1, // Closer
      duration: 2,
    }, 7);

    tl.to(meshRef.current.rotation, {
      x: 0.2,
      y: Math.PI * 3,
      z: 0.1,
      duration: 2,
    }, 7);

    // 5. CTA -> Exit
    // Final settle
    tl.to(meshRef.current.rotation, {
      x: 0,
      y: Math.PI * 3,
      z: 0,
      duration: 1,
    }, 9);

  }, []);

  // Subtle float animation independent of scroll
  useFrame((state) => {
    if (!meshRef.current) return;
    const t = state.clock.getElapsedTime();
    // A tiny bit of noise rotation
    meshRef.current.rotation.z += Math.sin(t / 4) * 0.002;
  });

  return (
    <group ref={meshRef}>
      <Float
        speed={2} 
        rotationIntensity={0.2} 
        floatIntensity={0.5}
      >
        {/* The X Shape composed of two boxes */}
        <mesh rotation={[0, 0, Math.PI / 4]}>
          <boxGeometry args={[1, 5, 0.5]} />
          <meshPhysicalMaterial 
            color="#E62B1E"
            roughness={0.15}
            metalness={0.1}
            transmission={0.6} // Glass-like
            thickness={2}
            clearcoat={1}
            ior={1.5}
          />
        </mesh>
        <mesh rotation={[0, 0, -Math.PI / 4]}>
          <boxGeometry args={[1, 5, 0.5]} />
          <meshPhysicalMaterial 
            color="#E62B1E"
            roughness={0.15}
            metalness={0.1}
            transmission={0.6} // Glass-like
            thickness={2}
            clearcoat={1}
            ior={1.5}
          />
        </mesh>
      </Float>
    </group>
  );
}

export function Experience3D() {
  return (
    <div id="canvas-container">
      <Canvas dpr={[1, 2]} gl={{ antialias: true, alpha: true }}>
        <PerspectiveCamera makeDefault position={[0, 0, 8]} />
        <ambientLight intensity={0.2} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} />
        <pointLight position={[-10, -10, -10]} intensity={1} color="#ff0000" />
        
        <Environment preset="city" />
        
        <RedX />
      </Canvas>
    </div>
  );
}
