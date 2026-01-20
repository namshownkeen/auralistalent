import { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Environment } from '@react-three/drei';
import * as THREE from 'three';

// Stylized 3D Recruiter Figure
const RecruiterFigure = () => {
  const groupRef = useRef<THREE.Group>(null);
  const headRef = useRef<THREE.Mesh>(null);
  const leftArmRef = useRef<THREE.Mesh>(null);
  const rightArmRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    
    // Gentle head tilt
    if (headRef.current) {
      headRef.current.rotation.y = Math.sin(t * 0.5) * 0.15;
      headRef.current.rotation.z = Math.sin(t * 0.3) * 0.05;
    }
    
    // Arm gestures - reaching to both sides
    if (leftArmRef.current) {
      leftArmRef.current.rotation.z = Math.sin(t * 0.4) * 0.1 + 0.3;
    }
    if (rightArmRef.current) {
      rightArmRef.current.rotation.z = -Math.sin(t * 0.4 + 0.5) * 0.1 - 0.3;
    }
    
    // Subtle breathing motion
    if (groupRef.current) {
      groupRef.current.position.y = Math.sin(t * 0.8) * 0.05;
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.1} floatIntensity={0.3}>
      <group ref={groupRef} position={[0, -0.5, 0]}>
        {/* Body - Torso */}
        <mesh position={[0, 0, 0]}>
          <capsuleGeometry args={[0.4, 0.8, 8, 16]} />
          <meshStandardMaterial 
            color="#1a1a2e" 
            metalness={0.3} 
            roughness={0.7}
          />
        </mesh>
        
        {/* Head */}
        <mesh ref={headRef} position={[0, 1.0, 0]}>
          <sphereGeometry args={[0.35, 32, 32]} />
          <meshStandardMaterial 
            color="#00BFA6" 
            emissive="#00BFA6"
            emissiveIntensity={0.2}
            metalness={0.4} 
            roughness={0.3}
          />
        </mesh>
        
        {/* Face indicator - subtle glow */}
        <mesh position={[0, 1.0, 0.3]}>
          <circleGeometry args={[0.15, 32]} />
          <meshStandardMaterial 
            color="#00BFA6"
            emissive="#00BFA6"
            emissiveIntensity={0.5}
            transparent
            opacity={0.6}
          />
        </mesh>
        
        {/* Left Arm - reaching to company side */}
        <mesh ref={leftArmRef} position={[-0.6, 0.2, 0]} rotation={[0, 0, 0.3]}>
          <capsuleGeometry args={[0.12, 0.7, 8, 16]} />
          <meshStandardMaterial 
            color="#1a1a2e"
            metalness={0.3}
            roughness={0.7}
          />
        </mesh>
        
        {/* Left Hand - open gesture */}
        <mesh position={[-1.1, 0.5, 0]}>
          <sphereGeometry args={[0.15, 16, 16]} />
          <meshStandardMaterial 
            color="#00BFA6"
            emissive="#00BFA6"
            emissiveIntensity={0.3}
            metalness={0.4}
            roughness={0.3}
          />
        </mesh>
        
        {/* Right Arm - reaching to candidate side */}
        <mesh ref={rightArmRef} position={[0.6, 0.2, 0]} rotation={[0, 0, -0.3]}>
          <capsuleGeometry args={[0.12, 0.7, 8, 16]} />
          <meshStandardMaterial 
            color="#1a1a2e"
            metalness={0.3}
            roughness={0.7}
          />
        </mesh>
        
        {/* Right Hand - open gesture */}
        <mesh position={[1.1, 0.5, 0]}>
          <sphereGeometry args={[0.15, 16, 16]} />
          <meshStandardMaterial 
            color="#00BFA6"
            emissive="#00BFA6"
            emissiveIntensity={0.3}
            metalness={0.4}
            roughness={0.3}
          />
        </mesh>
        
        {/* Shoulder accent - left */}
        <mesh position={[-0.45, 0.4, 0]}>
          <sphereGeometry args={[0.15, 16, 16]} />
          <meshStandardMaterial 
            color="#00BFA6"
            emissive="#00BFA6"
            emissiveIntensity={0.2}
            transparent
            opacity={0.8}
          />
        </mesh>
        
        {/* Shoulder accent - right */}
        <mesh position={[0.45, 0.4, 0]}>
          <sphereGeometry args={[0.15, 16, 16]} />
          <meshStandardMaterial 
            color="#00BFA6"
            emissive="#00BFA6"
            emissiveIntensity={0.2}
            transparent
            opacity={0.8}
          />
        </mesh>
      </group>
    </Float>
  );
};

// Connection Lines/Waves
const ConnectionWaves = () => {
  const leftWaveRef = useRef<THREE.Mesh>(null);
  const rightWaveRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    
    if (leftWaveRef.current) {
      leftWaveRef.current.scale.x = 1 + Math.sin(t * 2) * 0.1;
      (leftWaveRef.current.material as THREE.MeshStandardMaterial).opacity = 
        0.3 + Math.sin(t * 1.5) * 0.2;
    }
    
    if (rightWaveRef.current) {
      rightWaveRef.current.scale.x = 1 + Math.sin(t * 2 + 1) * 0.1;
      (rightWaveRef.current.material as THREE.MeshStandardMaterial).opacity = 
        0.3 + Math.sin(t * 1.5 + 1) * 0.2;
    }
  });

  return (
    <>
      {/* Left connection - to company */}
      <mesh ref={leftWaveRef} position={[-2.5, 0, 0]} rotation={[0, 0, Math.PI / 6]}>
        <planeGeometry args={[2, 0.05]} />
        <meshStandardMaterial 
          color="#00BFA6"
          emissive="#00BFA6"
          emissiveIntensity={0.8}
          transparent
          opacity={0.4}
        />
      </mesh>
      
      {/* Right connection - to candidate */}
      <mesh ref={rightWaveRef} position={[2.5, 0, 0]} rotation={[0, 0, -Math.PI / 6]}>
        <planeGeometry args={[2, 0.05]} />
        <meshStandardMaterial 
          color="#00BFA6"
          emissive="#00BFA6"
          emissiveIntensity={0.8}
          transparent
          opacity={0.4}
        />
      </mesh>
      
      {/* Pulse particles - left side */}
      {[...Array(3)].map((_, i) => (
        <PulseParticle key={`left-${i}`} side="left" delay={i * 0.8} />
      ))}
      
      {/* Pulse particles - right side */}
      {[...Array(3)].map((_, i) => (
        <PulseParticle key={`right-${i}`} side="right" delay={i * 0.8 + 0.4} />
      ))}
    </>
  );
};

// Animated pulse particles
const PulseParticle = ({ side, delay }: { side: 'left' | 'right'; delay: number }) => {
  const ref = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const t = (state.clock.getElapsedTime() + delay) % 3;
    const progress = t / 3;
    
    if (ref.current) {
      const direction = side === 'left' ? -1 : 1;
      ref.current.position.x = direction * (1 + progress * 2.5);
      ref.current.position.y = Math.sin(progress * Math.PI) * 0.3;
      ref.current.scale.setScalar(1 - progress * 0.5);
      (ref.current.material as THREE.MeshStandardMaterial).opacity = 
        (1 - progress) * 0.6;
    }
  });

  return (
    <mesh ref={ref} position={[side === 'left' ? -1 : 1, 0, 0]}>
      <sphereGeometry args={[0.08, 16, 16]} />
      <meshStandardMaterial 
        color="#00BFA6"
        emissive="#00BFA6"
        emissiveIntensity={1}
        transparent
        opacity={0.6}
      />
    </mesh>
  );
};

// Company Side Icons
const CompanySide = () => {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (groupRef.current) {
      groupRef.current.position.y = Math.sin(t * 0.5) * 0.1;
    }
  });

  return (
    <group ref={groupRef} position={[-4, 0, 0]}>
      {/* Dashboard card */}
      <mesh position={[0, 0.5, 0]} rotation={[0, 0.2, 0]}>
        <boxGeometry args={[1.2, 0.8, 0.05]} />
        <meshStandardMaterial 
          color="#1a1a2e"
          metalness={0.5}
          roughness={0.5}
        />
      </mesh>
      {/* Dashboard accent line */}
      <mesh position={[0, 0.6, 0.03]} rotation={[0, 0.2, 0]}>
        <boxGeometry args={[0.8, 0.1, 0.02]} />
        <meshStandardMaterial 
          color="#00BFA6"
          emissive="#00BFA6"
          emissiveIntensity={0.5}
        />
      </mesh>
      
      {/* Building/Office icon */}
      <mesh position={[0.3, -0.5, 0]}>
        <boxGeometry args={[0.4, 0.6, 0.3]} />
        <meshStandardMaterial 
          color="#2d2d44"
          metalness={0.3}
          roughness={0.7}
        />
      </mesh>
      
      {/* Startup symbol - rocket shape */}
      <mesh position={[-0.4, -0.3, 0.2]} rotation={[0, 0, Math.PI / 6]}>
        <coneGeometry args={[0.15, 0.4, 8]} />
        <meshStandardMaterial 
          color="#00BFA6"
          emissive="#00BFA6"
          emissiveIntensity={0.3}
        />
      </mesh>
    </group>
  );
};

// Candidate Side Icons
const CandidateSide = () => {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (groupRef.current) {
      groupRef.current.position.y = Math.sin(t * 0.5 + 1) * 0.1;
    }
  });

  return (
    <group ref={groupRef} position={[4, 0, 0]}>
      {/* Profile card */}
      <mesh position={[0, 0.3, 0]} rotation={[0, -0.2, 0]}>
        <boxGeometry args={[1, 1.2, 0.05]} />
        <meshStandardMaterial 
          color="#1a1a2e"
          metalness={0.5}
          roughness={0.5}
        />
      </mesh>
      
      {/* Profile avatar circle */}
      <mesh position={[0, 0.6, 0.03]} rotation={[0, -0.2, 0]}>
        <circleGeometry args={[0.25, 32]} />
        <meshStandardMaterial 
          color="#00BFA6"
          emissive="#00BFA6"
          emissiveIntensity={0.4}
        />
      </mesh>
      
      {/* Skills indicators */}
      {[0, 1, 2].map((i) => (
        <mesh key={i} position={[0, 0.1 - i * 0.2, 0.03]} rotation={[0, -0.2, 0]}>
          <boxGeometry args={[0.6, 0.08, 0.02]} />
          <meshStandardMaterial 
            color="#00BFA6"
            emissive="#00BFA6"
            emissiveIntensity={0.3}
            transparent
            opacity={0.8 - i * 0.2}
          />
        </mesh>
      ))}
      
      {/* Journey path dots */}
      {[...Array(4)].map((_, i) => (
        <mesh key={i} position={[-0.2 + i * 0.15, -0.6, 0]}>
          <sphereGeometry args={[0.05, 16, 16]} />
          <meshStandardMaterial 
            color="#00BFA6"
            emissive="#00BFA6"
            emissiveIntensity={0.5}
            transparent
            opacity={0.4 + i * 0.15}
          />
        </mesh>
      ))}
    </group>
  );
};

// Check WebGL availability
const isWebGLAvailable = (): boolean => {
  try {
    const canvas = document.createElement('canvas');
    return !!(
      window.WebGLRenderingContext &&
      (canvas.getContext('webgl') || canvas.getContext('experimental-webgl'))
    );
  } catch (e) {
    return false;
  }
};

// Beautiful 2D fallback component
const Fallback2D = () => {
  return (
    <div className="absolute inset-0 z-0 flex items-center justify-center">
      {/* Central recruiter representation */}
      <div className="relative">
        {/* Pulsing glow effect */}
        <div className="absolute inset-0 animate-pulse">
          <div className="w-32 h-32 md:w-48 md:h-48 rounded-full bg-primary/20 blur-3xl" />
        </div>
        
        {/* Main figure */}
        <div className="relative w-24 h-24 md:w-32 md:h-32 rounded-full bg-gradient-to-br from-primary/30 to-primary/10 border border-primary/40 flex items-center justify-center backdrop-blur-sm">
          <div className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-primary/40 flex items-center justify-center">
            <div className="w-6 h-6 md:w-8 md:h-8 rounded-full bg-primary animate-pulse" />
          </div>
        </div>
        
        {/* Connection lines to sides */}
        <div className="absolute top-1/2 -left-24 md:-left-32 w-20 md:w-28 h-px bg-gradient-to-r from-transparent via-primary/40 to-primary/60 -translate-y-1/2" />
        <div className="absolute top-1/2 -right-24 md:-right-32 w-20 md:w-28 h-px bg-gradient-to-l from-transparent via-primary/40 to-primary/60 -translate-y-1/2" />
        
        {/* Orbiting dots */}
        <div className="absolute -left-8 top-1/4 w-2 h-2 rounded-full bg-primary/60 animate-pulse" style={{ animationDelay: '0.2s' }} />
        <div className="absolute -right-8 top-3/4 w-2 h-2 rounded-full bg-primary/60 animate-pulse" style={{ animationDelay: '0.4s' }} />
        <div className="absolute -left-12 top-2/3 w-1.5 h-1.5 rounded-full bg-primary/40 animate-pulse" style={{ animationDelay: '0.6s' }} />
        <div className="absolute -right-12 top-1/3 w-1.5 h-1.5 rounded-full bg-primary/40 animate-pulse" style={{ animationDelay: '0.8s' }} />
      </div>
    </div>
  );
};

const RecruiterScene = () => {
  const [webGLSupported, setWebGLSupported] = useState(true);

  useEffect(() => {
    setWebGLSupported(isWebGLAvailable());
  }, []);

  if (!webGLSupported) {
    return <Fallback2D />;
  }

  return (
    <div className="absolute inset-0 z-0">
      <Canvas
        camera={{ position: [0, 0, 8], fov: 50 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: 'transparent' }}
        onCreated={({ gl }) => {
          // Additional safety check
          if (!gl.getContext()) {
            setWebGLSupported(false);
          }
        }}
      >
        <ambientLight intensity={0.4} />
        <pointLight position={[5, 5, 5]} intensity={0.8} color="#00BFA6" />
        <pointLight position={[-5, 5, 5]} intensity={0.6} color="#00BFA6" />
        <spotLight 
          position={[0, 10, 5]} 
          angle={0.3} 
          penumbra={1} 
          intensity={0.5}
          color="#ffffff"
        />
        
        <RecruiterFigure />
        <ConnectionWaves />
        <CompanySide />
        <CandidateSide />
        
        <Environment preset="night" />
      </Canvas>
    </div>
  );
};

export default RecruiterScene;
