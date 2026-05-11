import { Suspense, useMemo, useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { Float, OrbitControls } from '@react-three/drei';
import * as THREE from 'three';
import { isWebGLAvailable, isMobile } from '../utils/webgl';
import { useReducedMotion } from '../hooks/useReducedMotion';

const ComputerMesh = () => {
  const reducedMotion = useReducedMotion();

  const geometry = useMemo(() => new THREE.BoxGeometry(2.4, 1.6, 0.1), []);
  const standGeo = useMemo(() => new THREE.BoxGeometry(0.4, 0.8, 0.3), []);
  const baseGeo = useMemo(() => new THREE.BoxGeometry(1.2, 0.08, 0.6), []);
  const screenMat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: '#1a1a2e',
        roughness: 0.3,
        metalness: 0.8,
        emissive: new THREE.Color('#915EFF'),
        emissiveIntensity: 0.3,
      }),
    []
  );
  const bodyMat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: '#2a2a3e',
        roughness: 0.5,
        metalness: 0.6,
      }),
    []
  );
  const innerScreenMat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: '#0d0f1f',
        emissive: new THREE.Color('#915EFF'),
        emissiveIntensity: 0.15,
        roughness: 0.1,
        metalness: 0.9,
      }),
    []
  );
  const innerGeo = useMemo(() => new THREE.PlaneGeometry(2.1, 1.3), []);

  return (
    <Float
      speed={reducedMotion ? 0 : 1.75}
      rotationIntensity={reducedMotion ? 0 : 1}
      floatIntensity={reducedMotion ? 0 : 2}
    >
      <group position={[0, -0.5, 0]} rotation={[0.05, -0.3, 0]}>
        <mesh geometry={geometry} material={screenMat} castShadow receiveShadow>
          <mesh geometry={innerGeo} material={innerScreenMat} position={[0, 0, 0.052]} />
        </mesh>
        <mesh geometry={standGeo} material={bodyMat} position={[0, -1.2, 0]} castShadow />
        <mesh geometry={baseGeo} material={bodyMat} position={[0, -1.6, 0]} castShadow receiveShadow />

        <group position={[-0.7, 0.35, 0.06]}>
          {[0, 1, 2, 3, 4].map((line) => {
            const lineGeo = new THREE.PlaneGeometry(0.6 + Math.random() * 0.8, 0.04);
            return (
              <mesh key={line} position={[0, -line * 0.12, 0]}>
                <planeGeometry args={[0.6 + Math.random() * 0.8, 0.04]} />
                <meshBasicMaterial
                  color={line % 2 === 0 ? '#915EFF' : '#4fc3f7'}
                  transparent
                  opacity={0.6}
                />
              </mesh>
            );
          })}
        </group>
      </group>
    </Float>
  );
};

const CanvasSkeleton = () => (
  <mesh>
    <boxGeometry args={[1, 1, 1]} />
    <meshStandardMaterial color="#1d1836" wireframe />
  </mesh>
);

const ComputerModel = () => {
  const [hasError, setHasError] = useState(false);

  if (isMobile() || !isWebGLAvailable() || hasError) {
    return (
      <div className="flex items-center justify-center w-full h-full">
        <div className="w-64 h-64 rounded-2xl bg-tertiary/50 flex items-center justify-center border border-[rgba(145,94,255,0.12)] backdrop-blur-sm">
          <div className="text-center">
            <span className="text-5xl block mb-3">💻</span>
            <span className="text-secondary text-xs font-inter">3D Model</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <Canvas
      shadows={{ type: THREE.PCFSoftShadowMap }}
      dpr={[1, Math.min(window.devicePixelRatio, 2)]}
      camera={{ fov: 45, near: 0.1, far: 200, position: [0, 0, 6] }}
      gl={{
        antialias: true,
        toneMapping: THREE.ACESFilmicToneMapping,
        toneMappingExposure: 1.0,
        outputColorSpace: THREE.SRGBColorSpace,
        powerPreference: 'high-performance',
      }}
      performance={{ min: 0.5 }}
      className="hero-canvas"
      onCreated={({ gl }) => {
        gl.domElement.addEventListener('webglcontextlost', (e) => {
          e.preventDefault();
          setHasError(true);
        });
      }}
    >
      <Suspense fallback={<CanvasSkeleton />}>
        <ambientLight intensity={0.15} />
        <directionalLight
          position={[5, 5, 5]}
          intensity={1.2}
          castShadow
          shadow-mapSize={[1024, 1024]}
          shadow-camera-near={0.5}
          shadow-camera-far={50}
          shadow-bias={-0.0001}
        />
        <pointLight position={[-10, -10, -10]} intensity={0.5} color="#915EFF" />
        <hemisphereLight skyColor="#0d0f1f" groundColor="#050816" intensity={0.3} />
        <ComputerMesh />
        <OrbitControls
          enableZoom={false}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 2}
        />
      </Suspense>
    </Canvas>
  );
};

export default ComputerModel;
