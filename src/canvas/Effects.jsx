import {
  EffectComposer,
  Bloom,
  Vignette,
  ToneMapping,
  Noise,
  ChromaticAberration,
} from '@react-three/postprocessing';
import { ToneMappingMode, BlendFunction } from 'postprocessing';
import { Vector2 } from 'three';
import { useMemo } from 'react';

const Effects = () => {
  const offset = useMemo(() => new Vector2(0.0005, 0.0005), []);

  return (
    <EffectComposer multisampling={4} enableNormalPass={false}>
      <Bloom
        luminanceThreshold={1.1}
        luminanceSmoothing={0.9}
        intensity={0.35}
        height={300}
      />
      <ChromaticAberration
        blendFunction={BlendFunction.NORMAL}
        offset={offset}
      />
      <Noise opacity={0.022} />
      <Vignette offset={0.28} darkness={0.55} eskil={false} />
      <ToneMapping mode={ToneMappingMode.ACES_FILMIC} />
    </EffectComposer>
  );
};

export default Effects;
