import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useStore } from '../../store/simulationStore';
import * as THREE from 'three';

export function Car() {
  const carRef = useRef<THREE.Group>(null);
  const { carPosition, isRunning, fieldSize } = useStore((state) => state.simulation);
  const { updateCarPosition } = useStore();
  const lastUpdateTime = useRef(0);
  const lastPosition = useRef({ x: -23, z: -23, rotation: 0 });
  const targetPosition = useRef({ x: -23, z: -23, rotation: 0 });
  const direction = useRef(1);
  const row = useRef(0);
  const lerpFactor = 0.1;

  const isValidPosition = (x: number, z: number) => {
    const margin = 2;
    const halfWidth = fieldSize.width / 2;
    const halfLength = fieldSize.length / 2;
    return (
      x >= -halfWidth + margin &&
      x <= halfWidth - margin &&
      z >= -halfLength + margin &&
      z <= halfLength - margin
    );
  };

  useFrame((_, delta) => {
    if (!isRunning || !carRef.current) return;

    const currentTime = Date.now();
    if (currentTime - lastUpdateTime.current < 16) return;
    lastUpdateTime.current = currentTime;

    const speed = 0.3;
    const rowSpacing = 2;
    
    let newX = targetPosition.current.x + speed * direction.current;
    let newZ = targetPosition.current.z;
    
    const halfWidth = fieldSize.width / 2;
    if (Math.abs(newX) > halfWidth - 2) {
      direction.current *= -1;
      row.current += 1;
      newZ = (-fieldSize.length / 2) + (row.current * rowSpacing);
      newX = direction.current > 0 ? -halfWidth + 2 : halfWidth - 2;
    }

    if (newZ > fieldSize.length / 2 - 2) {
      newX = -halfWidth + 2;
      newZ = -fieldSize.length / 2 + 2;
      row.current = 0;
      direction.current = 1;
    }

    if (isValidPosition(newX, newZ)) {
      targetPosition.current = {
        x: newX,
        z: newZ,
        rotation: direction.current > 0 ? 0 : Math.PI
      };

      lastPosition.current = {
        x: THREE.MathUtils.lerp(lastPosition.current.x, targetPosition.current.x, lerpFactor),
        z: THREE.MathUtils.lerp(lastPosition.current.z, targetPosition.current.z, lerpFactor),
        rotation: THREE.MathUtils.lerp(lastPosition.current.rotation, targetPosition.current.rotation, lerpFactor)
      };

      updateCarPosition(
        lastPosition.current.x,
        lastPosition.current.z,
        lastPosition.current.rotation
      );

      carRef.current.position.x = lastPosition.current.x;
      carRef.current.position.z = lastPosition.current.z;
      carRef.current.rotation.y = lastPosition.current.rotation;
    }
  });

  return (
    <group ref={carRef}>
      {/* Chassis */}
      <mesh castShadow position={[0, 0.6, 0]}>
        <boxGeometry args={[2.8, 1.2, 5]} />
        <meshStandardMaterial color="#2196f3" metalness={0.6} roughness={0.4} />
      </mesh>

      {/* Pusa Tank */}
      <mesh castShadow position={[0, 1.5, -0.5]}>
        <cylinderGeometry args={[0.8, 1, 2.5, 16]} />
        <meshStandardMaterial color="#1565c0" metalness={0.7} roughness={0.3} />
      </mesh>

      {/* Tank Cap */}
      <mesh castShadow position={[0, 2.5, -0.5]}>
        <cylinderGeometry args={[0.3, 0.8, 0.3, 16]} />
        <meshStandardMaterial color="#0d47a1" metalness={0.8} roughness={0.2} />
      </mesh>

      {/* Spray Nozzles */}
      {[-1, 0, 1].map((x, i) => (
        <mesh key={i} castShadow position={[x, 0.3, -2.8]}>
          <cylinderGeometry args={[0.1, 0.1, 0.4, 8]} rotation={[Math.PI / 2, 0, 0]} />
          <meshStandardMaterial color="#263238" metalness={0.9} roughness={0.1} />
        </mesh>
      ))}

      {/* Wheels with Suspension */}
      {[[-1.5, -2], [1.5, -2], [-1.5, 2], [1.5, 2]].map(([x, z], i) => (
        <group key={i} position={[x, 0.6, z]}>
          {/* Suspension */}
          <mesh castShadow position={[0, -0.3, 0]}>
            <boxGeometry args={[0.2, 0.6, 0.2]} />
            <meshStandardMaterial color="#455a64" metalness={0.7} roughness={0.3} />
          </mesh>
          {/* Wheel */}
          <mesh castShadow position={[0, -0.6, 0]} rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.6, 0.6, 0.4, 32]} />
            <meshStandardMaterial color="#263238" metalness={0.5} roughness={0.5} />
          </mesh>
          {/* Wheel Hub */}
          <mesh position={[0.2, -0.6, 0]} rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.2, 0.2, 0.1, 16]} />
            <meshStandardMaterial color="#455a64" metalness={0.8} roughness={0.2} />
          </mesh>
        </group>
      ))}

      {/* Arduino Control Box */}
      <mesh castShadow position={[0, 1.8, 1.5]}>
        <boxGeometry args={[1.2, 0.6, 1]} />
        <meshStandardMaterial color="#e0e0e0" metalness={0.3} roughness={0.7} />
      </mesh>

      {/* Sensors */}
      {[-0.4, 0.4].map((x, i) => (
        <mesh key={i} castShadow position={[x, 1.5, 2.3]}>
          <sphereGeometry args={[0.12, 16, 16]} />
          <meshStandardMaterial color="#000" metalness={0.8} roughness={0.2} />
        </mesh>
      ))}
    </group>
  );
}