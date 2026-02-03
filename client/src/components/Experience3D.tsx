import { useRef, useLayoutEffect, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Environment, Float, PerspectiveCamera, Text } from '@react-three/drei';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import * as THREE from 'three';

gsap.registerPlugin(ScrollTrigger);

function CompassNeedle() {
  const needleRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (!needleRef.current) return;
    const t = state.clock.getElapsedTime();
    // Gentle wobble like a real compass needle finding north
    needleRef.current.rotation.z = Math.sin(t * 0.5) * 0.08;
  });

  return (
    <group ref={needleRef} position={[0, 0, 0.3]}>
      {/* Compass needle - red north pointer */}
      <mesh position={[0, 0.8, 0]}>
        <coneGeometry args={[0.15, 1.6, 4]} />
        <meshPhysicalMaterial 
          color="#E62B1E"
          roughness={0.2}
          metalness={0.8}
          clearcoat={1}
        />
      </mesh>
      {/* Compass needle - white south pointer */}
      <mesh position={[0, -0.8, 0]} rotation={[0, 0, Math.PI]}>
        <coneGeometry args={[0.15, 1.6, 4]} />
        <meshPhysicalMaterial 
          color="#ffffff"
          roughness={0.2}
          metalness={0.3}
          clearcoat={1}
        />
      </mesh>
      {/* Center pivot */}
      <mesh position={[0, 0, 0.05]}>
        <cylinderGeometry args={[0.12, 0.12, 0.15, 16]} />
        <meshStandardMaterial color="#333333" metalness={0.9} roughness={0.1} />
      </mesh>
    </group>
  );
}

function CompassRing() {
  const ringRef = useRef<THREE.Mesh>(null);
  
  // Create compass markings geometry
  const markingsGeometry = useMemo(() => {
    const shape = new THREE.Shape();
    shape.absarc(0, 0, 2.2, 0, Math.PI * 2, false);
    const hole = new THREE.Path();
    hole.absarc(0, 0, 1.8, 0, Math.PI * 2, true);
    shape.holes.push(hole);
    return new THREE.ExtrudeGeometry(shape, { depth: 0.1, bevelEnabled: false });
  }, []);

  return (
    <group>
      {/* Main compass ring */}
      <mesh ref={ringRef} geometry={markingsGeometry}>
        <meshPhysicalMaterial 
          color="#1a1a1a"
          roughness={0.3}
          metalness={0.7}
          clearcoat={0.5}
        />
      </mesh>
      
      {/* Cardinal direction markers */}
      {['N', 'E', 'S', 'W'].map((dir, i) => {
        const angle = (i * Math.PI) / 2;
        const radius = 2;
        return (
          <group key={dir} position={[Math.sin(angle) * radius, Math.cos(angle) * radius, 0.15]}>
            <mesh>
              <boxGeometry args={[0.08, 0.25, 0.08]} />
              <meshStandardMaterial color={dir === 'N' ? '#E62B1E' : '#666666'} />
            </mesh>
          </group>
        );
      })}
      
      {/* Inner glass face */}
      <mesh position={[0, 0, 0.05]}>
        <circleGeometry args={[1.75, 64]} />
        <meshPhysicalMaterial 
          color="#0a0a0a"
          roughness={0.1}
          metalness={0.2}
          transmission={0.3}
          thickness={0.5}
          clearcoat={1}
          opacity={0.9}
          transparent
        />
      </mesh>
    </group>
  );
}

function XCompass() {
  const groupRef = useRef<THREE.Group>(null);
  const xRef = useRef<THREE.Group>(null);
  const compassRef = useRef<THREE.Group>(null);
  const morphProgress = useRef({ value: 0 });
  
  useLayoutEffect(() => {
    if (!groupRef.current || !xRef.current || !compassRef.current) return;

    // Start with X visible, compass hidden
    xRef.current.scale.set(1, 1, 1);
    compassRef.current.scale.set(0, 0, 0);
    compassRef.current.visible = false;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: "body",
        start: "top top",
        end: "bottom bottom",
        scrub: 1.5,
      }
    });

    // 1. Hero section - X rotates gently
    tl.to(groupRef.current.rotation, {
      x: 0.3,
      y: 0.5,
      z: 0.1,
      duration: 1.5,
    }, 0);

    // 2. Theme section - X starts morphing into compass
    tl.to(xRef.current.scale, {
      x: 0,
      y: 0,
      z: 0,
      duration: 1.5,
    }, 1.5);
    
    tl.to(compassRef.current, {
      onStart: () => {
        if (compassRef.current) compassRef.current.visible = true;
      }
    }, 2);
    
    tl.to(compassRef.current.scale, {
      x: 1,
      y: 1,
      z: 1,
      duration: 1.5,
    }, 2);

    tl.to(groupRef.current.rotation, {
      x: 0,
      y: Math.PI * 2,
      z: 0,
      duration: 2,
    }, 2);

    // 3. Speakers section - compass moves aside
    tl.to(groupRef.current.position, {
      x: 4,
      y: 0,
      z: -2,
      duration: 2,
    }, 4);
    
    tl.to(groupRef.current.rotation, {
      y: Math.PI * 2.3,
      duration: 2,
    }, 4);

    // 4. Details/About - compass returns center
    tl.to(groupRef.current.position, {
      x: 0,
      y: 0,
      z: 1,
      duration: 2,
    }, 6);

    tl.to(groupRef.current.rotation, {
      x: 0.15,
      y: Math.PI * 3,
      z: 0.05,
      duration: 2,
    }, 6);

    // 5. Final settle
    tl.to(groupRef.current.rotation, {
      x: 0,
      y: Math.PI * 3,
      z: 0,
      duration: 1,
    }, 8);

  }, []);

  // Subtle ambient animation
  useFrame((state) => {
    if (!groupRef.current) return;
    const t = state.clock.getElapsedTime();
    groupRef.current.rotation.z += Math.sin(t / 4) * 0.001;
  });

  return (
    <group ref={groupRef}>
      <Float speed={2} rotationIntensity={0.15} floatIntensity={0.4}>
        {/* The X Shape */}
        <group ref={xRef}>
          <mesh rotation={[0, 0, Math.PI / 4]}>
            <boxGeometry args={[1, 5, 0.5]} />
            <meshPhysicalMaterial 
              color="#E62B1E"
              roughness={0.15}
              metalness={0.1}
              transmission={0.6}
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
              transmission={0.6}
              thickness={2}
              clearcoat={1}
              ior={1.5}
            />
          </mesh>
        </group>

        {/* The Compass */}
        <group ref={compassRef}>
          <CompassRing />
          <CompassNeedle />
        </group>
      </Float>
    </group>
  );
}

export function Experience3D() {
  return (
    <div id="canvas-container">
      <Canvas dpr={[1, 2]} gl={{ antialias: true, alpha: true }}>
        <PerspectiveCamera makeDefault position={[0, 0, 8]} />
        <ambientLight intensity={0.3} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} />
        <pointLight position={[-10, -10, -10]} intensity={0.8} color="#ff0000" />
        <pointLight position={[5, 5, 5]} intensity={0.5} color="#ffffff" />
        
        <Environment preset="city" />
        
        <XCompass />
      </Canvas>
    </div>
  );
}
