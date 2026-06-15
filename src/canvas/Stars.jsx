import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { useReducedMotion } from '../hooks/useReducedMotion';

const generateStarPositions = (count) => {
  const pos = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    const i3 = i * 3;
    const radius = 50 + Math.random() * 100;
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos(2 * Math.random() - 1);
    pos[i3] = radius * Math.sin(phi) * Math.cos(theta);
    pos[i3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
    pos[i3 + 2] = radius * Math.cos(phi);
  }
  return pos;
};

const Stars = () => {
  const starsRef = useRef();
  const reducedMotion = useReducedMotion();
  const count = 3000;

  const positions = useMemo(() => generateStarPositions(count), [count]);

  useFrame((state) => {
    if (reducedMotion) return;
    if (starsRef.current) {
      starsRef.current.rotation.y = state.clock.elapsedTime * 0.02;
      starsRef.current.rotation.x = state.clock.elapsedTime * 0.005;
    }
  });

  if (!positions) return null;

  return (
    <points ref={starsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.15}
        color="#aaa6c3"
        transparent
        opacity={0.6}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  );
};

export default Stars;
