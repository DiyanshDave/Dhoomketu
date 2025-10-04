import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Sphere } from '@react-three/drei';

export default function ImpactAnimation({ position }) {
  const sphereRef = useRef();
  const scale = useRef(0.1);
  const opacity = useRef(1);

  useFrame(() => {
    if (sphereRef.current) {
      scale.current += 0.05;
      opacity.current -= 0.02;
      
      sphereRef.current.scale.set(scale.current, scale.current, scale.current);
      
      if (sphereRef.current.material) {
        sphereRef.current.material.opacity = Math.max(0, opacity.current);
      }
      
      // Reset after animation
      if (opacity.current <= 0) {
        scale.current = 0.1;
        opacity.current = 1;
      }
    }
  });

  return (
    <Sphere ref={sphereRef} args={[0.3, 16, 16]} position={position}>
      <meshBasicMaterial 
        color="#ff4500" 
        transparent 
        opacity={1}
      />
    </Sphere>
  );
}
