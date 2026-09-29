"use client";
import { useState, useEffect, Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { Physics } from "@react-three/rapier";
import Box from "./objects/Box";
import Plane from "./objects/Plane";
import Sphere from "./objects/Sphere";
import Model from "./objects/Car"; 

interface FallingSphereData {
  id: number;
  position: [number, number, number];
}

export default function Scene() {
  const [spheres, setSpheres] = useState<FallingSphereData[]>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      setSpheres((prev) => {
        const currentList = prev.length > 40 ? prev.slice(1) : prev;
        
        const randomX = (Math.random() - 0.5) * 1.5;
        const randomZ = (Math.random() - 0.5) * 1.5;

        return [
          ...currentList,
          {
            id: Date.now() + Math.random(),
            position: [randomX, 10, randomZ],
          },
        ];
      });
    }, 200); 

    return () => clearInterval(interval);
  }, []);

  return (
    <Canvas camera={{ position: [10, 12, -2], fov: 90 }}>
      <ambientLight intensity={1.5} />
      <Physics>
        <Box />
        <Plane />
        {spheres.map((sphere) => (
          <Sphere key={sphere.id} position={sphere.position} />
        ))}
        <Suspense fallback={null}>
           <Model />
        </Suspense>
      </Physics>
      <OrbitControls makeDefault />
    </Canvas>
  );
}
