import { Suspense, useMemo, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { Float, OrbitControls } from '@react-three/drei';
import * as THREE from 'three';
import { isWebGLAvailable } from '../utils/webgl';
import { useReducedMotion } from '../hooks/useReducedMotion';

const EarthMesh = () => {
  const reducedMotion = useReducedMotion();

  const sphereGeo = useMemo(() => new THREE.SphereGeometry(1.8, 64, 64), []);
  const earthMat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: '#1a3a5c',
        roughness: 0.8,
        metalness: 0.1,
        emissive: new THREE.Color('#0a1628'),
        emissiveIntensity: 0.2,
      }),
    []
  );

  const continentPositions = useMemo(() => {
    const positions = [];
    for (let i = 0; i < 120; i++) {
      const phi = Math.acos(2 * Math.random() - 1);
      const theta = Math.random() * Math.PI * 2;
      const r = 1.82;
      positions.push({
        pos: [
          r * Math.sin(phi) * Math.cos(theta),
          r * Math.sin(phi) * Math.sin(theta),
          r * Math.cos(phi),
        ],
        scale: 0.02 + Math.random() * 0.06,
      });
    }
    return positions;
  }, []);

  const dotMat = useMemo(
    () =>
      new THREE.MeshBasicMaterial({
        color: '#4fc3f7',
        transparent: true,
        opacity: 0.6,
      }),
    []
  );

  const accentDotMat = useMemo(
    () =>
      new THREE.MeshBasicMaterial({
        color: '#915EFF',
        transparent: true,
        opacity: 0.8,
      }),
    []
  );

  const dotGeo = useMemo(() => new THREE.SphereGeometry(1, 6, 6), []);

  return (
    <Float
      speed={reducedMotion ? 0 : 1}
      rotationIntensity={reducedMotion ? 0 : 0.2}
      floatIntensity={reducedMotion ? 0 : 0.4}
    >
      <group>
        <mesh geometry={sphereGeo} material={earthMat} />
        {continentPositions.map((dot, i) => (
          <mesh
            key={i}
            geometry={dotGeo}
            material={i % 7 === 0 ? accentDotMat : dotMat}
            position={dot.pos}
            scale={dot.scale}
          />
        ))}
        <mesh>
          <sphereGeometry args={[1.85, 32, 32]} />
          <meshStandardMaterial
            color="#4fc3f7"
            transparent
            opacity={0.04}
            roughness={0.9}
          />
        </mesh>
      </group>
    </Float>
  );
};

const CanvasSkeleton = () => (
  <mesh>
    <sphereGeometry args={[1, 16, 16]} />
    <meshStandardMaterial color="#1d1836" wireframe />
  </mesh>
);

const Earth = () => {
  const [hasError, setHasError] = useState(false);

  if (!isWebGLAvailable() || hasError) {
    return (
      <div className="flex items-center justify-center w-full h-full">
        <div className="w-64 h-64 rounded-full bg-tertiary/50 flex items-center justify-center border border-[rgba(145,94,255,0.12)]">
          <div className="text-center">
            <span className="text-5xl block mb-2">🌍</span>
            <span className="text-secondary text-xs font-inter">Globe</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <Canvas
      shadows
      dpr={[1, Math.min(window.devicePixelRatio, 2)]}
      camera={{ fov: 45, near: 0.1, far: 200, position: [0, 0, 5] }}
      gl={{
        antialias: true,
        toneMapping: THREE.ACESFilmicToneMapping,
        outputColorSpace: THREE.SRGBColorSpace,
        powerPreference: 'high-performance',
      }}
      performance={{ min: 0.5 }}
      onCreated={({ gl }) => {
        gl.domElement.addEventListener('webglcontextlost', (e) => {
          e.preventDefault();
          setHasError(true);
        });
      }}
    >
      <Suspense fallback={<CanvasSkeleton />}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[-4, 4, -4]} intensity={1.0} />
        <pointLight position={[5, 0, 5]} color="#4fc3f7" intensity={0.8} />
        <EarthMesh />
        <OrbitControls
          autoRotate
          autoRotateSpeed={0.5}
          enableZoom={false}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 2}
        />
      </Suspense>
    </Canvas>
  );
};

export default Earth;
