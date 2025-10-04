import { useRef } from 'react';
import { Sphere } from '@react-three/drei';

export default function Meteor({ position, data, selected, onClick }) {
  const meteorRef = useRef();
  
  // Get color based on composition
  const getColor = () => {
    if (selected) return '#ffff00';
    switch (data.composition) {
      case 'Iron': return '#8B4513';
      case 'Stone': return '#808080';
      case 'Nickel-Iron': return '#C0C0C0';
      default: return '#A9A9A9';
    }
  };

  // Calculate scale based on diameter
  const scale = Math.log(data.diameter) / 20;

  return (
    <group position={position}>
      <Sphere
        ref={meteorRef}
        args={[scale, 16, 16]}
        onClick={onClick}
        onPointerOver={() => (document.body.style.cursor = 'pointer')}
        onPointerOut={() => (document.body.style.cursor = 'default')}
      >
        <meshStandardMaterial 
          color={getColor()} 
          roughness={0.7}
          metalness={data.composition.includes('Iron') ? 0.8 : 0.2}
        />
      </Sphere>
      {selected && (
        <Sphere args={[scale * 1.5, 16, 16]}>
          <meshBasicMaterial 
            color="#ffff00" 
            transparent 
            opacity={0.2}
            wireframe
          />
        </Sphere>
      )}
    </group>
  );
}
