import { useRef, useMemo } from 'react';
import { useStore } from '../../store/simulationStore';
import * as THREE from 'three';

export function Field() {
  const fieldRef = useRef<THREE.Mesh>(null);
  const { fieldSize, coveredAreas } = useStore((state) => state.simulation);
  
  const stubblePositions = useMemo(() => {
    const positions = [];
    const density = 100;
    
    for (let i = 0; i < density; i++) {
      const x = (Math.random() - 0.5) * fieldSize.width;
      const z = (Math.random() - 0.5) * fieldSize.length;
      positions.push([x, z]);
    }
    
    return positions;
  }, [fieldSize]);

  return (
    <group>
      <mesh
        ref={fieldRef}
        rotation={[-Math.PI / 2, 0, 0]}
        receiveShadow
      >
        <planeGeometry args={[fieldSize.width, fieldSize.length, 50, 50]} />
        <meshStandardMaterial
          color="#8B4513"
          roughness={0.9}
          metalness={0.1}
        />
      </mesh>

      <mesh
        position={[0, -0.1, 0]}
        rotation={[-Math.PI / 2, 0, 0]}
      >
        <planeGeometry args={[fieldSize.width + 2, fieldSize.length + 2]} />
        <meshStandardMaterial
          color="#654321"
          roughness={1}
          metalness={0}
        />
      </mesh>

      {stubblePositions.map(([x, z], i) => (
        <group key={i} position={[x, 0, z]}>
          <mesh position={[0, 0.3, 0]}>
            <cylinderGeometry args={[0.04, 0.04, 0.6, 4]} />
            <meshStandardMaterial color="#DAA520" roughness={0.8} />
          </mesh>
          {[[-0.15, 0.15], [0.15, -0.15], [0.15, 0.15]].map(([dx, dz], j) => (
            <mesh key={j} position={[dx, 0.2, dz]}>
              <cylinderGeometry args={[0.02, 0.02, 0.4, 4]} />
              <meshStandardMaterial color="#B8860B" roughness={0.8} />
            </mesh>
          ))}
        </group>
      ))}

      <gridHelper
        args={[fieldSize.width, 25, '#666666', '#444444']}
        position={[0, 0.01, 0]}
      />
    </group>
  );
}