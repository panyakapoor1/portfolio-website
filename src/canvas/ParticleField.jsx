import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import vertexShader from '../shaders/particles/vertex.glsl';
import fragmentShader from '../shaders/particles/fragment.glsl';
import { useReducedMotion } from '../hooks/useReducedMotion';

const ParticleField = ({ scrollProgress = 0 }) => {
  const pointsRef = useRef();
  const reducedMotion = useReducedMotion();
  const count = 12000;

  const { positions, scales } = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const scl = new Float32Array(count);

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      pos[i3] = (Math.random() - 0.5) * 30;
      pos[i3 + 1] = (Math.random() - 0.5) * 30;
      pos[i3 + 2] = (Math.random() - 0.5) * 30;
      scl[i] = Math.random() * 1.5 + 0.5;
    }

    return { positions: pos, scales: scl };
  }, []);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uScrollProgress: { value: 0 },
      uSize: { value: 30 * Math.min(window.devicePixelRatio, 2) },
    }),
    []
  );

  useFrame((state) => {
    if (reducedMotion) return;
    if (pointsRef.current) {
      pointsRef.current.material.uniforms.uTime.value = state.clock.elapsedTime;
      pointsRef.current.material.uniforms.uScrollProgress.value = scrollProgress;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-aScale"
          count={count}
          array={scales}
          itemSize={1}
        />
      </bufferGeometry>
      <shaderMaterial
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
};

export default ParticleField;
