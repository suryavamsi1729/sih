// src/Scene.tsx
import {  Html, OrbitControls, useProgress } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import React, { Suspense, useEffect, type Dispatch, type SetStateAction } from 'react';

import { useGLTF } from "@react-three/drei";

function Loader() {
  const { progress } = useProgress()
  console.log(progress)
  return <Html center>{progress} % loaded</Html>
}

interface SceneProps {
  modelPath: string;
  setLoading: Dispatch<SetStateAction<boolean>>;
}

const Scene: React.FC<SceneProps> = ({ modelPath,setLoading }) => {
  const { scene } = useGLTF(modelPath);
  useEffect(() => {
    if (scene) {
      setLoading(false); // model loaded successfully
    }
  }, [scene,setLoading]);
  return (
    <Suspense fallback={<Loader />}>
      <Canvas camera={{ position: [-0.5, 1, 2] }} shadows>
        {/* Directional light */}
        <directionalLight
            position={[-1.3, 6.0, 4.4]}
            castShadow
            intensity={Math.PI * 1}
        />
        <primitive
          object={scene}
          position={[0, 1, 0]}
          children-0-castShadow
          scale={[2.75,2.75,2.75,2.75]}
        />
         <OrbitControls target={[0, 1, 0]} />
      </Canvas>
    </Suspense>
  );
};

export default Scene;