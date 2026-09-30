"use client";
import { useState, useRef, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import { RigidBody, useRapier, RapierRigidBody } from "@react-three/rapier";
import * as THREE from "three";

export default function Box() {
  const rbRef = useRef<RapierRigidBody>(null);
  const meshRef = useRef<THREE.Mesh>(null);
  const colorTimer = useRef(0);
  const { world } = useRapier();

  const [isPulsing, setIsPulsing] = useState(false);
  const scaleProgress = useRef(0);
  const baseScale = 2.0;

  useEffect(() => {
    (window as any).resetBoxPhysics = () => {
      if (rbRef.current) {
        rbRef.current.wakeUp();
        rbRef.current.setTranslation({ x: 0, y: 5, z: 0 }, true);
        rbRef.current.setLinvel({ x: 0, y: 10, z: 0 }, true);
        rbRef.current.setAngvel({ x: 0, y: 10, z: 10 }, true);
      }
    };

    return () => {
      delete (window as any).resetBoxPhysics;
    };
  }, []);

  useFrame((state, delta) => {
    if (!meshRef.current) return;
    if (isPulsing) {
      scaleProgress.current = Math.min(1, scaleProgress.current + delta * 42.0);
    } else {
      scaleProgress.current = Math.max(0, scaleProgress.current - delta * 300.0);
    }
    const t = scaleProgress.current;
    const smoothFactor = Math.sin(t * Math.PI * 0.85) * (1 + 0.3 * (1 - t)); 
    const dynamicScale = baseScale + baseScale * 0.6 * smoothFactor;
    meshRef.current.scale.set(dynamicScale, dynamicScale, dynamicScale);
    colorTimer.current += delta;
    if(colorTimer.current > 0.5){
    const material = meshRef.current.material as THREE.MeshStandardMaterial;

    material.color.setHSL(
      Math.random(),
      Math.random(),
      Math.random()
    );
    colorTimer.current = 0;
    }
  });

  const handleClick = () => {
    if (isPulsing || !rbRef.current) return;
    setIsPulsing(true);
    scaleProgress.current = 0;

    rbRef.current.wakeUp();
    rbRef.current.applyImpulse({ x: 0, y: 35.0, z: 0 }, true);
    rbRef.current.setAngvel({x:0,y:10,z:10},true);

    const boxPos = rbRef.current.translation();
    const blastRadius = 9.0;
    const blastStrength = 30.0;

    world.forEachRigidBody((body) => {
      if (body.handle === rbRef.current?.handle) return;
      const bodyPos = body.translation();
      const dx = bodyPos.x - boxPos.x;
      const dy = bodyPos.y - boxPos.y;
      const dz = bodyPos.z - boxPos.z;
      const distance = Math.sqrt(dx * dx + dy * dy + dz * dz);

      if (distance < blastRadius && distance > 0) {
        const forceDirection = {
          x: (dx / distance) * blastStrength,
          y: (dy / distance + 0.4) * blastStrength, 
          z: (dz / distance) * blastStrength,
        };
        body.wakeUp();
        body.applyImpulse(forceDirection, true);
      }
    });

    setTimeout(() => {
      setIsPulsing(false);
    }, 550);
  };

  return (
    <RigidBody ref={rbRef} position={[0, 5, 0]} colliders="cuboid" rotation={[34, 134, 14]}>
      <mesh ref={meshRef} onClick={handleClick}>
        <boxGeometry />
        <meshBasicMaterial color={"red"} />
      </mesh>
    </RigidBody>
  );
}
