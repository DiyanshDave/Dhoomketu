import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stars } from '@react-three/drei';
import Earth from './Earth';
import Meteor from './Meteor';
import ImpactAnimation from './ImpactAnimation';

export default function Scene({ 
  meteors, 
  selectedMeteor, 
  onMeteorSelect,
  impactPosition,
  showImpact
}) {
  // Position meteors in orbit around Earth
  const meteorPositions = [
    [4, 2, 0],
    [0, 2, 4],
    [-4, 2, 0],
    [0, 2, -4],
    [3, -2, 3]
  ];

  return (
    <Canvas camera={{ position: [0, 0, 8], fov: 60 }}>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      <Stars radius={100} depth={50} count={5000} factor={4} />
      
      <Earth />
      
      {meteors.map((meteor, index) => (
        <Meteor
          key={meteor.id}
          data={meteor}
          position={meteorPositions[index] || [5, 0, 0]}
          selected={selectedMeteor?.id === meteor.id}
          onClick={() => onMeteorSelect(meteor)}
        />
      ))}

      {showImpact && impactPosition && (
        <ImpactAnimation position={impactPosition} />
      )}
      
      <OrbitControls 
        enablePan={true}
        enableZoom={true}
        enableRotate={true}
        minDistance={5}
        maxDistance={20}
      />
    </Canvas>
  );
}
